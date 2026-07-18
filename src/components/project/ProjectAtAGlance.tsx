// Literal classes (not template-interpolated) so Tailwind's static analysis picks them up.
const ROW_GRID_COLS: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-4",
};

export type ProjectAtAGlanceItem = { label: string; value: string; description?: string };

/**
 * Renders "Project at a glance" style fact rows (Role, Scope, Core team...)
 * as label/value pairs. Each entry in `rows` is one visual row; rows get
 * comfortable vertical spacing between them so they read as distinct groups.
 */
export default function ProjectAtAGlance({ rows }: { rows: ProjectAtAGlanceItem[][] }) {
  return (
    <div className="space-y-10">
      {rows.map((row, rowIndex) => (
        <dl
          key={rowIndex}
          className={`grid grid-cols-1 gap-10 sm:gap-8 ${ROW_GRID_COLS[row.length] ?? "sm:grid-cols-4"}`}
        >
          {row.map((item) => (
            <div key={item.label}>
              <dt className="font-sans text-[12px] uppercase tracking-[0.14em] text-black">{item.label}</dt>
              <dd className="mt-3 max-w-xs font-sans text-[15px] leading-relaxed text-black">
                {item.value}
                {item.description ? `. ${item.description}` : null}
              </dd>
            </div>
          ))}
        </dl>
      ))}
    </div>
  );
}
