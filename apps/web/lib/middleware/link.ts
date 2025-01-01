import { NextRequest, NextResponse } from "next/server";

import { recordClickEvent } from "../analytics/click-events";
import { getLinkViaEdge, parse } from "./utils";

// eslint-disable-next-line no-unused-vars
export const LinkMiddleware = async (req: NextRequest) => {
  const { key, domain, fullPath } = parse(req);

  if (!key) return NextResponse.redirect(`https://${domain}${fullPath}`);

  const link = await getLinkViaEdge(key, domain);

  if (!link)
    return NextResponse.rewrite(new URL(`/${domain}/not-found`, req.url));

  recordClickEvent({
    linkId: link.id,
    req,
    url: link.url,
  });

  return NextResponse.redirect(link.url, {
    status: 302,
  });
};
