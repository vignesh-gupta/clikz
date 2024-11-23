import { NextRequest, NextResponse } from "next/server";
import { parse } from "./utils";
import { db } from "../db";

// eslint-disable-next-line no-unused-vars
export const LinkMiddleware = async (req: NextRequest) => {
  const { key, domain, fullPath } = parse(req);

  console.log(key, domain, fullPath);
  

  if (!key && !domain)
    return NextResponse.redirect(`https://${domain}${fullPath}`);

  const link = await db.link.findFirst({
    where: {
      domain,
      key,
    },
  });

  console.log(link);

  if(!link) return NextResponse.next();
  

  return NextResponse.redirect(link.url);
};
