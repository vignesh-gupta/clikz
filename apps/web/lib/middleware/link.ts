import { NextRequest, NextResponse, after } from "next/server";

import { recordClickEvent } from "../analytics/click-events";
import { BASE_DOMAIN, DEFAULT_REDIRECTS } from "../constants";
import { getLinkViaEdge, parse } from "./utils";
import { getFinalUrl } from "./utils/final-url";
import { getLinkViaRedis, setLinkToRedis } from "./utils/link-utlis";

export const LinkMiddleware = async (req: NextRequest) => {
  const { key, domain, fullPath, nextUrl } = parse(req);

  if (!key) return NextResponse.redirect(`https://${domain}${fullPath}`);

  if (domain === BASE_DOMAIN && DEFAULT_REDIRECTS.has(key)) {
    return NextResponse.redirect(new URL(DEFAULT_REDIRECTS.get(key)!, nextUrl));
  }

  let link;

  link = await getLinkViaRedis(key, domain);

  if (!link) {
    console.log("Link not found in Redis, fetching from Edge DB");
    link = await getLinkViaEdge(key, domain);
  }

  if (!link)
    return NextResponse.rewrite(new URL(`/${domain}/not-found`, req.url));

  after(() => {
    recordClickEvent({
      link,
      req,
      url: link.url,
    });

    setLinkToRedis(key, domain, link);
  });

  const finalUrl = getFinalUrl(link.url, req);

  return NextResponse.redirect(finalUrl, {
    status: 302,
  });
};
