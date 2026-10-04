import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectHero from "@/components/project/ProjectHero";
import HeroPrototypeEmbed from "@/components/project/HeroPrototypeEmbed";
import QuickRead from "@/components/project/QuickRead";
import CaseStudyBlocks from "@/components/project/CaseStudyBlocks";
import FullCaseStudyReveal from "@/components/project/FullCaseStudyReveal";
import ProjectAtAGlanceSection from "@/components/project/ProjectAtAGlanceSection";
import QuickSummarySection from "@/components/project/QuickSummarySection";
import MediaSlotView from "@/components/project/MediaSlotView";
import MobileImageCarousel from "@/components/project/MobileImageCarousel";
import EnlargeableMedia from "@/components/project/EnlargeableMedia";
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
  type Project,
} from "@/lib/projects";

function OpeningNote({ note }: { note: NonNullable<Project["openingNote"]> }) {
  return (
    <div className="mx-auto max-w-[1400px] px-6 pb-16 sm:px-10 sm:pb-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">{note.heading}</h2>
        <p className="mt-6 text-lg leading-relaxed text-ink-soft">{note.paragraph}</p>
        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2">
          {note.columns.map((col) => (
            <div key={col.heading}>
              <p className="text-[13px] uppercase tracking-[0.14em] text-muted">{col.heading}</p>
              <ul className="mt-4 space-y-3">
                {col.items.map((item) => (
                  <li key={item} className="text-lg leading-relaxed text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
              video={archiveProject.heroVideo}
              stacked
              flushBottom
              imageMaxWidth={archiveProject.heroImageMaxWidth}
              videoMaxWidth={archiveProject.heroImageMaxWidth}
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
              {archiveProject.belowSummaryMedia?.map((item, i) =>
                archiveProject.belowSummaryMediaEnlarged ? (
                  <div key={i} className="mt-12 flex justify-center sm:mt-16">
                    <EnlargeableMedia media={item.media} className="h-auto w-full rounded-xl" />
                  </div>
                ) : (
                  <div
                    key={i}
                    className="mt-12 flex justify-center rounded-2xl bg-paper-dim p-6 sm:mt-16 sm:p-10"
                  >
                    <MediaSlotView
                      media={item.media}
                      className={item.heightPx ? "w-auto rounded-xl" : "h-auto w-full max-w-[1000px] rounded-xl"}
                      style={item.heightPx ? { height: item.heightPx } : undefined}
                    />
                  </div>
                )
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
            imageMaxWidth={wipProject.heroImageMaxWidth}
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
          imageMobileZoom={project.heroImageMobileZoom}
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
            paddingBottom={project.glanceDividerBelow ? 0 : (project.glancePaddingBottom ?? 32)}
          />
        )}

        {project.glanceDividerBelow && (
          <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
            <SectionDivider />
          </div>
        )}

        {project.heroVisual ? (
          <div className="mx-auto max-w-[1400px] px-6 pt-16 pb-16 sm:px-10 sm:pt-20 sm:pb-20">
            <div className="flex justify-center">
              <div className="w-full">
                {project.heroVisual.mobileCarousel && (
                  <MobileImageCarousel images={project.heroVisual.mobileCarousel} className="lg:hidden" />
                )}
                <MediaSlotView
                  media={project.heroVisual.media}
                  className={
                    project.heroVisual.mobileCarousel
                      ? "hidden h-auto w-full rounded-2xl border lg:block"
                      : "h-auto w-full rounded-2xl border"
                  }
                  style={{ borderColor: "rgb(221, 216, 203)" }}
                />
                {project.heroVisual.hint && (
                  <p
                    className={`mt-3 text-left text-[13px] text-muted ${
                      project.heroVisual.mobileCarousel ? "hidden lg:block" : ""
                    }`}
                  >
                    {project.heroVisual.hint}
                  </p>
                )}
              </div>
            </div>
            {project.heroVisual.prototypeLink && (
              <p className="mt-6 text-center">
                <a
                  href={project.heroVisual.prototypeLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline font-display text-lg text-ink"
                >
                  {project.heroVisual.prototypeLink.label}
                </a>
              </p>
            )}
          </div>
        ) : (
          project.midEmbed && (
            <div className="mx-auto max-w-[1400px] px-6 pt-16 pb-16 sm:px-10 sm:pt-20 sm:pb-20">
              <HeroPrototypeEmbed src={project.midEmbed.src} title={project.midEmbed.title} />
            </div>
          )
        )}

        {project.toc ? (
          <FullCaseStudyReveal
            quickRead={project.quickRead}
            color={project.color}
            blocks={project.fullCaseStudy}
            toc={project.toc}
            flushTop={Boolean(project.projectAtAGlance)}
            afterQuickRead={project.openingNote && <OpeningNote note={project.openingNote} />}
          />
        ) : (
          <>
            <QuickRead
              data={project.quickRead}
              color={project.color}
              headingStyle={project.quickReadHeadingStyle}
              hideContinue={project.hideContinueLink}
            />

            {project.openingNote && <OpeningNote note={project.openingNote} />}

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
