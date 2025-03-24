import { z } from "zod";

export * from "./auth";
export * from "./domain";
export * from "./link";
export * from "./workspace";

export const fetchParamsSchema = z.object({
  page: z.string().optional().default("0"),
  limit: z.string().optional().default("10"),
});

export const workspaceSlugSchema = z.object({
  workspaceSlug: z.string(),
});

export type FetchParamsSchema = Partial<z.infer<typeof fetchParamsSchema>>;
