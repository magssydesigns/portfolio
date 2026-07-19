import Reveal from "@/components/Reveal";

/**
 * Reusable "Quick summary" section: heading + narrative paragraph(s),
 * matching the send-parcel-in-app case study's typography, width and
 * spacing exactly.
 */
export default function QuickSummarySection({
  paragraphs,
  standalone = true,
}: {
  paragraphs: string[];
  /**
   * When true (default), wraps itself in the standard section padding so it
   * can be dropped in as a self-contained block. Pass false to embed inside
   * a parent that already supplies its own section wrapper/padding.
   */
  standalone?: boolean;
}) {
  const content = (
    <Reveal>
      <div className="mx-auto max-w-2xl">
        <h2 className="scroll-mt-40 font-display text-3xl tracking-tight sm:text-4xl lg:scroll-mt-28">
          Quick summary
        </h2>
        <div className="mt-6 max-w-2xl space-y-5">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-lg leading-relaxed text-ink-soft">
              {p}
            </p>
          ))}
        </div>
      </div>
    </Reveal>
  );

  if (!standalone) return content;

  return (
    <section className="mx-auto max-w-[1400px] px-6 pt-10 pb-20 sm:px-10 sm:pt-14 sm:pb-28">
      {content}
    </section>
  );
}
