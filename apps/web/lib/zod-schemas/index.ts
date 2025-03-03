import { z } from "zod";

export * from "./auth";
export * from "./link";
export * from "./workspace";

export const fetchParamsSchema = z.object({
  page: z.string().optional().default("0"),
  limit: z.string().optional().default("10"),
});

export type FetchParamsSchema = Partial<z.infer<typeof fetchParamsSchema>>;
