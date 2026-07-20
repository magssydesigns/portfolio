"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createSessionCookieValue,
  getAuthConfigError,
  isCorrectPassword,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "./session";

export type UnlockState = { error?: string } | undefined;

/** Only ever redirect back into the site itself - never to an external host. */
function safeRedirectTarget(value: FormDataEntryValue | null): string {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return "/";
  }
  return value;
}

export async function unlockPortfolio(_prevState: UnlockState, formData: FormData): Promise<UnlockState> {
  const configError = getAuthConfigError();
  if (configError) {
    return { error: configError };
  }

  const code = String(formData.get("code") ?? "");
  const from = safeRedirectTarget(formData.get("from"));

  if (!code || !isCorrectPassword(code)) {
    return { error: "That code doesn't look right. Please try again." };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, createSessionCookieValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
  });

  redirect(from);
}
