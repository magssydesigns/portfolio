import Reveal from "@/components/Reveal";
import EditorialFeature from "@/components/EditorialFeature";
import { PhoneVisual, TrackingVisual, SystemVisual } from "@/components/FeatureVisuals";

const masthead = [
  {
    label: "Currently",
    body: "Leading Product Design for the UK mobile app at InPost.",
  },
  {
    label: "Previously",
    body: "Helping brands find their digital identity at Pixelated Egg.",
  },
  {
    label: "Originally",
    body: "Studied Fashion Design at Central Saint Martins.",
  },
];

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pb-20 pt-40 sm:px-10 sm:pb-28 sm:pt-56">
        <h1 className="max-w-4xl font-display text-4xl leading-[1.1] tracking-tight sm:text-6xl lg:text-[5.25rem] lg:leading-[1.05]">
          I design products that make complex things{" "}
          <span className="italic text-accent">feel effortless.</span>
        </h1>
        <p className="mt-10 max-w-lg text-lg leading-relaxed text-ink-soft sm:text-xl">
          I&rsquo;m a Senior Product Designer currently leading the UK mobile
          app at InPost. I enjoy untangling messy problems, building scalable
          systems, and creating products that people genuinely enjoy using.
        </p>

        <Reveal delay={0.1}>
          <div className="mt-20 grid grid-cols-1 gap-10 border-t border-line pt-10 sm:grid-cols-3 sm:gap-8">
            {masthead.map((item) => (
              <div key={item.label}>
                <p className="text-[13px] uppercase tracking-[0.14em] text-muted">{item.label}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{item.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <Reveal y={40}>
        <EditorialFeature
          index="01"
          headline="Launching a new market."
          description="Building the first InPost mobile experience for UK customers."
          visual={<PhoneVisual />}
          href="/work"
          tone="light"
        />
      </Reveal>

      <Reveal y={40}>
        <EditorialFeature
          index="02"
          headline="Tracking isn’t just tracking."
          description="Redesigning parcel journeys across Europe for millions of customers."
          visual={<TrackingVisual />}
          href="/work"
          tone="dark"
          reverse
        />
      </Reveal>

      <Reveal y={40}>
        <EditorialFeature
          index="03"
          headline="Designing the foundations."
          description="Building a design system that later informed global products."
          visual={<SystemVisual />}
          href="/work"
          tone="light"
        />
      </Reveal>
    </>
  );
}
