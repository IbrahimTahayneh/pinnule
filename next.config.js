/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, isServer, dev, defaultLoaders, webpack }) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
