export function PhoneVisual() {
  return (
    <div className="relative w-[240px] rotate-[-4deg] transition-transform duration-700 ease-out group-hover:rotate-0 group-hover:scale-[1.03] sm:w-[290px] lg:w-[320px]">
      <div className="relative aspect-[9/19] overflow-hidden rounded-[2.4rem] border-[6px] border-[#0f1a12] bg-[#0f1a12] shadow-[0_50px_100px_-40px_rgba(15,26,18,0.55)]">
        <span className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-[#0f1a12]" />
        <div className="flex h-full flex-col">
          <div
            className="relative h-[42%] w-full"
            style={{ backgroundImage: "linear-gradient(160deg, #2b5138, #0f1a12)" }}
          >
            <span className="absolute left-7 top-11 h-2 w-2 rounded-full bg-[#d7f26d]" />
            <span className="absolute right-10 top-16 h-1.5 w-1.5 rounded-full bg-[#d7f26d]/60" />
            <span className="absolute left-16 top-24 h-1.5 w-1.5 rounded-full bg-[#d7f26d]/40" />
            <span className="absolute right-16 top-28 h-2 w-2 rounded-full bg-[#d7f26d]/80" />
          </div>
          <div className="-mt-4 flex-1 space-y-3 rounded-t-[1.6rem] bg-[#f7f4ee] p-5">
            <div className="h-2.5 w-2/3 rounded-full bg-[#15140f]/10" />
            <div className="h-2.5 w-1/2 rounded-full bg-[#15140f]/10" />
            <div className="mt-4 h-11 w-full rounded-xl bg-[#d7f26d]/90" />
            <div className="h-2.5 w-3/4 rounded-full bg-[#15140f]/10" />
            <div className="h-2.5 w-1/3 rounded-full bg-[#15140f]/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TrackingVisual() {
  return (
    <div
      className="relative aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-sm transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      style={{ backgroundImage: "linear-gradient(160deg, #16303a, #0a1418)" }}
    >
      <svg className="absolute inset-0 h-full w-full opacity-80" viewBox="0 0 400 300" fill="none">
        <path
          d="M40 230 C 110 130, 170 270, 250 150 S 330 70, 372 96"
          stroke="#e7d9c9"
          strokeWidth="1"
          strokeDasharray="2 7"
        />
        <circle cx="40" cy="230" r="4" fill="#e7d9c9" />
        <circle cx="250" cy="150" r="4" fill="#e7d9c9" />
        <circle cx="372" cy="96" r="5" fill="#b8481f" />
      </svg>
      <div className="absolute bottom-7 left-7 w-48 rounded-lg bg-[#f7f4ee] p-4 shadow-xl">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#b8481f]" />
          <div className="h-2 w-20 rounded-full bg-[#15140f]/15" />
        </div>
        <div className="mt-3 h-2 w-full rounded-full bg-[#15140f]/10" />
        <div className="mt-2 h-2 w-2/3 rounded-full bg-[#15140f]/10" />
      </div>
    </div>
  );
}

export function SystemVisual() {
  return (
    <div className="relative aspect-[4/3] w-full max-w-2xl overflow-hidden rounded-sm border border-line bg-paper p-7 transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:p-9">
      <div className="flex gap-2.5">
        {["#b8481f", "#1f2a1a", "#dccfa9", "#4a4842", "#efebe1"].map((c) => (
          <span
            key={c}
            className="h-8 w-8 rounded-full border border-ink/10"
            style={{ background: c }}
          />
        ))}
      </div>
      <p className="mt-7 font-display text-6xl italic leading-none text-ink sm:text-7xl">Aa</p>
      <div className="mt-7 flex flex-wrap gap-3">
        <span className="h-8 w-20 rounded-full border border-ink/20" />
        <span className="h-8 w-8 rounded-md border border-ink/20" />
        <span className="h-8 w-28 rounded-md border border-ink/20" />
      </div>
      <div className="mt-7 grid grid-cols-6 gap-1.5">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="h-2 rounded-sm bg-ink/5" />
        ))}
      </div>
    </div>
  );
}
