import type { NextConfig } from 'next'

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.eroscaperoom.com' },
    ],
  },
  experimental: {
    // typedRoutes: true, // enable when all routes are defined
  },
  // Bundle analyzer: import('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' })
}

export default config
