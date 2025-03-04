import { z } from "zod";

export const domainSchema = z.object({
  slug: z.string(),
  expiredUrl: z.string().optional(),
  notFoundUrl: z.string().optional(),
  placeholder: z.string().optional(),
  isArchived: z.boolean().default(false),
});
