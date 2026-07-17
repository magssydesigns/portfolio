import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isValidSessionCookieValue, SESSION_COOKIE_NAME } from "@/lib/auth/session";

export function proxy(request: NextRequest) {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  if (isValidSessionCookieValue(sessionCookie)) {
    return NextResponse.next();
  }

  const url = new URL("/enter", request.url);
  const from = request.nextUrl.pathname + request.nextUrl.search;
  if (from && from !== "/enter") {
    url.searchParams.set("from", from);
  }
  return NextResponse.redirect(url);
}

export const config = {
  // Everything runs through the gate except static files (own extension, e.g.
  // images/fonts/pdf) and /enter's own GET + form POST. Static public assets
  // must stay ungated because Next's image optimizer re-fetches them via an
  // internal request that carries no cookies - gating them breaks every
  // <Image> on the site.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|enter|.*\\..*).*)"],
};
