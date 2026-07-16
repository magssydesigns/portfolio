"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import * as THREE from "three";
import MediaSlotView from "./project/MediaSlotView";
import type { MediaSlot } from "@/lib/projects";

const CAPABILITY_QUERY = "(pointer: fine) and (prefers-reduced-motion: no-preference)";

function subscribeCapability(callback: () => void) {
  const mq = window.matchMedia(CAPABILITY_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function useSwirlCapable() {
  return useSyncExternalStore(
    subscribeCapability,
    () => window.matchMedia(CAPABILITY_QUERY).matches,
    () => false
  );
}

const VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Rotational vortex: pixels near uCenter rotate by uAngle, falling off smoothly
// to zero by uRadius. The rotation is computed in aspect-corrected "display"
// space so the influence region reads as a circle regardless of card shape,
// then the swirled coordinate is remapped through an object-fit: cover
// transform so it samples the same crop the plain <img>/<video> shows.
const FRAGMENT_SHADER = `
  precision highp float;
  uniform sampler2D uTexture;
  uniform vec2 uCenter;
  uniform float uRadius;
  uniform float uAngle;
  uniform float uContainerAspect;
  uniform float uImageAspect;
  varying vec2 vUv;

  vec2 rotate(vec2 v, float a) {
    float s = sin(a);
    float c = cos(a);
    return vec2(v.x * c - v.y * s, v.x * s + v.y * c);
  }

  void main() {
    vec2 aspectVec = vec2(uContainerAspect, 1.0);
    vec2 diff = (vUv - uCenter) * aspectVec;
    float dist = length(diff);
    float falloff = 1.0 - smoothstep(0.0, uRadius, dist);
    float angle = uAngle * falloff;
    vec2 rotated = rotate(diff, angle);
    vec2 swirledUv = uCenter + rotated / aspectVec;

    vec2 ratio = vec2(
      min(uContainerAspect / uImageAspect, 1.0),
      min(uImageAspect / uContainerAspect, 1.0)
    );
    vec2 texUv = (swirledUv - 0.5) * ratio + 0.5;

    gl_FragColor = texture2D(uTexture, texUv);
  }
`;

const MAX_ANGLE = 1.8; // radians, within the 1.2-2.2 target range
const RADIUS = 0.4; // fraction of display width, within the 30-50% target range
const IN_TAU = 0.15; // ~450ms hover-in transition
const OUT_TAU = 0.22; // ~650ms return transition

function getMediaAspect(media: MediaSlot): number | null {
  if (media.kind === "image") return media.image.width / media.image.height;
  if (media.kind === "video") return media.video.width / media.video.height;
  return null;
}

function getMediaUrl(media: MediaSlot): string | null {
  if (media.kind === "image") return media.image.src;
  if (media.kind === "video") return media.video.src;
  return null;
}

export default function SwirlImage({ media, className }: { media: MediaSlot; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const enabled = useSwirlCapable();

  useEffect(() => {
    if (!enabled) return;
    const url = getMediaUrl(media);
    const imageAspect = getMediaAspect(media);
    if (!url || !imageAspect) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    let videoEl: HTMLVideoElement | null = null;
    let texture: THREE.Texture;
    if (media.kind === "video") {
      videoEl = document.createElement("video");
      videoEl.src = url;
      videoEl.muted = true;
      videoEl.loop = true;
      videoEl.playsInline = true;
      videoEl.crossOrigin = "anonymous";
      videoEl.play().catch(() => {});
      texture = new THREE.VideoTexture(videoEl);
    } else {
      texture = new THREE.TextureLoader().load(url);
    }
    texture.wrapS = THREE.MirroredRepeatWrapping;
    texture.wrapT = THREE.MirroredRepeatWrapping;
    texture.colorSpace = THREE.SRGBColorSpace;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
        uCenter: { value: new THREE.Vector2(0.5, 0.5) },
        uRadius: { value: RADIUS },
        uAngle: { value: 0 },
        uContainerAspect: { value: 1 },
        uImageAspect: { value: imageAspect },
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      renderer.setSize(rect.width, rect.height, false);
      material.uniforms.uContainerAspect.value = rect.width / rect.height;
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(([entry]) => (isVisible = entry.isIntersecting), {
      threshold: 0,
    });
    intersectionObserver.observe(container);

    const centerTarget = { x: 0.5, y: 0.5 };
    const centerCurrent = { x: 0.5, y: 0.5 };
    let angleTarget = 0;
    let angleCurrent = 0;
    let hovering = false;
    let running = false;
    let lastTime = performance.now();
    let lastPointer = { x: 0.5, y: 0.5, t: lastTime };
    let velocityBoost = 0;
    let leaveTime = 0;
    const FADE_OUT_MS = 650;

    const tick = () => {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (!isVisible) {
        running = false;
        return;
      }

      const tau = angleTarget > angleCurrent ? IN_TAU : OUT_TAU;
      const lerp = 1 - Math.exp(-dt / tau);
      centerCurrent.x += (centerTarget.x - centerCurrent.x) * lerp;
      centerCurrent.y += (centerTarget.y - centerCurrent.y) * lerp;
      angleCurrent += (angleTarget - angleCurrent) * lerp;
      velocityBoost += (0 - velocityBoost) * (1 - Math.exp(-dt / 0.2));

      material.uniforms.uCenter.value.set(centerCurrent.x, 1 - centerCurrent.y);
      material.uniforms.uAngle.value = angleCurrent * (1 + velocityBoost);

      if (media.kind === "video" && videoEl && videoEl.readyState >= 2) {
        texture.needsUpdate = true;
      }

      renderer.render(scene, camera);

      // Stop once the canvas has actually faded to invisible, rather than
      // waiting for the angle to decay to a tiny epsilon (which takes longer
      // than the opacity transition and would render an invisible canvas).
      if (!hovering && now - leaveTime > FADE_OUT_MS) {
        running = false;
        return;
      }
      requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (running) return;
      running = true;
      lastTime = performance.now();
      requestAnimationFrame(tick);
    };

    const handleMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      const now = performance.now();
      const dt = Math.max(now - lastPointer.t, 1);
      const speed = Math.hypot(nx - lastPointer.x, ny - lastPointer.y) / (dt / 1000);
      velocityBoost = Math.min(speed * 0.05, 0.2);
      lastPointer = { x: nx, y: ny, t: now };
      centerTarget.x = nx;
      centerTarget.y = ny;
      startLoop();
    };
    const handleEnter = () => {
      hovering = true;
      angleTarget = MAX_ANGLE;
      canvas.style.transition = "opacity 120ms ease-out";
      canvas.style.opacity = "1";
      startLoop();
    };
    const handleLeave = () => {
      hovering = false;
      angleTarget = 0;
      leaveTime = performance.now();
      canvas.style.transition = "opacity 650ms ease-out";
      canvas.style.opacity = "0";
      startLoop();
    };

    container.addEventListener("pointermove", handleMove);
    container.addEventListener("pointerenter", handleEnter);
    container.addEventListener("pointerleave", handleLeave);

    return () => {
      container.removeEventListener("pointermove", handleMove);
      container.removeEventListener("pointerenter", handleEnter);
      container.removeEventListener("pointerleave", handleLeave);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texture.dispose();
      videoEl?.pause();
    };
  }, [enabled, media]);

  return (
    <div ref={containerRef} className={`relative ${className ?? ""}`}>
      <MediaSlotView media={media} className="h-full w-full object-cover" />
      {enabled && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-0"
        />
      )}
    </div>
  );
}
