import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const hostname = req.headers.get("host") || "";
  const { pathname } = req.nextUrl;

  const isAdminSubdomain = hostname.startsWith("admin.");

  if (isAdminSubdomain && !pathname.startsWith("/admin")) {
    return NextResponse.rewrite(new URL(`/admin${pathname}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};