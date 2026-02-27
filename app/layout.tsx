import type { Metadata } from 'next'
import { Raleway, Cormorant_Garamond } from 'next/font/google'
import AccessibilityBtn from '@/components/AccessibilityBtn'
import SocialMediaLinks from '@/components/SocialMediaLinks'
import LaunchPopup from '@/components/LaunchPopup'
import CookieBanner from '@/components/CookieBanner'
import { Heart, Phone, Mail } from 'lucide-react'
import Script from 'next/script'
import './globals.css'

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
// METADATA — SEO מלא
// ─────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'חגית | סוויטת התארגנות כלות יוקרתית – הרי ירושלים',
    template: '%s | חגית סוויטת כלות',
  },

  description:
    'סוויטת התארגנות כלות יוקרתית בהרי ירושלים. חדר פרטי, יין בוטיק, פרחים טריים, תאורה מקצועית וליווי אישי. הרגע שלפני הרגע הגדול — מגיע לך שיהיה מושלם.',

  keywords: [
    'התארגנות כלות',
    'סוויטת כלות',
    'התארגנות כלות ירושלים',
    'בית כלה',
    'חדר כלה יוקרתי',
    'התארגנות יום חתונה',
    'חגית כלות',
    'וילה כלות הרי ירושלים',
    'חוויית כלה מפנקת',
    'התארגנות כלה פרטית',
    'bridal suite jerusalem',
    'כלה התארגנות הרי יהודה',
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
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'חגית סוויטת כלות — הרגע שלפני הרגע הגדול' }],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'חגית | סוויטת התארגנות כלות בהרי ירושלים',
    description: 'הרגע שלפני הרגע הגדול. סוויטה פרטית, יין, פרחים ותאורה מקצועית.',
    images: [OG_IMAGE],
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

// ─────────────────────────────────────────────
// JSON-LD — Structured Data
// ─────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#business`,
      name: 'חגית סוויטת כלות',
      alternateName: 'Hagit Bridal Suite',
      description: 'סוויטת התארגנות כלות יוקרתית בהרי ירושלים — חדר פרטי, יין, פרחים, תאורה מקצועית',
      url: SITE_URL,
      telephone: '+972522676718',
      email: 'Hagitargaman@gmail.com',
      priceRange: '₪₪',
      currenciesAccepted: 'ILS',
      paymentAccepted: 'Cash, Bank Transfer',
      image: OG_IMAGE,
      logo: OG_IMAGE,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IL',
        addressRegion: 'Jerusalem District',
        addressLocality: 'הרי ירושלים',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 31.7683,
        longitude: 35.2137,
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
      sameAs: [
        'https://www.instagram.com/hagit_argaman/',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'חבילות התארגנות כלות',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'חבילת בסיס — התארגנות כלות',
            description: 'שימוש בוילה, פינת שתייה, פירות, יין בוטיק, עמדת ביוטי, מוזיקה',
            price: '2000',
            priceCurrency: 'ILS',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
          },
          {
            '@type': 'Offer',
            name: 'חבילת פרימיום — התארגנות כלות',
            description: 'כל מה שבבסיס + ארוחת בוקר, שמפניה, זר פרחים טריים',
            price: '2500',
            priceCurrency: 'ILS',
            availability: 'https://schema.org/InStock',
            url: SITE_URL,
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'חגית סוויטת כלות',
      inLanguage: 'he-IL',
      publisher: { '@id': `${SITE_URL}/#business` },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: 'חגית | סוויטת התארגנות כלות יוקרתית – הרי ירושלים',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#business` },
      inLanguage: 'he-IL',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'דף הבית', item: SITE_URL },
      ],
    },
  ],
}

// ─────────────────────────────────────────────
// ROOT LAYOUT
// ─────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={`${raleway.variable} ${cormorant.variable}`}>
      <head>
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* GA4 — consent mode default (blocked until cookie consent) */}
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

        {/* GA4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
              send_page_view: true,
            });
          `}
        </Script>
      </head>

      <body className="font-raleway antialiased bg-[#FAFAF8] text-[#2C241A] flex flex-col min-h-screen">

        <main className="flex-grow">{children}</main>

        <AccessibilityBtn />
        <LaunchPopup />
        <CookieBanner gaId={GA_ID} />

        {/* ── FOOTER ── */}
        <footer className="bg-white border-t border-[#E5D5C0] pt-12 pb-6 relative z-40">
          <div className="max-w-6xl mx-auto px-6 text-center">

            <div className="flex items-center justify-center gap-3 mb-8">
              <Heart className="w-8 h-8 text-[#C9A86A]" fill="#C9A86A" />
              <span className="font-cormorant text-4xl text-[#1A1A1A] font-semibold">חגית</span>
            </div>

            <div className="flex justify-center mb-8">
              <SocialMediaLinks />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#666] mb-8 font-light">
              <a href="tel:052-267-6718" className="flex items-center gap-2 hover:text-[#C9A86A] transition-colors">
                <Phone size={16} />
                <span>052-267-6718</span>
              </a>
              <span className="hidden sm:inline text-[#E5D5C0]">•</span>
              <a href="mailto:Hagitargaman@gmail.com" className="flex items-center gap-2 hover:text-[#C9A86A] transition-colors">
                <Mail size={16} />
                <span>Hagitargaman@gmail.com</span>
              </a>
            </div>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#E5D5C0] to-transparent mb-6 opacity-50" />

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
              <div className="flex gap-4">
                <a href="/accessibility" className="hover:text-[#666] transition-colors">הצהרת נגישות</a>
                <span>|</span>
                <a href="/privacy" className="hover:text-[#666] transition-colors">מדיניות פרטיות</a>
                <span>|</span>
                <a href="/cookies" className="hover:text-[#666] transition-colors">מדיניות עוגיות</a>
              </div>
              <p>© 2026 חגית התארגנות כלות • כל הזכויות שמורות</p>
            </div>

          </div>
        </footer>

      </body>
    </html>
  )
}
