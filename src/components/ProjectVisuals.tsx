import type { ReactNode } from "react";
import clsx from "clsx";

function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-[1.6rem] border-[5px] border-[#0a0a0a] bg-white shadow-[0_30px_50px_-25px_rgba(0,0,0,0.35)]",
        className
      )}
    >
      <span className="absolute left-1/2 top-0 z-10 h-3.5 w-14 -translate-x-1/2 rounded-b-lg bg-[#0a0a0a]" />
      {children}
    </div>
  );
}

function Bar({ w, tone = "light" }: { w: string; tone?: "light" | "mid" | "dark" }) {
  return (
    <span
      className={clsx(
        "block h-1.5 rounded-full",
        tone === "light" && "bg-black/8",
        tone === "mid" && "bg-black/15",
        tone === "dark" && "bg-black/25"
      )}
      style={{ width: w }}
    />
  );
}

export function TrackingDetailVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center p-6 sm:p-10">
      <PhoneFrame className="w-[190px] sm:w-[220px]">
        <div className="pt-7">
          <div
            className="relative h-24 w-full"
            style={{ backgroundImage: "linear-gradient(160deg, #dfe6e2, #c7d2cc)" }}
          >
            <span className="absolute left-6 top-8 h-2 w-2 rounded-full bg-[#B8481F]" />
            <span className="absolute right-8 top-14 h-1.5 w-1.5 rounded-full bg-black/20" />
            <div className="absolute -bottom-4 left-3 right-3 rounded-lg bg-white p-2.5 shadow-md">
              <Bar w="70%" tone="mid" />
              <div className="mt-1.5">
                <Bar w="45%" tone="light" />
              </div>
            </div>
          </div>
          <div className="space-y-2.5 p-3 pt-8">
            <div className="flex items-center justify-between rounded-md bg-black/[0.03] p-2">
              <div className="w-2/3 space-y-1">
                <Bar w="80%" tone="mid" />
                <Bar w="50%" tone="light" />
              </div>
              <span className="rounded bg-[#B8481F]/15 px-1.5 py-0.5 text-[7px] font-medium text-[#B8481F]">8h</span>
            </div>
            <div className="flex items-center justify-between rounded-md p-2">
              <div className="w-2/3 space-y-1">
                <Bar w="65%" tone="light" />
                <Bar w="40%" tone="light" />
              </div>
            </div>
          </div>
          <div className="p-3 pt-1">
            <div className="h-8 w-full rounded-lg" style={{ backgroundColor: "#F3C511" }} />
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}

export function TrackingListVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center p-6 sm:p-10">
      <div className="absolute right-[8%] top-[10%] hidden w-32 rotate-3 rounded-xl bg-white p-3 shadow-lg sm:block">
        <span className="text-[7px] uppercase tracking-wider text-black/40">Light theme</span>
        <div className="mt-2 flex gap-1.5">
          <span className="h-6 flex-1 rounded" style={{ backgroundColor: "#F3C511" }} />
          <span className="h-6 flex-1 rounded bg-black" />
        </div>
        <div className="mt-2 grid grid-cols-4 gap-1">
          {["#e5e3dd", "#ffffff", "#111111", "#8a8a86", "#4caf50", "#9a9a95", "#2b2b28"].map((c) => (
            <span
              key={c}
              className="h-3.5 w-3.5 rounded-full border border-black/10"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>

      <PhoneFrame className="w-[190px] sm:w-[220px]">
        <div className="p-3 pt-7">
          <Bar w="55%" tone="mid" />
          <div className="mt-3 flex gap-1.5">
            <span className="rounded-full bg-black px-2.5 py-1 text-[7px] text-white">Receiving</span>
            <span className="rounded-full px-2.5 py-1 text-[7px] text-black/40">Sending</span>
          </div>
          <p className="mt-3 text-[7px] uppercase tracking-wider text-black/35">Ready to collect</p>
          <div className="mt-2 space-y-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center justify-between border-t border-black/5 pt-2">
                <div className="w-2/3 space-y-1">
                  <Bar w="75%" tone="mid" />
                  <Bar w="55%" tone="light" />
                </div>
                <span className="rounded bg-[#B8481F]/10 px-1.5 py-0.5 text-[6.5px] text-[#B8481F]">
                  {8 - i * 3}h
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between border-t border-black/5 px-4 py-2.5">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-2.5 w-2.5 rounded-sm bg-black/15" />
          ))}
        </div>
      </PhoneFrame>
    </div>
  );
}

export function SendParcelVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center p-6 sm:p-10">
      <PhoneFrame className="w-[190px] sm:w-[220px]">
        <div className="p-3 pt-7">
          <Bar w="40%" tone="mid" />
          <p className="mt-3 text-[7px] uppercase tracking-wider text-black/35">Send to</p>
          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-2 rounded-md border border-black/10 p-2">
              <span className="h-3 w-3 rounded-full border border-black/20" />
              <Bar w="60%" tone="mid" />
            </div>
            <div className="flex items-center gap-2 rounded-md border border-black/10 p-2" style={{ borderColor: "#00C853" }}>
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: "#00C853" }} />
              <Bar w="45%" tone="mid" />
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <Bar w="90%" tone="light" />
            <Bar w="80%" tone="light" />
          </div>
          <p className="mt-3 text-[7px] uppercase tracking-wider text-black/35">Size</p>
          <div className="mt-2 flex gap-1.5">
            {["S", "M", "L"].map((s, i) => (
              <span
                key={s}
                className={clsx(
                  "flex h-10 flex-1 flex-col items-center justify-center rounded-md border text-[8px] font-medium",
                  i === 0 ? "border-black bg-black text-white" : "border-black/10 text-black/50"
                )}
              >
                {s}
              </span>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-black/10 pt-2">
            <Bar w="30%" tone="mid" />
            <span className="text-[9px] font-medium">£9.99</span>
          </div>
          <div className="mt-2 h-8 w-full rounded-lg" style={{ backgroundColor: "#F3C511" }} />
        </div>
      </PhoneFrame>
    </div>
  );
}

function StickyNote({ className }: { className?: string }) {
  return (
    <div className={clsx("w-28 rounded-md bg-[#dbe9ff] p-2.5 shadow-md", className)}>
      <div className="space-y-1">
        <Bar w="95%" tone="mid" />
        <Bar w="85%" tone="mid" />
        <Bar w="60%" tone="mid" />
      </div>
    </div>
  );
}

export function ResearchVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center gap-3 p-6 sm:gap-5 sm:p-10">
      <StickyNote className="absolute left-[6%] top-[12%] z-10 -rotate-3" />

      <PhoneFrame className="w-[130px] sm:w-[155px]">
        <div className="space-y-1.5 p-2.5 pt-6">
          {["First name", "Last name", "Phone number", "Email"].map((label) => (
            <div key={label} className="rounded border border-black/10 p-1.5">
              <span className="text-[6px] text-black/35">{label}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 pt-1">
            <span className="h-2.5 w-2.5 rounded-full border border-black/20" />
            <Bar w="55%" tone="mid" />
          </div>
          <div className="flex items-center justify-between border-t border-black/10 pt-1.5">
            <Bar w="25%" tone="mid" />
            <span className="text-[7px] font-medium">£9.99</span>
          </div>
          <div className="h-6 w-full rounded-md bg-black" />
        </div>
      </PhoneFrame>

      <PhoneFrame className="w-[130px] sm:w-[155px]">
        <div className="space-y-1 p-2.5 pt-6">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="rounded border-b border-black/5 p-1">
              <Bar w={`${80 - i * 10}%`} tone="light" />
            </div>
          ))}
          <div className="mt-2 grid grid-cols-7 gap-[3px] rounded bg-black/5 p-1.5">
            {Array.from({ length: 21 }).map((_, i) => (
              <span key={i} className="h-2.5 rounded-[2px] bg-white" />
            ))}
          </div>
        </div>
      </PhoneFrame>

      <StickyNote className="absolute bottom-[10%] right-[4%] z-10 rotate-2" />
    </div>
  );
}
