import { NextRequest, NextResponse } from "next/server";

import { parse } from "~/lib/middleware/utils";

import {
  APP_NAMES,
  BASE_DOMAIN,
  BASE_URL,
  DEFAULT_REDIRECTS,
} from "./lib/constants";
import AppMiddleware from "./lib/middleware/app";
import LinkMiddleware from "./lib/middleware/link";
import { ALLOWED_EXTENSIONS, PUBLIC_ROUTE } from "./routes";

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

  const { domain, fullPath, fullKey } = parse(req);

  if (ALLOWED_EXTENSIONS.some((ext) => fullPath.endsWith(ext))) {
    return NextResponse.next();
  }

  if (domain === BASE_DOMAIN && fullPath === "/") return NextResponse.next();
  if (PUBLIC_ROUTE.includes(req.nextUrl.pathname)) {
    if (domain !== BASE_DOMAIN) {
      return NextResponse.redirect(`${BASE_URL}${fullPath}`, 302);
    }

    return NextResponse.next();
  }
  if (APP_NAMES.has(domain)) return AppMiddleware(req);

  if (domain === BASE_DOMAIN && DEFAULT_REDIRECTS.has(fullKey)) {
    return NextResponse.redirect(
      new URL(DEFAULT_REDIRECTS.get(fullKey)!, req.nextUrl)
    );
  }

  return LinkMiddleware(req);
}
