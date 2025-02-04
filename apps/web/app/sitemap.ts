import { MetadataRoute } from "next";

import { BASE_URL } from "~/lib/constants";

const host = BASE_URL ?? "https://vigneshgupta.tech";

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
