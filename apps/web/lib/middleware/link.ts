import { NextRequest, NextResponse } from "next/server";

import { recordClickEvent } from "../analytics/click-events";
import { db } from "../db";
import { parse } from "./utils";

// eslint-disable-next-line no-unused-vars
export const LinkMiddleware = async (req: NextRequest) => {
  const { key, domain, fullPath } = parse(req);

  if (!key) return NextResponse.redirect(`https://${domain}${fullPath}`);

  const link = await db.link.findFirst({
    where: {
      domain,
      key,
    },
  });

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
