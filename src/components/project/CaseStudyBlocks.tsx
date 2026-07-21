import Image from "next/image";
import Reveal from "@/components/Reveal";
import BeforeAfterStats from "@/components/project/BeforeAfterStats";
import MediaSlotView from "@/components/project/MediaSlotView";
import ProjectCardCursor from "@/components/ProjectCardCursor";
import { mediaProtectionProps } from "@/lib/mediaProtection";
import type { Block } from "@/lib/projects";

export default function CaseStudyBlocks({
  blocks,
  color,
  layout = "full",
}: {
  blocks: Block[];
  color: string;
  /** "toc" renders blocks inside an already-constrained content column (used by the sticky-TOC layout). */
  layout?: "full" | "toc";
}) {
  return (
    <div>
      {blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} color={color} layout={layout} />
      ))}
    </div>
  );
}

function BlockRenderer({
  block,
  color,
  layout,
}: {
  block: Block;
  color: string;
  layout: "full" | "toc";
}) {
  switch (block.kind) {
    case "lead": {
      const leadColsClass = block.items.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2";
      return (
        <Reveal>
          <div
            id={block.id}
            className={
              block.spacing === "tight"
                ? "scroll-mt-40 lg:scroll-mt-28"
                : "mx-auto max-w-[1400px] scroll-mt-28 px-6 py-16 sm:px-10 sm:py-20"
            }
          >
            <div className={`grid grid-cols-1 gap-10 sm:gap-16 ${leadColsClass}`}>
              {block.items.map((item) => (
                <div key={item.label}>
                  <p className="text-[13px] uppercase tracking-[0.14em] text-muted">{item.label}</p>
                  <p className="mt-4 text-lg leading-relaxed text-ink-soft">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      );
    }

    case "twoCol":
      return (
        <Reveal>
          <div
            id={block.id}
            className={
              block.spacing === "tight"
                ? "scroll-mt-40 lg:scroll-mt-28"
                : "mx-auto max-w-[1400px] scroll-mt-28 px-6 py-16 sm:px-10 sm:py-20"
            }
          >
            {block.heading && (
              <h3 className="mb-6 font-sans text-lg font-semibold sm:text-xl">{block.heading}</h3>
            )}
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-16">
              {block.items.map((item) => (
                <div key={item.label}>
                  <p className="text-[13px] uppercase tracking-[0.14em] text-muted">{item.label}</p>
                  <p className="mt-4 text-lg leading-relaxed text-ink-soft">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      );

    case "heading": {
      const headingStyle =
        block.paddingBottom !== undefined ? { paddingBottom: block.paddingBottom } : undefined;
      const headingClassName =
        block.spacing === "tight"
          ? layout === "toc"
            ? ["scroll-mt-40 lg:scroll-mt-28", block.paddingBottom !== undefined ? "" : "pb-4"]
                .filter(Boolean)
                .join(" ")
            : "scroll-mt-40 lg:scroll-mt-28"
          : layout === "toc"
            ? ["scroll-mt-40 pt-16 sm:pt-20 lg:scroll-mt-28", block.paddingBottom !== undefined ? "" : "pb-4"]
                .filter(Boolean)
                .join(" ")
            : "mx-auto max-w-[1400px] scroll-mt-28 px-6 pt-16 pb-4 text-center sm:px-10 sm:pt-24";
      return (
        <Reveal>
          <div id={block.id} className={headingClassName} style={headingStyle}>
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">{block.text}</h2>
          </div>
        </Reveal>
      );
    }

    case "divider":
      // Full-width to match the internal dividers used in the "Design process"
      // steps list - scoped to this case study's full-case-study content only,
      // so QuickRead's own dividers (which reuse SectionDivider directly) are
      // unaffected.
      return <div className="my-8 border-t border-line" aria-hidden="true" />;

    case "richText":
      return (
        <Reveal>
          <div
            id={block.id}
            className="scroll-mt-40 lg:scroll-mt-28"
            style={{
              ...(block.paddingTop ? { paddingTop: block.paddingTop } : {}),
              ...(block.paddingBottom ? { paddingBottom: block.paddingBottom } : {}),
            }}
          >
            {block.heading &&
              (block.headingLevel === "h3" ? (
                <h3 className="font-display text-2xl tracking-tight sm:text-3xl">{block.heading}</h3>
              ) : (
                <h2 className="font-display text-3xl tracking-tight sm:text-4xl">{block.heading}</h2>
              ))}
            <div className={(block.heading ? "mt-6 " : "") + "max-w-2xl space-y-6"}>
              {block.paragraphs.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      );

    case "arrowList":
      return (
        <Reveal>
          <div
            id={block.id}
            className="scroll-mt-40 lg:scroll-mt-28"
            style={block.paddingTop !== undefined ? { paddingTop: block.paddingTop } : undefined}
          >
            {block.heading && (
              <h2 className="font-display text-3xl tracking-tight sm:text-4xl">{block.heading}</h2>
            )}
            <ul className={(block.heading ? "mt-6 " : "") + "max-w-2xl space-y-4"}>
              {block.items.map((item, i) => (
                <li
                  key={i}
                  className={
                    "flex gap-3 text-lg leading-relaxed " +
                    (block.bold ? "font-semibold text-ink" : "text-ink-soft")
                  }
                >
                  <span className="shrink-0" style={{ color: "#0163FF" }} aria-hidden="true">
                    →
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      );

    case "media": {
      // Left-aligned (not centred) to sit flush with the surrounding copy.
      const widthWrapClass =
        block.width === "reduced"
          ? "w-4/5"
          : block.width === "reduced-40"
            ? "w-3/5"
            : block.width === "reduced-70"
              ? "w-[70%]"
              : "";
      const mediaClassName =
        block.width || block.bordered
          ? [!block.width ? "w-full" : "", "h-auto"].filter(Boolean).join(" ")
          : undefined;

      const mediaEl = (
        <MediaSlotView media={block.media} className={mediaClassName} bordered={block.bordered} />
      );

      return (
        <Reveal y={30}>
          <div id={block.id} className="scroll-mt-40 py-6 lg:scroll-mt-28">
            {block.link ? (
              <ProjectCardCursor label={block.link.label} size={block.link.size}>
                <a
                  href={block.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-project-card
                  className={`block ${widthWrapClass}`.trim()}
                >
                  {mediaEl}
                </a>
              </ProjectCardCursor>
            ) : widthWrapClass ? (
              <div className={widthWrapClass}>{mediaEl}</div>
            ) : (
              mediaEl
            )}
            {block.caption && (
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">{block.caption}</p>
            )}
          </div>
        </Reveal>
      );
    }

    case "validationItem":
      return (
        <Reveal>
          <div id={block.id} className="scroll-mt-40 lg:scroll-mt-28">
            <p className="font-sans text-lg font-semibold sm:text-xl">{block.question}</p>
            <div className="mt-3 flex items-start gap-3">
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-ink/40 text-[11px] font-bold leading-none"
                aria-hidden="true"
              >
                {block.status === "success" ? "✓" : "!"}
              </span>
              <p className="text-lg leading-relaxed text-ink-soft">{block.finding}</p>
            </div>
            <p
              className="mt-4 flex items-center gap-3 font-bold"
              style={{ color: "#0163FF" }}
              aria-hidden="true"
            >
              ↓
            </p>
            <p className="mt-1 font-sans text-lg font-semibold">Design update</p>
            <p className="mt-2 text-lg leading-relaxed text-ink-soft">{block.update}</p>
          </div>
        </Reveal>
      );

    case "stats":
      return (
        <Reveal>
          <div id={block.id} className="scroll-mt-40 lg:scroll-mt-28">
            {block.heading && (
              <h2 className="font-display text-3xl tracking-tight sm:text-4xl">{block.heading}</h2>
            )}
            <div className={(block.heading ? "mt-8 " : "") + "grid grid-cols-1 gap-8 sm:grid-cols-2"}>
              {block.items.map((item) => (
                <div key={item.label}>
                  <p className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                    {item.value}
                  </p>
                  <p className="mt-3 max-w-xs text-lg leading-relaxed text-ink-soft">{item.label}</p>
                </div>
              ))}
            </div>
            {block.bullets && (
              <ul className="mt-10 max-w-2xl space-y-5">
                {block.bullets.map((item) => (
                  <li key={item} className="flex gap-3 text-lg font-semibold leading-relaxed text-ink">
                    <span className="shrink-0" style={{ color: "#0163FF" }} aria-hidden="true">
                      →
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>
      );

    case "metrics":
      return (
        <Reveal>
          <div id={block.id} className="scroll-mt-40 pt-6 lg:scroll-mt-28">
            {block.intro && (
              <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">{block.intro}</p>
            )}
            <div className={(block.intro ? "mt-8 " : "") + "space-y-10"}>
              {block.items.map((item, i) => (
                <div key={i} className="border-t border-ink/15 pt-6">
                  <p className="font-sans text-lg font-semibold sm:text-xl">{item.title}</p>
                  <div className="mt-4 max-w-2xl space-y-4">
                    <div>
                      <p className="text-[13px] uppercase tracking-[0.14em] text-muted">Definition</p>
                      <p className="mt-2 text-lg leading-relaxed text-ink-soft">{item.definition}</p>
                    </div>
                    <div>
                      <p className="text-[13px] uppercase tracking-[0.14em] text-muted">Why it matters</p>
                      <p className="mt-2 text-lg leading-relaxed text-ink-soft">{item.whyItMatters}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      );

    case "statement":
      return (
        <Reveal>
          <div
            id={block.id}
            className={
              (block.tone === "light" ? "bg-paper-dim text-ink" : "bg-ink text-paper") +
              " scroll-mt-28"
            }
          >
            <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:px-10 sm:py-32">
              <p className="font-display text-2xl leading-snug tracking-tight sm:text-4xl">
                {block.text}
              </p>
            </div>
          </div>
        </Reveal>
      );

    case "numbered": {
      const numberedPaddingStyle =
        block.spacing !== "tight" && layout === "toc" && (block.paddingTop !== undefined || block.paddingBottom !== undefined)
          ? {
              ...(block.paddingTop !== undefined ? { paddingTop: block.paddingTop } : {}),
              ...(block.paddingBottom !== undefined ? { paddingBottom: block.paddingBottom } : {}),
            }
          : undefined;
      return (
        <Reveal>
          <div
            id={block.id}
            className={
              block.spacing === "tight"
                ? "scroll-mt-40 lg:scroll-mt-28"
                : layout === "toc"
                  ? [
                      "scroll-mt-40 lg:scroll-mt-28",
                      block.paddingTop !== undefined ? "" : "pt-12",
                      block.paddingBottom !== undefined ? "" : "pb-12",
                    ]
                      .filter(Boolean)
                      .join(" ")
                  : "mx-auto max-w-[1400px] scroll-mt-28 px-6 py-16 sm:px-10 sm:py-20"
            }
            style={numberedPaddingStyle}
          >
            {block.heading && (
              <h2 className="font-display text-3xl tracking-tight sm:text-4xl">{block.heading}</h2>
            )}
            {block.intro && (
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{block.intro}</p>
            )}
            <div
              className={
                layout === "toc"
                  ? "mt-10 space-y-8"
                  : "mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2"
              }
            >
              {block.items.map((item, i) => (
                <div key={i} className="border-t border-ink/15 pt-6">
                  <p
                    className={
                      layout === "toc"
                        ? "font-sans text-lg font-semibold sm:text-xl"
                        : "font-display text-lg tracking-tight sm:text-xl"
                    }
                  >
                    {block.showArrow && (
                      <span className="mr-2" style={{ color: "#0163FF" }} aria-hidden="true">
                        →
                      </span>
                    )}
                    {item.title}
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      );
    }

    case "steps":
      return (
        <Reveal>
          <div
            id={block.id}
            className={
              block.spacing === "tight"
                ? "scroll-mt-40 lg:scroll-mt-28"
                : "mx-auto max-w-[1400px] scroll-mt-28 px-6 py-16 sm:px-10 sm:py-20"
            }
          >
            {block.heading && (
              <h2 className="font-display text-3xl tracking-tight sm:text-4xl">{block.heading}</h2>
            )}
            <div className="mt-12 space-y-0 divide-y divide-line border-t border-line">
              {block.items.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 gap-3 py-8 sm:grid-cols-[80px_1fr] sm:gap-8"
                >
                  <span className="font-display text-2xl italic text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-display text-xl tracking-tight">{item.title}</p>
                    <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      );

    case "image":
      return (
        <Reveal y={30}>
          <div
            id={block.id}
            className={
              (block.size === "full"
                ? "mx-auto max-w-[1600px] px-6 py-12 sm:px-10 sm:py-16"
                : "mx-auto max-w-[1400px] px-6 py-12 sm:px-10 sm:py-16") + " scroll-mt-28"
            }
          >
            <div
              className="flex justify-center rounded-2xl p-8 sm:p-12"
              style={{ backgroundColor: `${color}14` }}
            >
              <Image
                src={block.image.src}
                alt={block.image.alt}
                width={block.image.width}
                height={block.image.height}
                sizes={block.size === "medium" ? "(min-width: 640px) 420px, 90vw" : "(min-width: 1650px) 1600px, 92vw"}
                className={
                  block.size === "medium"
                    ? "h-auto w-full max-w-[420px]"
                    : "h-auto w-full"
                }
                {...mediaProtectionProps}
              />
            </div>
            {block.image.caption && (
              <p className="mt-4 text-center text-sm text-muted">{block.image.caption}</p>
            )}
          </div>
        </Reveal>
      );

    case "beforeAfterStats":
      return (
        <Reveal>
          <div id={block.id} className="mx-auto max-w-[1400px] scroll-mt-28 px-6 py-16 sm:px-10 sm:py-20">
            {block.heading && (
              <h2 className="max-w-2xl font-display text-2xl leading-snug tracking-tight sm:text-3xl">
                {block.heading}
              </h2>
            )}
            <div className={block.heading ? "mt-12" : ""}>
              <BeforeAfterStats items={block.items} color={color} />
            </div>
          </div>
        </Reveal>
      );

    case "quote":
      return (
        <Reveal>
          {layout === "toc" ? (
            <div id={block.id} className="scroll-mt-40 py-12 lg:scroll-mt-28">
              {block.heading && (
                <h2 className="font-display text-3xl tracking-tight sm:text-4xl">{block.heading}</h2>
              )}
              <div className={`rounded-2xl bg-ink px-6 py-16 text-center text-paper sm:px-10 sm:py-20 ${block.heading ? "mt-10" : ""}`}>
                <p className="font-display text-[1.5rem] italic leading-snug sm:text-[1.8rem]">
                  “{block.text}”
                </p>
                {block.attribution && (
                  <p className="mt-8 text-[13px] uppercase tracking-[0.14em] text-paper/50">
                    {block.attribution}
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div id={block.id} className="scroll-mt-28 bg-ink text-paper">
              <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:px-10 sm:py-32">
                <p className="font-display text-2xl italic leading-snug sm:text-3xl">
                  “{block.text}”
                </p>
                {block.attribution && (
                  <p className="mt-8 text-[13px] uppercase tracking-[0.14em] text-paper/50">
                    {block.attribution}
                  </p>
                )}
              </div>
            </div>
          )}
        </Reveal>
      );

    case "mediaNumbered":
      return (
        <Reveal>
          <div
            id={block.id}
            className={layout === "toc" ? "scroll-mt-40 py-12 lg:scroll-mt-28" : "mx-auto max-w-[1400px] scroll-mt-28 px-6 py-16 sm:px-10 sm:py-20"}
          >
            {block.heading && (
              <h3 className="font-display text-2xl tracking-tight sm:text-3xl">{block.heading}</h3>
            )}
            <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-12">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <div className="flex justify-center rounded-2xl p-6 sm:p-8">
                  <MediaSlotView media={block.media} className="h-auto w-full max-w-[320px]" />
                </div>
              </div>
              <div className="space-y-8">
                {block.items.map((item, i) => (
                  <div key={i} className="border-t border-ink/15 pt-5">
                    <p className="font-sans text-lg font-semibold sm:text-xl">{item.title}</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      );

    case "beforeAfterImages": {
      const bafColsClass =
        block.items.length >= 3 ? "sm:grid-cols-3" : block.items.length === 1 ? "sm:grid-cols-1" : "sm:grid-cols-2";
      const bafMediaClass = block.items.length === 1 ? "mx-auto h-auto w-full" : "mx-auto h-auto w-full max-w-[50%]";
      return (
        <Reveal>
          <div
            id={block.id}
            className={
              block.spacing === "tight"
                ? "scroll-mt-40 lg:scroll-mt-28"
                : layout === "toc"
                  ? "scroll-mt-40 py-12 lg:scroll-mt-28"
                  : "mx-auto max-w-[1600px] scroll-mt-28 px-6 py-16 sm:px-10 sm:py-20"
            }
          >
            {block.heading && (
              <h2
                className={
                  layout === "toc"
                    ? "font-display text-3xl tracking-tight sm:text-4xl"
                    : "text-center font-display text-3xl tracking-tight sm:text-4xl"
                }
              >
                {block.heading}
              </h2>
            )}
            <div className={`grid grid-cols-1 gap-10 sm:gap-8 ${bafColsClass} ${block.heading ? "mt-12" : ""}`}>
              {block.items.map((item) => (
                <div key={item.label}>
                  <p className="mb-4 text-center font-sans text-xl font-semibold">
                    {item.label}
                  </p>
                  <div className="flex justify-center rounded-2xl p-6 sm:p-8">
                    <MediaSlotView media={item.media} className={bafMediaClass} bordered={block.bordered} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      );
    }

    default:
      return null;
  }
}
