/* eslint-disable turbo/no-undeclared-env-vars */
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import { parse } from "~/lib/middleware/utils";

import { APP_NAMES, DEFAULT_REDIRECTS } from "./lib/constants";
import AppMiddleware from "./lib/middleware/app";
import AxiomMiddleware from "./lib/middleware/axiom";
import { LinkMiddleware } from "./lib/middleware/link";

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

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  AxiomMiddleware(req, event);

  const { domain, fullPath, key, nextUrl } = parse(req);

  if (domain === process.env.NEXT_PUBLIC_APP_DOMAIN) {
    if (fullPath === "/") return NextResponse.next();
    if (DEFAULT_REDIRECTS.has(key))
      return NextResponse.redirect(
        new URL(DEFAULT_REDIRECTS.get(key)!, nextUrl)
      );
  }

  if (APP_NAMES.has(domain)) {
    return AppMiddleware(req);
  }

  return LinkMiddleware(req);
}
