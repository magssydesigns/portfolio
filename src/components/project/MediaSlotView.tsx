"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import type { MediaSlot } from "@/lib/projects";

const BORDER_COLOR = "rgb(221, 216, 203)";

export default function MediaSlotView({
  media,
  className,
  style,
  bordered = false,
}: {
  media: MediaSlot;
  className?: string;
  style?: CSSProperties;
  /** Adds the same rounded-2xl + light border treatment used by the project hero media (and, for placeholders, a neutral filled background to match). */
  bordered?: boolean;
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

  if (media.kind === "video") {
    return (
      <video
        ref={videoRef}
        src={media.video.src}
        poster={media.video.poster}
        width={media.video.width}
        height={media.video.height}
        loop
        muted
        playsInline
        preload="auto"
        aria-label={media.alt}
        className={[className ?? "h-auto w-full", bordered ? "rounded-2xl border" : ""]
          .filter(Boolean)
          .join(" ")}
        style={bordered ? { borderColor: BORDER_COLOR, ...style } : style}
      />
    );
  }

  if (media.kind === "image") {
    return (
      <Image
        src={media.image.src}
        alt={media.image.alt}
        width={media.image.width}
        height={media.image.height}
        className={[className ?? "h-auto w-full", bordered ? "rounded-2xl border" : ""]
          .filter(Boolean)
          .join(" ")}
        style={bordered ? { borderColor: BORDER_COLOR, ...style } : style}
      />
    );
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
