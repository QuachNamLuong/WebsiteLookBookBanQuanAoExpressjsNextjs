import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.tunhamay.vn",
      },
    ],
  },
};

export default nextConfig;
