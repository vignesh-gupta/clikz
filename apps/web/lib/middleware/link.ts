import { NextRequest, NextResponse, after } from "next/server";

import { recordClickEvent } from "../analytics/click-events";
import { BASE_DOMAIN, DEFAULT_REDIRECTS } from "../constants";
import { getLinkViaEdge, parse } from "./utils";

export const LinkMiddleware = async (req: NextRequest) => {
  const { key, domain, fullPath, nextUrl } = parse(req);

  if (!key) return NextResponse.redirect(`https://${domain}${fullPath}`);

  if (domain === BASE_DOMAIN && DEFAULT_REDIRECTS.has(key)) {
    return NextResponse.redirect(new URL(DEFAULT_REDIRECTS.get(key)!, nextUrl));
  }

  const link = await getLinkViaEdge(key, domain);

  if (!link)
    return NextResponse.rewrite(new URL(`/${domain}/not-found`, req.url));

  after(() =>
    recordClickEvent({
      linkId: link.id,
      req,
      url: link.url,
      workspaceId: link.workspaceId,
    })
  );

  return NextResponse.redirect(link.url, {
    status: 302,
  });
};
