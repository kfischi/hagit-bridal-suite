import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogLayout from '@/components/BlogLayout'
import { getDynamicPost } from '@/lib/blog'

const SITE = 'https://suite-hagit.co.il'
const WA   = `https://wa.me/972522676718?text=${encodeURIComponent('היי חגית, קראתי את הבלוג ואשמח לשמוע פרטים על הסוויטה 💍')}`

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getDynamicPost(slug)
  if (!post) return {}

  return {
    title: post.metaTitle ?? `${post.title} | חגית סוויטת כלות`,
    description: post.metaDescription ?? post.excerpt,
    keywords: post.keywords ?? ['התארגנות כלה', 'סוויטת כלות', 'הרי ירושלים'],
    alternates: { canonical: `${SITE}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE}/blog/${slug}`,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

export default async function DynamicBlogPost({ params }: Props) {
  const { slug } = await params
  const post = getDynamicPost(slug)
  if (!post) notFound()

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: 'חגית ארגמן', url: SITE },
    publisher: { '@type': 'Organization', name: 'חגית סוויטת כלות', url: SITE },
    datePublished: post.date,
    url: `${SITE}/blog/${slug}`,
    inLanguage: 'he-IL',
  }

  return (
    <BlogLayout title={post.title}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />

      <article>
        <header className="mb-12">
          {post.category && (
            <p className="text-[#A07840] text-sm tracking-[0.2em] uppercase font-medium mb-4">{post.category}</p>
          )}
          <h1 className="font-cormorant text-4xl md:text-5xl text-[#2C241A] font-light leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-[#8B7355] text-sm font-light">
            {post.readTime} · {new Date(post.date).toLocaleDateString('he-IL', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </header>

        <div
          className="prose-hagit"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12 flex flex-col sm:flex-row gap-3">
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center bg-[#2C241A] hover:bg-[#4a3e2f] text-white px-6 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all"
          >
            שרייני בוקר חתונה מושלם ←
          </a>
          <a
            href="/blog"
            className="flex-1 text-center border border-[#C9A86A] text-[#A07840] hover:bg-[#C9A86A] hover:text-white px-6 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all"
          >
            לכל המאמרים →
          </a>
        </div>
      </article>
    </BlogLayout>
  )
}
