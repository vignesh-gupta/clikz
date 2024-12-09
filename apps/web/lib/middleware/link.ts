import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import { db } from "../db";
import { parse } from "./utils";

// eslint-disable-next-line no-unused-vars
export const LinkMiddleware = async (req: NextRequest) => {
  const { key, domain, fullPath } = parse(req);

  if (!key && !domain)
    return NextResponse.redirect(`https://${domain}${fullPath}`);

  const link = await db.link.findFirst({
    where: {
      domain,
      key,
    },
  });

  if (!link) return notFound();
  return NextResponse.redirect(link.url, {
    status: 302,
  });
};
