"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { ProjectImage } from "@/lib/projects";
import { mediaProtectionProps } from "@/lib/mediaProtection";

const BORDER_COLOR = "rgb(221, 216, 203)";

/**
 * Swipeable, one-slide-per-view image carousel with dot navigation. Swiping
 * is native CSS scroll-snap (touch momentum scrolling), not a JS drag
 * gesture - simpler and more reliable than reimplementing drag physics, and
 * the active dot is kept in sync via an IntersectionObserver scoped to the
 * scroll track.
 */
export default function MobileImageCarousel({
  images,
  className,
}: {
  images: ProjectImage[];
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b));
        if (!mostVisible.isIntersecting) return;
        const index = slideRefs.current.findIndex((el) => el === mostVisible.target);
        if (index !== -1) setActiveIndex(index);
      },
      { root: track, threshold: [0.5, 0.75, 1] }
    );

    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [images]);

  const scrollToIndex = (index: number) => {
    slideRefs.current[index]?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return (
    <div className={className}>
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-2xl border"
        style={{ borderColor: BORDER_COLOR }}
      >
        {images.map((image, i) => (
          <div
            key={image.src}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="w-full shrink-0 snap-start"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="100vw"
              className="h-auto w-full"
              {...mediaProtectionProps}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            aria-label={`Go to slide ${i + 1} of ${images.length}`}
            aria-current={activeIndex === i ? "true" : undefined}
            onClick={() => scrollToIndex(i)}
            className={`h-2 w-2 rounded-full transition-colors ${
              activeIndex === i ? "bg-ink" : "bg-line"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
