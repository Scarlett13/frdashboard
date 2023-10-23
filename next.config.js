/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'api.ts'],
  swcMinify: true,

  // Uncoment to add domain whitelist
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.suara.com',
        port: '',
        pathname: '/pictures/**',
      },
      {
        protocol: 'http',
        hostname: '192.168.10.31',
        port: '5000',
        pathname: '/**',
      },
    ],
  },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
