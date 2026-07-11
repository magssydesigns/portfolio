import Button from "./Button";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-10 sm:py-28">
        <p className="max-w-2xl font-display text-xl leading-relaxed text-ink-soft sm:text-2xl">
          Hey there, I&rsquo;m Magda - a product designer currently
          leading the full design process for a consumer app - the
          InPost UK app with ~3M active users. I am also designing web
          experiences and interfaces for smart hardware.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/resume.pdf" chevron>
            Download my resume
          </Button>
          <Button href="https://www.linkedin.com/in/magdalena-marczewska-3b33b750/">
            Let&rsquo;s connect
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="border-t border-line" />
      </div>

      <div id="contact" className="mx-auto max-w-[1400px] px-6 py-20 sm:px-10 sm:py-28">
        <div className="flex flex-col justify-between gap-12 sm:flex-row sm:items-start">
          <h2 className="max-w-xl font-display text-4xl leading-[1.1] tracking-tight sm:text-6xl">
            Thanks for stopping by!
          </h2>

          <div className="flex flex-col gap-4">
            <a
              href="mailto:magssydesigns@gmail.com"
              className="link-underline inline-flex items-center gap-2.5 text-lg text-ink"
            >
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
                <rect x="1" y="1" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" />
                <path d="M1.5 2L9 8L16.5 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              magssydesigns@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/magdalena-marczewska-3b33b750/"
              target="_blank"
              rel="noreferrer"
              className="link-underline inline-flex items-center gap-2.5 text-lg text-ink"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <rect x="0.5" y="0.5" width="15" height="15" rx="3" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="4.6" cy="4.6" r="1" fill="currentColor" />
                <rect x="3.8" y="6.7" width="1.6" height="5.8" fill="currentColor" />
                <path
                  d="M7.4 12.5V6.7H9V7.6C9.4 7 10.1 6.5 11 6.5C12.3 6.5 13 7.4 13 8.9V12.5H11.4V9.2C11.4 8.4 11.1 7.9 10.4 7.9C9.7 7.9 9.3 8.4 9.3 9.2V12.5H7.4Z"
                  fill="currentColor"
                />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        <p className="mt-24 text-[13px] text-muted">
          {`© ${new Date().getFullYear()} by Magdalena Marczewska and Claude Code <3`}
        </p>
      </div>
    </footer>
  );
}
