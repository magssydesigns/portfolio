"use client";

import { useEffect, useState, useSyncExternalStore, type RefObject } from "react";
import { animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeFinePointer(callback: () => void) {
  const mq = window.matchMedia(FINE_POINTER_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getFinePointerSnapshot() {
  return window.matchMedia(FINE_POINTER_QUERY).matches;
}

function getFinePointerServerSnapshot() {
  return false;
}

/** Each segment trails the previous one with a progressively softer spring, tapering size/opacity for the comet tail. */
const SEGMENTS = [
  { size: 16, opacity: 0.9, blur: 2, stiffness: 700, damping: 42 },
  { size: 13, opacity: 0.72, blur: 3, stiffness: 300, damping: 30 },
  { size: 11, opacity: 0.55, blur: 4, stiffness: 180, damping: 26 },
  { size: 9, opacity: 0.4, blur: 5, stiffness: 120, damping: 22 },
  { size: 7, opacity: 0.26, blur: 6, stiffness: 80, damping: 20 },
  { size: 5, opacity: 0.14, blur: 7, stiffness: 50, damping: 18 },
] as const;

const IDLE_FADE_DELAY_MS = 200;

export default function CometCursorTrail({ containerRef }: { containerRef: RefObject<HTMLDivElement | null> }) {
  // useSyncExternalStore (not useState+useEffect) so the server render and the
  // first client render agree - device support is only knowable client-side,
  // and getServerSnapshot keeps that from becoming a hydration mismatch.
  const enabled = useSyncExternalStore(subscribeFinePointer, getFinePointerSnapshot, getFinePointerServerSnapshot);
  const [isVisible, setIsVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const trailOpacity = useMotionValue(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  const active = enabled && !prefersReducedMotion;

  useEffect(() => {
    if (!isVisible) animate(trailOpacity, 0, { duration: 0.3 });
  }, [isVisible, trailOpacity]);

  useEffect(() => {
    if (!active) return;

    let idleTimeout: ReturnType<typeof setTimeout> | null = null;
    const clearIdleTimeout = () => {
      if (idleTimeout) {
        clearTimeout(idleTimeout);
        idleTimeout = null;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      const el = containerRef.current;
      if (!el || !isVisible) return;
      const rect = el.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      if (!inside) {
        animate(trailOpacity, 0, { duration: 0.4 });
        return;
      }

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      animate(trailOpacity, 1, { duration: 0.25 });

      clearIdleTimeout();
      idleTimeout = setTimeout(() => {
        animate(trailOpacity, 0, { duration: 0.6 });
      }, IDLE_FADE_DELAY_MS);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) animate(trailOpacity, 0, { duration: 0.2 });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearIdleTimeout();
    };
  }, [active, isVisible, containerRef, mouseX, mouseY, trailOpacity]);

  // Chained springs - each one trails the previous, progressively softer -> longer gap (visible tail) at speed.
  const s0x = useSpring(mouseX, { stiffness: SEGMENTS[0].stiffness, damping: SEGMENTS[0].damping });
  const s0y = useSpring(mouseY, { stiffness: SEGMENTS[0].stiffness, damping: SEGMENTS[0].damping });
  const s1x = useSpring(s0x, { stiffness: SEGMENTS[1].stiffness, damping: SEGMENTS[1].damping });
  const s1y = useSpring(s0y, { stiffness: SEGMENTS[1].stiffness, damping: SEGMENTS[1].damping });
  const s2x = useSpring(s1x, { stiffness: SEGMENTS[2].stiffness, damping: SEGMENTS[2].damping });
  const s2y = useSpring(s1y, { stiffness: SEGMENTS[2].stiffness, damping: SEGMENTS[2].damping });
  const s3x = useSpring(s2x, { stiffness: SEGMENTS[3].stiffness, damping: SEGMENTS[3].damping });
  const s3y = useSpring(s2y, { stiffness: SEGMENTS[3].stiffness, damping: SEGMENTS[3].damping });
  const s4x = useSpring(s3x, { stiffness: SEGMENTS[4].stiffness, damping: SEGMENTS[4].damping });
  const s4y = useSpring(s3y, { stiffness: SEGMENTS[4].stiffness, damping: SEGMENTS[4].damping });
  const s5x = useSpring(s4x, { stiffness: SEGMENTS[5].stiffness, damping: SEGMENTS[5].damping });
  const s5y = useSpring(s4y, { stiffness: SEGMENTS[5].stiffness, damping: SEGMENTS[5].damping });

  const positions: [MotionValue<number>, MotionValue<number>][] = [
    [s0x, s0y],
    [s1x, s1y],
    [s2x, s2y],
    [s3x, s3y],
    [s4x, s4y],
    [s5x, s5y],
  ];

  if (!enabled || prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[5]"
      style={{ opacity: trailOpacity }}
    >
      {SEGMENTS.map((seg, i) => (
        <TrailDot key={i} x={positions[i][0]} y={positions[i][1]} config={seg} />
      ))}
    </motion.div>
  );
}

function TrailDot({
  x,
  y,
  config,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  config: (typeof SEGMENTS)[number];
}) {
  const offsetX = useTransform(x, (v) => v - config.size / 2);
  const offsetY = useTransform(y, (v) => v - config.size / 2);

  return (
    <motion.div
      className="absolute left-0 top-0 rounded-full"
      style={{
        x: offsetX,
        y: offsetY,
        width: config.size,
        height: config.size,
        opacity: config.opacity,
        filter: `blur(${config.blur}px)`,
        background: "radial-gradient(circle, #DDF5FF 0%, #A9E7FF 45%, rgba(169,231,255,0) 75%)",
      }}
    />
  );
}
