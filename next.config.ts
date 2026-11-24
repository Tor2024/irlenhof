import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [{ source: '/faq', destination: '/kontakt', permanent: true }];
  },
};

export default nextConfig;
