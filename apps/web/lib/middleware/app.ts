import { NextRequest, NextResponse } from "next/server";

import {
  AUTH_API_ROUTE,
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
} from "@clikz/utils/constants";

import {
  getUserDefaultWorkspaceViaEdge,
  getUserViaToken,
  parse,
} from "./utils";

const appRedirect = (path: string, req: NextRequest) =>
  new URL(`/app.clikz${path}`, req.nextUrl);

export const AppMiddleware = async (req: NextRequest) => {
  const { nextUrl, fullPath, fullKey } = parse(req);

  if (fullPath.startsWith(AUTH_API_ROUTE)) {
    return NextResponse.next();
  }

  const user = await getUserViaToken(req);

  if (AUTH_ROUTES.includes(fullKey)) {
    if (user?.id) {
      const callbackUrl = decodeURIComponent(
        nextUrl.searchParams.get("callbackUrl") ?? DEFAULT_LOGIN_REDIRECT
      );
      return NextResponse.redirect(new URL(callbackUrl, nextUrl));
    }
    return NextResponse.next();
  }

  if (!user || !user.id) {
    const callbackUrl = encodeURIComponent(
      nextUrl.pathname + (nextUrl.search || "")
    );
    return NextResponse.redirect(
      `${nextUrl.origin}/sign-in?callbackUrl=${callbackUrl}`
    );
  }

  if (fullKey.startsWith("invite"))
    return NextResponse.rewrite(appRedirect(fullPath, req));

  if (fullPath.includes("/onboarding")) {
    return NextResponse.rewrite(appRedirect(fullPath, req));
  }

  const workspace = await getUserDefaultWorkspaceViaEdge(user.id);

  if (!workspace) {
    return NextResponse.redirect(new URL("/onboarding", nextUrl));
  }

  if (fullPath === "/" || fullPath === DEFAULT_LOGIN_REDIRECT) {
    return NextResponse.redirect(new URL(`/${workspace.slug}`, nextUrl));
  }

  return NextResponse.rewrite(appRedirect(fullPath, req));
};

export default AppMiddleware;
