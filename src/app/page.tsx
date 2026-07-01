import Link from "next/link";
import Reveal from "@/components/Reveal";
import SelectedWorkCard from "@/components/SelectedWorkCard";

const selectedWork = [
  {
    index: "01",
    title: "InPost UK Mobile App",
    tag: "Mobile",
    summary: "Launching a consumer mobile app from 0 to 1 for the UK market.",
    cover: { from: "#1f2a1a", to: "#0f1410" },
  },
  {
    index: "02",
    title: "Parcel Tracking, Europe",
    tag: "Systems",
    summary: "Redesigning tracking workflows for multiple European markets.",
    cover: { from: "#152329", to: "#0c1416" },
  },
  {
    index: "03",
    title: "UK Design System & Rebrand",
    tag: "Systems",
    summary: "Building digital foundations that later informed a global design system.",
    cover: { from: "#2a2420", to: "#131110" },
  },
];

const howIWork = [
  {
    n: "01",
    title: "Discovery",
    body: "Getting under a messy workflow before touching a screen — talking to the people who use it, mapping where it actually breaks down.",
  },
  {
    n: "02",
    title: "Systems thinking",
    body: "Structuring the underlying model — flows, states, components — so the product can scale across markets and teams without a rebuild.",
  },
  {
    n: "03",
    title: "UI craft",
    body: "Turning that structure into an interface that feels considered at the pixel level, not just correct at the flowchart level.",
  },
  {
    n: "04",
    title: "Delivery",
    body: "Working closely with engineering through build and launch, so what ships matches the intent of the design.",
  },
];

const snapshot = [
  { value: "12+", label: "Years in product design" },
  { value: "0→1", label: "Consumer mobile app launched in the UK" },
  { value: "Multi-market", label: "Parcel tracking redesign across Europe" },
];

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pb-24 pt-40 sm:px-10 sm:pb-32 sm:pt-56">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] uppercase tracking-[0.14em] text-muted">
          <span>Mobile</span>
          <span aria-hidden>·</span>
          <span>Systems</span>
          <span aria-hidden>·</span>
          <span>AI-Assisted Workflows</span>
        </div>
        <h1 className="mt-6 max-w-4xl font-display text-4xl leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
          Senior Product Designer designing complex digital products across
          mobile, systems, and{" "}
          <span className="italic text-accent">AI-assisted workflows.</span>
        </h1>
        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-lg leading-relaxed text-ink-soft">
            I help teams turn messy workflows into clear, scalable product
            experiences — from discovery and systems thinking to polished UI
            and delivery.
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
            {selectedWork.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <SelectedWorkCard {...item} />
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
            <p className="text-[13px] uppercase tracking-[0.14em] text-muted">How I work</p>
            <h2 className="mt-6 max-w-2xl font-display text-3xl leading-snug tracking-tight sm:text-4xl">
              From messy workflow to shipped product.
            </h2>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            {howIWork.map((item, i) => (
              <Reveal key={item.n} delay={i * 0.08}>
                <div className="border-t border-ink/15 pt-6">
                  <span className="font-display text-sm italic text-muted">{item.n}</span>
                  <h3 className="mt-3 font-display text-2xl tracking-tight">{item.title}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <Link href="/ai-workflow" className="link-underline mt-14 inline-block text-sm text-ink">
              See how AI fits into this process →
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 sm:py-32">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-8">
            <Reveal>
              <p className="text-[13px] uppercase tracking-[0.14em] text-muted">
                Experience snapshot
              </p>
              <h2 className="mt-6 max-w-md font-display text-3xl leading-snug tracking-tight sm:text-4xl">
                A decade-plus spent making complexity legible.
              </h2>
              <Link href="/about" className="link-underline mt-8 inline-block text-sm text-ink">
                More about my background →
              </Link>
            </Reveal>

            <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
              {snapshot.map((item, i) => (
                <Reveal key={item.label} delay={0.1 + i * 0.08}>
                  <div className="border-t border-ink/15 pt-6">
                    <p className="font-display text-4xl italic text-accent">{item.value}</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
