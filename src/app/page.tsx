import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import MediaSlotView from "@/components/project/MediaSlotView";
import {
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
    visual: (
      <MediaSlotView
        media={{
          kind: "video",
          video: {
            src: "/projects/scaling-parcel-tracking/scene.mp4",
            width: 1440,
            height: 1080,
          },
          alt: "InPost parcel tracking experience shown in context",
        }}
        className="h-full w-full object-cover"
      />
    ),
    href: "/projects/scaling-parcel-tracking",
  },
  {
    headline: "Launching parcel tracking app for customers in UK",
    color: "#3355FF",
    visual: <TrackingListVisual />,
    href: "/work",
  },
  {
    headline: "Enabling 2M+ users to send parcels in app",
    color: "#00C853",
    visual: <SendParcelVisual />,
    href: "/projects/send-parcel-in-app",
  },
  {
    headline: "Establishing design metrics for key flow in the app",
    color: "#7C3AED",
    visual: <ResearchVisual />,
    href: "/work",
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
              <ProjectCard headline={project.headline} href={project.href} color={project.color} visual={project.visual} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10">
            <Button href="/work">View archive projects</Button>
          </div>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
