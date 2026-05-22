import type { NextConfig } from 'next'

const config: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/inversores',
        destination: '/franquicia',
        permanent: false,
      },
      {
        source: '/inversores/:path*',
        destination: '/franquicia',
        permanent: false,
      },
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.eroscaperoom.com' },
    ],
  },
  experimental: {
    // typedRoutes: true, // enable when all routes are defined
  },
}

export default config
