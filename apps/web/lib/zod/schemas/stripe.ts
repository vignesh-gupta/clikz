import { z } from "zod";

export const stripeMetadataSchema = z.object({
  userId: z.string(),
  workspaceSlug: z.string(),
  priceId: z.string(),
  plan: z.enum(["FREE", "PRO", "ENTERPRISE"]),
});
