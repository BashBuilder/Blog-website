import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

const isProd = process.env.NODE_ENV === 'production'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const remotePatterns = isProd
  ? [
      {
        protocol: 'https',
        hostname: 'qorepay-blog.vercel.app',
        pathname: '/api/media/file/**',
      },
    ]
  : [
      {
        hostname: 'localhost:3000',
        protocol: 'http',
        // pathname: '/api/media/file/**',
      },
      // ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
      //   const url = new URL(item)

      //   return {
      //     hostname: url.hostname,
      //     protocol: url.protocol.replace(':', ''),
      //   }
      // }),
    ]

const nextConfig = {
  images: {
    remotePatterns: [
      ...['https://qorepay-blog.vercel.app'].map((item) => {
        const url = new URL(item)
        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
