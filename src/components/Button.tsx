import Link from "next/link";
import clsx from "clsx";
import type { ReactNode } from "react";

export default function Button({
  href,
  children,
  variant = "outline",
  shape = "rounded",
  chevron = false,
  external = false,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "outline" | "solid";
  shape?: "rounded" | "pill";
  chevron?: boolean;
  external?: boolean;
  className?: string;
}) {
  const classes = clsx(
    "inline-flex items-center gap-1.5 text-[13px] transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98]",
    shape === "pill" ? "rounded-full px-6 py-3 text-sm" : "rounded-lg px-4 py-2.5",
    variant === "outline"
      ? shape === "pill"
        ? "border border-ink bg-transparent text-ink hover:bg-ink/5"
        : "border border-ink/15 bg-white text-ink hover:border-ink/30 hover:bg-paper-dim"
      : "bg-ink text-paper hover:opacity-85",
    className
  );

  const content = (
    <>
      {children}
      {chevron && shape === "pill" && (
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden>
          <path
            d="M6 1V12M6 12L1.5 7.5M6 12L10.5 7.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {chevron && shape !== "pill" && (
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </>
  );

  const isExternalLike =
    external || href.startsWith("mailto:") || href.startsWith("http") || href.endsWith(".pdf");

  if (isExternalLike) {
    return (
      <a
        href={href}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
