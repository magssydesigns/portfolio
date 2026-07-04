import Image from "next/image";
import Reveal from "@/components/Reveal";
import type { Block } from "@/lib/projects";

export default function CaseStudyBlocks({ blocks, color }: { blocks: Block[]; color: string }) {
  return (
    <div>
      {blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} color={color} />
      ))}
    </div>
  );
}

function BlockRenderer({ block, color }: { block: Block; color: string }) {
  switch (block.kind) {
    case "lead":
      return (
        <Reveal>
          <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10 sm:py-20">
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

    case "twoCol":
      return (
        <Reveal>
          <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10 sm:py-20">
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

    case "heading":
      return (
        <Reveal>
          <div className="mx-auto max-w-[1400px] px-6 pt-16 pb-4 text-center sm:px-10 sm:pt-24">
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">{block.text}</h2>
          </div>
        </Reveal>
      );

    case "statement":
      return (
        <Reveal>
          <div
            className={
              block.tone === "light"
                ? "bg-paper-dim text-ink"
                : "bg-ink text-paper"
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

    case "numbered":
      return (
        <Reveal>
          <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10 sm:py-20">
            {block.heading && (
              <h2 className="font-display text-3xl tracking-tight sm:text-4xl">{block.heading}</h2>
            )}
            {block.intro && (
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{block.intro}</p>
            )}
            <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
              {block.items.map((item, i) => (
                <div key={i} className="border-t border-ink/15 pt-6">
                  <p className="font-display text-lg tracking-tight sm:text-xl">{item.title}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      );

    case "steps":
      return (
        <Reveal>
          <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10 sm:py-20">
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
            className={
              block.size === "full"
                ? "mx-auto max-w-[1600px] px-6 py-12 sm:px-10 sm:py-16"
                : "mx-auto max-w-[1400px] px-6 py-12 sm:px-10 sm:py-16"
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
                className={
                  block.size === "medium"
                    ? "h-auto w-full max-w-[420px]"
                    : "h-auto w-full"
                }
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
          <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10 sm:py-20">
            <h2 className="max-w-2xl font-display text-2xl leading-snug tracking-tight sm:text-3xl">
              {block.heading}
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {block.items.map((item) => (
                <div key={item.label} className="border-t border-ink/15 pt-6">
                  <div className="flex items-center gap-4">
                    <span className="font-display text-3xl italic text-muted line-through decoration-1">
                      {item.before}
                    </span>
                    <span className="text-muted">→</span>
                    <span className="font-display text-3xl italic" style={{ color }}>
                      {item.after}
                    </span>
                  </div>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                    {item.description}
                  </p>
                  <p className="mt-2 text-sm text-muted">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      );

    case "quote":
      return (
        <Reveal>
          <div className="bg-ink text-paper">
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
        </Reveal>
      );

    default:
      return null;
  }
}
