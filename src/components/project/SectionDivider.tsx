/**
 * Case-study section divider: a content-width rule carrying the standard
 * spacing rhythm on both sides (content -> 32px -> divider -> 32px -> content).
 * Both gaps live here (my-8), so neighbouring sections must not add their own
 * margins or padding at this boundary - that would break the exact 32px rhythm.
 */
export default function SectionDivider() {
  return <div className="mx-auto my-8 max-w-2xl border-t border-line" aria-hidden="true" />;
}
