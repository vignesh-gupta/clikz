import { hc } from "hono/client";

import { AppType } from "~/app/api/[[...route]]/route";

import { BASE_DOMAIN } from "./constants";

const BASE_URL = BASE_DOMAIN.includes("localhost")
  ? `http://${BASE_DOMAIN}`
  : `https://app.${BASE_DOMAIN}`;

export const client = hc<AppType>(BASE_URL);
