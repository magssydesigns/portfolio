"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import type { MediaSlot } from "@/lib/projects";
import { mediaProtectionProps } from "@/lib/mediaProtection";

const BORDER_COLOR = "rgb(221, 216, 203)";

/** Mobile-only content-safe zoom tiers (paint-only `transform: scale()`, cropped via `overflow-hidden` on a wrapper with an unchanged aspect ratio, so desktop at `sm:scale-100` is pixel-identical to today). */
const MOBILE_ZOOM_CLASSES: Record<"sm" | "md" | "lg", string> = {
  sm: "scale-[1.09] sm:scale-100",
  md: "scale-[1.15] sm:scale-100",
  lg: "scale-[1.17] sm:scale-100",
};

export default function MediaSlotView({
  media,
  className,
  style,
  bordered = false,
  mobileZoom,
  mobileSrc,
}: {
  media: MediaSlot;
  className?: string;
  style?: CSSProperties;
  /** Adds the same rounded-2xl + light border treatment used by the project hero media (and, for placeholders, a neutral filled background to match). */
  bordered?: boolean;
  /** Content-safe mobile-only zoom tier; crops symmetrically into excess canvas whitespace without affecting desktop/tablet. */
  mobileZoom?: "sm" | "md" | "lg";
  /** Video only: swaps in this source below 768px via a native <source media> query - resolved by the browser, so there's no client/server hydration mismatch the way a JS viewport check would cause. Desktop keeps media.video.src unchanged. */
  mobileSrc?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (media.kind !== "video") return;
    const el = videoRef.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (mq.matches) {
        el.pause();
      } else {
        el.play().catch(() => {});
      }
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [media]);

  // <source media> is only evaluated by the browser when the resource selection
  // algorithm runs (initial load, or an explicit .load() call) - unlike <picture>,
  // it does NOT re-evaluate on a live viewport resize. Re-triggering it here on
  // the same breakpoint crossing keeps the mobile/desktop source in sync when the
  // window is resized rather than freshly loaded at that width.
  useEffect(() => {
    if (media.kind !== "video" || !mobileSrc) return;
    const el = videoRef.current;
    if (!el) return;

    const mq = window.matchMedia("(max-width: 767px)");
    const reload = () => {
      const wasPlaying = !el.paused;
      el.load();
      if (wasPlaying) el.play().catch(() => {});
    };
    mq.addEventListener("change", reload);
    return () => mq.removeEventListener("change", reload);
  }, [media, mobileSrc]);

  if (media.kind === "video") {
    const video = (
      <video
        ref={videoRef}
        src={mobileSrc ? undefined : media.video.src}
        poster={media.video.poster}
        width={media.video.width}
        height={media.video.height}
        loop
        muted
        playsInline
        preload="auto"
        aria-label={media.alt}
        className={
          mobileZoom
            ? ["h-auto w-full", MOBILE_ZOOM_CLASSES[mobileZoom]].join(" ")
            : [className ?? "h-auto w-full", bordered ? "rounded-2xl border" : ""]
                .filter(Boolean)
                .join(" ")
        }
        style={mobileZoom ? undefined : bordered ? { borderColor: BORDER_COLOR, ...style } : style}
        {...mediaProtectionProps}
      >
        {mobileSrc && <source media="(max-width: 767px)" src={mobileSrc} />}
        {mobileSrc && <source src={media.video.src} />}
      </video>
    );

    if (mobileZoom) {
      return (
        <div
          className={[className ?? "h-auto w-full", "overflow-hidden", bordered ? "rounded-2xl border" : ""]
            .filter(Boolean)
            .join(" ")}
          style={bordered ? { borderColor: BORDER_COLOR, ...style } : style}
        >
          {video}
        </div>
      );
    }

    return video;
  }

  if (media.kind === "image") {
    const img = (
      <Image
        src={media.image.src}
        alt={media.image.alt}
        width={media.image.width}
        height={media.image.height}
        sizes="(min-width: 1450px) 1320px, 92vw"
        className={
          mobileZoom
            ? ["h-auto w-full", MOBILE_ZOOM_CLASSES[mobileZoom]].join(" ")
            : [className ?? "h-auto w-full", bordered ? "rounded-2xl border" : ""]
                .filter(Boolean)
                .join(" ")
        }
        style={mobileZoom ? undefined : bordered ? { borderColor: BORDER_COLOR, ...style } : style}
        {...mediaProtectionProps}
      />
    );

    if (mobileZoom) {
      return (
        <div
          className={[className ?? "h-auto w-full", "overflow-hidden", bordered ? "rounded-2xl border" : ""]
            .filter(Boolean)
            .join(" ")}
          style={bordered ? { borderColor: BORDER_COLOR, ...style } : style}
        >
          {img}
        </div>
      );
    }

    return img;
  }

  if (bordered) {
    return (
      <div
        className={`${
          className ??
          "flex min-h-[240px] w-full items-center justify-center px-6 py-16 text-center"
        } rounded-2xl border bg-paper-dim`}
        style={{ borderColor: BORDER_COLOR, ...style }}
      >
        <p className="text-[13px] uppercase tracking-[0.14em] text-muted">{media.label}</p>
      </div>
    );
  }

  return (
    <div
      className={
        className ??
        "flex min-h-[240px] w-full items-center justify-center border border-dashed border-line px-6 py-16 text-center"
      }
    >
      <p className="text-[13px] uppercase tracking-[0.14em] text-muted">{media.label}</p>
    </div>
  );
}
