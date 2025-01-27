import { z } from "zod";

export * from "./auth-schemas";
export * from "./link-schemas";
export * from "./workspace-schemas";

export const fetchParamsSchema = z.object({
  page: z.number().int().positive().default(1),
  perPage: z.number().int().positive().default(10),
});

export type FetchParamsSchema = Partial<z.infer<typeof fetchParamsSchema>>;
