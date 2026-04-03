import type { Metadata } from 'next'
import Link from 'next/link'
import BlogLayout from '@/components/BlogLayout'
import { getDynamicPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'בלוג התארגנות כלות | טיפים לחתונה | חגית סוויטת כלות הרי ירושלים',
  description: 'מאמרים וטיפים מעשיים לכלות: התארגנות ביום החתונה, ארוחת בוקר, בחירת מאפרת, סוויטת כלות בהרי ירושלים ועוד — מניסיון חגית ארגמן.',
  keywords: ['התארגנות כלה', 'בלוג חתונה', 'טיפים לכלה', 'בוקר חתונה', 'סוויטת כלות', 'הרי ירושלים'],
  alternates: { canonical: 'https://suite-hagit.co.il/blog' },
  openGraph: {
    title: 'בלוג התארגנות כלות | חגית סוויטת כלות',
    description: 'מאמרים מעשיים לכלות מניסיון חגית ארגמן — בעלת סוויטת כלות בהרי ירושלים.',
    url: 'https://suite-hagit.co.il/blog',
    type: 'website',
  },
}

const STATIC_ARTICLES = [
  {
    slug: 'hitargenut-kala-yom-chatuna',
    title: 'התארגנות כלה ביום החתונה — המדריך המלא',
    excerpt: 'כל מה שצריך לדעת על התארגנות ביום החתונה: לוח זמנים, רשימת ציוד ואיך בוחרים מקום שיגרום לך להגיע לחופה רגועה ומוכנה.',
    readTime: '5 דקות קריאה',
    date: '2026-03-01',
  },
  {
    slug: 'suite-kalot-harei-yerushalayim',
    title: 'סוויטת כלות בהרי ירושלים — מה לצפות',
    excerpt: 'גילינו את הסוד הגלוי של הכלות שמגיעות לחופה זוהרות ורגועות — הן בוחרות להתארגן בסוויטה פרטית בהרי ירושלים.',
    readTime: '4 דקות קריאה',
    date: '2026-03-10',
  },
  {
    slug: 'tips-boker-chatuna',
    title: '10 טיפים לבוקר חתונה מושלם',
    excerpt: 'בוקר החתונה יכול להיות כאוטי — או קסום. עם הכנה נכונה וסביבה מתאימה, הוא הופך לאחד הרגעים הכי יפים ביום שלך.',
    readTime: '4 דקות קריאה',
    date: '2026-03-05',
  },
  {
    slug: 'aruchat-boker-kala',
    title: 'מה אוכלים ביום החתונה — ארוחת בוקר לכלה',
    excerpt: 'הכלה האחרונה שצריך לשכוח לאכול ביום החתונה היא... הכלה עצמה. איך מסדרים ארוחת בוקר שמזינה, קלה ומרגישה כמו טקס.',
    readTime: '3 דקות קריאה',
    date: '2026-03-15',
  },
]

export default function BlogIndex() {
  const dynamicPosts = getDynamicPosts()

  const dynamicItems = dynamicPosts.map(p => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    readTime: p.readTime,
    date: p.date,
    isDynamic: true,
  }))

  const allArticles = [
    ...dynamicItems,
    ...STATIC_ARTICLES.map(a => ({ ...a, isDynamic: false })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <BlogLayout>
      <div className="text-center mb-16">
        <p className="text-[#A07840] text-sm tracking-[0.3em] uppercase font-medium mb-4">הבלוג של חגית</p>
        <h1 className="font-cormorant text-5xl md:text-6xl text-[#2C241A] font-light leading-none mb-4">
          טיפים לכלות
        </h1>
        <p className="text-[#6B5540] font-light text-lg max-w-xl mx-auto leading-relaxed">
          מדריכים מעשיים לבוקר חתונה מושלם — מהתארגנות, דרך אוכל, ועד בחירת הסוויטה הנכונה.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {allArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group bg-white rounded-3xl p-8 border border-[#E5D5C0] shadow-sm hover:shadow-md hover:border-[#C9A86A] transition-all duration-300 flex flex-col gap-4"
          >
            <span className="text-[#8B7355] text-xs font-light">{article.readTime}</span>
            <h2 className="font-cormorant text-2xl text-[#2C241A] font-semibold leading-snug group-hover:text-[#C9A86A] transition-colors">
              {article.title}
            </h2>
            <p className="text-[#594937] font-light text-sm leading-relaxed flex-grow">
              {article.excerpt}
            </p>
            <span className="text-[#C9A86A] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              לקריאה המלאה ←
            </span>
          </Link>
        ))}
      </div>
    </BlogLayout>
  )
}
