"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function ProjectCard({
  headline,
  href,
  color,
  visual,
}: {
  headline: string;
  href: string;
  color: string;
  visual: ReactNode;
}) {
  return (
    <Link href={href} className="group block h-full">
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={{ rest: { y: 0 }, hover: { y: -5 } }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex h-full flex-col rounded-2xl bg-white/70 p-6 backdrop-blur-md backdrop-saturate-150 sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="max-w-[85%] font-display text-2xl leading-[1.15] tracking-tight text-ink sm:text-[1.65rem]">
            {headline}
          </h3>
          <motion.span
            variants={{ rest: { x: 0, y: 0 }, hover: { x: 2, y: -2 } }}
            transition={{ duration: 0.3 }}
            className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center text-ink"
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
          className="relative mt-5 flex-1 overflow-hidden rounded-xl"
          style={{ backgroundColor: color }}
        >
          <motion.div
            variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="h-full min-h-[220px] w-full"
          >
            {visual}
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}
