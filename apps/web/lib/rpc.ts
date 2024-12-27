import { hc } from "hono/client";

import { AppType } from "~/app/api/[[...route]]/route";

import { BASE_URL } from "./constants";

export const client = hc<AppType>(BASE_URL);
