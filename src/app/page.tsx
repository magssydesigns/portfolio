import Link from "next/link";
import Reveal from "@/components/Reveal";
import WorkCard from "@/components/WorkCard";
import { getFeaturedCaseStudies } from "@/lib/case-studies";

export default function Home() {
  const featured = getFeaturedCaseStudies();

  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pb-24 pt-40 sm:px-10 sm:pb-32 sm:pt-56">
        <p className="text-[13px] uppercase tracking-[0.14em] text-muted">
          Senior Product Designer
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-[13vw] leading-[0.95] tracking-tight sm:text-[7.5vw] lg:text-[6.2rem]">
          Designing for the moments products{" "}
          <span className="italic text-accent">have to get right.</span>
        </h1>
        <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-lg leading-relaxed text-ink-soft">
            I design complex digital products across mobile, systems, and
            AI-assisted workflows — for teams building things that people
            have to trust.
          </p>
          <Link
            href="/work"
            className="link-underline shrink-0 font-display text-xl italic text-ink"
          >
            View selected work →
          </Link>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 sm:py-32">
          <Reveal>
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
                Selected work
              </h2>
              <Link href="/work" className="link-underline hidden text-sm text-ink-soft sm:block">
                All projects →
              </Link>
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((study, i) => (
              <Reveal key={study.slug} delay={i * 0.08}>
                <WorkCard study={study} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <Link
              href="/work"
              className="link-underline mt-14 inline-block text-sm text-ink-soft sm:hidden"
            >
              All projects →
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line bg-paper-dim">
        <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 sm:py-32">
          <Reveal>
            <p className="max-w-2xl font-display text-3xl leading-snug tracking-tight sm:text-4xl">
              Three disciplines, one practice.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
            {[
              {
                n: "01",
                title: "Mobile",
                body: "End-to-end product design for native and cross-platform apps — from information architecture through the pixel-level detail that makes an interface feel considered.",
              },
              {
                n: "02",
                title: "Systems",
                body: "Design systems and component architecture for platforms that need to scale across teams, products, and years without another rebuild.",
              },
              {
                n: "03",
                title: "AI Workflows",
                body: "Interfaces for products built on models — designed for legibility, calibrated trust, and graceful failure, not automation for its own sake.",
              },
            ].map((item, i) => (
              <Reveal key={item.n} delay={i * 0.1}>
                <div className="border-t border-ink/15 pt-6">
                  <span className="font-display text-sm italic text-muted">{item.n}</span>
                  <h3 className="mt-3 font-display text-2xl tracking-tight">{item.title}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-2 lg:gap-8">
          <Reveal>
            <p className="text-[13px] uppercase tracking-[0.14em] text-muted">About</p>
            <h2 className="mt-6 font-display text-3xl leading-snug tracking-tight sm:text-4xl">
              Twelve years in product design, the last four spent designing
              alongside AI rather than despite it.
            </h2>
            <Link href="/about" className="link-underline mt-8 inline-block text-sm text-ink">
              More about my background →
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-[13px] uppercase tracking-[0.14em] text-muted">AI Workflow</p>
            <h2 className="mt-6 font-display text-3xl leading-snug tracking-tight sm:text-4xl">
              A working method for designing with AI, not just around it —
              from constraint-setting to critique.
            </h2>
            <Link href="/ai-workflow" className="link-underline mt-8 inline-block text-sm text-ink">
              Read the workflow →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
