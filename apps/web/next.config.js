/* eslint-disable turbo/no-undeclared-env-vars */
import { createJiti } from "jiti";
import { withAxiom } from "next-axiom";
import { fileURLToPath } from "node:url";

import { env } from "./lib/env";

const jiti = createJiti(fileURLToPath(import.meta.url));

// Import env here to validate during build. Using jiti@^1 we can import .ts files :)
jiti("./lib/env");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@clikz/ui"],
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
