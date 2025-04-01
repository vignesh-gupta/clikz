import { NextRequest } from "next/server";

export const detectBot = (req: NextRequest) => {
  const searchParams = new URL(req.url).searchParams;
  if (searchParams.get("bot")) return true;
  const ua = req.headers.get("User-Agent");
  if (ua) {
    /* Note:
     * - bot is for most bots & crawlers
     * - metatags is for Clikz.live Metatags API
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
