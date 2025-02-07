/* eslint-disable turbo/no-undeclared-env-vars */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const sharedEnv = createEnv({
  shared: {
    NODE_ENV: z.enum(["development", "test", "production"]),
  },
  // For Next.js >= 13.4.4, you can just reference process.env:
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
  },
});
