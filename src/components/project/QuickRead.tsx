import Reveal from "@/components/Reveal";
import BeforeAfterStats from "@/components/project/BeforeAfterStats";
import MediaSlotView from "@/components/project/MediaSlotView";
import type { QuickRead as QuickReadType } from "@/lib/projects";

function SectionLabel({
  headingStyle,
  id,
  text,
}: {
  headingStyle: "sidebar" | "heading";
  id?: string;
  text: string;
}) {
  if (headingStyle === "heading") {
    return (
      <h2 id={id} className="scroll-mt-40 font-display text-3xl tracking-tight sm:text-4xl lg:scroll-mt-28">
        {text}
      </h2>
    );
  }
  return (
    <p id={id} className="scroll-mt-40 text-[13px] uppercase tracking-[0.14em] text-muted lg:scroll-mt-28">
      {text}
    </p>
  );
}

export default function QuickRead({
  data,
  color,
  onContinue,
  headingStyle = "sidebar",
}: {
  data: QuickReadType;
  color: string;
  /** When provided, "Continue to full case study" triggers this instead of a plain hash link. */
  onContinue?: () => void;
  /** "heading" promotes section labels to full-width h2s matching the full case study's section titles. */
  headingStyle?: "sidebar" | "heading";
}) {
  const firstWrapClass =
    headingStyle === "heading" ? "mx-auto max-w-2xl" : "grid grid-cols-1 gap-8 lg:grid-cols-[200px_1fr]";
  const wrapClass =
    headingStyle === "heading"
      ? "mx-auto mt-16 max-w-2xl border-t border-line pt-16"
      : "mt-16 grid grid-cols-1 gap-8 border-t border-line pt-16 lg:grid-cols-[200px_1fr]";
  // Impact stays full-width (its grids need the room), so it isn't wrapped in the narrow centred column.
  const wideWrapClass = "mt-16";
  // Key design decisions has no divider above it.
  const keyDecisionsWrapClass =
    headingStyle === "heading"
      ? data.midMedia
        ? "mx-auto mt-8 max-w-2xl"
        : "mx-auto mt-16 max-w-2xl"
      : "mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[200px_1fr]";
  const contentClass = headingStyle === "heading" ? "mt-6" : "";
  const sectionPaddingClass =
    headingStyle === "heading"
      ? "px-6 pt-10 pb-20 sm:px-10 sm:pt-14 sm:pb-28"
      : "px-6 py-20 sm:px-10 sm:py-28";

  return (
    <section className={`mx-auto max-w-[1400px] ${sectionPaddingClass}`}>
      <Reveal>
        <div className={firstWrapClass}>
          <SectionLabel
            headingStyle={headingStyle}
            id="quick-summary"
            text={headingStyle === "heading" ? "Quick summary" : "Quick read"}
          />
          <div className={`${contentClass} max-w-2xl space-y-5`}>
            {data.role && <p className="text-lg leading-relaxed text-ink-soft">{data.role}</p>}
            {data.bulletedChallenge ? (
              <ul className="space-y-3">
                {data.challenge.map((p, i) => (
                  <li key={i} className="flex gap-3 text-lg leading-relaxed text-ink-soft">
                    <span className="text-accent">-</span>
                    {p}
                  </li>
                ))}
              </ul>
            ) : (
              data.challenge.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-ink-soft sm:text-xl">
                  {p}
                </p>
              ))
            )}
            {data.constraints && (
              <ul className="space-y-2 pt-2">
                {data.constraints.map((c) => (
                  <li key={c} className="flex gap-3 text-[15px] text-ink-soft">
                    <span className="text-accent">-</span>
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Reveal>

      {data.process && (
        <Reveal delay={0.06}>
          <div className={wrapClass}>
            <SectionLabel headingStyle={headingStyle} id="process" text="Process" />
            <div className={`${contentClass} max-w-2xl`}>
              {data.process.intro && (
                <p className="mb-5 text-lg leading-relaxed text-ink-soft">{data.process.intro}</p>
              )}
              <ul className="space-y-3">
                {data.process.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink-soft">
                    <span className="text-accent">-</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      )}

      {data.midMedia && (
        <Reveal delay={0.08} y={30}>
          <div className="mt-8 flex justify-center">
            <MediaSlotView
              media={data.midMedia}
              className="h-auto w-full max-w-[864px] rounded-2xl border"
              style={{ borderColor: "rgb(221, 216, 203)" }}
            />
          </div>
        </Reveal>
      )}

      <Reveal delay={0.1}>
        <div className={keyDecisionsWrapClass}>
          <SectionLabel headingStyle={headingStyle} text="Key design decisions" />
          <div className={`${contentClass} grid max-w-2xl grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2`}>
            {data.keyDecisions.map((item) => (
              <div key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink-soft">
                <span className="text-accent">-</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.14}>
        <div className={headingStyle === "heading" ? wideWrapClass : wrapClass}>
          <SectionLabel headingStyle={headingStyle} id="impact" text="Impact" />
          <div className={contentClass}>
            {data.outcomes.length > 0 && (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {data.outcomes.map((o) => (
                  <div key={o.label}>
                    <p className="font-display text-5xl italic" style={{ color }}>
                      {o.value}
                    </p>
                    <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-ink-soft">{o.label}</p>
                  </div>
                ))}
              </div>
            )}
            {data.qualitative && (
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {data.qualitative.map((q, i) => (
                  <div key={i} className="border-t border-ink/15 pt-4">
                    {q.title && <p className="font-sans text-lg font-semibold">{q.title}</p>}
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{q.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Reveal>

      {data.impactStats && (
        <Reveal delay={0.16}>
          <div className="mt-16">
            <BeforeAfterStats items={data.impactStats.items} color="#015523" />
          </div>
        </Reveal>
      )}

      <Reveal delay={0.18}>
        {onContinue ? (
          <button
            type="button"
            onClick={onContinue}
            className="link-underline mx-auto mt-20 block w-fit cursor-pointer bg-transparent p-0 font-display text-xl text-ink"
          >
            Continue to full case study ↓
          </button>
        ) : (
          <a
            href="#full-case-study"
            className="link-underline mt-20 inline-block font-display text-xl italic text-ink"
          >
            Continue reading the full case study ↓
          </a>
        )}
      </Reveal>
    </section>
  );
}
