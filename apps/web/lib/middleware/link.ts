import { NextRequest, NextResponse, after } from "next/server";

import { recordClickEvent } from "../analytics/click-events";
import { RequiredLinkProp } from "../types";
import { getLinkViaEdgeWithKey, parse } from "./utils";
import { getFinalUrl } from "./utils/final-url";
import { getLinkViaRedis, setLinkToRedis } from "./utils/link-utlis";

const LinkMiddleware = async (req: NextRequest) => {
  const { fullKey: originalKey, domain } = parse(req);

  console.log({ originalKey, domain });

  let fullKey = originalKey;

  // if key is empty string, set to _root (root domain link)
  if (originalKey === "") {
    fullKey = "_root";
  }
  let link: RequiredLinkProp | null = null;

  link = await getLinkViaRedis(fullKey, domain);

  if (!link) {
    console.log(
      `Link not found in Redis, fetching from Edge DB for  ${domain}/${fullKey}`,
      domain
    );
    link = await getLinkViaEdgeWithKey(fullKey, domain);
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

  const finalUrl = getFinalUrl(link.url, req);

  return NextResponse.redirect(finalUrl, {
    status: 302,
  });
};

export default LinkMiddleware;
