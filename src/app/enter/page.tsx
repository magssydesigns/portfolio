import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isValidSessionCookieValue, SESSION_COOKIE_NAME } from "@/lib/auth/session";
import UnlockForm from "./UnlockForm";

export const metadata: Metadata = {
  title: "Enter",
  robots: { index: false, follow: false },
};

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
    <main className="flex min-h-screen items-center justify-center px-6 py-24">
      <div className="w-full max-w-sm text-center">
        <h1 className="font-display text-4xl tracking-tight sm:text-5xl">Magdalena Marczewska</h1>
        <p className="mt-4 text-lg text-ink-soft sm:text-xl">Mobile-focused Product Designer &amp; Builder</p>

        <p className="mt-8 text-[15px] leading-relaxed text-ink-soft">
          This portfolio is password protected.
          <br />
          The password is included on my CV.
        </p>

        <UnlockForm from={from} />
      </div>
    </main>
  );
}
