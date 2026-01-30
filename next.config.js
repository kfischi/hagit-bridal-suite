/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['hagit-bridal-preperation.b-cdn.net'],
    unoptimized: true, // Required for static export
  },
  // Remove 'output: export' - Netlify handles this automatically
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
