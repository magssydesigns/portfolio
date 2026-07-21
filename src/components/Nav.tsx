"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import WaveHand from "./WaveHand";
import Button from "./Button";
import PulsingDot from "./PulsingDot";

const MOBILE_MENU_ID = "primary-mobile-menu";

/** Single source of truth for the nav's destinations - both the desktop row
 * and the mobile menu render from this so they can never drift apart. */
const navItems = [
  { key: "work", href: "/work", label: "Work" },
  { key: "archive", href: "/archive", label: "Archive" },
  {
    key: "currently-building",
    href: "/projects/propfuse",
    label: "Currently building",
    pulsingDot: true,
  },
  { key: "resume", href: "/resume.pdf", label: "Resume", chevron: true },
  {
    key: "contact",
    href: "mailto:magssydesigns@gmail.com",
    label: "Contact",
    variant: "solid" as const,
  },
];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-4 w-5 flex-col items-center justify-center" aria-hidden>
      <span
        className={`absolute h-[1.5px] w-5 bg-current transition-all duration-300 ease-out motion-reduce:transition-none ${
          open ? "translate-y-0 rotate-45" : "-translate-y-[6px]"
        }`}
      />
      <span
        className={`absolute h-[1.5px] w-5 bg-current transition-opacity duration-200 ease-out motion-reduce:transition-none ${
          open ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute h-[1.5px] w-5 bg-current transition-all duration-300 ease-out motion-reduce:transition-none ${
          open ? "translate-y-0 -rotate-45" : "translate-y-[6px]"
        }`}
      />
    </span>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback((returnFocus = true) => {
    setMenuOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  // Body scroll lock while the menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [menuOpen]);

  // Auto-close if the viewport grows back to desktop size.
  useEffect(() => {
    if (!menuOpen) return;
    const onResize = () => {
      if (window.innerWidth >= 640) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  // Focus management + focus trap + Escape + outside click while open.
  useEffect(() => {
    if (!menuOpen) return;
    const panel = panelRef.current;
    if (!panel) return;

    const getFocusable = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      );

    getFocusable()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (e.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (panel.contains(target) || triggerRef.current?.contains(target)) return;
      closeMenu(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen, closeMenu]);

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
          className="flex min-w-0 items-center gap-2 font-display text-sm tracking-tight text-ink sm:text-lg"
          aria-label="Magdalena Marczewska, home"
        >
          <WaveHand />
          <span className="truncate">Magdalena Marczewska</span>
        </Link>

        <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
          {navItems.map((item) => (
            <span key={item.key} className="hidden sm:inline-flex">
              <Button
                href={item.href}
                shape="pill"
                variant={item.variant}
                chevron={item.chevron}
                ariaCurrent={item.key === "currently-building" && pathname === item.href ? "page" : undefined}
              >
                {item.pulsingDot && <PulsingDot color="#86F24C" />}
                {item.label}
              </Button>
            </span>
          ))}

          <button
            type="button"
            ref={triggerRef}
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls={MOBILE_MENU_ID}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex items-center justify-center rounded-full border border-ink bg-transparent p-3.5 text-ink transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-ink/5 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:hidden"
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id={MOBILE_MENU_ID}
            ref={panelRef}
            aria-label="Mobile"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="sm:hidden"
          >
            <div className="mx-6 mb-6 max-w-full overflow-hidden rounded-2xl border border-line/60 bg-white/85 p-4 shadow-sm backdrop-blur-xl">
              <ul className="flex flex-col gap-2" onClick={() => closeMenu(false)}>
                {navItems.map((item) => (
                  <li key={item.key}>
                    <Button
                      href={item.href}
                      shape="pill"
                      variant={item.variant}
                      chevron={item.chevron}
                      className="w-full justify-center"
                      ariaCurrent={
                        item.key === "currently-building" && pathname === item.href ? "page" : undefined
                      }
                    >
                      {item.pulsingDot && <PulsingDot color="#86F24C" />}
                      {item.label}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
