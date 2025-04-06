import { MetadataRoute } from "next";

import { BASE_URL } from "@clikz/utils/constants";

const host = BASE_URL ?? "https://clikz.live";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: host,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    },
  ];
}
