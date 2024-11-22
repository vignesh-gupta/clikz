/* eslint-disable turbo/no-undeclared-env-vars */
import { User } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

const SHORT_DOMAIN = "clikz.sh";

export const parse = (req: NextRequest) => {
  let domain = req.headers.get("host") as string;
  domain = domain.replace(/^www./, "").toLowerCase();
  if (domain === "clikz.localhost:3000" || domain.endsWith(".vercel.app")) {
    domain = SHORT_DOMAIN;
  }

  let path = req.nextUrl.pathname;

  const searchParams = req.nextUrl.searchParams.toString();
  const searchParamsString = searchParams.length > 0 ? `?${searchParams}` : "";
  const fullPath = `${path}${searchParamsString}`;

  const key = decodeURIComponent(path.split("/")[1] ?? "");
  const fullKey = decodeURIComponent(path.slice(1));

  return { domain, path, fullPath, key, fullKey, searchParamsString };
};

export async function getUserViaToken(req: NextRequest) {
  const session = (await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  })) as {
    email?: string;
    user?: User;
  };

  console.log("Session", session);
  

  return session;
}
