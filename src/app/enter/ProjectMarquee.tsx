"use client";

import { useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { homepageCards, archiveCards } from "@/lib/project-cards";

/** Only cards with a real cover image (skips video-only cards and any still on a placeholder). */
const covers = [...homepageCards, ...archiveCards].flatMap((card) =>
  card.media.kind === "image" ? [{ slug: card.slug, image: card.media.image }] : []
);

const IMAGE_CLASS = "h-full w-auto object-cover";
const TILE_CLASS = "h-[440px] w-auto shrink-0 overflow-hidden sm:h-[600px]";

export default function ProjectMarquee() {
  const prefersReducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);

  if (prefersReducedMotion) {
    return (
      <div className="w-full overflow-x-auto" aria-label="Selected project covers">
        <div className="flex w-max px-6 sm:px-10">
          {covers.map((c) => (
            <div key={c.slug} className={TILE_CLASS}>
              <Image
                src={c.image.src}
                alt={c.image.alt}
                width={c.image.width}
                height={c.image.height}
                sizes="600px"
                className={IMAGE_CLASS}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full overflow-hidden py-2"
      aria-label="Selected project covers"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex w-max animate-marquee"
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        {[0, 1].map((setIndex) =>
          covers.map((c) => (
            <div key={`${setIndex}-${c.slug}`} aria-hidden={setIndex === 1} className={TILE_CLASS}>
              <Image
                src={c.image.src}
                alt={setIndex === 0 ? c.image.alt : ""}
                width={c.image.width}
                height={c.image.height}
                sizes="600px"
                className={IMAGE_CLASS}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
