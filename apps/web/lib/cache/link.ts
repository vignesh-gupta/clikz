import { RequiredLinkProp } from "../types";
import { redis } from "./redis";

const getCacheKey = (key: string, domain: string) => `link:${domain}:${key}`;

export const getLinkViaRedis = async (key: string, domain: string) => {
  const cacheKey = getCacheKey(key, domain);
  const cached = await redis.get(cacheKey);
  return cached as RequiredLinkProp | null;
};

export const setLinkToRedis = async (
  key: string,
  domain: string,
  link: RequiredLinkProp,
  expireInDay: number = 1
) => {
  const cacheKey = getCacheKey(key, domain);
  await redis.set(cacheKey, link, {
    ex:
      process.env.NODE_ENV === "development" ? 60 : 60 * 60 * 24 * expireInDay, // expire in 1 day as default in production and 1 minute in development
  });
};

export const deleteLinkFromRedis = async (key: string, domain: string) => {
  const cacheKey = getCacheKey(key, domain);
  await redis.del(cacheKey);
};

export const flushAllLinkCache = async () => {
  await redis.flushall();
};
