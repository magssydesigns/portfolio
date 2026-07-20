import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectHero from "@/components/project/ProjectHero";
import QuickRead from "@/components/project/QuickRead";
import CaseStudyBlocks from "@/components/project/CaseStudyBlocks";
import FullCaseStudyReveal from "@/components/project/FullCaseStudyReveal";
import ProjectAtAGlanceSection from "@/components/project/ProjectAtAGlanceSection";
import QuickSummarySection from "@/components/project/QuickSummarySection";
import MediaSlotView from "@/components/project/MediaSlotView";
import PrevNextNav from "@/components/project/PrevNextNav";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/project/SectionDivider";
import {
  projects,
  archiveProjects,
  workInProgressProjects,
  getProjectBySlug,
  getArchiveProjectBySlug,
  getWorkInProgressProjectBySlug,
  getNextProject,
  getPreviousProject,
} from "@/lib/projects";

export function generateStaticParams() {
  return [...projects, ...archiveProjects, ...workInProgressProjects].map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (project) {
    return {
      title: project.title,
      description: project.quickRead.tagline,
    };
  }
  const archiveProject = getArchiveProjectBySlug(slug);
  if (archiveProject) {
    return {
      title: archiveProject.title,
      description: archiveProject.subtitle,
    };
  }
  const wipProject = getWorkInProgressProjectBySlug(slug);
  if (wipProject) {
    return {
      title: wipProject.title,
      description: wipProject.subtitle,
    };
  }
  return {};
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    const archiveProject = getArchiveProjectBySlug(slug);
    if (archiveProject) {
      return (
        <>
          <article>
            <ProjectHero
              title={archiveProject.title}
              tagline={archiveProject.subtitle}
              client="Archive"
              color="#F8F4EE"
              image={archiveProject.heroImage}
              stacked
              flushBottom
            />
            <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
              <SectionDivider />
            </div>
            <section className="mx-auto max-w-[1400px] px-6 pt-10 pb-20 sm:px-10 sm:pt-14 sm:pb-28">
              <ProjectAtAGlanceSection {...archiveProject.projectAtAGlance} standalone={false} />
              {archiveProject.quickSummary && (
                <>
                  <SectionDivider />
                  <QuickSummarySection paragraphs={archiveProject.quickSummary} standalone={false} />
                </>
              )}
              {archiveProject.belowSummaryMedia && (
                <div className="mt-12 flex justify-center rounded-2xl bg-paper-dim p-6 sm:mt-16 sm:p-10">
                  <MediaSlotView
                    media={archiveProject.belowSummaryMedia}
                    className="h-auto w-full max-w-[1000px] rounded-xl"
                  />
                </div>
              )}
            </section>
          </article>
          <Footer />
        </>
      );
    }

    const wipProject = getWorkInProgressProjectBySlug(slug);
    if (!wipProject) notFound();

    return (
      <>
        <article>
          <ProjectHero
            title={wipProject.title}
            tagline={wipProject.subtitle}
            client={wipProject.eyebrow}
            color="#F8F4EE"
            image={wipProject.heroImage}
            stacked
            flushBottom
          />
          <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
            <SectionDivider />
          </div>
          <section className="mx-auto max-w-[1400px] px-6 pt-10 pb-20 sm:px-10 sm:pt-14 sm:pb-28">
            <ProjectAtAGlanceSection {...wipProject.projectAtAGlance} standalone={false} />
            <SectionDivider />
            <QuickSummarySection paragraphs={wipProject.quickSummary} standalone={false} />
          </section>
        </article>
        <Footer />
      </>
    );
  }

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
          stacked={project.heroStacked}
          markets={project.heroMarkets}
          flushBottom={project.heroDividerBelow || project.heroFlushBottom}
          imageMaxWidth={project.heroImageMaxWidth}
        />

        {project.heroDividerBelow && (
          <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
            <SectionDivider />
          </div>
        )}

        {project.projectAtAGlance && (
          <ProjectAtAGlanceSection
            {...project.projectAtAGlance}
            paddingTop={project.glancePaddingTop}
            paddingBottom={project.glanceDividerBelow ? 0 : 32}
          />
        )}

        {project.glanceDividerBelow && (
          <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
            <SectionDivider />
          </div>
        )}

        {project.toc ? (
          <FullCaseStudyReveal
            quickRead={project.quickRead}
            color={project.color}
            blocks={project.fullCaseStudy}
            toc={project.toc}
            flushTop={Boolean(project.projectAtAGlance)}
          />
        ) : (
          <>
            <QuickRead
              data={project.quickRead}
              color={project.color}
              headingStyle={project.quickReadHeadingStyle}
              hideContinue={project.hideContinueLink}
            />

            <div
              id="full-case-study"
              className={project.hideContinueLink ? "scroll-mt-24" : "scroll-mt-24 border-t border-line"}
            >
              {!project.hideContinueLink && (
                <div className="mx-auto max-w-[1400px] px-6 pt-16 sm:px-10">
                  <p className="text-[13px] uppercase tracking-[0.14em] text-muted">Full case study</p>
                </div>
              )}
              {project.hideContinueLink ? (
                <div className="mx-auto max-w-[1400px] px-6 pt-16 sm:px-10">
                  <CaseStudyBlocks blocks={project.fullCaseStudy} color={project.color} />
                </div>
              ) : (
                <CaseStudyBlocks blocks={project.fullCaseStudy} color={project.color} />
              )}
            </div>
          </>
        )}
      </article>

      <PrevNextNav previous={previous} next={next} />
      <Footer />
    </>
  );
}
