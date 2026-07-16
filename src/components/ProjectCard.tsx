"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
  type Transition,
} from "framer-motion";
import { useId, useRef, useSyncExternalStore } from "react";
import type { PointerEvent, ReactNode } from "react";

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

const HOVER_BLUE = "#1467FF";
const FRAME_TRANSITION: Transition = { duration: 0.35, ease: [0.16, 1, 0.3, 1] };
const CONTENT_TRANSITION: Transition = { duration: 0.3, ease: "easeOut" };
const WARP_SPRING: Transition = { type: "spring", duration: 0.35, bounce: 0 };
const TILT_SPRING: Transition = { type: "spring", duration: 0.4, bounce: 0 };

const MotionLink = motion.create(Link);

export default function ProjectCard({
  headline,
  href,
  visual,
}: {
  headline: string;
  href: string;
  visual: ReactNode;
}) {
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const filterId = `card-warp-${rawId}`;
  const mediaWrapRef = useRef<HTMLDivElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const isFinePointer = useFinePointer();
  const warpEnabled = isFinePointer && !prefersReducedMotion;

  const warpScale = useMotionValue(0);
  const springWarpScale = useSpring(warpScale, WARP_SPRING);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, TILT_SPRING);
  const springTiltY = useSpring(tiltY, TILT_SPRING);

  useMotionValueEvent(springWarpScale, "change", (v) => {
    displacementRef.current?.setAttribute("scale", String(v));
  });

  const handleMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (!warpEnabled) return;
    const el = mediaWrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    tiltX.set(nx * 5);
    tiltY.set(ny * 5);
  };

  const handleEnter = () => {
    if (warpEnabled) warpScale.set(7);
  };

  const handleLeave = () => {
    warpScale.set(0);
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <MotionLink
      href={href}
      data-project-card
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      animate="rest"
      variants={{
        rest: { y: 0, backgroundColor: "#ffffff" },
        hover: { y: -5, backgroundColor: HOVER_BLUE },
      }}
      transition={FRAME_TRANSITION}
      onPointerMove={handleMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      className="block h-full rounded-[28px] p-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1467FF] sm:p-8"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <motion.h3
            variants={{ rest: { color: "#000000" }, hover: { color: "#ffffff" } }}
            transition={CONTENT_TRANSITION}
            className="max-w-[85%] text-[1.75rem] leading-[1.15] tracking-tight sm:text-3xl"
            style={{ fontFamily: "var(--font-manrope)", fontWeight: 400 }}
          >
            {headline}
          </motion.h3>
          <motion.span
            variants={{ rest: { x: 0, y: 0, color: "#000000" }, hover: { x: 2, y: -2, color: "#ffffff" } }}
            transition={CONTENT_TRANSITION}
            className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center"
          >
            <svg width="17" height="17" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M4 12L12 4M12 4H5M12 4V11"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.span>
        </div>

        <div className="relative mt-8 flex-1 overflow-hidden rounded-2xl bg-paper-dim">
          <motion.div
            ref={mediaWrapRef}
            style={{
              filter: warpEnabled ? `url(#${filterId})` : undefined,
              x: springTiltX,
              y: springTiltY,
            }}
            className="h-full min-h-[220px] w-full"
          >
            {visual}
          </motion.div>

          {warpEnabled && (
            <svg aria-hidden focusable="false" className="absolute h-0 w-0 overflow-hidden">
              <defs>
                <filter
                  id={filterId}
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                  colorInterpolationFilters="sRGB"
                >
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.008 0.012"
                    numOctaves={2}
                    seed={4}
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
          )}
        </div>
      </div>
    </MotionLink>
  );
}
