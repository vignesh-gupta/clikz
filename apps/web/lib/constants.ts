/* eslint-disable turbo/no-undeclared-env-vars */

export const DEFAULT_REDIRECT_DOMAIN =
  process.env.NEXT_PUBLIC_DEFAULT_REDIRECT_DOMAIN!;
export const DEFAULT_REDIRECT_URL = DEFAULT_REDIRECT_DOMAIN.includes(
  "localhost"
)
  ? `http://${DEFAULT_REDIRECT_DOMAIN}`
  : `https://${DEFAULT_REDIRECT_DOMAIN}`;

export const BASE_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN!;
export const BASE_URL = BASE_DOMAIN.includes("localhost")
  ? `http://${BASE_DOMAIN}`
  : `https://${BASE_DOMAIN}`;

export const APP_NAMES = new Set([
  `app.${BASE_DOMAIN}`,
  `preview.${BASE_DOMAIN}`,
  "localhost:3000",
  "localhost",
]);

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

export const QUERY_KEYS = {
  LINK: ["link"],
  LINKS: ["links"],
  WORKSPACES: ["workspaces"],
  WORKSPACE: ["workspace"],
  MEMBERS: ["members"],
  INVITES: ["invites"],
};

export const AVATAR_URL = "https://api.dicebear.com/9.x/open-peeps/svg?seed=";

export const DB_PREFIX = {
  WORKSPACE: "ws_",
  LINK: "ln_",
  USER: "us_",
  WORKSPACE_INVITE: "wsi_",
  USER_INVITE: "usi_",
};
