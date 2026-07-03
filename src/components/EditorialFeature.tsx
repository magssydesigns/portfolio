import Link from "next/link";
import type { ReactNode } from "react";
import clsx from "clsx";

export default function EditorialFeature({
  index,
  headline,
  description,
  visual,
  href,
  tone = "light",
  reverse = false,
}: {
  index: string;
  headline: string;
  description: string;
  visual: ReactNode;
  href: string;
  tone?: "light" | "dark";
  reverse?: boolean;
}) {
  const dark = tone === "dark";

  return (
    <Link
      href={href}
      className={clsx("group block w-full", dark ? "bg-ink text-paper" : "bg-paper-dim text-ink")}
    >
      <div className="mx-auto grid min-h-[80vh] max-w-[1600px] grid-cols-1 items-center gap-14 px-6 py-24 sm:px-10 sm:py-28 lg:grid-cols-2 lg:gap-20">
        <div className={clsx("order-1 flex justify-center", reverse ? "lg:order-2" : "lg:order-1")}>
          {visual}
        </div>

        <div className={clsx("order-2", reverse ? "lg:order-1" : "lg:order-2")}>
          <span className={clsx("block font-display text-sm italic", dark ? "text-paper/50" : "text-muted")}>
            {index}
          </span>
          <h3
            className={clsx(
              "mt-4 inline-block max-w-md bg-left-bottom bg-no-repeat bg-[length:0%_2px] pb-2 font-display text-4xl leading-[1.08] tracking-tight transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_2px] sm:text-5xl lg:text-6xl"
            )}
            style={{ backgroundImage: "linear-gradient(currentColor, currentColor)" }}
          >
            {headline}
          </h3>
          <p className={clsx("mt-6 max-w-sm text-lg leading-relaxed", dark ? "text-paper/70" : "text-ink-soft")}>
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
