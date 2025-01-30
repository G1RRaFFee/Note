import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: false,
  distDir: "dist",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
