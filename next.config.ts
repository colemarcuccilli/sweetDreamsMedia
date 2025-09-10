import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['fweeyjnqwxywmpmnqpts.supabase.co'],
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
