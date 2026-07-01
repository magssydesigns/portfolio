"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Cover from "./Cover";
import type { CaseStudy } from "@/lib/case-studies";

export default function WorkCard({ study }: { study: CaseStudy }) {
  return (
    <Link href={`/work/${study.slug}`} className="group block">
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
          <Cover from={study.cover.from} to={study.cover.to} index={study.index} title={study.title} />
        </motion.div>
      </motion.div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl tracking-tight text-ink group-hover:text-accent transition-colors">
            {study.title}
          </h3>
          <p className="mt-1 text-sm text-ink-soft">{study.client}</p>
        </div>
        <div className="flex shrink-0 flex-wrap justify-end gap-2 pt-1">
          {study.categories.map((c) => (
            <span
              key={c}
              className="text-[11px] uppercase tracking-[0.1em] text-muted"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
