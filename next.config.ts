import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { qualities: [75, 90] },
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
