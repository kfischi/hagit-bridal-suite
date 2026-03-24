import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://suite-hagit.co.il'

  return [
    {
      url: base,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // ── בלוג ──
    {
      url: `${base}/blog`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/blog/hitargenut-kala-yom-chatuna`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/blog/suite-kalot-harei-yerushalayim`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/blog/tips-boker-chatuna`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/blog/aruchat-boker-kala`,
      lastModified: new Date('2026-03-24'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // ── עמודי מידע ──
    {
      url: `${base}/privacy`,
      lastModified: new Date('2026-01-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${base}/accessibility`,
      lastModified: new Date('2026-01-01'),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${base}/cookies`,
      lastModified: new Date('2026-01-01'),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    // /hashaka — noindex בכוונה, לא בסייטמאפ
  ]
}
