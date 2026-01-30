import type { Metadata } from 'next'
import { Playfair_Display, Heebo } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const heebo = Heebo({
  subsets: ['hebrew', 'latin'],
  variable: '--font-heebo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'חגית | התארגנות כלות - הרגע שלפני הרגע הגדול',
  description: 'וילה יוקרתית להתארגנות כלות בהרי ירושלים. חבילת פרימיום עם יין, פינוקים ואווירה מושלמת ליום המיוחד שלך',
  keywords: 'התארגנות כלות, וילה לכלות, חתונה, ירושלים, איפור כלות, סוויטה לכלות',
  openGraph: {
    title: 'חגית | התארגנות כלות',
    description: 'וילה יוקרתית בהרי ירושלים להתארגנות הכלה המושלמת',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${playfair.variable} ${heebo.variable} font-heebo antialiased`}>
        {children}
      </body>
    </html>
  )
}
