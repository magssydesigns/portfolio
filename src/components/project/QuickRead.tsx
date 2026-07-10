import Reveal from "@/components/Reveal";
import BeforeAfterStats from "@/components/project/BeforeAfterStats";
import MediaSlotView from "@/components/project/MediaSlotView";
import type { QuickRead as QuickReadType } from "@/lib/projects";

export default function QuickRead({
  data,
  color,
  onContinue,
}: {
  data: QuickReadType;
  color: string;
  /** When provided, "Continue to full case study" triggers this instead of a plain hash link. */
  onContinue?: () => void;
}) {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-20 sm:px-10 sm:py-28">
      <Reveal>
        <div id="quick-summary" className="grid scroll-mt-40 grid-cols-1 lg:scroll-mt-28 gap-8 lg:grid-cols-[200px_1fr]">
          <p className="text-[13px] uppercase tracking-[0.14em] text-muted">Quick summary</p>
          <div className="max-w-2xl space-y-5">
            {data.role && <p className="text-lg leading-relaxed text-ink-soft">{data.role}</p>}
            {data.bulletedChallenge ? (
              <ul className="space-y-3">
                {data.challenge.map((p, i) => (
                  <li key={i} className="flex gap-3 text-lg leading-relaxed text-ink-soft sm:text-xl">
                    <span className="text-accent">—</span>
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
                    <span className="text-accent">—</span>
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
          <div
            id="process"
            className="mt-16 grid scroll-mt-40 grid-cols-1 lg:scroll-mt-28 gap-8 border-t border-line pt-16 lg:grid-cols-[200px_1fr]"
          >
            <p className="text-[13px] uppercase tracking-[0.14em] text-muted">Process</p>
            <div className="max-w-2xl">
              {data.process.intro && (
                <p className="mb-5 text-lg leading-relaxed text-ink-soft">{data.process.intro}</p>
              )}
              <ul className="space-y-3">
                {data.process.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink-soft">
                    <span className="text-accent">—</span>
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
          <div className="mt-16">
            <div
              className="flex justify-center rounded-2xl p-8 sm:p-12"
              style={{ backgroundColor: `${color}14` }}
            >
              <MediaSlotView media={data.midMedia} className="h-auto w-full max-w-[720px]" />
            </div>
          </div>
        </Reveal>
      )}

      <Reveal delay={0.1}>
        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-line pt-16 lg:grid-cols-[200px_1fr]">
          <p className="text-[13px] uppercase tracking-[0.14em] text-muted">Key design decisions</p>
          <div className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {data.keyDecisions.map((item) => (
              <div key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink-soft">
                <span className="text-accent">—</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.14}>
        <div
          id="impact"
          className="mt-16 grid scroll-mt-40 grid-cols-1 lg:scroll-mt-28 gap-8 border-t border-line pt-16 lg:grid-cols-[200px_1fr]"
        >
          <p className="text-[13px] uppercase tracking-[0.14em] text-muted">Impact</p>
          <div>
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
                    {q.title && <p className="font-display text-lg tracking-tight">{q.title}</p>}
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
          <div className="mt-16 border-t border-line pt-16">
            <BeforeAfterStats items={data.impactStats.items} color={color} />
          </div>
        </Reveal>
      )}

      <Reveal delay={0.18}>
        {onContinue ? (
          <button
            type="button"
            onClick={onContinue}
            className="link-underline mt-20 inline-block cursor-pointer bg-transparent p-0 font-display text-xl italic text-ink"
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
