import clsx from "clsx";

export default function Cover({
  from,
  to,
  index,
  title,
  aspect = "aspect-[4/3]",
  className,
}: {
  from: string;
  to: string;
  index: string;
  title: string;
  aspect?: string;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "relative flex w-full items-end overflow-hidden rounded-sm",
        aspect,
        className
      )}
      style={{
        backgroundImage: `linear-gradient(155deg, ${from}, ${to})`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <span className="absolute right-6 top-6 font-display text-sm italic text-paper/50">
        {index}
      </span>
      <span className="relative z-10 p-6 font-display text-2xl leading-tight text-paper/90 sm:text-3xl">
        {title}
      </span>
    </div>
  );
}
