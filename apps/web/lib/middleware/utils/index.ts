import { NextRequest } from "next/server";

import { Link, Workspace } from "@prisma/client";
import { User } from "next-auth";
import { getToken } from "next-auth/jwt";

import { BASE_DOMAIN } from "~/lib/constants";
import { conn } from "~/lib/edge-db";

export const parse = (req: NextRequest) => {
  let domain = req.headers.get("host") as string;
  domain = domain.replace(/^www./, "").toLowerCase();
  if (domain.endsWith(".vercel.app")) domain = BASE_DOMAIN;

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
    secureCookie: process.env.NODE_ENV === "production",
  });
  return session?.user as User;
}

export const getUserDefaultWorkspaceViaEdge = async (userId: string) => {
  const query = `SELECT * FROM "Workspace" WHERE slug = (SELECT "defaultWorkspace" FROM "User" WHERE id = $1 LIMIT 1)`;
  const result = await conn(query, [userId]);

  return result[0] as Workspace | null;
};

export const getLinkViaEdgeWithKey = async (key: string, domain: string) => {
  const query = `SELECT * FROM "Link" WHERE "key" = '${key}' AND "domain" = '${domain}'`;
  console.log("Running query", query);

  const result = await conn(query);

  return result[0] as Link | null;
};
