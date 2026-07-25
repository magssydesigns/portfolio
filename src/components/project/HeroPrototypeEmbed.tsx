"use client";

import { useEffect, useRef, useState } from "react";

const BORDER_COLOR = "rgb(221, 216, 203)";

/**
 * Shows the prototype "zoomed out" so the whole screen fits in the preview
 * without needing to scroll inside the frame: the iframe is laid out at
 * 1/PROTOTYPE_ZOOM of the visible box, then scaled back down to exactly fill
 * it, so the embedded site renders against a larger perceived viewport.
 */
const PROTOTYPE_ZOOM = 0.7;

/**
 * The prototype's own layout is fixed-width (phone-frame sized). On mobile
 * the visible box is narrower than that, so instead of letting the extra
 * width get clipped by the wrapper's overflow-hidden, the iframe is laid out
 * at its native MOBILE_VIEWPORT_WIDTH and scaled down to whatever the
 * wrapper actually measures - same trick as PROTOTYPE_ZOOM above, but the
 * scale is measured per-device instead of a fixed constant, since the
 * available width varies a lot more across phones (320-430px) than it does
 * across the desktop/tablet sizes the fixed zoom was tuned for.
 */
const MOBILE_VIEWPORT_WIDTH = 390;
const MOBILE_ASPECT_RATIO = 9 / 19.5;
const MOBILE_VIEWPORT_HEIGHT = MOBILE_VIEWPORT_WIDTH / MOBILE_ASPECT_RATIO;

function PrototypeFallback({ src }: { src: string }) {
  return (
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
  );
}

/**
 * Full-width interactive prototype embed for a project hero, reusing the
 * same border/corner-radius/background treatment as the standard stacked
 * hero image, but at the larger app-sized height a prototype needs to be
 * usable rather than the narrow phone-mockup width.
 */
export default function HeroPrototypeEmbed({ src, title }: { src: string; title: string }) {
  const [failed, setFailed] = useState(false);
  const [mobileScale, setMobileScale] = useState(1);
  const mobileWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mobileWrapperRef.current;
    if (!el) return;

    const updateScale = () => setMobileScale(el.clientWidth / MOBILE_VIEWPORT_WIDTH);
    updateScale();

    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Mobile (<sm): full-width wrapper with portrait phone proportions.
          The prototype's fixed-width layout is rendered at its native
          MOBILE_VIEWPORT_WIDTH, then scaled down to fit whatever width the
          wrapper actually measures, so nothing gets cropped. */}
      <div className="sm:hidden">
        <div
          ref={mobileWrapperRef}
          className="mx-auto w-full overflow-hidden rounded-2xl border bg-paper-dim"
          style={{ borderColor: BORDER_COLOR, aspectRatio: `${MOBILE_ASPECT_RATIO}` }}
        >
          {failed ? (
            <PrototypeFallback src={src} />
          ) : (
            <iframe
              src={src}
              title={title}
              loading="eager"
              allow="fullscreen"
              style={{
                width: MOBILE_VIEWPORT_WIDTH,
                height: MOBILE_VIEWPORT_HEIGHT,
                border: "none",
                transform: `scale(${mobileScale})`,
                transformOrigin: "top left",
              }}
              onError={() => setFailed(true)}
            />
          )}
        </div>
      </div>

      {/* Desktop/tablet (sm+): unchanged fixed-height presentation. */}
      <div className="hidden sm:block">
        <div
          className="mx-auto w-[70%] overflow-hidden rounded-2xl border bg-paper-dim"
          style={{ borderColor: BORDER_COLOR }}
        >
          <div className="h-[490px] w-full lg:h-[574px]">
            {failed ? (
              <PrototypeFallback src={src} />
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
      </div>

      <div className="mx-auto w-full sm:w-[70%]">
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
