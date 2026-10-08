"use client";

import Link from "next/link";
import { motion, type Transition } from "framer-motion";
import SwirlImage from "./SwirlImage";
import type { MediaSlot } from "@/lib/projects";

const HOVER_BLUE = "#1467FF";
const FRAME_TRANSITION: Transition = { duration: 0.35, ease: [0.16, 1, 0.3, 1] };
const CONTENT_TRANSITION: Transition = { duration: 0.3, ease: "easeOut" };

/**
 * Neither Manrope nor Inter ships a "→" glyph, so the browser falls back to a system font whose
 * arrow has uneven side bearings (it drifts towards the next character). Draw it as an inline SVG
 * instead, with equal margins and centred on the lining figures (e.g. "0 → 1").
 */
function renderHeadline(headline: string) {
  const parts = headline.split(/\s*→\s*/);
  if (parts.length === 1) return headline;
  return parts.flatMap((part, i) =>
    i === 0
      ? [part]
      : [
          <span key={i} className="mx-[0.28em] inline-block" style={{ verticalAlign: "0.1em" }}>
            <svg viewBox="0 0 18 10" fill="none" aria-hidden className="block h-[0.5em] w-[0.9em]">
              <path d="M1 5H17M12.5 0.75L17 5L12.5 9.25" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="sr-only"> to </span>
          </span>,
          part,
        ],
  );
}

const MotionLink = motion.create(Link);

export default function ProjectCard({
  headline,
  href,
  media,
  mediaBackground,
  badge,
}: {
  headline: string;
  href: string;
  media: MediaSlot;
  /** Overrides the media container's default bg-paper-dim background. */
  mediaBackground?: string;
  /** Optional small chip rendered above the headline. */
  badge?: string;
}) {
  // "Primary · secondary": on narrow cards only the primary part is shown, so the chip never wraps or truncates.
  const [badgePrimary, ...badgeRest] = badge ? badge.split(" · ") : [];
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
        {badge && (
          <div className="@container mb-3">
            <motion.span
              variants={{
                rest: { color: "#2E7D32", borderColor: "rgba(46,125,50,0.35)", backgroundColor: "rgba(46,125,50,0.06)" },
                hover: { color: "#ffffff", borderColor: "rgba(255,255,255,0.5)", backgroundColor: "rgba(255,255,255,0.1)" },
              }}
              transition={CONTENT_TRANSITION}
              className="flex w-fit max-w-full items-center whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] leading-[1.3]"
            >
              <span className="truncate">
                {badgePrimary}
                {badgeRest.length > 0 && <span className="@max-[272px]:hidden">{` · ${badgeRest.join(" · ")}`}</span>}
              </span>
            </motion.span>
          </div>
        )}
        <div className="flex items-start justify-between gap-4">
          <motion.h3
            variants={{ rest: { color: "#000000" }, hover: { color: "#ffffff" } }}
            transition={CONTENT_TRANSITION}
            className="max-w-[85%] text-2xl leading-[1.2] tracking-tight sm:text-3xl sm:leading-[1.15]"
            style={{ fontFamily: "var(--font-manrope)", fontWeight: 400 }}
          >
            {renderHeadline(headline)}
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

        <div
          className="relative mt-8 flex-1 overflow-hidden rounded-2xl bg-paper-dim"
          style={mediaBackground ? { backgroundColor: mediaBackground } : undefined}
        >
          <SwirlImage media={media} className="h-full min-h-[220px] w-full" />
        </div>
      </div>
    </MotionLink>
  );
}
