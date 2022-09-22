/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  env: {
    baseUrl: "https://g8mslvxptj.execute-api.us-east-1.amazonaws.com/dev",
  },
};

module.exports = nextConfig;
