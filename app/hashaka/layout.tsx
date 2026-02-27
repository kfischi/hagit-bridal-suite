import type { Metadata } from 'next'

// ══════════════════════════════════════════════
// CRITICAL: noindex + nofollow — הדף לא יופיע ב-Google
// מי שיש לה את הקישור בלבד יכולה להגיע
// ══════════════════════════════════════════════
export const metadata: Metadata = {
  title: 'מחיר השקה מיוחד | חגית התארגנות כלות',
  description: 'חוויית התארגנות כלה פרימיום במחיר השקה בלעדי — לזמן מוגבל בלבד.',
  robots: {
    index: false,       // לא ב-Google
    follow: false,      // לא לעקוב אחרי קישורים
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: 'מחיר השקה מיוחד | חגית',
    description: 'הזדמנות בלעדית — חווית ההתארגנות שכולן מדברות עליה, עכשיו ב-₪500 בלבד',
    // הוסיפי תמונה כאן לשיתוף בוואטסאפ / אינסטגרם
    // images: ['/images/hashaka-og.jpg'],
  },
}

export default function HashakLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
