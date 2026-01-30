import type { Metadata } from 'next'
import { Heebo, Playfair_Display } from 'next/font/google'
import './globals.css'

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-heebo',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'חגית | התארגנות כלות - הרגע שלפני הרגע הגדול',
  description: 'סוויטה אינטימית ומעוצבת להתארגנות כלות. המקום שבו היום הכי חשוב שלך מתחיל ברוגע, ביופי ובשקט. חגית - מומחית להתארגנות כלות.',
  keywords: ['התארגנות כלות', 'חגית כלות', 'סוויטת כלה', 'הכנות לחתונה', 'איפור כלה', 'bride preparation', 'bridal suite'],
  openGraph: {
    title: 'חגית | התארגנות כלות',
    description: 'המקום שבו היום שלך מתחיל ברוגע. סוויטה אינטימית להתארגנות כלות.',
    type: 'website',
    locale: 'he_IL',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#FFF8F5',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="he" 
      dir="rtl" 
      className={`${heebo.variable} ${playfair.variable} scroll-smooth`}
    >
      <body className={`${heebo.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
