/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // Ensure the app directory is enabled
  },
  output: "export", // Enforce static exports
};

module.exports = nextConfig;