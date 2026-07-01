import type { Metadata } from "next";
import WorkGrid from "@/components/WorkGrid";
import Reveal from "@/components/Reveal";
import { getAllCaseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies in mobile product design, design systems, and AI-assisted workflows.",
};

export default function WorkPage() {
  const studies = getAllCaseStudies();

  return (
    <section className="mx-auto max-w-[1400px] px-6 pb-32 pt-40 sm:px-10 sm:pt-56">
      <Reveal>
        <p className="text-[13px] uppercase tracking-[0.14em] text-muted">Work</p>
        <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">
          Case studies in mobile, systems, and AI-assisted design.
        </h1>
      </Reveal>

      <WorkGrid studies={studies} />
    </section>
  );
}
