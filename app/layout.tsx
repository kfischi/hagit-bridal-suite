import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'חגית | התארגנות כלות - הרגע שלפני הרגע הגדול',
  description: 'וילה יוקרתית להתארגנות כלות בהרי ירושלים. חבילת פרימיום עם יין, פינוקים ואווירה מושלמת ליום המיוחד שלך',
  keywords: 'התארגנות כלות, וילה לכלות, חתונה, ירושלים, איפור כלות, סוויטה לכלות',
  authors: [{ name: 'Multibrawn' }],
  openGraph: {
    title: 'חגית | התארגנות כלות',
    description: 'וילה יוקרתית בהרי ירושלים ליום ההתארגנות המושלם שלך',
    type: 'website',
    locale: 'he_IL',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      <body className="font-raleway antialiased">
        {children}
      </body>
    </html>
  )
}
