/* eslint-disable turbo/no-undeclared-env-vars */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const serverEnv = createEnv({
  server: {
    ANALYZE: z.enum(["true", "false"]).optional(),
    VERCEL: z.enum(["1", "0"]).optional(),
    DATABASE_URL: z.string().url(),
    AUTH_SECRET: z.string().min(1),
    AUTH_GITHUB_ID: z.string().min(1),
    AUTH_GITHUB_SECRET: z.string().min(1),
    AUTH_DISCORD_ID: z.string().min(1),
    AUTH_DISCORD_SECRET: z.string().min(1),
    AUTH_RESEND_KEY: z.string().min(1),
    IMAGEKIT_PRIVATE_KEY: z.string().min(1),
    TINYBIRD_API_KEY: z.string().min(1),
  },

  experimental__runtimeEnv: process.env,
});
