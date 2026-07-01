import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-line">
      <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-10 sm:py-32">
        <div className="flex flex-col justify-between gap-12 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-[13px] uppercase tracking-[0.14em] text-muted">
              Currently open to select engagements
            </p>
            <h2 className="mt-6 font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
              Let&rsquo;s design something worth{" "}
              <span className="italic text-accent">shipping.</span>
            </h2>
            <a
              href="mailto:hello@magsmarsh.design"
              className="link-underline mt-8 inline-block font-display text-2xl italic text-ink"
            >
              hello@magsmarsh.design
            </a>
          </div>

          <div className="flex gap-8 text-[13px] uppercase tracking-[0.14em] text-ink-soft">
            <a className="link-underline hover:text-ink" href="#" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="link-underline hover:text-ink" href="#" target="_blank" rel="noreferrer">
              Read.cv
            </a>
            <a className="link-underline hover:text-ink" href="#" target="_blank" rel="noreferrer">
              Dribbble
            </a>
          </div>
        </div>

        <div className="mt-24 flex flex-col gap-4 border-t border-line pt-8 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Mags Marsh. Senior Product Designer.</p>
          <div className="flex gap-8">
            <Link className="link-underline hover:text-ink" href="/work">
              Work
            </Link>
            <Link className="link-underline hover:text-ink" href="/about">
              About
            </Link>
            <Link className="link-underline hover:text-ink" href="/ai-workflow">
              AI Workflow
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
