export type BeforeAfterStatItem = {
  label: string;
  before: string;
  after: string;
  description: string;
};

export default function BeforeAfterStats({
  items,
  color,
}: {
  items: BeforeAfterStatItem[];
  color: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="border-t border-ink/15 pt-6">
          <div className="flex items-center gap-4">
            <span className="font-display text-3xl text-muted line-through decoration-1">
              {item.before}
            </span>
            <span className="text-muted">→</span>
            <span className="font-display text-3xl" style={{ color }}>
              {item.after}
            </span>
          </div>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{item.description}</p>
          <p className="mt-2 text-sm text-muted">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
