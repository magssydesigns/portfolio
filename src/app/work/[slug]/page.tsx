import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Cover from "@/components/Cover";
import Footer from "@/components/Footer";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getAdjacentCaseStudy,
} from "@/lib/case-studies";

export function generateStaticParams() {
  return getAllCaseStudies().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.summary,
    openGraph: { title: study.title, description: study.summary },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const next = getAdjacentCaseStudy(slug);

  const meta = [
    { label: "Client", value: study.client },
    { label: "Role", value: study.role },
    { label: "Timeline", value: study.timeline },
    { label: "Team", value: study.team },
  ];

  return (
    <>
    <article>
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-40 sm:px-10 sm:pt-56">
        <Reveal>
          <Link href="/work" className="link-underline text-[13px] uppercase tracking-[0.14em] text-muted">
            ← All work
          </Link>
          <div className="mt-8 flex flex-wrap gap-2">
            {study.categories.map((c) => (
              <span
                key={c}
                className="rounded-full border border-ink/15 px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-ink-soft"
              >
                {c}
              </span>
            ))}
          </div>
          <h1 className="mt-8 max-w-4xl font-display text-6xl leading-[1.02] tracking-tight sm:text-7xl">
            {study.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {study.summary}
          </p>
        </Reveal>
      </section>

      <Reveal>
        <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
          <Cover
            from={study.cover.from}
            to={study.cover.to}
            index={study.index}
            title={study.title}
            aspect="aspect-[16/9]"
          />
        </div>
      </Reveal>

      <section className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10 sm:py-24">
        <div className="grid grid-cols-2 gap-8 border-y border-line py-10 sm:grid-cols-4">
          {meta.map((m) => (
            <div key={m.label}>
              <p className="text-[12px] uppercase tracking-[0.12em] text-muted">{m.label}</p>
              <p className="mt-2 font-display text-lg">{m.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          <p className="text-[13px] uppercase tracking-[0.14em] text-muted">Overview</p>
          <Reveal>
            <p className="max-w-3xl text-xl leading-relaxed text-ink-soft sm:text-2xl">
              {study.overview}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          <p className="text-[13px] uppercase tracking-[0.14em] text-muted">The problem</p>
          <Reveal>
            <p className="max-w-3xl text-lg leading-relaxed text-ink-soft">{study.problem}</p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          <p className="text-[13px] uppercase tracking-[0.14em] text-muted">Process</p>
          <div className="max-w-3xl space-y-12">
            {study.process.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <div className="border-t border-line pt-6">
                  <h3 className="font-display text-2xl tracking-tight">{p.title}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-ink-soft">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          <p className="text-[13px] uppercase tracking-[0.14em] text-muted">Outcomes</p>
          <Reveal>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {study.outcomes.map((o) => (
                <div key={o.label}>
                  <p className="font-display text-4xl italic text-accent">{o.value}</p>
                  <p className="mt-2 text-sm text-ink-soft">{o.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          <p className="text-[13px] uppercase tracking-[0.14em] text-muted">Reflection</p>
          <Reveal>
            <p className="max-w-3xl font-display text-2xl italic leading-snug text-ink-soft">
              &ldquo;{study.reflection}&rdquo;
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line">
        <Link
          href={`/work/${next.slug}`}
          className="group mx-auto flex max-w-[1400px] items-center justify-between px-6 py-16 sm:px-10 sm:py-24"
        >
          <div>
            <p className="text-[13px] uppercase tracking-[0.14em] text-muted">Next project</p>
            <h2 className="mt-4 font-display text-4xl tracking-tight transition-colors group-hover:text-accent sm:text-5xl">
              {next.title}
            </h2>
          </div>
          <span className="font-display text-3xl italic text-ink-soft transition-transform group-hover:translate-x-2">
            →
          </span>
        </Link>
      </section>
    </article>
    <Footer />
    </>
  );
}
