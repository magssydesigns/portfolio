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
          <span className="hidden sm:inline-flex">
            <Button href="/work" shape="pill">
              Work
            </Button>
          </span>
          <span className="hidden sm:inline-flex">
            <Button href="/archive" shape="pill">
              Archive
            </Button>
          </span>
          <Button href="/resume.pdf" shape="pill" chevron>
            Resume
          </Button>
          <Button href="mailto:magssydesigns@gmail.com" variant="solid" shape="pill">
            Contact
          </Button>
        </div>
      </div>
    </header>
  );
}
