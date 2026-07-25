"use client";

import { Fragment, useEffect, useState } from "react";
import type { TocEntry } from "@/lib/projects";

export default function CaseStudyToc({ toc }: { toc: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = toc
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        setActiveId(topmost.target.id);
      },
      { rootMargin: "-140px 0px -65% 0px", threshold: [0, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [toc]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    window.history.pushState(null, "", `#${id}`);
  };

  const linkClasses = (id: string, base: string) =>
    `${base} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
      activeId === id ? "border-ink text-ink" : "border-line text-muted hover:text-ink-soft"
    }`;

  return (
    <Fragment>
      {/*
        This is its own top-level <nav> (not a div nested inside a wrapping
        nav) so it's a direct child of the grid container in
        FullCaseStudyReveal, which is naturally as tall as the whole case
        study on mobile too (it also contains CaseStudyBlocks, stacked
        below). A `position: sticky` element can never stay stuck past the
        bottom of its own parent's box - when this was a div nested inside a
        shared wrapping <nav> whose own box only wrapped the toc bar itself
        (auto-height, ~90px), the sticky bar ran out of room to stick almost
        immediately and scrolled away with the rest of the page.

        overflow-x-auto (for the horizontal scroll) lives on the inner div,
        not this sticky nav itself - Safari/iOS has a long-standing bug
        where `position: sticky` stops sticking once the element also sets
        non-visible overflow on itself.

        The desktop nav below is a separate sibling landmark (rather than
        one nav housing both variants) so each is a direct grid child too;
        only one is ever in the accessibility tree at a time since the
        other has `display: none` at that breakpoint.
      */}
      <nav
        aria-label="Full case study sections"
        className="sticky top-[94px] z-10 mb-2 border-b border-line bg-paper lg:hidden"
      >
        <div className="no-scrollbar -mx-6 flex gap-6 overflow-x-auto px-6 py-4 sm:-mx-10 sm:px-10">
          {toc.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              aria-current={activeId === item.id ? "true" : undefined}
              className={linkClasses(
                item.id,
                "link-underline whitespace-nowrap border-b-2 pb-1 text-[13px] uppercase tracking-[0.1em] transition-colors"
              )}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <nav aria-label="Full case study sections" className="hidden lg:block">
        <ul className="sticky top-28 space-y-3">
          {toc.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                aria-current={activeId === item.id ? "true" : undefined}
                className={linkClasses(
                  item.id,
                  "block border-l pl-4 text-[13px] leading-relaxed transition-colors"
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </Fragment>
  );
}
