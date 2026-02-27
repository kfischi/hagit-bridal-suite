import type { Metadata } from 'next'
import Link from 'next/link'
import { Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'מדיניות עוגיות',
  description: 'מדיניות העוגיות של חגית סוויטת כלות',
  robots: { index: false, follow: false },
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#FAF6EE]" dir="rtl">

      <header className="bg-white border-b border-[#E5D5C0] py-4 px-6 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#C9A86A]" fill="#C9A86A" />
            <span className="font-cormorant text-xl text-[#2C241A] font-semibold">חגית | סוויטת כלות</span>
          </Link>
          <Link href="/" className="text-xs text-[#8B7355] hover:text-[#C9A86A] transition-colors">
            ← חזרה לאתר
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="font-cormorant text-4xl text-[#2C241A] font-light mb-2">מדיניות עוגיות</h1>
        <p className="text-[#8B7355] text-sm mb-12">עודכן: 01 מרץ 2026</p>

        <div className="space-y-12 text-[#2C241A] leading-relaxed" style={{ fontFamily: 'Heebo, sans-serif', fontWeight: 300 }}>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">מה זה עוגייה?</h2>
            <p>
              עוגייה (Cookie) היא קובץ טקסט קטן שנשמר בדפדפן שלך כשאת מבקרת באתר.
              העוגיות מאפשרות לאתר לזכור את העדפותיך ולשפר את חוויית השימוש.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">אילו עוגיות אנו משתמשים</h2>
            <div className="overflow-x-auto rounded-2xl border border-[#E5D5C0]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#F0E8DC]">
                    <th className="text-right p-4 font-medium text-[#2C241A]">שם</th>
                    <th className="text-right p-4 font-medium text-[#2C241A]">סוג</th>
                    <th className="text-right p-4 font-medium text-[#2C241A]">מטרה</th>
                    <th className="text-right p-4 font-medium text-[#2C241A]">תפוגה</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: 'hagit_cookie_consent_v1',
                      type: 'הכרחי',
                      purpose: 'שמירת העדפת ההסכמה שלך',
                      expiry: 'שנה',
                    },
                    {
                      name: '_ga',
                      type: 'אנליטיקס',
                      purpose: 'Google Analytics — זיהוי משתמש ייחודי',
                      expiry: '24 חודשים',
                    },
                    {
                      name: `_ga_HLJ24PPWVY`,
                      type: 'אנליטיקס',
                      purpose: 'Google Analytics — שמירת מצב session',
                      expiry: '24 חודשים',
                    },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#FAF6EE]'}>
                      <td className="p-4 text-xs font-mono text-[#594937]">{row.name}</td>
                      <td className="p-4 text-xs">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                          row.type === 'הכרחי'
                            ? 'bg-green-50 text-green-700'
                            : 'bg-blue-50 text-blue-700'
                        }`}>
                          {row.type}
                        </span>
                      </td>
                      <td className="p-4 text-xs text-[#4a3e2f]">{row.purpose}</td>
                      <td className="p-4 text-xs text-[#8B7355]">{row.expiry}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">שליטה בעוגיות</h2>
            <p className="mb-4">ניתן לחסום או למחוק עוגיות דרך הגדרות הדפדפן. שים לב שחסימה עלולה לפגוע בחוויית האתר.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { browser: 'Chrome', url: 'https://support.google.com/chrome/answer/95647' },
                { browser: 'Firefox', url: 'https://support.mozilla.org/he/kb/cookies-information-websites-store-on-your-computer' },
                { browser: 'Safari', url: 'https://support.apple.com/he-il/guide/safari/sfri11471/mac' },
              ].map((b, i) => (
                <a
                  key={i}
                  href={b.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-xl p-4 border border-[#E5D5C0] text-center text-sm text-[#C9A86A] hover:border-[#C9A86A] transition-colors"
                >
                  {b.browser} ←
                </a>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">Google Analytics ואנונימיזציה</h2>
            <p>
              אנו משתמשים ב-Google Analytics עם{' '}
              <strong>Consent Mode v2</strong> — כלומר עוגיות אנליטיקס פעילות
              <strong> רק לאחר הסכמתך</strong>. ניתן לבטל מעקב של Google Analytics דרך{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C9A86A] underline"
              >
                הכלי הרשמי של Google
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">יצירת קשר</h2>
            <p>
              שאלות? 📧{' '}
              <a href="mailto:Hagitargaman@gmail.com" className="text-[#C9A86A]">
                Hagitargaman@gmail.com
              </a>
            </p>
          </section>

        </div>
      </main>
    </div>
  )
}
