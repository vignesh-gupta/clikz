import { MetadataRoute } from "next";

import { BASE_URL } from "@clikz/utils/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/$"],
      disallow: ["/*"],
    },
    sitemap: `${BASE_URL ?? "https://clikz.live"}/sitemap.xml`,
  };
}
