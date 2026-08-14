"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import MediaSlotView from "./MediaSlotView";
import type { MediaSlot } from "@/lib/projects";

/** Wraps MediaSlotView with a tap-to-enlarge lightbox - the thumbnail stays exactly as sized by `className`, the lightbox shows the same media scaled to fit the viewport. */
export default function EnlargeableMedia({
  media,
  className,
  style,
  bordered,
}: {
  media: MediaSlot;
  className?: string;
  style?: CSSProperties;
  bordered?: boolean;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full cursor-zoom-in"
        aria-label="Enlarge image"
      >
        <MediaSlotView media={media} className={className} style={style} bordered={bordered} />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/90 p-6 sm:p-10"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M1 1L15 15M15 1L1 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <MediaSlotView
            media={media}
            className="h-auto max-h-[90vh] w-auto max-w-[92vw] rounded-xl object-contain"
          />
        </div>
      )}
    </>
  );
}
