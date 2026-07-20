"use client";

import { useState } from "react";

/**
 * Full-width interactive prototype embed for a project hero, reusing the
 * same border/corner-radius/background treatment as the standard stacked
 * hero image, but at the larger app-sized height a prototype needs to be
 * usable rather than the narrow phone-mockup width.
 */
export default function HeroPrototypeEmbed({ src, title }: { src: string; title: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div>
      <div
        className="mx-auto w-[70%] overflow-hidden rounded-2xl border bg-paper-dim"
        style={{ borderColor: "rgb(221, 216, 203)" }}
      >
        <div className="h-[55vh] min-h-[300px] w-full sm:h-[490px] lg:h-[574px] lg:min-h-[490px]">
          {failed ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-6 text-center">
              <p className="font-display text-2xl tracking-tight text-ink">Interactive prototype</p>
              <p className="max-w-md text-[15px] leading-relaxed text-ink-soft">
                Explore the early Kashtkaar concept, including the Farm hub, crop planning and
                activity-recording journeys.
              </p>
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline font-display text-lg text-ink"
              >
                Open prototype ↗
              </a>
            </div>
          ) : (
            <iframe
              src={src}
              title={title}
              loading="eager"
              allow="fullscreen"
              className="h-full w-full"
              onError={() => setFailed(true)}
            />
          )}
        </div>
      </div>

      <p className="mt-4 text-center">
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline font-display text-xl text-ink"
        >
          Open prototype in a new tab ↗
        </a>
      </p>
    </div>
  );
}
