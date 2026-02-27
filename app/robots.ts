import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  const base = 'https://suite-hagit.co.il'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/hashaka'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
