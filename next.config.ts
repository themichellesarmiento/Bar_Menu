import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.thecocktaildb.com",
        pathname: "/images/media/drink/**",
      },
    ],
  },
};

export default nextConfig;
