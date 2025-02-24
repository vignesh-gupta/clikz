import { NextRequest } from "next/server";

import { Link } from "@prisma/client";

import { redis } from "~/lib/redis";

export const detectBot = (req: NextRequest) => {
  const searchParams = new URL(req.url).searchParams;
  if (searchParams.get("bot")) return true;
  const ua = req.headers.get("User-Agent");
  if (ua) {
    /* Note:
     * - bot is for most bots & crawlers
     * - metatags is for Dub.co Metatags API (https://api.dub.co/metatags)
     * - ChatGPT is for ChatGPT
     * - bluesky is for Bluesky crawler
     * - facebookexternalhit is for Facebook crawler
     * - WhatsApp is for WhatsApp crawler
     * - MetaInspector is for https://metatags.io/
     * - Go-http-client/1.1 is a bot: https://user-agents.net/string/go-http-client-1-1
     * - iframely is for https://iframely.com/docs/about (used by Notion, Linear)
     */
    return /bot|metatags|chatgpt|bluesky|facebookexternalhit|WhatsApp|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex|MetaInspector|Go-http-client|iframely/i.test(
      ua
    );
  }
  return false;
};

export const detectQR = (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  return searchParams.get("qr") === "1";
};

export const getLinkViaRedis = async (key: string, domain: string) => {
  const cacheKey = `link:${domain}:${key}`;
  const cached = await redis.get(cacheKey);
  return cached as Link | null;
};

export const setLinkToRedis = async (
  key: string,
  domain: string,
  link: Link
) => {
  const cacheKey = `link:${domain}:${key}`;
  await redis.set(cacheKey, link);
};
