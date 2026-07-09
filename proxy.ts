// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_HOST_PREFIX = "admin.";
const DEV_ADMIN_HOST = process.env.NEXT_PUBLIC_DEV_ADMIN_HOST;

const VALID_PUBLIC_PATHS = [
  "/",
  "/about",
  "/academics",
  "/admissions",
  "/faculty",
  "/gallery",
  "/calendar",
  "/notices",
  "/fees",
  "/contact",
];

const VALID_ADMIN_PATHS = [
  "/login",
  "/dashboard",
  "/teachers",
  "/students",
  "/registers",
  "/notices",
  "/calendar",
  "/fees",
];

// Static/public files that should always bypass the routing logic below,
// even if the matcher regex doesn't catch them (belt-and-suspenders vs
// the json-manifest bug).
const PROXY_BYPASS_PATHS = new Set([
  "/manifest.webmanifest",
  "/admin-manifest.json",
  "/robots.txt",
  "/sitemap.xml",
]);

export function proxy(req: NextRequest) {
  const hostname = req.headers.get("host") || "";
  const { pathname } = req.nextUrl;

  if (PROXY_BYPASS_PATHS.has(pathname) || pathname.startsWith("/admin/icons/")) {
    return NextResponse.next();
  }

  const isAdminHost =
    hostname.startsWith(ADMIN_HOST_PREFIX) ||
    (DEV_ADMIN_HOST && hostname === DEV_ADMIN_HOST);

  if (isAdminHost) {
    // Strip any accidental "/admin" prefix someone typed manually, so the
    // check below always compares against the clean short form.
    const shortPath = pathname.startsWith("/admin")
      ? pathname.slice("/admin".length) || "/"
      : pathname;

    if (!VALID_ADMIN_PATHS.includes(shortPath)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (!pathname.startsWith("/admin")) {
      return NextResponse.rewrite(new URL(`/admin${pathname}`, req.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!VALID_PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico|css|js|json|webmanifest|woff|woff2|ttf)$).*)",
  ],
};