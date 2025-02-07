/* eslint-disable turbo/no-undeclared-env-vars */
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const clientEnv = createEnv({
  client: {
    NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY: z.string().min(1),
    NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT: z.string().min(1),
    NEXT_PUBLIC_APP_DOMAIN: z.string().min(1),
    NEXT_PUBLIC_BASE_DOMAIN: z.string().min(1),
  },
  // For Next.js >= 13.4.4, you can just reference process.env:
  runtimeEnv: {
    NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY:
      process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT:
      process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
    NEXT_PUBLIC_APP_DOMAIN: process.env.NEXT_PUBLIC_APP_DOMAIN,
    NEXT_PUBLIC_BASE_DOMAIN: process.env.NEXT_PUBLIC_BASE_DOMAIN,
  },
});
