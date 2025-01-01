import { neon } from "@neondatabase/serverless";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const sql = neon(process.env.DATABASE_URL!);

export const conn = (query: string, params?: any[]) => {
  return sql(query, params);
};
