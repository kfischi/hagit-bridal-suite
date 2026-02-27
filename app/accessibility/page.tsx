import type { Metadata } from 'next'
import Link from 'next/link'
import { Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'הצהרת נגישות',
  description: 'הצהרת הנגישות של חגית סוויטת כלות — עמידה בתקן WCAG 2.1 AA',
  robots: { index: true, follow: true },
}

export default function AccessibilityPage() {
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
        <h1 className="font-cormorant text-4xl text-[#2C241A] font-light mb-2">הצהרת נגישות</h1>
        <p className="text-[#8B7355] text-sm mb-12">עודכן: 01 מרץ 2026 | תקן: WCAG 2.1 רמה AA</p>

        <div className="space-y-12 text-[#2C241A] leading-relaxed" style={{ fontFamily: 'Heebo, sans-serif', fontWeight: 300 }}>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">המחויבות שלנו</h2>
            <p>
              <strong>חגית סוויטת כלות</strong> מחויבת לנגישות דיגיטלית לכלל המשתמשות, לרבות בעלות מוגבלות.
              אנו שואפים לעמוד ברמה AA של תקן WCAG 2.1 ובדרישות תקנות שוויון זכויות לאנשים עם מוגבלות
              (התאמות נגישות לשירות), התשע&quot;ג-2013.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">מה יישמנו</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { feature: 'שפה מוגדרת', desc: 'lang="he" + dir="rtl" בכל דף' },
                { feature: 'ניווט מקלדת', desc: 'כל הפונקציות נגישות ללא עכבר' },
                { feature: 'טקסט חלופי', desc: 'alt text על כל תמונה משמעותית' },
                { feature: 'תוויות ARIA', desc: 'aria-label על כפתורים ואלמנטים' },
                { feature: 'ניגודיות צבעים', desc: 'עומד בדרישות WCAG AA' },
                { feature: 'פונטים קריאים', desc: 'גודל בסיסי 16px, ניתן להגדלה' },
                { feature: 'קוראי מסך', desc: 'נבדק עם NVDA ו-VoiceOver' },
                { feature: 'לחצן נגישות', desc: 'צף בכל עמוד עם כלים מיידיים' },
                { feature: 'מבנה כותרות', desc: 'היררכיה H1-H3 תקנית' },
                { feature: 'Focus visible', desc: 'מיקוד גלוי בניווט מקלדת' },
              ].map((f, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-[#E5D5C0] flex items-start gap-3">
                  <span className="text-[#C9A86A] mt-0.5 text-base">✓</span>
                  <div>
                    <p className="font-medium text-sm text-[#2C241A]">{f.feature}</p>
                    <p className="text-xs text-[#8B7355]">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">מגבלות ידועות</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <p className="text-sm text-amber-800">
                סרטוני הרקע הם דקורטיביים ואינם מכילים מידע חיוני. חלק מהסרטונים עדיין אינם כוללים כתוביות.
                אנו עובדים על שיפור זה ומייחלים להשלים אותו עד יוני 2026.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">פנייה בנושא נגישות</h2>
            <p className="mb-4">נתקלת בבעיית נגישות? נשמח לשמוע ולתקן בתוך 5 ימי עסקים.</p>
            <div className="bg-white rounded-2xl p-6 border border-[#E5D5C0]">
              <p className="font-medium text-[#2C241A] mb-4">רכזת נגישות: חגית ארגמן</p>
              <div className="space-y-2 text-sm text-[#4a3e2f]">
                <p>📧 <a href="mailto:Hagitargaman@gmail.com" className="text-[#C9A86A]">Hagitargaman@gmail.com</a></p>
                <p>📞 <a href="tel:052-267-6718" className="text-[#C9A86A]">052-267-6718</a></p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">בסיס חוקי</h2>
            <p className="text-sm text-[#4a3e2f]">
              הצהרה זו ניתנת בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ&quot;ח-1998,
              ותקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע&quot;ג-2013.
            </p>
          </section>

        </div>
      </main>
    </div>
  )
}
