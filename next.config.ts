import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["api.ts", "api.tsx", "page.tsx", "md.ts"],
  // path prefix for Image Optimization API, useful with `loader`
  path: "/_next/image",
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "app.stackfood.com",
        pathname: "/client/**",
      },
    ],
  },
};

export default nextConfig;
