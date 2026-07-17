import Reveal from "@/components/Reveal";
import type { ArchiveProject } from "@/lib/projects";

export default function ArchiveQuickSummary({ data }: { data: ArchiveProject["quickSummary"] }) {
  const items = [
    { label: "Role", value: data.role },
    { label: "Overview", value: data.overview },
    { label: "Contribution", value: data.contribution },
    { label: "Outcome", value: data.outcome },
  ];

  return (
    <section className="mx-auto max-w-[1400px] px-6 pt-10 pb-20 sm:px-10 sm:pt-14 sm:pb-28">
      <Reveal>
        <div className="mx-auto max-w-2xl">
          <h2 className="scroll-mt-40 font-display text-3xl tracking-tight sm:text-4xl lg:scroll-mt-28">
            Quick summary
          </h2>
          <div className="mt-6 space-y-5">
            {items.map((item) => (
              <div key={item.label}>
                <p className="text-[13px] uppercase tracking-[0.14em] text-muted">{item.label}</p>
                <p className="mt-1 text-lg leading-relaxed text-ink-soft">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
