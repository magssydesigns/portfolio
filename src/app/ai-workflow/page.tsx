import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import { getCaseStudyBySlug } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "AI Workflow",
  description:
    "How I integrate AI into product design work - constraint-setting, structured critique, and calibrated trust in the interface.",
};

const steps = [
  {
    n: "01",
    title: "Frame the constraints, in writing",
    body: "Before any generation happens, I write down the real constraints - technical limits, accessibility requirements, brand voice, business rules - as plain text. This is the step most workflows skip, and it's the one that determines whether AI output is useful or just fast.",
  },
  {
    n: "02",
    title: "Generate wide, on purpose",
    body: "With constraints established, I use AI to explore a much wider option space than I would alone in the same amount of time - variations in structure, tone, and layout logic, not just visual styling.",
  },
  {
    n: "03",
    title: "Structured critique, both directions",
    body: "I use the model as a rigorous first-pass critic against the original constraints, and I critique its output the same way I'd critique a junior designer's - specifically, and against stated reasoning, not vibes.",
  },
  {
    n: "04",
    title: "Human judgment on what ships",
    body: "AI narrows the field and pressure-tests reasoning. It doesn't make the final call. Every decision that reaches a real interface has been through a human judgment step that considers context no model has access to.",
  },
  {
    n: "05",
    title: "Documentation as a byproduct",
    body: "Because the constraint-setting and critique happen as explicit text, the rationale for a design decision is captured automatically - instead of living only in a designer's head and disappearing after the file is archived.",
  },
];

const principles = [
  {
    title: "Constraints are the actual bottleneck",
    body: "Generation has gotten fast. Judgment hasn't gotten easier. The workflow is built around front-loading the thinking that used to happen silently, so it can be reviewed and reused.",
  },
  {
    title: "Calibration, not confidence",
    body: "In products built on models, I design interfaces that explain reasoning and surface uncertainty honestly, rather than compressing a model's output into a single deceptively simple number.",
  },
  {
    title: "Disagreement is a feature",
    body: "A good AI-assisted interface makes it easy for a skilled human to override the model, quickly and without friction - and treats that override as signal, not failure.",
  },
];

const notList = [
  "Shipping AI-generated UI without a human design pass",
  "Presenting model confidence as if it were certainty",
  "Automating decisions that carry real consequence for someone",
  "Treating AI critique as a substitute for a second opinion from a person",
];

export default function AIWorkflowPage() {
  const secondOpinion = getCaseStudyBySlug("second-opinion");
  const draftingRoom = getCaseStudyBySlug("drafting-room");

  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pb-24 pt-40 sm:px-10 sm:pb-32 sm:pt-56">
        <Reveal>
          <p className="text-[13px] uppercase tracking-[0.14em] text-muted">AI Workflow</p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
            Designing <span className="italic text-accent">with</span> AI is a
            different discipline than designing around it.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Over the last four years, AI has changed how I explore, critique,
            and document design work - and it has changed what I design when
            the product itself is built on a model. This is the working
            method behind both.
          </p>
        </Reveal>
      </section>

      <section className="border-t border-line bg-paper-dim">
        <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 sm:py-32">
          <Reveal>
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Principles</h2>
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

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 sm:py-32">
          <Reveal>
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
              The working method
            </h2>
          </Reveal>

          <div className="mt-14 divide-y divide-line border-t border-line">
            {steps.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.05}>
                <div className="grid grid-cols-1 gap-4 py-10 sm:grid-cols-[120px_1fr] sm:gap-8">
                  <span className="font-display text-2xl italic text-muted">{step.n}</span>
                  <div>
                    <h3 className="font-display text-2xl tracking-tight">{step.title}</h3>
                    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper-dim">
        <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 sm:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-8">
            <Reveal>
              <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
                What this isn&rsquo;t
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft">
                Being fluent with AI tools cuts both ways. Some lines I hold
                regardless of how good the tooling gets:
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="space-y-5">
                {notList.map((item) => (
                  <li key={item} className="flex gap-4 border-t border-ink/15 pt-5 text-[15px] text-ink-soft">
                    <span className="font-display italic text-accent">-</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 sm:py-32">
          <Reveal>
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
              In practice
            </h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {[secondOpinion, draftingRoom].map(
              (study, i) =>
                study && (
                  <Reveal key={study.slug} delay={i * 0.1}>
                    <Link
                      href={`/work/${study.slug}`}
                      className="group block border-t border-ink/15 pt-6"
                    >
                      <span className="font-display text-sm italic text-muted">
                        {study.index}
                      </span>
                      <h3 className="mt-3 font-display text-2xl tracking-tight transition-colors group-hover:text-accent">
                        {study.title}
                      </h3>
                      <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                        {study.summary}
                      </p>
                      <span className="link-underline mt-6 inline-block text-sm text-ink">
                        Read the case study →
                      </span>
                    </Link>
                  </Reveal>
                )
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
