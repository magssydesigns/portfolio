"use client";

import { useState } from "react";

/**
 * Shows the prototype "zoomed out" so the whole screen fits in the preview
 * without needing to scroll inside the frame: the iframe is laid out at
 * 1/PROTOTYPE_ZOOM of the visible box, then scaled back down to exactly fill
 * it, so the embedded site renders against a larger perceived viewport.
 */
const PROTOTYPE_ZOOM = 0.7;

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
              scrolling="no"
              style={{
                width: `${100 / PROTOTYPE_ZOOM}%`,
                height: `${100 / PROTOTYPE_ZOOM}%`,
                border: "none",
                transform: `scale(${PROTOTYPE_ZOOM})`,
                transformOrigin: "top left",
              }}
              onError={() => setFailed(true)}
            />
          )}
        </div>
      </div>

      <div className="mx-auto w-[70%]">
        <p className="mt-3 text-left text-[13px] text-muted">This is an unbranded prototype</p>
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
