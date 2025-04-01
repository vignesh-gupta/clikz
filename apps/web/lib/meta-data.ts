import { Metadata } from "next";

import { BASE_URL } from "./constants";

type MetaTagProps = {
  title?: string;
  fullTitle?: string;
  description?: string;
  image?: string | null;
  video?: string | null;
  icons?: Metadata["icons"];
  url?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  manifest?: string | URL | null;
  keywords?: string[];
};

export function constructMetadata({
  title,
  fullTitle,
  description = "Reduce your marketing efforts with Clikz! Create, manage, and track your links effortlessly—collaborate with your team and gain powerful insights to maximize reach and engagement!",
  image = "https://www.clikz.live/thumbnail.jpeg",
  video,
  icons = [
    {
      rel: "apple-touch-icon",
      sizes: "32x32",
      url: "https://www.clikz.live/favicons/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "https://www.clikz.live/favicons/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "https://www.clikz.live/favicons/favicon-16x16.png",
    },
  ],
  url,
  canonicalUrl,
  noIndex = false,
  manifest,
  keywords = [],
}: MetaTagProps = {}): Metadata {
  return {
    title:
      fullTitle ||
      (title ? `${title} | Clikz` : "Clikz - Manage your links effortlessly!"),
    description,
    openGraph: {
      title,
      description,
      ...(image && {
        images: image,
      }),
      url,
      ...(video && {
        videos: video,
      }),
    },
    twitter: {
      title,
      description,
      ...(image && {
        card: "summary_large_image",
        images: [image],
      }),
      ...(video && {
        player: video,
      }),
      creator: "@vigneshfixes",
    },
    authors: {
      name: "Vighnesh Gupta",
      url: new URL("https://vigneshgupta.me/"),
    },
    icons,
    metadataBase: new URL(BASE_URL),
    ...((url || canonicalUrl) && {
      alternates: {
        canonical: url || canonicalUrl,
      },
    }),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    ...(manifest && {
      manifest,
    }),
    keywords: [
      "nextjs",
      "frontend",
      "tailwindcss",
      "vignesh",
      "react",
      "vercel",
      "shadcn",
      "auth.js",
      "imagekit",
      "hono",
      "turbo",
      "Link management tool",
      "URL shortener for teams",
      "Link tracking software",
      "Custom branded links",
      "Best link management app",
      "Link analytics dashboard",
      "URL analytics platform",
      "Smart link sharing",
      "Marketing link tracker",
      "UTM tracking tool",
      "URL performance analytics",
      "Digital marketing links",
      "Team-based link management",
      "Link engagement insights",
      "Social media link tracking",
      "Campaign link optimization",
      "Advanced link analytics",
      "Click tracking software",
      "SEO-friendly link shortener",
      "Marketing attribution links",
      "dub",
      "dub alternative",
      ...keywords,
    ],
  };
}
