"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import WaveHand from "./WaveHand";
import Button from "./Button";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/enter") return null;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/70 backdrop-blur-md backdrop-saturate-150" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 sm:px-10">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-sm tracking-tight text-ink sm:text-lg"
          aria-label="Magdalena Marczewska, home"
        >
          <WaveHand />
          <span>Magdalena Marczewska</span>
        </Link>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href="https://www.linkedin.com/in/magdalena-marczewska-3b33b750/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-lg border border-ink/15 bg-white text-ink transition-all duration-300 ease-out hover:scale-[1.02] hover:border-ink/30 hover:bg-paper-dim active:scale-[0.98]"
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
          </a>
          <Button href="/resume.pdf" chevron>
            Resume
          </Button>
          <Button href="mailto:magssydesigns@gmail.com" variant="solid">
            Contact
          </Button>
        </div>
      </div>
    </header>
  );
}
