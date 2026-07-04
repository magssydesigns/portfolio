import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import ProjectCard from "@/components/ProjectCard";
import {
  TrackingDetailVisual,
  TrackingListVisual,
  SendParcelVisual,
  ResearchVisual,
} from "@/components/ProjectVisuals";

const masthead = [
  {
    label: "Currently",
    body: "Leading the UK mobile experience at InPost.",
  },
  {
    label: "Previously",
    body: "Building digital products and brands at Pixeled Eggs.",
  },
  {
    label: "Background",
    body: "Fashion Design, Central Saint Martins.",
  },
];

const projects = [
  {
    headline: "Scaling parcel tracking across European markets",
    color: "#F5C518",
    visual: <TrackingDetailVisual />,
  },
  {
    headline: "Launching parcel tracking app for customers in UK",
    color: "#3355FF",
    visual: <TrackingListVisual />,
  },
  {
    headline: "Enabling 2M+ users to send parcels in app",
    color: "#00C853",
    visual: <SendParcelVisual />,
  },
  {
    headline: "Establishing design metrics for key flow in the app",
    color: "#7C3AED",
    visual: <ResearchVisual />,
  },
];

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-40 sm:px-10 sm:pb-20 sm:pt-48">
        <Reveal>
          <h1 className="max-w-3xl font-display text-4xl leading-[1.12] tracking-tight sm:text-6xl lg:text-[4.75rem] lg:leading-[1.08]">
            Designing products that simplify everyday life
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-16 grid grid-cols-1 gap-10 sm:mt-20 sm:grid-cols-3 sm:gap-8">
            {masthead.map((item) => (
              <div key={item.label}>
                <p className="text-[12px] uppercase tracking-[0.14em] text-muted">{item.label}</p>
                <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-ink-soft">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-20 sm:px-10 sm:pb-28">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7">
          {projects.map((project, i) => (
            <Reveal key={project.headline} delay={i * 0.08} y={24}>
              <ProjectCard headline={project.headline} href="/work" color={project.color} visual={project.visual} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10">
            <Button href="/work">View archive projects</Button>
          </div>
        </Reveal>
      </section>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="border-t border-line" />
      </div>

      <section className="mx-auto max-w-[1400px] px-6 py-20 sm:px-10 sm:py-28">
        <Reveal>
          <p className="max-w-2xl font-display text-xl leading-relaxed text-ink-soft sm:text-2xl">
            Hey there, I&rsquo;m Magda &mdash; a product designer currently leading
            the full design process for a consumer app &mdash; the InPost UK app
            with ~3M active users. I am also designing web experiences and
            interfaces for smart hardware.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/resume.pdf" chevron>
              Download my resume
            </Button>
            <Button href="mailto:magssydesigns@gmail.com">Let&rsquo;s connect</Button>
          </div>
        </Reveal>
      </section>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="border-t border-line" />
      </div>

      <section className="mx-auto max-w-[1400px] px-6 py-20 sm:px-10 sm:py-28">
        <Reveal>
          <h2 className="max-w-xl font-display text-4xl leading-[1.1] tracking-tight sm:text-6xl">
            Thanks for stopping by!
          </h2>
          <a
            href="mailto:magssydesigns@gmail.com"
            className="link-underline mt-8 inline-flex items-center gap-2.5 text-lg text-ink"
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
              <rect x="1" y="1" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" />
              <path d="M1.5 2L9 8L16.5 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            magssydesigns@gmail.com
          </a>
        </Reveal>

        <p className="mt-24 text-[13px] text-muted">
          {`© ${new Date().getFullYear()} by Magdalena Marczewska and Claude Code <3`}
        </p>
      </section>
    </>
  );
}
