/* eslint-disable turbo/no-undeclared-env-vars */
export const APP_NAMES = new Set([
  `app.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  `preview.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  "app.localhost:3000",
]);

export const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN;
const protocol = process.env.NEXT_PUBLIC_APP_DOMAIN?.includes("localhost")
  ? "http"
  : "https";

export const DEFAULT_REDIRECTS = new Map([
  ["home", `${protocol}://${APP_DOMAIN}`],
  ["signin", `${protocol}://app.${APP_DOMAIN}/sign-in`],
  ["sign-in", `${protocol}://app.${APP_DOMAIN}/sign-in`],
  ["login", `${protocol}://app.${APP_DOMAIN}/sign-in`],
  ["register", `${protocol}://app.${APP_DOMAIN}/sign-up`],
  ["signup", `${protocol}://app.${APP_DOMAIN}/sign-up`],
  ["sign-up", `${protocol}://app.${APP_DOMAIN}/sign-up`],
  ["app", `${protocol}://app.${APP_DOMAIN}`],
  ["dashboard", `${protocol}://app.${APP_DOMAIN}/dashboard`],
]);

export const BASE_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export const GOOGLE_FAVICON_URL = "https://www.google.com/s2/favicons?domain=";
export const GOOGLE_FAVICON_URL_V2 =
  "https://www.google.com/s2/favicons?sz=64&domain_url=";
