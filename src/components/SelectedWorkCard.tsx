"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Cover from "./Cover";

export default function SelectedWorkCard({
  index,
  title,
  tag,
  summary,
  cover,
  href = "/work",
}: {
  index: string;
  title: string;
  tag: string;
  summary: string;
  cover: { from: string; to: string };
  href?: string;
}) {
  return (
    <Link href={href} className="group block">
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="overflow-hidden rounded-sm"
      >
        <motion.div
          variants={{ rest: { scale: 1 }, hover: { scale: 1.03 } }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Cover from={cover.from} to={cover.to} index={index} title={title} />
        </motion.div>
      </motion.div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl tracking-tight text-ink transition-colors group-hover:text-accent">
            {title}
          </h3>
          <p className="mt-1 max-w-xs text-sm leading-relaxed text-ink-soft">{summary}</p>
        </div>
        <span className="shrink-0 pt-1 text-[11px] uppercase tracking-[0.1em] text-muted">
          {tag}
        </span>
      </div>
    </Link>
  );
}
