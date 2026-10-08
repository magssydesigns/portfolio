import Reveal from "@/components/Reveal";
import InteractiveHoverText from "@/components/InteractiveHoverText";
import Button from "@/components/Button";
import ProjectCard from "@/components/ProjectCard";
import ProjectCardCursor from "@/components/ProjectCardCursor";
import Footer from "@/components/Footer";
import GradientScene from "@/components/GradientScene";
import PulsingDot from "@/components/PulsingDot";
import { homepageCards, cardHref } from "@/lib/project-cards";

const masthead = [
  {
    label: "Currently",
    body: "Leading product design for InPost UK across iOS and Android, used by 2M+ monthly active users.",
  },
  {
    label: "Experience",
    body: "7+ years across consumer products, complex systems, agency work and design systems.",
  },
  {
    label: "Also building",
    body: "Independent products in React, TypeScript and React Native.",
  },
];

export default function Home() {
  return (
    <GradientScene>
      <section className="px-6 pb-16 pt-40 sm:px-10 sm:pb-20 sm:pt-48">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <InteractiveHoverText className="max-w-3xl font-display text-4xl leading-[1.12] tracking-tight sm:text-6xl lg:max-w-6xl lg:text-[4.75rem] lg:leading-[1.08]">
              {"I design complex consumer products at scale"}
            </InteractiveHoverText>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16 grid grid-cols-1 gap-10 sm:mt-20 sm:grid-cols-3 sm:gap-8">
              {masthead.map((item) => (
                <div key={item.label}>
                  <p className="flex items-center gap-2 font-sans text-[12px] uppercase tracking-[0.14em] text-black">
                    {item.label === "Currently" && <PulsingDot />}
                    {item.label}
                  </p>
                  <p className="mt-3 max-w-xs font-sans text-[15px] leading-relaxed text-black">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-20 sm:px-10 sm:pb-28">
        <ProjectCardCursor>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7">
            {homepageCards.map((card, i) => (
              <Reveal key={card.slug} delay={i * 0.08} y={24}>
                <ProjectCard
                  headline={card.title}
                  href={cardHref(card)}
                  media={card.media}
                  mediaBackground={card.mediaBackground}
                  badge={card.badge}
                />
              </Reveal>
            ))}
          </div>
        </ProjectCardCursor>

        <Reveal delay={0.1}>
          <div className="mt-10">
            <Button href="/archive" shape="pill">View archive projects</Button>
          </div>
        </Reveal>
      </section>

      <Footer
        intro={
          <>
            Hey, I&rsquo;m Magda, a Senior Product Designer based in London. I
            lead the design of InPost&rsquo;s UK consumer app across iOS and
            Android, used by 2M+ monthly active users. I originally designed
            the product from 0 to launch and now work across discovery,
            strategy, systems and delivery.
            <br />
            <br />
            Outside work, I design and build my own products in
            code.
          </>
        }
      />
    </GradientScene>
  );
}
