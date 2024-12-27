import { z } from "zod";

export const getLinkSchema = z.object({
  slug: z.string(),
});
