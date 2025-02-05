import { env } from "../env";

export * from "./click-events";

// eslint-disable-next-line turbo/no-undeclared-env-vars
export const TINYBIRD_API_KEY = env.TINYBIRD_API_KEY;
export const TINYBIRD_PIPES_ENDPOINT = "https://api.tinybird.co/v0/pipes";
