import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopack: {
      root: ".", // This forces it to stay inside the project folder
    },
  },
};

export default nextConfig;