import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectHero from "@/components/project/ProjectHero";
import QuickRead from "@/components/project/QuickRead";
import CaseStudyBlocks from "@/components/project/CaseStudyBlocks";
import PrevNextNav from "@/components/project/PrevNextNav";
import Footer from "@/components/Footer";
import {
  projects,
  getProjectBySlug,
  getNextProject,
  getPreviousProject,
} from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.quickRead.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const next = getNextProject(slug);
  const previous = getPreviousProject(slug);

  return (
    <>
      <article>
        <ProjectHero
          title={project.title}
          tagline={project.quickRead.tagline}
          client={project.client}
          color={project.heroBackground ?? project.color}
          image={project.quickRead.heroImage}
          video={project.quickRead.heroVideo}
        />

        <QuickRead data={project.quickRead} color={project.color} />

        <div id="full-case-study" className="scroll-mt-24 border-t border-line">
          <div className="mx-auto max-w-[1400px] px-6 pt-16 sm:px-10">
            <p className="text-[13px] uppercase tracking-[0.14em] text-muted">Full case study</p>
          </div>
          <CaseStudyBlocks blocks={project.fullCaseStudy} color={project.color} />
        </div>
      </article>

      <PrevNextNav previous={previous} next={next} />
      <Footer />
    </>
  );
}
