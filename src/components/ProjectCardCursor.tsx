"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, type Transition } from "framer-motion";
import type { ReactNode } from "react";

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

// Soft, slightly-lagged follow with no overshoot.
const FOLLOW_SPRING: Transition = { type: "spring", duration: 0.35, bounce: 0 };
const CURSOR_SIZE = 96;

export default function ProjectCardCursor({
  children,
  label = "View project",
}: {
  children: ReactNode;
  label?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const prefersReducedMotion = useReducedMotion();
  const isFinePointer = useFinePointer();
  const enabled = isFinePointer && !prefersReducedMotion;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, FOLLOW_SPRING);
  const springY = useSpring(y, FOLLOW_SPRING);

  useEffect(() => {
    if (!enabled) return;
    const el = containerRef.current;
    if (!el) return;

    const handleMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const handleOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-project-card]")) setActive(true);
    };
    const handleOut = (e: PointerEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related || !related.closest("[data-project-card]")) setActive(false);
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerover", handleOver);
    el.addEventListener("pointerout", handleOut);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerover", handleOver);
      el.removeEventListener("pointerout", handleOut);
    };
  }, [enabled, x, y]);

  return (
    <div ref={containerRef} data-cursor-enabled={enabled || undefined}>
      {children}

      {enabled && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[60] flex items-center justify-center rounded-full bg-black text-center text-sm text-white"
          style={{
            width: CURSOR_SIZE,
            height: CURSOR_SIZE,
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
            fontFamily: "var(--font-manrope)",
            fontWeight: 400,
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.85 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {label}
        </motion.div>
      )}
    </div>
  );
}
