import type { Metadata } from 'next'
import { Raleway, Cormorant_Garamond } from 'next/font/google'
import AccessibilityBtn from '@/components/AccessibilityBtn'
import LaunchPopup from '@/components/LaunchPopup'
import CookieBanner from '@/components/CookieBanner'
import Script from 'next/script'
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

const GA_ID = 'G-HLJ24PPWVY'
const SITE_URL = 'https://suite-hagit.co.il'
const OG_IMAGE = 'https://res.cloudinary.com/decirk3zb/image/upload/f_auto,q_auto,w_1200,h_630,c_fill,g_center/v1771444671/8_oaoxjm.jpg'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'חגית | סוויטת התארגנות כלות יוקרתית – הרי ירושלים',
    template: '%s | חגית סוויטת כלות',
  },
  description: 'סוויטת התארגנות כלות יוקרתית בהרי ירושלים. חדר פרטי, יין בוטיק, פרחים טריים, תאורה מקצועית וליווי אישי. הרגע שלפני הרגע הגדול — מגיע לך שיהיה מושלם.',
  keywords: [
    'התארגנות כלות', 'סוויטת כלות', 'התארגנות כלות ירושלים',
    'בית כלה', 'חדר כלה יוקרתי', 'התארגנות יום חתונה',
    'חגית כלות', 'וילה כלות הרי ירושלים', 'חוויית כלה מפנקת',
    'התארגנות כלה פרטית', 'bridal suite jerusalem', 'כלה התארגנות הרי יהודה',
  ],
  authors: [{ name: 'חגית ארגמן', url: SITE_URL }],
  creator: 'חגית סוויטת כלות',
  publisher: 'חגית סוויטת כלות',
  alternates: {
    canonical: SITE_URL,
    languages: { 'he-IL': SITE_URL },
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
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: SITE_URL,
    siteName: 'חגית סוויטת כלות',
    title: 'חגית | סוויטת התארגנות כלות יוקרתית – הרי ירושלים',
    description: 'הרגע שלפני הרגע הגדול. סוויטה פרטית, יין, פרחים ותאורה מקצועית — ביום החתונה שלך.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'חגית סוויטת כלות' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'חגית | סוויטת התארגנות כלות בהרי ירושלים',
    description: 'הרגע שלפני הרגע הגדול. סוויטה פרטית, יין, פרחים ותאורה מקצועית.',
    images: [OG_IMAGE],
  },
  verification: {
    google: 'Zzfm-wVn1J82M7dAIq-Vt9KOT4k4nOETNF71hpCwfJw',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#business`,
      name: 'חגית סוויטת כלות',
      alternateName: 'Hagit Bridal Suite',
      description: 'סוויטת התארגנות כלות יוקרתית בהרי ירושלים',
      url: SITE_URL,
      telephone: '+972522676718',
      email: 'Hagitargaman@gmail.com',
      priceRange: '₪₪',
      image: OG_IMAGE,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IL',
        addressRegion: 'Jerusalem District',
        addressLocality: 'הרי ירושלים',
      },
      sameAs: ['https://www.instagram.com/hagit_argaman/'],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        reviewCount: '47',
        bestRating: '5',
        worstRating: '1',
      },
      review: [
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'נועה כהן' },
          datePublished: '2025-11-12',
          reviewBody: 'חגית היא פשוט נפלאה. הסוויטה הייתה מדהימה — נוחה, מעוצבת בטעם ועם כל מה שצריך. הרגשתי מלכה ביום החתונה שלי. אני ממליצה בחום גדול!',
          reviewRating: { '@type': 'Rating', ratingValue: '5' },
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'מיכל לוי' },
          datePublished: '2025-09-04',
          reviewBody: 'המקום הכי שלו ומפנק שיכולתי לבקש לבוקר החתונה שלי. הנוף להרים, היין, ארוחת הבוקר — הכל מדויק. תודה חגית על כל האהבה!',
          reviewRating: { '@type': 'Rating', ratingValue: '5' },
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'שירה ברק' },
          datePublished: '2026-01-20',
          reviewBody: 'הגעתי לסוויטה לחוצה ויצאתי ממנה רגועה ומאושרת. חגית מקבלת את הכלה עם כל הלב. ממליצה לכל כלה שרוצה שהבוקר שלה יהיה חלום.',
          reviewRating: { '@type': 'Rating', ratingValue: '5' },
        },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'חגית סוויטת כלות',
      inLanguage: 'he-IL',
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'מה כולל השימוש בסוויטה?',
          acceptedAnswer: { '@type': 'Answer', text: 'הסוויטה כוללת שימוש מלא בוילה מהבוקר עד אחרי הצהריים, עמדת ביוטי עם תאורה מקצועית, יין בוטיק מיקב הרי ירושלים, פירות טריים, שתייה חמה וקרה, מוזיקת רקע אמבינטית ושימוש במתקני הוילה. בחבילת פרימיום מצורפת גם ארוחת בוקר כפרית עשירה ושמפניה חגיגית.' },
        },
        {
          '@type': 'Question',
          name: 'כמה אנשים יכולים להיות בסוויטה?',
          acceptedAnswer: { '@type': 'Answer', text: 'הסוויטה מיועדת לכלה ולמלוות שלה — מאפרת, עיצוב שיער, צלמת ובני משפחה קרובים. הסלון המרווח נוח לקבוצה של עד 8-10 אנשים בו-זמנית.' },
        },
        {
          '@type': 'Question',
          name: 'איפה הסוויטה ממוקמת?',
          acceptedAnswer: { '@type': 'Answer', text: 'הסוויטה ממוקמת בהרי ירושלים, מרחק נסיעה קצר ממרכז ירושלים ומהאזור המטרופוליני של תל אביב. הכתובת המדויקת נמסרת לאחר אישור ההזמנה.' },
        },
        {
          '@type': 'Question',
          name: 'האם ניתן להזמין גם צלמת, מאפרת וספרית?',
          acceptedAnswer: { '@type': 'Answer', text: 'כן! חגית עובדת עם רשת אנשי מקצוע מנוסים ותשמח לסייע בהרכבת חבילה מלאה עם צלמת, מאפרת, עיצוב שיער וקייטרינג — הכל מותאם אישית לצרכים שלך.' },
        },
        {
          '@type': 'Question',
          name: 'מה ההפרש בין חבילת הבסיס לחבילת הפרימיום?',
          acceptedAnswer: { '@type': 'Answer', text: 'חבילת הבסיס עולה 2,000₪ וכוללת את השימוש המלא בוילה עם כל המתקנים, יין, פינוקים ותאורה מקצועית. חבילת הפרימיום עולה 2,500₪ ומוסיפה ארוחת בוקר כפרית עשירה לכולן, שמפניה חגיגית, זר פרחים טריים וכריכים לאורך הבוקר.' },
        },
        {
          '@type': 'Question',
          name: 'כמה זמן מראש צריך להזמין?',
          acceptedAnswer: { '@type': 'Answer', text: 'מומלץ מאוד לשריין תאריך לפחות 3-6 חודשים מראש, במיוחד בעונת האביב והסתיו שהן עמוסות מאוד. צרי קשר בוואטסאפ לבדיקת זמינות.' },
        },
      ],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${raleway.variable} ${cormorant.variable}`}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script id="ga-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              wait_for_update: 500,
            });
          `}
        </Script>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { page_path: window.location.pathname });
          `}
        </Script>
      </head>

      <body className="font-raleway antialiased bg-[#FAFAF8] text-[#2C241A]">
        {children}
        <AccessibilityBtn />
        <LaunchPopup />
        <CookieBanner />
      </body>
    </html>
  )
}
