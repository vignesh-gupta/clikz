import { Redis } from "@upstash/redis";

export const redis = Redis.fromEnv({
  retry: {
    backoff: (retryCount) => Math.exp(retryCount) * 50,
  },
});
