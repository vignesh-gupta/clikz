import { NextRequest, NextResponse } from "next/server";

import { NextURL } from "next/dist/server/web/next-url";

import {
  AUTH_API_ROUTE,
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
  PUBLIC_ROUTE,
} from "~/routes";

import { db } from "../db";
import { getUserViaToken, parse } from "./utils";

export const appRedirect = (path: string, url: NextURL) =>
  new URL(`/app.clikz${path}`, url);

export const AppMiddleware = async (req: NextRequest) => {
  const { nextUrl, fullPath } = parse(req);

  if (PUBLIC_ROUTE.includes(nextUrl.pathname)) {
    return NextResponse.next();
  }

  const user = await getUserViaToken(req);
  const isLoggedIn = !!(user && user.id);

  if (nextUrl.pathname.startsWith(AUTH_API_ROUTE)) {
    return NextResponse.next();
  }

  if (AUTH_ROUTES.includes(nextUrl.pathname)) {
    if (!isLoggedIn) return NextResponse.next();

    const callbackUrl = decodeURIComponent(
      nextUrl.searchParams.get("callbackUrl") ?? DEFAULT_LOGIN_REDIRECT
    );
    return NextResponse.redirect(new URL(callbackUrl, nextUrl));
  }

  if (!isLoggedIn) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return NextResponse.redirect(
      `${nextUrl.origin}/sign-in?callbackUrl=${encodedCallbackUrl}`
    );
  }

  if (fullPath.includes("/onboarding"))
    return NextResponse.rewrite(appRedirect(fullPath, nextUrl));

  const workspace = await db.workspace.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!workspace) return NextResponse.redirect(new URL("/onboarding", nextUrl));

  if (fullPath === "/")
    return NextResponse.redirect(new URL(`/${workspace.slug}`, nextUrl));

  return NextResponse.rewrite(appRedirect(nextUrl.pathname, nextUrl));
};

export default AppMiddleware;
