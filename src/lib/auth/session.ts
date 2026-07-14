import { createHmac, timingSafeEqual } from "crypto";

export const SESSION_COOKIE_NAME = "portfolio_session";

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days
export const SESSION_MAX_AGE_SECONDS = SESSION_TTL_MS / 1000;

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET environment variable is not set.");
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
}

/** Builds a `payload.signature` cookie value - no user data, just a signed expiry. */
export function createSessionCookieValue(): string {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = String(expiresAt);
  return `${payload}.${sign(payload)}`;
}

export function isValidSessionCookieValue(value: string | undefined | null): boolean {
  if (!value) return false;

  const [payload, signature] = value.split(".");
  if (!payload || !signature) return false;

  try {
    const expected = Buffer.from(sign(payload), "hex");
    const provided = Buffer.from(signature, "hex");
    if (expected.length !== provided.length || !timingSafeEqual(expected, provided)) {
      return false;
    }
  } catch {
    // Misconfigured SESSION_SECRET (or a malformed cookie) should fail closed,
    // not crash every page load - treat it the same as "not authenticated".
    return false;
  }

  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && Date.now() <= expiresAt;
}

/** Human-readable reason the gate can't work yet, or null if both secrets are set. */
export function getAuthConfigError(): string | null {
  if (!process.env.PORTFOLIO_PASSWORD) {
    return "This portfolio isn't fully configured yet - PORTFOLIO_PASSWORD is missing. Set it as an environment variable and restart the server.";
  }
  if (!process.env.SESSION_SECRET) {
    return "This portfolio isn't fully configured yet - SESSION_SECRET is missing. Set it as an environment variable and restart the server.";
  }
  return null;
}

/** Constant-time comparison against the portfolio password, regardless of length mismatch. */
export function isCorrectPassword(candidate: string): boolean {
  const expected = process.env.PORTFOLIO_PASSWORD;
  if (!expected) {
    throw new Error("PORTFOLIO_PASSWORD environment variable is not set.");
  }

  const expectedBuffer = Buffer.from(expected);
  const candidateBuffer = Buffer.from(candidate);

  if (expectedBuffer.length !== candidateBuffer.length) {
    // Run a same-shape comparison anyway so failure timing doesn't leak length info.
    timingSafeEqual(expectedBuffer, expectedBuffer);
    return false;
  }

  return timingSafeEqual(expectedBuffer, candidateBuffer);
}
