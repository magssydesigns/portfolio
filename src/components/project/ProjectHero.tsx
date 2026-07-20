"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import type { ProjectHeroImage, ProjectVideo } from "@/lib/projects";
import HeroPrototypeEmbed from "./HeroPrototypeEmbed";

function HeroImageView({
  image,
  className,
  style,
}: {
  image: ProjectHeroImage;
  className?: string;
  style?: CSSProperties;
}) {
  if ("kind" in image) {
    if (image.kind === "embed") {
      return <HeroPrototypeEmbed src={image.src} title={image.title} />;
    }
    return (
      <div
        className={
          className
            ? `${className} aspect-[3/4] flex items-center justify-center border border-dashed border-line bg-paper-dim px-6 text-center`
            : "flex min-h-[240px] w-full items-center justify-center border border-dashed border-line bg-paper-dim px-6 py-16 text-center"
        }
        style={style}
      >
        <p className="text-[13px] uppercase tracking-[0.14em] text-muted">{image.label}</p>
      </div>
    );
  }
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      priority
      className={className}
      style={style}
    />
  );
}

export default function ProjectHero({
  title,
  tagline,
  client,
  color,
  image,
  video,
  stacked,
  markets,
  flushBottom,
  imageMaxWidth,
}: {
  title: string;
  tagline: string;
  client: string;
  color: string;
  /** Omit for a text-only hero (e.g. when the hero media is shown elsewhere on the page). */
  image?: ProjectHeroImage;
  video?: ProjectVideo;
  /** Renders the image centered above the title/tagline (like a video hero) instead of side-by-side. */
  stacked?: boolean;
  /** Optional "Markets" caption + flag row shown under the tagline. */
  markets?: { label: string; flags: { emoji: string; name: string }[] };
  /** Drops the hero's bottom padding so a divider directly below can own the full gap (32px rhythm). */
  flushBottom?: boolean;
  /** Overrides the stacked hero image's max-width in px (default 614.797, the site's standard stacked-hero size). */
  imageMaxWidth?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const textBlockPadding = flushBottom
    ? "px-6 pb-0 pt-10 sm:px-10 sm:pt-12"
    : "px-6 pb-8 pt-10 sm:px-10 sm:pb-12 sm:pt-12";

  useEffect(() => {
    if (!video) return;
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
  }, [video]);

  if (video) {
    return (
      <section className="pt-32 sm:pt-40" style={{ backgroundColor: color }}>
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <video
            ref={videoRef}
            src={video.src}
            poster={video.poster}
            width={video.width}
            height={video.height}
            loop
            muted
            playsInline
            preload="auto"
            aria-label={
              image ? ("kind" in image ? (image.kind === "embed" ? image.title : image.label) : image.alt) : undefined
            }
            className="mx-auto block h-auto w-full max-w-[60%] rounded-2xl border"
            style={{ borderColor: "rgb(221, 216, 203)" }}
          />
        </div>

        <div className={`mx-auto max-w-[1400px] ${textBlockPadding}`}>
          <div className="mx-auto max-w-2xl">
            <p className="text-[13px] uppercase tracking-[0.14em] text-ink/60">{client}</p>
            <h1 className="mt-6 font-display text-4xl leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-[3.4rem] lg:leading-[1.05]">
              {title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">{tagline}</p>
            {markets && (
              <div
                className="mt-6 flex items-center gap-3"
                aria-label={`${markets.label}: ${markets.flags.map((f) => f.name).join(", ")}`}
              >
                <span className="text-[13px] uppercase tracking-[0.14em] text-ink/60">
                  {markets.label}
                </span>
                <span className="flex items-center gap-2 text-xl leading-none" aria-hidden="true">
                  {markets.flags.map((f) => (
                    <span key={f.name}>{f.emoji}</span>
                  ))}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (stacked) {
    return (
      <section className="pt-32 sm:pt-40" style={{ backgroundColor: color }}>
        {image && (
          <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
            <HeroImageView
              image={image}
              className="mx-auto block h-auto w-full max-w-[614.797px] rounded-2xl border"
              style={{
                borderColor: "rgb(221, 216, 203)",
                ...(imageMaxWidth !== undefined ? { maxWidth: imageMaxWidth } : {}),
              }}
            />
          </div>
        )}

        <div className={`mx-auto max-w-[1400px] ${textBlockPadding}`}>
          <div className="mx-auto max-w-2xl">
            <p className="text-[13px] uppercase tracking-[0.14em] text-ink/60">{client}</p>
            <h1 className="mt-6 font-display text-4xl leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-[3.4rem] lg:leading-[1.05]">
              {title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink/70">{tagline}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 sm:pt-40" style={{ backgroundColor: color }}>
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 px-6 pb-16 sm:px-10 sm:pb-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
          <p className="text-[13px] uppercase tracking-[0.14em] text-ink/60">{client}</p>
          <h1 className="mt-6 max-w-xl font-display text-4xl leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-[3.4rem] lg:leading-[1.05]">
            {title}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/70">{tagline}</p>
        </div>
        {image && (
          <div className="flex justify-center lg:justify-end">
            <HeroImageView image={image} className="h-auto w-[240px] rounded-2xl sm:w-[300px]" />
          </div>
        )}
      </div>
    </section>
  );
}
