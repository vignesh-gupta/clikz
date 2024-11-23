import { NextRequest, NextResponse } from "next/server";
import {
  AUTH_API_ROUTE,
  AUTH_ROUTES,
  DEFAULT_LOGIN_REDIRECT,
  PUBLIC_ROUTE,
} from "~/routes";
import { getUserViaToken } from "./utils";
import { NextURL } from "next/dist/server/web/next-url";

export const appRedirect = (url: NextURL) =>
  new URL(`/app.clikz${url.pathname}`, url);

export const AppMiddleware = async (req: NextRequest) => {
  const { nextUrl } = req;

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
      nextUrl.searchParams.get("callbackUrl") ?? DEFAULT_LOGIN_REDIRECT,
    );
    return NextResponse.redirect(new URL(callbackUrl, nextUrl));
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    console.log("Redirecting to sign-in", encodedCallbackUrl);

    return NextResponse.redirect(
      nextUrl.origin + "/sign-in?callbackUrl=" + encodedCallbackUrl,
    );
  }

  return NextResponse.rewrite(appRedirect(nextUrl));
};

export default AppMiddleware;
