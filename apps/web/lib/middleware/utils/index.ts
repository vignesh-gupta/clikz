/* eslint-disable turbo/no-undeclared-env-vars */
import { NextRequest } from "next/server";

import { User } from "next-auth";
import { getToken } from "next-auth/jwt";

import { conn } from "~/lib/edge-db";
import { LinkProp, WorkspaceProp } from "~/lib/types";

const SHORT_DOMAIN = "clikz.sh";

export const parse = (req: NextRequest) => {
  let domain = req.headers.get("host") as string;
  domain = domain.replace(/^www./, "").toLowerCase();
  if (domain === "clikz.localhost:8888" || domain.endsWith(".vercel.app")) {
    domain = SHORT_DOMAIN;
  }

  let path = req.nextUrl.pathname;

  const searchParams = req.nextUrl.searchParams.toString();
  const searchParamsString = searchParams.length > 0 ? `?${searchParams}` : "";
  const fullPath = `${path}${searchParamsString}`;

  const key = decodeURIComponent(path.split("/")[1] ?? "");
  const fullKey = decodeURIComponent(path.slice(1));

  return {
    domain,
    path,
    fullPath,
    key,
    fullKey,
    searchParamsString,
    nextUrl: req.nextUrl,
  };
};

export async function getUserViaToken(req: NextRequest) {
  const session = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });
  return session?.user as User;
}

export const getUserFirstWorkspaceViaEdge = async (userId: string) => {
  const query = `SELECT * FROM "Workspace" WHERE "userId" = '${userId}' ORDER BY "createdAt" ASC LIMIT 1`;
  const result = await conn(query);

  return result[0] as WorkspaceProp;
};

export const getLinkViaEdge = async (key: string, domain: string) => {
  const query = `SELECT * FROM "Link" WHERE "key" = '${key}' AND "domain" = '${domain}'`;
  const result = await conn(query);

  return result[0] as LinkProp;
};
