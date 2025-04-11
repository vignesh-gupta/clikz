import { hc } from "hono/client";

import { APP_URL } from "@clikz/utils/constants";

import { AppType } from "~/app/api/[[...route]]/route";

export const client = hc<AppType>(APP_URL);
