import { NextRequest, NextResponse, after } from "next/server";

import { recordClickEvent } from "../analytics/click-events";
import { BASE_DOMAIN, DEFAULT_REDIRECTS } from "../constants";
import { RequiredLinkProp } from "../types";
import { getLinkViaEdgeWithKey, parse } from "./utils";
import { getFinalUrl } from "./utils/final-url";
import { getLinkViaRedis, setLinkToRedis } from "./utils/link-utlis";

const LinkMiddleware = async (req: NextRequest) => {
  const { fullKey, domain, fullPath, nextUrl } = parse(req);

  if (!fullKey) return NextResponse.redirect(`https://${domain}${fullPath}`);

  if (domain === BASE_DOMAIN && DEFAULT_REDIRECTS.has(fullKey)) {
    return NextResponse.redirect(
      new URL(DEFAULT_REDIRECTS.get(fullKey)!, nextUrl)
    );
  }

  let link: RequiredLinkProp | null = null;

  link = await getLinkViaRedis(fullKey, domain);

  if (!link) {
    console.log("Link not found in Redis, fetching from Edge DB");
    link = await getLinkViaEdgeWithKey(fullKey, domain);
  }

  if (!link)
    return NextResponse.rewrite(new URL(`/${domain}/not-found`, req.url));

  after(() => {
    recordClickEvent({
      link,
      req,
      url: link.url,
    });

    setLinkToRedis(fullKey, domain, link);
  });

  const finalUrl = getFinalUrl(link.url, req);

  return NextResponse.redirect(finalUrl, {
    status: 302,
  });
};

export default LinkMiddleware;
