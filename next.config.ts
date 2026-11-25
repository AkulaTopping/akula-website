import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [25, 50, 75, 80],
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/en",
        destination: "/",
      },
      {
        source: "/en/:path*",
        destination: "/:path*",
      },
    ];
  },
};

export default nextConfig;
