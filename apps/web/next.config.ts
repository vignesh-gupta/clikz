import { NextConfig } from "next";

import { withAxiom } from "next-axiom";

import { serverEnv } from "./lib/env/server";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: serverEnv.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  transpilePackages: ["@clikz/ui", "@t3-oss/env-nextjs", "@t3-oss/env-core"],
  images: {
    remotePatterns: [
      {
        hostname: "avatars.githubusercontent.com",
        protocol: "https",
      },
      {
        hostname: "cdn.discordapp.com",
        protocol: "https",
      },
      {
        hostname: "avatar.vercel.sh",
        protocol: "https",
      },
      {
        hostname: "www.google.com",
        protocol: "https",
      },
      {
        hostname: "api.dicebear.com",
        protocol: "https",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
    ],
  },
};

module.exports = withAxiom(withBundleAnalyzer(nextConfig));
