"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

type BlobConfig = {
  color: string;
  size: string;
  position: { top?: string; bottom?: string; left?: string; right?: string };
  blur: number;
  opacity: number;
  /** Max pointer-driven parallax offset in px. */
  depth: number;
  /** Spring feel - lower stiffness / higher damping reads as slower & heavier. */
  stiffness: number;
  damping: number;
  driftClass: string;
  driftDelay: string;
  /** Hide on small screens to keep mobile lightweight. */
  hideOnMobile?: boolean;
  /** Subtly scales up as the pointer moves further from centre - used for the one "hero" interactive blob. */
  reactiveScale?: boolean;
};

// Positions are fixed px from the top of the shared hero+cards container (not %),
// so the composition stays consistent regardless of how tall that container is -
// several blobs are pushed down deliberately so the wash bleeds behind the project cards.
const BLOBS: BlobConfig[] = [
  {
    color: "#FDB3C6",
    size: "620px",
    position: { top: "-90px", left: "-8%" },
    blur: 90,
    opacity: 0.72,
    depth: 30,
    stiffness: 22,
    damping: 18,
    driftClass: "animate-drift-a",
    driftDelay: "-3s",
  },
  {
    color: "#FFDC7B",
    size: "560px",
    position: { top: "-70px", right: "-10%" },
    blur: 85,
    opacity: 0.66,
    depth: 18,
    stiffness: 30,
    damping: 22,
    driftClass: "animate-drift-b",
    driftDelay: "-9s",
  },
  {
    color: "#7AB5FF",
    size: "820px",
    position: { top: "820px", right: "-6%" },
    blur: 100,
    opacity: 0.78,
    depth: 60,
    stiffness: 55,
    damping: 14,
    driftClass: "animate-drift-c",
    driftDelay: "-6s",
    reactiveScale: true,
  },
  {
    color: "#D5C3FB",
    size: "580px",
    position: { top: "1140px", right: "18%" },
    blur: 95,
    opacity: 0.6,
    depth: 15,
    stiffness: 20,
    damping: 18,
    driftClass: "animate-drift-a",
    driftDelay: "-14s",
  },
  {
    color: "#FDC2A0",
    size: "520px",
    position: { top: "260px", left: "36%" },
    blur: 95,
    opacity: 0.54,
    depth: 25,
    stiffness: 24,
    damping: 19,
    driftClass: "animate-drift-b",
    driftDelay: "-1s",
  },
  {
    color: "#CDE8D4",
    size: "420px",
    position: { top: "85px", right: "30%" },
    blur: 80,
    opacity: 0.48,
    depth: 10,
    stiffness: 34,
    damping: 24,
    driftClass: "animate-drift-c",
    driftDelay: "-18s",
    hideOnMobile: true,
  },
];

export default function InteractiveGradientBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [allowPointer, setAllowPointer] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );
  const prefersReducedMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const onChange = (e: MediaQueryListEvent) => setAllowPointer(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!allowPointer || prefersReducedMotion) return;

    const handlePointerMove = (e: PointerEvent) => {
      const el = containerRef.current;
      if (!el || !isVisible) return;
      const rect = el.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      if (inside) {
        pointerX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
        pointerY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
      } else {
        pointerX.set(0);
        pointerY.set(0);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [allowPointer, prefersReducedMotion, isVisible, pointerX, pointerY]);

  const paused = !isVisible || Boolean(prefersReducedMotion);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {BLOBS.map((blob, i) => (
        <BlobLayer key={i} blob={blob} pointerX={pointerX} pointerY={pointerY} paused={paused} />
      ))}
    </div>
  );
}

function BlobLayer({
  blob,
  pointerX,
  pointerY,
  paused,
}: {
  blob: BlobConfig;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  paused: boolean;
}) {
  const springX = useSpring(pointerX, { stiffness: blob.stiffness, damping: blob.damping });
  const springY = useSpring(pointerY, { stiffness: blob.stiffness, damping: blob.damping });
  const x = useTransform(springX, (v) => v * blob.depth);
  const y = useTransform(springY, (v) => v * blob.depth);
  const scale = useTransform([springX, springY], ([sx, sy]: number[]) =>
    blob.reactiveScale ? 1 + Math.min(Math.hypot(sx, sy) / 2, 1) * 0.12 : 1
  );

  return (
    <motion.div
      style={{ x, y, scale, position: "absolute", ...blob.position }}
      className={blob.hideOnMobile ? "hidden sm:block" : undefined}
    >
      <div
        className={`rounded-full ${paused ? "" : blob.driftClass}`}
        style={{
          width: blob.size,
          height: blob.size,
          background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
          filter: `blur(${blob.blur}px)`,
          opacity: blob.opacity,
          animationDelay: blob.driftDelay,
        }}
      />
    </motion.div>
  );
}
