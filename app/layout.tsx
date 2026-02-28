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
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'חגית סוויטת כלות',
      inLanguage: 'he-IL',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${raleway.variable} ${cormorant.variable}`}>
      <head>
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
