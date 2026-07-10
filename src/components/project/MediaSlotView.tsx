"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { MediaSlot } from "@/lib/projects";

export default function MediaSlotView({
  media,
  className,
}: {
  media: MediaSlot;
  className?: string;
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
        className={className ?? "h-auto w-full"}
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
        className={className ?? "h-auto w-full"}
      />
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
