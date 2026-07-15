"use client";

import Link from "next/link";
import clsx from "clsx";
import { motion, useReducedMotion, type Transition, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const MotionLink = motion.create(Link);

const SOLID_SPRING: Transition = { type: "spring", stiffness: 420, damping: 34, mass: 0.9 };
const OUTLINE_SPRING: Transition = { type: "spring", stiffness: 500, damping: 38, mass: 0.8 };
const REDUCED: Transition = { duration: 0 };

const solidVariants: Variants = {
  rest: { borderRadius: 10, paddingLeft: 20, paddingRight: 20, scale: 1 },
  hover: { borderRadius: 999, paddingLeft: 26, paddingRight: 26, scale: 1 },
  press: { borderRadius: 999, paddingLeft: 26, paddingRight: 26, scale: 0.97 },
};

const outlineVariants: Variants = {
  rest: { borderRadius: 10, paddingLeft: 16, paddingRight: 16, scale: 1 },
  hover: { borderRadius: 14, paddingLeft: 19, paddingRight: 19, scale: 1 },
  press: { borderRadius: 14, paddingLeft: 19, paddingRight: 19, scale: 0.98 },
};

const chevronVariants: Variants = {
  rest: { rotate: 0, y: 0 },
  hover: { rotate: 8, y: 1 },
  press: { rotate: 8, y: 1 },
};

export default function Button({
  href,
  children,
  variant = "outline",
  chevron = false,
  external = false,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "outline" | "solid";
  chevron?: boolean;
  external?: boolean;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  const classes = clsx(
    "inline-flex items-center justify-center gap-1.5 py-2.5 text-[13px] transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
    variant === "outline"
      ? "border border-ink/15 bg-white text-ink hover:border-ink/30 hover:bg-paper-dim"
      : "bg-ink text-paper hover:bg-ink/90",
    className
  );

  const variants = variant === "solid" ? solidVariants : outlineVariants;
  const transition = prefersReducedMotion ? REDUCED : variant === "solid" ? SOLID_SPRING : OUTLINE_SPRING;

  const content = (
    <>
      {children}
      {chevron && (
        <motion.svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          aria-hidden
          variants={chevronVariants}
          transition={transition}
        >
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      )}
    </>
  );

  const isExternalLike =
    external || href.startsWith("mailto:") || href.startsWith("http") || href.endsWith(".pdf");

  const motionProps = {
    initial: "rest",
    whileHover: "hover",
    whileTap: "press",
    variants,
    transition,
  };

  if (isExternalLike) {
    return (
      <motion.a
        href={href}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
        className={classes}
        {...motionProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <MotionLink href={href} className={classes} {...motionProps}>
      {content}
    </MotionLink>
  );
}
