"use client";

import { useEffect, useState, type RefObject } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

/** Scroll progress stops the whole scene interpolates across: hero, selected work, about/capabilities, contact/footer. */
const SCROLL_STOPS = [0, 0.33, 0.66, 1];

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
  /** Opacity at each of the 4 scroll stops - lets the dominant colour balance evolve down the page. */
  scrollOpacity?: [number, number, number, number];
  /** Extra px offset at each scroll stop, added on top of pointer parallax. */
  scrollX?: [number, number, number, number];
  /**
   * Vertical travel at each scroll stop, as a fraction of the container's
   * total height (not raw px) - so blobs still reach the footer stage
   * whether the page is a short desktop layout or a much taller stacked
   * mobile one, instead of being left behind partway down a long page.
   */
  scrollYFraction?: [number, number, number, number];
  /** Scale multiplier at each scroll stop, multiplied with any pointer-reactive scale. */
  scrollScale?: [number, number, number, number];
};

// Positions are fixed px from the top of the shared scene container (not %),
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
    scrollOpacity: [0.72, 0.48, 0.55, 0.68],
    scrollX: [0, -30, -15, 0],
    scrollYFraction: [0, 0.17, 0.46, 0.76],
    scrollScale: [1, 0.92, 0.96, 1],
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
    // Explicitly pushed further toward the edge as the visitor scrolls into "selected work".
    scrollOpacity: [0.66, 0.32, 0.28, 0.5],
    scrollX: [0, 90, 70, 20],
    scrollYFraction: [0, 0.15, 0.43, 0.74],
    scrollScale: [1, 0.88, 0.85, 0.95],
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
    scrollOpacity: [0.78, 0.85, 0.62, 0.7],
    scrollX: [0, -20, -40, -10],
    scrollYFraction: [0, 0.115, 0.3, 0.5],
    scrollScale: [1, 1.05, 0.98, 1],
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
    // Lavender becomes the dominant field through "selected work", as requested.
    scrollOpacity: [0.32, 0.7, 0.58, 0.42],
    scrollX: [0, 40, 20, 0],
    scrollYFraction: [0, 0.083, 0.23, 0.4],
    scrollScale: [1, 1.08, 1, 0.96],
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
    // More peach as the scene moves into the "about" stage.
    scrollOpacity: [0.54, 0.38, 0.64, 0.5],
    scrollX: [0, 20, -20, 0],
    scrollYFraction: [0, 0.14, 0.36, 0.63],
    scrollScale: [1, 0.94, 1.06, 1],
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
    scrollOpacity: [0.48, 0.28, 0.22, 0.38],
    scrollX: [0, 15, 25, 10],
    scrollYFraction: [0, 0.13, 0.38, 0.66],
    scrollScale: [1, 0.9, 0.85, 0.95],
  },
];

export default function InteractiveGradientBackground({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [containerHeight, setContainerHeight] = useState(0);
  const [allowPointer, setAllowPointer] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );
  const prefersReducedMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  // Progress across the whole scene (hero -> selected work -> about -> footer), not raw scroll position.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

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
  }, [containerRef]);

  // Measure the scene's own height so scroll-driven vertical travel can be
  // expressed as a fraction of it - keeps blobs reaching the footer stage
  // whether the page is short (desktop) or much taller (stacked mobile cards).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setContainerHeight(el.scrollHeight);
    update();
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, [containerRef]);

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
  }, [allowPointer, prefersReducedMotion, isVisible, pointerX, pointerY, containerRef]);

  const paused = !isVisible || Boolean(prefersReducedMotion);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {BLOBS.map((blob, i) => (
        <BlobLayer
          key={i}
          blob={blob}
          pointerX={pointerX}
          pointerY={pointerY}
          scrollYProgress={scrollYProgress}
          containerHeight={containerHeight}
          paused={paused}
        />
      ))}
    </div>
  );
}

function BlobLayer({
  blob,
  pointerX,
  pointerY,
  scrollYProgress,
  containerHeight,
  paused,
}: {
  blob: BlobConfig;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
  containerHeight: number;
  paused: boolean;
}) {
  const springX = useSpring(pointerX, { stiffness: blob.stiffness, damping: blob.damping });
  const springY = useSpring(pointerY, { stiffness: blob.stiffness, damping: blob.damping });

  const scrollX = useTransform(scrollYProgress, SCROLL_STOPS, blob.scrollX ?? [0, 0, 0, 0]);
  const scrollYFraction = useTransform(scrollYProgress, SCROLL_STOPS, blob.scrollYFraction ?? [0, 0, 0, 0]);
  const scrollY = useTransform(scrollYFraction, (f) => f * containerHeight);
  const scrollScale = useTransform(scrollYProgress, SCROLL_STOPS, blob.scrollScale ?? [1, 1, 1, 1]);
  const scrollOpacity = useTransform(
    scrollYProgress,
    SCROLL_STOPS,
    blob.scrollOpacity ?? [blob.opacity, blob.opacity, blob.opacity, blob.opacity]
  );

  // Pointer parallax and scroll progress compose additively for position, multiplicatively for scale.
  const x = useTransform([springX, scrollX], ([px, sx]: number[]) => (paused ? 0 : px * blob.depth + sx));
  const y = useTransform([springY, scrollY], ([py, sy]: number[]) => (paused ? 0 : py * blob.depth + sy));
  const pointerScale = useTransform([springX, springY], ([sx, sy]: number[]) =>
    blob.reactiveScale && !paused ? 1 + Math.min(Math.hypot(sx, sy) / 2, 1) * 0.12 : 1
  );
  const scale = useTransform([pointerScale, scrollScale], ([ps, ss]: number[]) => (paused ? 1 : ps * ss));
  const opacity = useTransform(scrollOpacity, (v) => (paused ? blob.opacity : v));

  return (
    <motion.div
      style={{ x, y, scale, opacity, position: "absolute", ...blob.position }}
      className={blob.hideOnMobile ? "hidden sm:block" : undefined}
    >
      <div
        className={`rounded-full ${paused ? "" : blob.driftClass}`}
        style={{
          width: blob.size,
          height: blob.size,
          background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
          filter: `blur(${blob.blur}px)`,
          animationDelay: blob.driftDelay,
        }}
      />
    </motion.div>
  );
}
