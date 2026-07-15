"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion, type Transition, type Variants } from "framer-motion";
import WaveHand from "./WaveHand";
import Button from "./Button";

const LINKEDIN_SPRING: Transition = { type: "spring", stiffness: 500, damping: 38, mass: 0.8 };
const LINKEDIN_REDUCED: Transition = { duration: 0 };

const linkedinVariants: Variants = {
  rest: { borderRadius: 10, width: 38, scale: 1 },
  hover: { borderRadius: 15, width: 43, scale: 1 },
  press: { borderRadius: 15, width: 43, scale: 0.96 },
};

const linkedinIconVariants: Variants = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.12, rotate: 3 },
  press: { scale: 1.05, rotate: 3 },
};

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

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
          <motion.a
            href="https://www.linkedin.com/in/magdalena-marczewska-3b33b750/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="inline-flex h-[38px] items-center justify-center border border-ink/15 bg-white text-ink transition-colors duration-200 ease-out hover:border-ink/30 hover:bg-paper-dim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            initial="rest"
            whileHover="hover"
            whileTap="press"
            variants={linkedinVariants}
            transition={prefersReducedMotion ? LINKEDIN_REDUCED : LINKEDIN_SPRING}
          >
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
              variants={linkedinIconVariants}
              transition={prefersReducedMotion ? LINKEDIN_REDUCED : LINKEDIN_SPRING}
            >
              <rect x="0.5" y="0.5" width="15" height="15" rx="3" stroke="currentColor" strokeWidth="1.2" />
              <circle cx="4.6" cy="4.6" r="1" fill="currentColor" />
              <rect x="3.8" y="6.7" width="1.6" height="5.8" fill="currentColor" />
              <path
                d="M7.4 12.5V6.7H9V7.6C9.4 7 10.1 6.5 11 6.5C12.3 6.5 13 7.4 13 8.9V12.5H11.4V9.2C11.4 8.4 11.1 7.9 10.4 7.9C9.7 7.9 9.3 8.4 9.3 9.2V12.5H7.4Z"
                fill="currentColor"
              />
            </motion.svg>
          </motion.a>
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
