"use client";

import { useEffect, useState } from "react";
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
    <nav aria-label="Full case study sections">
      <div className="no-scrollbar sticky top-[68px] z-10 -mx-6 mb-2 flex gap-6 overflow-x-auto border-b border-line bg-paper px-6 py-4 sm:-mx-10 sm:px-10 lg:hidden">
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

      <ul className="sticky top-28 hidden space-y-3 lg:block">
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
  );
}
