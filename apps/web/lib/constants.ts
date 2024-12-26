/* eslint-disable turbo/no-undeclared-env-vars */
export const APP_NAMES = new Set([
  `app.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  `preview.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  "localhost:3000",
  "localhost",
]);

export const DEFAULT_REDIRECT_DOMAIN =
  process.env.NEXT_PUBLIC_DEFAULT_REDIRECT_DOMAIN!;

export const BASE_URL = process.env.NEXT_PUBLIC_APP_URL!;

export const DEFAULT_REDIRECTS = new Map([
  ["home", BASE_URL],
  ["signin", `${BASE_URL}/sign-in`],
  ["sign-in", `${BASE_URL}/sign-in`],
  ["login", `${BASE_URL}/sign-in`],
  ["register", `${BASE_URL}/sign-up`],
  ["signup", `${BASE_URL}/sign-up`],
  ["sign-up", `${BASE_URL}/sign-up`],
  ["app", `${BASE_URL}`],
  ["dashboard", `${BASE_URL}/dashboard`],
]);

export const GOOGLE_FAVICON_URL = "https://www.google.com/s2/favicons?domain=";
export const GOOGLE_FAVICON_URL_V2 =
  "https://www.google.com/s2/favicons?sz=64&domain_url=";
