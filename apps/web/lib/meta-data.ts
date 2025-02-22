import { Metadata } from "next";

type MetaTagProps = {
  title?: string;
  description?: string;
  SITE_URL?: string;
  keywords?: string[];
};

export function constructMetaTags({
  SITE_URL = "https://clikz.live/",
  description = "Boost your marketing efforts with Clikz! Create, manage, and track your links effortlessly—collaborate with your team and gain powerful insights to maximize reach and engagement!",
  title = "Clikz - Manage your links effortlessly!",
  keywords = [],
}: MetaTagProps): Metadata {
  return {
    title,
    description,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@vigneshfixes",
      images: {
        url: "/thumbnail.jpeg",
        width: "100%",
        height: "auto",
        alt: title,
      },
    },
    openGraph: {
      title,
      description,
      images: {
        url: "/thumbnail.jpeg",
        alt: title,
      },
      type: "website",
      url: SITE_URL,
    },
    metadataBase: new URL(SITE_URL),
    authors: {
      name: "Vighnesh Gupta",
      url: new URL("https://vigneshgupta.me/"),
    },
    creator: "Vighnesh Gupta",
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
