import { NextRequest, NextResponse } from "next/server";

import {
  AUTH_API_ROUTE,
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
  PUBLIC_ROUTE,
} from "~/routes";

import { BASE_DOMAIN } from "../constants";
import { getUserFirstWorkspaceViaEdge, getUserViaToken, parse } from "./utils";

export const appRedirect = (path: string, req: NextRequest) =>
  new URL(`/app.clikz${path}`, req.nextUrl);

export const AppMiddleware = async (req: NextRequest) => {
  const { nextUrl, fullPath, domain } = parse(req);

  if (fullPath === "/") {
    if (domain === BASE_DOMAIN) return NextResponse.next();

    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  if (PUBLIC_ROUTE.includes(nextUrl.pathname)) {
    return NextResponse.next();
  }

  const user = await getUserViaToken();

  if (nextUrl.pathname.startsWith(AUTH_API_ROUTE)) {
    return NextResponse.next();
  }

  if (AUTH_ROUTES.includes(nextUrl.pathname)) {
    if (!(user && user?.id)) return NextResponse.next();

    // if user is logged in, redirect to callbackUrl
    const callbackUrl = decodeURIComponent(
      nextUrl.searchParams.get("callbackUrl") ?? DEFAULT_LOGIN_REDIRECT
    );
    return NextResponse.redirect(new URL(callbackUrl, nextUrl));
  }

  if (!(user && user.id)) {
    // If not a auth route and user is not logged in, redirect to sign-in
    console.log("Redirecting to sign-in");

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
    return NextResponse.rewrite(appRedirect(fullPath, req));

  const workspace = await getUserFirstWorkspaceViaEdge(user.id);

  if (!workspace) return NextResponse.redirect(new URL("/onboarding", nextUrl));

  if (fullPath === "/")
    return NextResponse.redirect(new URL(`/${workspace.slug}`, nextUrl));

  return NextResponse.rewrite(appRedirect(nextUrl.pathname, req));
};

export default AppMiddleware;
