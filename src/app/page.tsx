import Reveal from "@/components/Reveal";
import InteractiveHoverText from "@/components/InteractiveHoverText";
import Button from "@/components/Button";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import MediaSlotView from "@/components/project/MediaSlotView";
import GradientScene from "@/components/GradientScene";

const masthead = [
  {
    label: "Currently",
    body: "Leading the UK mobile experience at InPost & experimenting with building in free time.",
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
    headline: "0 → 1: Launching InPost's UK parcel tracking app",
    color: "#3355FF",
    visual: (
      <MediaSlotView
        media={{
          kind: "image",
          image: {
            src: "/homepage/tracking-launch.jpg",
            width: 7406,
            height: 5829,
            alt: "InPost parcel tracking screen and design system colour tokens",
          },
        }}
        className="h-full w-full object-cover"
      />
    ),
    href: "/projects/rapid-uk-launch",
  },
  {
    headline: "Enabling 2M+ users to send parcels in app",
    color: "#00C853",
    visual: (
      <MediaSlotView
        media={{
          kind: "image",
          image: {
            src: "/homepage/send-parcel.jpg",
            width: 7406,
            height: 5430,
            alt: "InPost send a parcel screen showing locker or home address delivery options",
          },
        }}
        className="h-full w-full object-cover"
      />
    ),
    href: "/projects/send-parcel-in-app",
  },
  {
    headline: "Establishing design metrics for key flow in the app",
    color: "#7C3AED",
    visual: (
      <MediaSlotView
        media={{
          kind: "image",
          image: {
            src: "/homepage/design-metrics.jpg",
            width: 7406,
            height: 5829,
            alt: "Annotated research screens showing metrics tracked across the send-a-parcel flow",
          },
        }}
        className="h-full w-full object-cover"
      />
    ),
    href: "/projects/establishing-design-metrics",
  },
];

export default function Home() {
  return (
    <GradientScene>
      <section className="px-6 pb-16 pt-40 sm:px-10 sm:pb-20 sm:pt-48">
        <div className="mx-auto max-w-[1400px]">
          <Reveal>
            <InteractiveHoverText className="max-w-3xl font-display text-4xl leading-[1.12] tracking-tight sm:text-6xl lg:max-w-6xl lg:text-[4.75rem] lg:leading-[1.08]">
              {"Designing & building products that make complex feel easy"}
            </InteractiveHoverText>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16 grid grid-cols-1 gap-10 sm:mt-20 sm:grid-cols-3 sm:gap-8">
              {masthead.map((item) => (
                <div key={item.label}>
                  <p className="flex items-center gap-2 font-sans text-[12px] uppercase tracking-[0.14em] text-black">
                    {item.label === "Currently" && (
                      <span
                        className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-green-500"
                        aria-hidden
                      />
                    )}
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7">
          {projects.map((project, i) => (
            <Reveal key={project.headline} delay={i * 0.08} y={24}>
              <ProjectCard headline={project.headline} href={project.href} color={project.color} visual={project.visual} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10">
            <Button href="/work" shape="pill">View archive projects</Button>
          </div>
        </Reveal>
      </section>

      <Footer />
    </GradientScene>
  );
}
