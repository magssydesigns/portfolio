/**
 * Small pulsing status dot - the same size, shape and animation as the one
 * shown beside "Currently" in the homepage About/masthead section, with the
 * colour left overridable so it can be reused wherever a "this is live/in
 * progress" indicator is needed.
 */
export default function PulsingDot({
  color,
  className,
}: {
  /** Overrides the dot's colour. Defaults to the same bg-green-500 used everywhere the dot originally appeared. */
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={`h-1.5 w-1.5 shrink-0 animate-pulse rounded-full ${color ? "" : "bg-green-500"} ${className ?? ""}`}
      style={color ? { backgroundColor: color } : undefined}
      aria-hidden
    />
  );
}
