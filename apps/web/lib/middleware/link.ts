import { NextRequest, NextResponse } from "next/server";

import { recordClickEvent } from "../analytics/click-events";
import { DEFAULT_REDIRECTS, SHORT_REDIRECT_DOMAIN } from "../constants";
import { getLinkViaEdge, parse } from "./utils";

// eslint-disable-next-line no-unused-vars
export const LinkMiddleware = async (req: NextRequest) => {
  const { key, domain, fullPath, nextUrl } = parse(req);

  if (!key) return NextResponse.redirect(`https://${domain}${fullPath}`);

  if (domain === SHORT_REDIRECT_DOMAIN && DEFAULT_REDIRECTS.has(key)) {
    return NextResponse.redirect(new URL(DEFAULT_REDIRECTS.get(key)!, nextUrl));
  }

  const link = await getLinkViaEdge(key, domain);

  if (!link)
    return NextResponse.rewrite(new URL(`/${domain}/not-found`, req.url));

  recordClickEvent({
    linkId: link.id,
    req,
    url: link.url,
    workspaceId: link.workspaceId,
  });

  return NextResponse.redirect(link.url, {
    status: 302,
  });
};
