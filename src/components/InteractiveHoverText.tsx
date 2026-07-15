"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from "framer-motion";

const FINE_POINTER_QUERY = "(pointer: fine)";

function subscribeFinePointer(callback: () => void) {
  const mq = window.matchMedia(FINE_POINTER_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function useFinePointer() {
  return useSyncExternalStore(
    subscribeFinePointer,
    () => window.matchMedia(FINE_POINTER_QUERY).matches,
    () => false
  );
}

const CHAR_SPRING = { type: "spring" as const, duration: 0.3, bounce: 0 };

export default function InteractiveHoverText({
  children,
  className,
  radius = 64,
  maxOffset = 5,
}: {
  children: string;
  className?: string;
  /** Distance in px within which nearby characters react (~50-80 recommended). */
  radius?: number;
  /** Peak character displacement in px (~2-6 recommended). */
  maxOffset?: number;
}) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const pointerX = useMotionValue(-9999);
  const pointerY = useMotionValue(-9999);

  const prefersReducedMotion = useReducedMotion();
  const isFinePointer = useFinePointer();
  const enabled = isFinePointer && !prefersReducedMotion;

  useEffect(() => {
    if (!enabled) return;
    const el = containerRef.current;
    if (!el) return;

    const handleMove = (e: PointerEvent) => {
      pointerX.set(e.clientX);
      pointerY.set(e.clientY);
    };
    const handleLeave = () => {
      pointerX.set(-9999);
      pointerY.set(-9999);
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, [enabled, pointerX, pointerY]);

  if (!enabled) {
    return (
      <h1 ref={containerRef} className={className}>
        {children}
      </h1>
    );
  }

  const characters = Array.from(children);

  return (
    <h1 ref={containerRef} className={className} aria-label={children}>
      <span aria-hidden="true">
        {characters.map((char, i) =>
          char === " " ? (
            " "
          ) : (
            <Char key={i} char={char} pointerX={pointerX} pointerY={pointerY} radius={radius} maxOffset={maxOffset} />
          )
        )}
      </span>
    </h1>
  );
}

function Char({
  char,
  pointerX,
  pointerY,
  radius,
  maxOffset,
}: {
  char: string;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  radius: number;
  maxOffset: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, CHAR_SPRING);
  const y = useSpring(0, CHAR_SPRING);

  // Measured fresh on every pointer event (not cached) and corrected for whatever
  // offset is currently applied, so it self-heals from any layout shift (webfont
  // swap, entrance transition, resize) instead of drifting from a stale snapshot.
  const respond = () => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const restX = rect.left + rect.width / 2 - x.get();
    const restY = rect.top + rect.height / 2 - y.get();

    const px = pointerX.get();
    const py = pointerY.get();
    const dx = restX - px;
    const dy = restY - py;
    const dist = Math.hypot(dx, dy);

    if (dist < radius && dist > 0.01) {
      const falloff = 1 - dist / radius;
      x.set((dx / dist) * falloff * maxOffset);
      y.set((dy / dist) * falloff * maxOffset);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  useMotionValueEvent(pointerX, "change", respond);
  useMotionValueEvent(pointerY, "change", respond);

  return (
    <motion.span ref={ref} style={{ display: "inline-block", x, y }}>
      {char}
    </motion.span>
  );
}
