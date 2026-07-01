import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Senior Product Designer with twelve years across mobile, systems, and AI-assisted product design.",
};

const timeline = [
  {
    range: "2024 — Present",
    role: "Senior Product Designer, AI Experience",
    place: "Independent / contract",
    body: "Leading design for AI-assisted products across fintech and healthcare, focused on calibrated trust and human-in-the-loop workflows.",
  },
  {
    range: "2021 — 2024",
    role: "Design Systems Lead",
    place: "Enterprise logistics platform",
    body: "Built and governed a company-wide design system spanning four product lines and a 40-engineer platform team.",
  },
  {
    range: "2018 — 2021",
    role: "Senior Product Designer",
    place: "Digital health & fintech scale-ups",
    body: "End-to-end mobile product design, from onboarding through core transactional flows, across two Series B/C startups.",
  },
  {
    range: "2014 — 2018",
    role: "Product Designer",
    place: "Digital product studio",
    body: "Cross-client product and UX design across consumer and B2B mobile apps, developing the systems-thinking approach that shapes my work today.",
  },
];

const principles = [
  {
    title: "Complexity is a material, not a flaw",
    body: "Most of the products I work on are inherently complicated — money, health, claims, infrastructure. The job isn't to pretend that complexity away; it's to give it an honest, legible shape.",
  },
  {
    title: "Systems before screens",
    body: "A screen is a snapshot of a system's current state. I design the underlying model — states, permissions, data — before I design what it looks like, because that order rarely works in reverse.",
  },
  {
    title: "AI changes the process, not the standard",
    body: "Working with models has changed how fast I can explore and how rigorously I can critique. It hasn't changed what a considered, trustworthy interface looks like — if anything, it's raised the bar.",
  },
];

const tools = [
  "Figma",
  "Claude",
  "Framer",
  "Linear",
  "Storybook",
  "Style Dictionary",
  "Amplitude",
  "Arc",
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pb-24 pt-40 sm:px-10 sm:pb-32 sm:pt-56">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_360px] lg:gap-8">
          <Reveal>
            <p className="text-[13px] uppercase tracking-[0.14em] text-muted">About</p>
            <h1 className="mt-6 max-w-2xl font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
              I design the parts of a product people quietly depend on.
            </h1>
            <div className="mt-10 max-w-xl space-y-5 text-lg leading-relaxed text-ink-soft">
              <p>
                I&rsquo;m Mags, a Senior Product Designer with twelve years
                spent inside complicated products — banking apps, claims
                platforms, enterprise systems, and more recently, tools built
                on top of language models.
              </p>
              <p>
                My work sits at the intersection of mobile product design and
                systems thinking: I&rsquo;m as comfortable defining a token
                architecture for a 40-person engineering org as I am
                obsessing over the easing curve on a transfer confirmation.
              </p>
              <p>
                For the last four years, that&rsquo;s increasingly meant
                designing around AI — not adding a chat window to an
                existing product, but rethinking how interfaces communicate
                uncertainty, explain reasoning, and earn the right to be
                trusted with real decisions.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="relative flex aspect-[3/4] w-full items-end overflow-hidden rounded-sm"
              style={{ backgroundImage: "linear-gradient(160deg, #262019, #100e0b)" }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
              />
              <span className="relative z-10 p-8 font-display text-6xl italic text-paper/85">
                MM
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 sm:py-32">
          <Reveal>
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
              How I work
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div className="border-t border-ink/15 pt-6">
                  <h3 className="font-display text-xl tracking-tight">{p.title}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper-dim">
        <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 sm:py-32">
          <Reveal>
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Experience</h2>
          </Reveal>

          <div className="mt-14 divide-y divide-line border-t border-line">
            {timeline.map((item, i) => (
              <Reveal key={item.role} delay={i * 0.06}>
                <div className="grid grid-cols-1 gap-3 py-8 sm:grid-cols-[200px_1fr] sm:gap-8">
                  <p className="text-[13px] uppercase tracking-[0.1em] text-muted">
                    {item.range}
                  </p>
                  <div>
                    <h3 className="font-display text-xl tracking-tight">
                      {item.role} <span className="text-ink-soft">— {item.place}</span>
                    </h3>
                    <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 sm:py-32">
          <Reveal>
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
              Tools &amp; practice
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-10 flex flex-wrap gap-3">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-ink/15 px-4 py-2 text-sm text-ink-soft"
                >
                  {tool}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
