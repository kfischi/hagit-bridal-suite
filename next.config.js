/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['hagit-bridal-preperation.b-cdn.net'],
    unoptimized: true,
  },
  output: 'export', // For static export
}

module.exports = nextConfig
