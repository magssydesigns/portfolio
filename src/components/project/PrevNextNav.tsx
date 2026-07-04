import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function PrevNextNav({
  previous,
  next,
}: {
  previous: Project;
  next: Project;
}) {
  return (
    <section className="border-t border-line bg-ink text-paper">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 sm:grid-cols-2">
        <Link
          href={`/projects/${previous.slug}`}
          className="group border-b border-paper/10 px-6 py-16 transition-colors hover:bg-paper/5 sm:border-b-0 sm:border-r sm:px-10 sm:py-24"
        >
          <p className="text-[13px] uppercase tracking-[0.14em] text-paper/50">← Previous project</p>
          <h2 className="mt-5 font-display text-3xl tracking-tight transition-transform duration-300 group-hover:-translate-x-1 sm:text-4xl">
            {previous.shortTitle}
          </h2>
        </Link>
        <Link
          href={`/projects/${next.slug}`}
          className="group px-6 py-16 text-right transition-colors hover:bg-paper/5 sm:px-10 sm:py-24"
        >
          <p className="text-[13px] uppercase tracking-[0.14em] text-paper/50">Next project →</p>
          <h2 className="mt-5 font-display text-3xl tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:text-4xl">
            {next.shortTitle}
          </h2>
        </Link>
      </div>
    </section>
  );
}
