import Link from 'next/link'
import { Heart, ArrowRight } from 'lucide-react'

const WA_LINK = 'https://wa.me/972522676718?text=%D7%94%D7%99%D7%99%20%D7%97%D7%92%D7%99%D7%AA%2C%20%D7%A7%D7%A8%D7%90%D7%AA%D7%99%20%D7%90%D7%AA%20%D7%94%D7%91%D7%9C%D7%95%D7%92%20%D7%95%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%A8%D7%99%D7%99%D7%9F%20%F0%9F%92%8D'

interface BlogLayoutProps {
  children: React.ReactNode
  title?: string
}

export default function BlogLayout({ children, title }: BlogLayoutProps) {
  return (
    <div className="min-h-screen bg-[#FAFAF8]" dir="rtl">

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#E5D5C0] shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Heart className="w-5 h-5 text-[#C9A86A]" fill="#C9A86A" />
            <span className="font-cormorant text-xl text-[#2C241A] font-bold tracking-wide">
              חגית | סוויטת כלות
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-[#6B5540] hover:text-[#C9A86A] transition-colors font-medium"
          >
            <ArrowRight size={15} />
            <span>חזרה לאתר</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16">
        {title && (
          <nav className="text-xs text-[#8B7355] mb-8 flex items-center gap-2">
            <Link href="/" className="hover:text-[#C9A86A] transition-colors">בית</Link>
            <span>›</span>
            <Link href="/blog" className="hover:text-[#C9A86A] transition-colors">בלוג</Link>
            <span>›</span>
            <span className="text-[#2C241A]">{title}</span>
          </nav>
        )}
        {children}
      </main>

      {/* Blog footer CTA */}
      <footer className="bg-[#2C241A] py-12 px-6 text-center">
        <p className="font-cormorant text-3xl text-[#FAF6EE] font-light mb-2">
          הגיע הזמן לשריין תאריך
        </p>
        <p className="text-[#B09880] font-light text-sm mb-6">
          הוילה של חגית מחכה לך — דברי איתה ישירות בוואטסאפ
        </p>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-3.5 rounded-full text-sm font-medium tracking-widest transition-all shadow-lg"
        >
          שרייני תאריך בוואטסאפ ←
        </a>
        <div className="mt-8 pt-6 border-t border-white/10 text-[#6B5540] text-xs flex items-center justify-center gap-4">
          <Link href="/blog" className="hover:text-[#C9A86A] transition-colors">כל המאמרים</Link>
          <span>·</span>
          <Link href="/" className="hover:text-[#C9A86A] transition-colors">חזרה לאתר</Link>
          <span>·</span>
          <span>© 2026 חגית סוויטת כלות</span>
        </div>
      </footer>
    </div>
  )
}
