import Reveal from "@/components/Reveal";
import type { QuickRead as QuickReadType } from "@/lib/projects";

export default function QuickRead({ data, color }: { data: QuickReadType; color: string }) {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-20 sm:px-10 sm:py-28">
      <Reveal>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[200px_1fr]">
          <p className="text-[13px] uppercase tracking-[0.14em] text-muted">Quick read</p>
          <div className="max-w-2xl space-y-5">
            {data.role && <p className="text-lg leading-relaxed text-ink-soft">{data.role}</p>}
            {data.challenge.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed text-ink-soft sm:text-xl">
                {p}
              </p>
            ))}
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
          <div className="mt-16 grid grid-cols-1 gap-8 border-t border-line pt-16 lg:grid-cols-[200px_1fr]">
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
        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-line pt-16 lg:grid-cols-[200px_1fr]">
          <p className="text-[13px] uppercase tracking-[0.14em] text-muted">Outcomes &amp; impact</p>
          <div>
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

      <Reveal delay={0.18}>
        <a
          href="#full-case-study"
          className="link-underline mt-20 inline-block font-display text-xl italic text-ink"
        >
          Continue reading the full case study ↓
        </a>
      </Reveal>
    </section>
  );
}
