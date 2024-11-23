/* eslint-disable turbo/no-undeclared-env-vars */
export const APP_NAMES = new Set([
  `app.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  `preview.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  "app.localhost:3000",
  "localhost",
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
