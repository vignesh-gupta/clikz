import { z } from "zod";

export const domainSchema = z.object({
  slug: z.string(),
  expiredUrl: z.string().optional(),
  notFoundUrl: z.string().optional(),
  placeholder: z.string().optional(),
  isArchived: z.boolean().default(false),
});

export const domainFilterSchema = z.object({
  verified: z.enum(["true"]).optional(),
  archived: z.enum(["true"]).optional(),
});

export const domainStatusUpdateSchema = z.object({
  slug: z.string(),
  currentStatus: z.enum(["PENDING", "VERIFIED", "FAILED"]),
});
