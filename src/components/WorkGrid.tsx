"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import WorkCard from "./WorkCard";
import { categories, type CaseStudy, type Category } from "@/lib/case-studies";

export default function WorkGrid({ studies }: { studies: CaseStudy[] }) {
  const [filter, setFilter] = useState<Category | "All">("All");

  const filtered = studies.filter(
    (s) => filter === "All" || s.categories.includes(filter)
  );

  return (
    <div>
      <div className="mt-16 flex flex-wrap gap-3 border-t border-line pt-8">
        {(["All", ...categories] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={clsx(
              "rounded-full border px-4 py-2 text-[13px] uppercase tracking-[0.1em] transition-colors",
              filter === cat
                ? "border-ink bg-ink text-paper"
                : "border-ink/15 text-ink-soft hover:border-ink/40"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((study) => (
            <motion.div
              key={study.slug}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <WorkCard study={study} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-14 text-ink-soft">No projects in this category yet.</p>
      )}
    </div>
  );
}
