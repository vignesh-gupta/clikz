import { z } from "zod";

export const linkSchema = z.object({
  destination: z.string().url(),
  slug: z.string(),
  comment: z.string().optional(),
  domain: z.string().optional(),
});

export type LinkSchema = z.infer<typeof linkSchema>;
