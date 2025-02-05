import { neon } from "@neondatabase/serverless";

import { env } from "./env";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const sql = neon(env.DATABASE_URL!);

export const conn = (query: string, params?: any[]) => {
  return sql(query, params);
};
