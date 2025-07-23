import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["api.ts", "api.tsx", "page.tsx", "md.ts"],
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "stackfood.luxesoftwares.com.br",
        pathname: "/client/**",
      },
      {
        hostname: "images.pexels.com",
        protocol: "https",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
