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

  const user = await getUserViaToken(req);

  const isLoggedIn = !!user;
  const isApiAuthRoute = nextUrl.pathname.startsWith(AUTH_API_ROUTE);
  const isPublicRoute = PUBLIC_ROUTE.includes(nextUrl.pathname);
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (!isLoggedIn) return NextResponse.next();

    const callbackUrl = decodeURIComponent(
      nextUrl.searchParams.get("callbackUrl") ?? DEFAULT_LOGIN_REDIRECT
    );
    return NextResponse.redirect(new URL(callbackUrl, nextUrl));
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return NextResponse.redirect(
      `${nextUrl.origin}/sign-in?callbackUrl=${encodedCallbackUrl}`
    );
  }

  if (fullPath.includes("/onboarding")) return NextResponse.next();

  const workspace = await db.workspace.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!workspace) {
    return NextResponse.redirect(new URL("/onboarding", nextUrl));
  }

  if (fullPath === "/") {
    return NextResponse.redirect(new URL(`/${workspace.slug}`, nextUrl));
  }

  return NextResponse.rewrite(appRedirect(nextUrl.pathname, nextUrl));
};

export default AppMiddleware;
