import type { Metadata } from 'next'
import { Raleway, Cormorant_Garamond } from 'next/font/google'
import AccessibilityBtn from '@/components/AccessibilityBtn'
import './globals.css'

// הגדרת פונטים בצורה אופטימלית ל-Next.js
const raleway = Raleway({
  subsets: ['latin', 'hebrew'],
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
    default: "חגית | וילת התארגנות כלות - הרגע שלפני הרגע הגדול",
    template: "%s | חגית - וילת כלות"
  },
  description: 'וילה יוקרתית בהרי ירושלים ליום ההתארגנות המושלם שלך. חבילת פרימיום עם ארוחת בוקר, יין, עמדות ביוטי ואווירה קסומה.',
  keywords: ['התארגנות כלות', 'וילה לכלות', 'סוויטת כלות', 'התארגנות לחתונה ירושלים', 'מלוות כלה', 'יום פינוק לכלה', 'חגית וילה לכלות'],
  authors: [{ name: 'חגית' }],
  openGraph: {
    title: 'חגית | וילת התארגנות לכלות',
    description: 'להתחיל את היום הגדול באווירה רגועה, מפנקת וקסומה בוילה בהרי ירושלים.',
    url: 'https://hagit-bridal-suite.netlify.app',
    siteName: 'חגית - וילת כלות',
    locale: 'he_IL',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // מומלץ להוסיף תמונה בשם זה לתיקיית public
        width: 1200,
        height: 630,
        alt: 'חגית - וילת התארגנות כלות',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl" className={`${raleway.variable} ${cormorant.variable}`}>
      <body className="font-raleway antialiased bg-[#FAFAF8] text-[#2C241A]">
        {children}
        
        {/* כפתור נגישות צף */}
        <AccessibilityBtn />
        
        {/* פס קישורים משפטיים בתחתית כל העמודים */}
        <div className="bg-[#FAFAF8] border-t border-[#E5D5C0] text-center py-3 text-xs text-gray-500 flex justify-center gap-4 relative z-40">
          <a href="/accessibility" className="hover:text-[#C9A86A] transition-colors">הצהרת נגישות</a>
          <span className="text-gray-300">|</span>
          <a href="/privacy" className="hover:text-[#C9A86A] transition-colors">מדיניות פרטיות</a>
        </div>
      </body>
    </html>
  )
}
