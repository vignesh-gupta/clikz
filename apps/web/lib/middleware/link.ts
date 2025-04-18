import { NextRequest, NextResponse, after } from "next/server";

import { Link } from "@prisma/client";

import { recordClickEvent } from "../analytics/click-events";
import { getLinkViaRedis, setLinkToRedis } from "../cache/link";
import { getLinkViaEdgeWithKey, parse } from "./utils";
import { getFinalUrl } from "./utils/final-url";

const LinkMiddleware = async (req: NextRequest) => {
  const { fullKey: originalKey, domain } = parse(req);

  let fullKey = originalKey;

  // if key is empty string, set to _root (root domain link)
  if (originalKey === "") {
    fullKey = "_root";
  }
  let link: Link | null = null;

  link = await getLinkViaRedis(fullKey, domain);

  if (!link) {
    console.info(
      `Link not found in Redis, fetching from Edge DB for  ${domain}/${fullKey}`
    );
    link = await getLinkViaEdgeWithKey({ domain, key: fullKey });
  }

  if (!link)
    return NextResponse.rewrite(new URL(`/${domain}/not-found`, req.url));

  if (!link.url) {
    // TODO: check for not found url of the domain
    return NextResponse.rewrite(new URL(`/${domain}`, req.url));
  }

  after(() => {
    recordClickEvent({
      link,
      req,
      url: link.url,
    });
    setLinkToRedis(fullKey, domain, link);
  });

  if (link.proxy) {
    const finalUrl = new URL(
      `/proxy/${encodeURIComponent(domain)}/${encodeURIComponent(fullKey)}`,
      req.url
    );

    return NextResponse.rewrite(finalUrl);
  }

  return NextResponse.redirect(getFinalUrl(link.url, req), {
    status: 302,
  });
};

export default LinkMiddleware;
