"use client";

import { useCallback, useEffect, useState } from "react";
import QuickRead from "@/components/project/QuickRead";
import CaseStudyBlocks from "@/components/project/CaseStudyBlocks";
import CaseStudyToc from "@/components/project/CaseStudyToc";
import type { Block, QuickRead as QuickReadType, TocEntry } from "@/lib/projects";

const HASH = "#full-case-study";

export default function FullCaseStudyReveal({
  quickRead,
  color,
  blocks,
  toc,
}: {
  quickRead: QuickReadType;
  color: string;
  blocks: Block[];
  toc: TocEntry[];
}) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const syncFromHash = () => {
      if (window.location.hash === HASH) setRevealed(true);
      else setRevealed(false);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener("popstate", syncFromHash);
    return () => {
      window.removeEventListener("hashchange", syncFromHash);
      window.removeEventListener("popstate", syncFromHash);
    };
  }, []);

  const scrollToFullCaseStudy = useCallback(() => {
    const el = document.getElementById("full-case-study");
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }, []);

  const handleContinue = useCallback(() => {
    setRevealed(true);
    window.history.pushState(null, "", HASH);
    requestAnimationFrame(() => requestAnimationFrame(scrollToFullCaseStudy));
  }, [scrollToFullCaseStudy]);

  return (
    <>
      <QuickRead data={quickRead} color={color} onContinue={handleContinue} headingStyle="heading" />

      {revealed && (
        <div id="full-case-study" className="scroll-mt-28 border-t border-line">
          <div className="mx-auto max-w-[1400px] px-6 pt-16 sm:px-10">
            <p className="text-[13px] uppercase tracking-[0.14em] text-muted">Full case study</p>
          </div>

          <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
            <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-16">
              <CaseStudyToc toc={toc} />
              <CaseStudyBlocks blocks={blocks} color={color} layout="toc" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
