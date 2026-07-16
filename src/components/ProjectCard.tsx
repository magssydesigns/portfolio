"use client";

import Link from "next/link";
import { motion, type Transition } from "framer-motion";
import SwirlImage from "./SwirlImage";
import type { MediaSlot } from "@/lib/projects";

const HOVER_BLUE = "#1467FF";
const FRAME_TRANSITION: Transition = { duration: 0.35, ease: [0.16, 1, 0.3, 1] };
const CONTENT_TRANSITION: Transition = { duration: 0.3, ease: "easeOut" };

const MotionLink = motion.create(Link);

export default function ProjectCard({
  headline,
  href,
  media,
}: {
  headline: string;
  href: string;
  media: MediaSlot;
}) {
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
          <SwirlImage media={media} className="h-full min-h-[220px] w-full" />
        </div>
      </div>
    </MotionLink>
  );
}
