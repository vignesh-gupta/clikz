import { NextRequest, NextResponse } from "next/server";

import { parse } from "~/lib/middleware/utils";

import { APP_DOMAIN, APP_NAMES, BASE_DOMAIN } from "./lib/constants";
import AppMiddleware from "./lib/middleware/app";
import { LinkMiddleware } from "./lib/middleware/link";
import {
  ALLOWED_EXTENSIONS,
  DEFAULT_LOGIN_REDIRECT,
  PUBLIC_ROUTE,
} from "./routes";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/ (proxies for third-party services)
     * 4. Metadata files: favicon.ico, sitemap.xml, robots.txt, manifest.webmanifest, .well-known
     */
    "/((?!api/|_next/|_proxy/|favicon.ico|sitemap.xml|robots.txt|manifest.webmanifest|.well-known).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  // AxiomMiddleware(req, event);

  const { domain, fullPath, nextUrl } = parse(req);

  if (ALLOWED_EXTENSIONS.some((ext) => fullPath.endsWith(ext))) {
    return NextResponse.next();
  }

  if (fullPath === "/" && domain === APP_DOMAIN) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl), 302);
  }

  if (PUBLIC_ROUTE.includes(req.nextUrl.pathname)) {
    if (domain !== BASE_DOMAIN) {
      return NextResponse.redirect(`https://${BASE_DOMAIN}${fullPath}`, 302);
    }

    return NextResponse.next();
  }

  if (APP_NAMES.has(domain)) return AppMiddleware(req);

  return LinkMiddleware(req);
}
