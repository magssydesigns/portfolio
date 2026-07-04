import Image from "next/image";
import type { ProjectImage } from "@/lib/projects";

export default function ProjectHero({
  title,
  tagline,
  client,
  color,
  image,
}: {
  title: string;
  tagline: string;
  client: string;
  color: string;
  image: ProjectImage;
}) {
  return (
    <section className="pt-32 sm:pt-40" style={{ backgroundColor: color }}>
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 px-6 pb-16 sm:px-10 sm:pb-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div>
          <p className="text-[13px] uppercase tracking-[0.14em] text-ink/60">{client}</p>
          <h1 className="mt-6 max-w-xl font-display text-4xl leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-[3.4rem] lg:leading-[1.05]">
            {title}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/70">{tagline}</p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority
            className="h-auto w-[240px] rounded-2xl sm:w-[300px]"
          />
        </div>
      </div>
    </section>
  );
}
