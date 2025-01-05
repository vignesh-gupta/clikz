/* eslint-disable turbo/no-undeclared-env-vars */
import { NextRequest, NextResponse } from "next/server";

import { parse } from "~/lib/middleware/utils";

import { APP_NAMES, BASE_DOMAIN } from "./lib/constants";
import AppMiddleware from "./lib/middleware/app";
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

export default async function middleware(req: NextRequest) {
  // AxiomMiddleware(req, event);

  const { domain, fullKey, fullPath, key, path } = parse(req);

  console.log({ domain, fullKey, fullPath, key, path });

  if (domain === `www.${BASE_DOMAIN}` && fullKey === "/")
    return NextResponse.next();

  if (APP_NAMES.has(domain)) {
    console.log("Routing to AppMiddleware");
    return AppMiddleware(req);
  }

  console.log("Routing to LinkMiddleware");
  return LinkMiddleware(req);
}
