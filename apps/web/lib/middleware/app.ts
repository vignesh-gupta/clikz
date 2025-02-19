import { NextRequest, NextResponse } from "next/server";

import { AUTH_API_ROUTE, AUTH_ROUTES, DEFAULT_LOGIN_REDIRECT } from "~/routes";

import { getUserFirstWorkspaceViaEdge, getUserViaToken, parse } from "./utils";

export const appRedirect = (path: string, req: NextRequest) =>
  new URL(`/app.clikz${path}`, req.nextUrl);

export const AppMiddleware = async (req: NextRequest) => {
  const { nextUrl, fullPath } = parse(req);

  if (nextUrl.pathname.startsWith(AUTH_API_ROUTE)) {
    return NextResponse.next();
  }

  const user = await getUserViaToken(req);

  if (AUTH_ROUTES.includes(nextUrl.pathname)) {
    if (user?.id) {
      const callbackUrl = decodeURIComponent(
        nextUrl.searchParams.get("callbackUrl") ?? DEFAULT_LOGIN_REDIRECT
      );
      return NextResponse.redirect(new URL(callbackUrl, nextUrl));
    }
    return NextResponse.next();
  }

  if (!user?.id) {
    const callbackUrl = encodeURIComponent(
      nextUrl.pathname + (nextUrl.search || "")
    );
    return NextResponse.redirect(
      `${nextUrl.origin}/sign-in?callbackUrl=${callbackUrl}`
    );
  }

  if (fullPath.includes("/onboarding")) {
    return NextResponse.rewrite(appRedirect(fullPath, req));
  }

  const workspace = await getUserFirstWorkspaceViaEdge(user.id);

  if (!workspace) {
    return NextResponse.redirect(new URL("/onboarding", nextUrl));
  }

  if (fullPath === "/") {
    return NextResponse.redirect(new URL(`/${workspace.slug}`, nextUrl));
  }

  return NextResponse.rewrite(appRedirect(fullPath, req));
};

export default AppMiddleware;
