import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["api.ts", "api.tsx", "page.tsx", "md.ts"],
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
      {
        hostname: "stackfood.com",
        pathname: "/**",
      },
      {
        hostname: "app.stackfood.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
