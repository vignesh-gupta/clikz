import { neon } from "@neondatabase/serverless";

import { serverEnv } from "./env/server";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const sql = neon(serverEnv.DATABASE_URL!);

export const conn = (query: string, params?: any[]) => {
  return sql(query, params);
};
