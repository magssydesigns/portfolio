import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isValidSessionCookieValue, SESSION_COOKIE_NAME } from "@/lib/auth/session";
import GradientScene from "@/components/GradientScene";
import Footer from "@/components/Footer";
import WaveHand from "@/components/WaveHand";
import UnlockForm from "./UnlockForm";
import ProjectMarquee from "./ProjectMarquee";

export const metadata: Metadata = {
  title: "Enter",
  robots: { index: false, follow: false },
};

const masthead = [
  {
    label: "Currently",
    body: "Leading the UK mobile experience at InPost & building experiments in free time",
  },
  {
    label: "Previously",
    body: "Building digital products and brands at Pixeled Eggs.",
  },
  {
    label: "Background",
    body: "Fashion Design, Central Saint Martins",
  },
];

function safeFrom(value: string | string[] | undefined): string {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return "/";
  }
  return value;
}

export default async function EnterPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string | string[] }>;
}) {
  const params = await searchParams;
  const from = safeFrom(params.from);

  const cookieStore = await cookies();
  if (isValidSessionCookieValue(cookieStore.get(SESSION_COOKIE_NAME)?.value)) {
    redirect(from);
  }

  return (
    <GradientScene>
      <header className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 sm:px-10">
        <span className="flex items-center gap-2 font-display text-sm tracking-tight text-ink sm:text-lg">
          <WaveHand />
          <span>Magdalena Marczewska</span>
        </span>
        <span className="font-sans text-[13px] text-ink-soft sm:text-base">Portfolio of work</span>
      </header>

      <section className="px-6 pb-16 pt-10 sm:px-10 sm:pb-24 sm:pt-16">
        <div className="mx-auto w-full max-w-xl rounded-2xl border border-line/60 bg-white/70 p-8 text-center shadow-sm backdrop-blur-xl sm:p-12">
          <h1 className="font-display text-3xl tracking-tight sm:text-4xl">Please enter passcode</h1>

          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
            You can find it on my{" "}
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="link-underline text-ink">
              Resume
            </a>
            . Can&rsquo;t find it?
            <br />
            Just drop me a message on{" "}
            <a
              href="https://www.linkedin.com/in/magdalena-marczewska-3b33b750/"
              target="_blank"
              rel="noreferrer"
              className="link-underline text-ink"
            >
              LinkedIn
            </a>
          </p>

          <UnlockForm from={from} />
        </div>
      </section>

      <ProjectMarquee />

      <section className="mx-auto max-w-[1400px] px-6 py-20 sm:px-10 sm:py-28">
        <h2 className="font-display text-3xl tracking-tight sm:text-4xl">About me</h2>

        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8">
          {masthead.map((item) => (
            <div key={item.label}>
              <p className="text-[12px] uppercase tracking-[0.14em] text-muted">{item.label}</p>
              <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-ink-soft">{item.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-16 max-w-[54.6rem] font-display text-[1.5rem] leading-relaxed text-black sm:text-[1.8rem]">
          Hey there, I&rsquo;m Magda — a Product Designer leading end-to-end
          design for the InPost UK consumer app, used by over 3 million
          active users. I work across discovery, strategy and delivery, and
          also support the design of web experiences and interfaces for
          smart parcel lockers.
        </p>
      </section>

      <Footer />
    </GradientScene>
  );
}
