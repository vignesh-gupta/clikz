/* eslint-disable turbo/no-undeclared-env-vars */

export const BASE_DOMAIN = process.env.NEXT_PUBLIC_BASE_DOMAIN || "";
export const BASE_URL = BASE_DOMAIN.includes("localhost")
  ? `http://${BASE_DOMAIN}`
  : `https://${BASE_DOMAIN}`;

export const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN || "";
export const APP_URL = APP_DOMAIN.includes("localhost")
  ? `http://${APP_DOMAIN}`
  : `https://${APP_DOMAIN}`;

export const APP_NAMES = new Set([
  `${APP_DOMAIN}`,
  `preview.${BASE_DOMAIN}`,
  `app.${BASE_DOMAIN}`,
  "localhost:3000",
  "localhost",
]);

export const DEFAULT_REDIRECTS = new Map([
  ["home", APP_URL],
  ["signin", `${APP_URL}/sign-in`],
  ["sign-in", `${APP_URL}/sign-in`],
  ["login", `${APP_URL}/sign-in`],
  ["register", `${APP_URL}/sign-up`],
  ["signup", `${APP_URL}/sign-up`],
  ["sign-up", `${APP_URL}/sign-up`],
  ["app", `${APP_URL}`],
  ["dashboard", `${APP_URL}/dashboard`],
]);

export const GOOGLE_FAVICON_URL = "https://www.google.com/s2/favicons?domain=";
export const GOOGLE_FAVICON_URL_V2 =
  "https://www.google.com/s2/favicons?sz=64&domain_url=";

export const QUERY_KEYS = {
  LINK: ["link"],
  LINKS: ["links"],
  WORKSPACES: ["workspaces"],
  WORKSPACE: ["workspace"],
  MEMBERS: ["members"],
  INVITES: ["invites"],
};

export const AVATAR_URL = "https://api.dicebear.com/9.x/open-peeps/svg?seed=";

export const DATA_PREFIX = {
  WORKSPACE: "ws_",
  LINK: "ln_",
  USER: "us_",
  WORKSPACE_INVITE: "wsi_",
  USER_INVITE: "usi_",
};

export const DEFAULT_PAGE_SIZE = "10";
export const DEFAULT_PAGE = "0";
