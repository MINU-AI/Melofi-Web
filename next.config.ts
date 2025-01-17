import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "da5weajhz8yl4.cloudfront.net",
        pathname: "/songs/**",
      },
      {
        protocol: "https",
        hostname: "scontent.fhan18-1.fna.fbcdn.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "scontent.fna.fbcdn.net",
        pathname: "/**",
      },
    ],
    unoptimized: true,
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
