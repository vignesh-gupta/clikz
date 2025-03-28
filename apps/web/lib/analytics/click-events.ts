import { NextRequest, userAgent } from "next/server";

import { Link } from "@prisma/client";
import { geolocation, ipAddress } from "@vercel/functions";

import { capitalize } from "@clikz/ui/lib/utils";

import { EU_COUNTRY_CODES } from "../constants/countries";
import { conn } from "../edge-db";
import { getFinalUrlForAnalytics } from "../middleware/utils/final-url";
import { detectBot, detectQR } from "../middleware/utils/link-utlis";
import { getDomainWithoutWWW } from "../utils/url";

type RecordClickEventProps = {
  req: NextRequest;
  link: Link;
  url: string;
};

export const recordClickEvent = async ({
  link,
  req,
  url,
}: RecordClickEventProps) => {
  if (detectBot(req)) return null;

  const isVercel = process.env.VERCEL === "1";

  const ip = isVercel ? ipAddress(req) : "0.0.0.1";

  // const cacheKey = `recordClick:${link}:${ip}`;

  const isQR = detectQR(req);

  const geo = isVercel
    ? geolocation(req)
    : {
        city: "Local",
        country: "Local",
        flag: "l",
        countryRegion: "Local",
        region: "local",
        latitude: "0",
        longitude: "0",
        postalCode: "0",
      };

  const isEU = geo.country && EU_COUNTRY_CODES.includes(geo.country);

  const ua = userAgent(req);
  const referer = req.headers.get("referer");

  // geolocation().region is Vercel's edge region – NOT the actual region
  // so we use the x-vercel-ip-country-region to get the actual region
  const { continent, region } =
    process.env.VERCEL === "1"
      ? {
          continent: req.headers.get("x-vercel-ip-continent"),
          region: req.headers.get("x-vercel-ip-country-region"),
        }
      : {
          continent: "<Unknown>",
          region: "<Unknown>",
        };

  const finalUrl = getFinalUrlForAnalytics(url, req);

  const clickData = {
    timestamp: new Date(),
    link_id: link.id,
    url: finalUrl,
    short_url: `${link.domain}/${link.key}`,
    workspace_id: link.workspaceId,
    workspace_slug: link.workspaceSlug,
    vercel_region: geo.region || "",
    country: geo.country || "Unknown",
    city: geo.city || "Unknown",
    region: region || "Unknown",
    continent: continent || "Unknown",
    latitude: geo.latitude || "Unknown",
    longitude: geo.longitude || "Unknown",
    device: capitalize(ua.device.type) || "Desktop",
    device_model: ua.device.model || "Unknown",
    device_vendor: ua.device.vendor || "Unknown",
    browser: ua.browser.name || "Unknown",
    browser_version: ua.browser.version || "Unknown",
    os: ua.os.name || "Unknown",
    os_version: ua.os.version || "Unknown",
    engine: ua.engine.name || "Unknown",
    engine_version: ua.engine.version || "Unknown",
    cpu_architecture: ua.cpu?.architecture || "Unknown",
    ua: ua.ua || "Unknown",
    bot: ua.isBot,
    referer: referer ? getDomainWithoutWWW(referer) || "(direct)" : "(direct)",
    referer_url: referer || "(direct)",
    ip: typeof ip === "string" && ip.trim().length > 0 && !isEU ? ip : "",
    qr: isQR,
  };

  return await Promise.allSettled([
    fetch("https://api.tinybird.co/v0/events?name=clikz_click_events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TINYBIRD_API_KEY}`,
      },
      body: JSON.stringify(clickData),
    })
      .then(async (res) => res.json())
      .catch((err) =>
        console.error("Failed to send click event to Tinybird", err)
      ),
    conn(`UPDATE "Link" SET clicks = clicks + 1 WHERE id = '${link.id}'`),
  ]);
};
