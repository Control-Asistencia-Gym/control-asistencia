/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  env: {
    baseUrl: "https://g8mslvxptj.execute-api.us-east-1.amazonaws.com/dev",
  },
};

module.exports = nextConfig;
