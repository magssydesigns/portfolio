import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import ProjectCardCursor from "@/components/ProjectCardCursor";
import { archiveCards, cardHref } from "@/lib/project-cards";

export const metadata: Metadata = {
  title: "Archive",
  description: "Earlier projects and explorations.",
};

export default function ArchivePage() {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pb-20 pt-40 sm:px-10 sm:pb-28 sm:pt-56">
        <Reveal>
          <p className="text-[13px] uppercase tracking-[0.14em] text-muted">Archive</p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
            Archive
          </h1>
        </Reveal>

        <div className="mt-16 sm:mt-20">
          <ProjectCardCursor>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7">
              {archiveCards.map((card, i) => (
                <Reveal key={card.slug} delay={i * 0.08} y={24}>
                  <ProjectCard headline={card.title} href={cardHref(card)} media={card.media} />
                </Reveal>
              ))}
            </div>
          </ProjectCardCursor>
        </div>
      </section>
      <Footer />
    </>
  );
}
