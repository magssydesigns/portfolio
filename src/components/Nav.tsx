"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

const links = [
  { href: "/work", label: "Work" },
  { href: "/ai-workflow", label: "AI Workflow" },
  { href: "/about", label: "About" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 sm:px-10">
        <Link
          href="/"
          className="font-display text-lg tracking-tight text-ink"
          aria-label="Mags Marsh, home"
        >
          Mags&nbsp;Marsh
        </Link>

        <nav className="hidden items-center gap-10 sm:flex">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "link-underline text-[13px] uppercase tracking-[0.14em] transition-colors",
                  active ? "text-ink" : "text-ink-soft hover:text-ink"
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/#contact"
            className="rounded-full border border-ink/15 px-4 py-2 text-[13px] uppercase tracking-[0.14em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            Say hello
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-[5px] sm:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <motion.span
            animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
            className="h-px w-6 bg-ink"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
            className="h-px w-6 bg-ink"
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-paper px-8 sm:hidden"
          >
            <nav className="flex flex-col gap-3">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-5xl tracking-tight text-ink"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + links.length * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="pt-6"
              >
                <Link
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="text-[13px] uppercase tracking-[0.14em] text-accent"
                >
                  Say hello →
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
