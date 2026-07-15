"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useId, useRef, useSyncExternalStore } from "react";
import type { ElementType, ReactNode } from "react";
import clsx from "clsx";

const FINE_POINTER_QUERY = "(pointer: fine)";
const WIDE_VIEWPORT_QUERY = "(min-width: 1024px)";

function subscribeMedia(query: string) {
  return (callback: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", callback);
    return () => mq.removeEventListener("change", callback);
  };
}

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    subscribeMedia(query),
    () => window.matchMedia(query).matches,
    () => false
  );
}

// Duration + no bounce, per spec: soft, slightly delayed follow with no overshoot.
const LAG_SPRING = { type: "spring" as const, duration: 0.35, bounce: 0 };
const PRESENCE_SPRING = { type: "spring" as const, duration: 0.4, bounce: 0 };
const VELOCITY_SPRING = { type: "spring" as const, duration: 0.25, bounce: 0 };

export default function InteractiveDistortedText({
  as: Tag = "h1",
  children,
  className,
  radius = 110,
  strength = 8,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Distortion falloff radius in px at full strength (~90-140 recommended). */
  radius?: number;
  /** Peak feDisplacementMap scale on hover (~4-10 recommended). */
  strength?: number;
}) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const filterId = `hero-distort-${rawId}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const isFinePointer = useMediaQuery(FINE_POINTER_QUERY);
  const isWideViewport = useMediaQuery(WIDE_VIEWPORT_QUERY);
  const enabled = isFinePointer && !prefersReducedMotion;
  const tier = isWideViewport ? 1 : 0.7;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const presence = useMotionValue(0);
  const velocity = useMotionValue(0);

  const springX = useSpring(pointerX, LAG_SPRING);
  const springY = useSpring(pointerY, LAG_SPRING);
  const springPresence = useSpring(presence, PRESENCE_SPRING);
  const springVelocity = useSpring(velocity, VELOCITY_SPRING);

  const maskRadius = useTransform(springPresence, (v) => v * radius * tier);
  const maskImage = useTransform([springX, springY, maskRadius], (latest) => {
    const [x, y, r] = latest as number[];
    return `radial-gradient(circle ${r}px at ${x}px ${y}px, black, transparent 100%)`;
  });
  const scale = useTransform([springPresence, springVelocity], (latest) => {
    const [p, v] = latest as number[];
    return p * strength * tier + Math.min(v, 1) * 2;
  });

  useMotionValueEvent(scale, "change", (v) => {
    displacementRef.current?.setAttribute("scale", String(v));
  });

  useEffect(() => {
    if (!enabled) return;
    const el = containerRef.current;
    if (!el) return;

    let lastX = 0;
    let lastY = 0;
    let lastT = 0;

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = performance.now();

      if (lastT > 0) {
        const dt = Math.max(now - lastT, 1);
        const dist = Math.hypot(x - lastX, y - lastY);
        velocity.set(dist / dt);
      }

      pointerX.set(x);
      pointerY.set(y);
      lastX = x;
      lastY = y;
      lastT = now;
    };

    const handleEnter = () => presence.set(1);
    const handleLeave = () => {
      presence.set(0);
      velocity.set(0);
      lastT = 0;
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerenter", handleEnter);
    el.addEventListener("pointerleave", handleLeave);

    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerenter", handleEnter);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, [enabled, pointerX, pointerY, presence, velocity]);

  const Component = Tag;

  return (
    <div ref={containerRef} className="relative isolate">
      <Component className={className}>{children}</Component>

      {enabled && (
        <>
          <svg aria-hidden focusable="false" className="absolute h-0 w-0 overflow-hidden">
            <defs>
              <filter
                id={filterId}
                x="-30%"
                y="-40%"
                width="160%"
                height="180%"
                colorInterpolationFilters="sRGB"
              >
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.012 0.025"
                  numOctaves={2}
                  seed={7}
                  result="noise"
                />
                <feDisplacementMap
                  ref={displacementRef}
                  in="SourceGraphic"
                  in2="noise"
                  scale={0}
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>
          </svg>

          <motion.div
            aria-hidden="true"
            className={clsx(className, "pointer-events-none absolute inset-0 select-none")}
            style={{
              filter: `url(#${filterId})`,
              WebkitFilter: `url(#${filterId})`,
              maskImage,
              WebkitMaskImage: maskImage,
            }}
          >
            {children}
          </motion.div>
        </>
      )}
    </div>
  );
}
