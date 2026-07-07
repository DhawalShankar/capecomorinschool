// proxy.ts  (at project root, alongside app/)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_HOST_PREFIX = "admin.";
const DEV_ADMIN_HOST = process.env.NEXT_PUBLIC_DEV_ADMIN_HOST;

export function proxy(req: NextRequest) {
  const hostname = req.headers.get("host") || "";
  const { pathname } = req.nextUrl;

  const isAdminHost =
    hostname.startsWith(ADMIN_HOST_PREFIX) ||
    (DEV_ADMIN_HOST && hostname === DEV_ADMIN_HOST);

  if (isAdminHost) {
    if (!pathname.startsWith("/admin")) {
      return NextResponse.rewrite(new URL(`/admin${pathname}`, req.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};