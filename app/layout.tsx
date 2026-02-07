import type { Metadata } from 'next'
import { Raleway, Cormorant_Garamond } from 'next/font/google'
import AccessibilityBtn from '@/components/AccessibilityBtn'
import SocialMediaLinks from '@/components/SocialMediaLinks' // וודא שיש לך את זה, אם לא - אצרף קוד למטה
import { Heart, Phone, Mail } from 'lucide-react'
import './globals.css'

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-raleway',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://hagit-bridal-suite.netlify.app'),
  title: {
    default: "חגית | וילת התארגנות כלות",
    template: "%s | חגית - וילת כלות"
  },
  description: 'וילה יוקרתית בהרי ירושלים ליום ההתארגנות המושלם שלך.',
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" className={`${raleway.variable} ${cormorant.variable}`}>
      <body className="font-raleway antialiased bg-[#FAFAF8] text-[#2C241A] flex flex-col min-h-screen">
        
        {/* תוכן העמוד - תופס את כל המקום הפנוי */}
        <main className="flex-grow">
          {children}
        </main>
        
        <AccessibilityBtn />
        
        {/* Footer עשיר ומלא */}
        <footer className="bg-white border-t border-[#E5D5C0] pt-12 pb-6 relative z-40">
          <div className="max-w-6xl mx-auto px-6 text-center">
            
            {/* לוגו */}
            <div className="flex items-center justify-center gap-3 mb-8">
               <Heart className="w-8 h-8 text-[#D4AF37]" fill="#D4AF37" />
               <span className="font-cormorant text-4xl text-[#1A1A1A] font-semibold">חגית</span>
            </div>

            {/* אייקונים ורשתות חברתיות */}
            <div className="flex justify-center mb-8">
              <SocialMediaLinks /> 
            </div>

            {/* פרטי קשר */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#666] mb-8 font-light">
              <a href="tel:052-267-6718" className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors">
                <Phone size={16} />
                <span>052-267-6718</span>
              </a>
              <span className="hidden sm:inline">•</span>
              <a href="mailto:hagit@example.com" className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors">
                <Mail size={16} />
                <span>hagit@example.com</span>
              </a>
            </div>

            {/* קו מפריד */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#E5D5C0] to-transparent mb-6 opacity-50" />

            {/* שורה תחתונה: משפטי + זכויות יוצרים */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
               <div className="flex gap-4">
                  <a href="/accessibility" className="hover:text-[#666] transition-colors">הצהרת נגישות</a>
                  <span>|</span>
                  <a href="/privacy" className="hover:text-[#666] transition-colors">מדיניות פרטיות</a>
               </div>
               
               <p>© 2026 חגית התארגנות כלות • כל הזכויות שמורות</p>
            </div>
          </div>
        </footer>

      </body>
    </html>
  )
}
