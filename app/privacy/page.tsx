import type { Metadata } from 'next'
import Link from 'next/link'
import { Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'מדיניות פרטיות',
  description: 'מדיניות הפרטיות של חגית סוויטת כלות',
  robots: { index: false, follow: false },
}

export default function PrivacyPage() {
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
        <h1 className="font-cormorant text-4xl text-[#2C241A] font-light mb-2">מדיניות פרטיות</h1>
        <p className="text-[#8B7355] text-sm mb-12">עודכן לאחרונה: 01 מרץ 2026</p>

        <div className="space-y-12 text-[#2C241A] leading-relaxed" style={{ fontFamily: 'Heebo, sans-serif', fontWeight: 300 }}>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4 text-[#2C241A]">1. מבוא</h2>
            <p>
              חגית סוויטת כלות (&quot;אנחנו&quot;, &quot;השירות&quot;) מכבדת את פרטיותך ומחויבת להגנה על המידע האישי שלך.
              מדיניות זו מסבירה אילו נתונים נאספים, כיצד הם מעובדים ומה זכויותיך בהתאם לחוק הגנת הפרטיות, תשמ&quot;א-1981 ותיקוניו.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">2. מידע שאנו אוספים</h2>
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-[#E5D5C0]">
                <h3 className="font-medium mb-2 text-[#2C241A]">מידע שנמסר מרצון</h3>
                <p className="text-[#4a3e2f] text-sm">שם, מספר טלפון ותאריך הרצוי — כשיוצרת קשר דרך וואטסאפ.</p>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-[#E5D5C0]">
                <h3 className="font-medium mb-2 text-[#2C241A]">נתוני שימוש (אנונימיים)</h3>
                <p className="text-[#4a3e2f] text-sm">דפים שנצפו, זמן שהייה, מקור הגעה — דרך Google Analytics. נתונים אלה אינם מזהים אותך אישית.</p>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-[#E5D5C0]">
                <h3 className="font-medium mb-2 text-[#2C241A]">עוגיות (Cookies)</h3>
                <p className="text-[#4a3e2f] text-sm">ראי <Link href="/cookies" className="text-[#C9A86A] underline">מדיניות עוגיות</Link> נפרדת.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">3. מטרות השימוש במידע</h2>
            <ul className="space-y-2 text-[#4a3e2f]">
              {[
                'חזרה אליך לגבי שאלות ותיאום מועדים',
                'שיפור חוויית האתר והשירות',
                'ניתוח תנועה סטטיסטי ואנונימי',
                'עמידה בדרישות חוקיות',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-[#C9A86A] mt-0.5">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">4. שיתוף מידע עם צדדים שלישיים</h2>
            <p className="mb-4">אנו <strong>לא מוכרים</strong> ולא מעבירים את פרטיך לגורמים מסחריים. שירותי צד שלישי בהם אנו משתמשים:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'Google Analytics', purpose: 'ניתוח תנועה אנונימי', link: 'https://policies.google.com/privacy' },
                { name: 'WhatsApp (Meta)', purpose: 'תקשורת ישירה', link: 'https://www.whatsapp.com/legal/privacy-policy' },
                { name: 'Cloudinary', purpose: 'אחסון מדיה', link: 'https://cloudinary.com/privacy' },
                { name: 'Netlify', purpose: 'אחסון האתר', link: 'https://www.netlify.com/privacy/' },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-[#E5D5C0]">
                  <p className="font-medium text-sm text-[#2C241A]">{s.name}</p>
                  <p className="text-xs text-[#8B7355] mb-1">{s.purpose}</p>
                  <a href={s.link} target="_blank" rel="noopener noreferrer" className="text-xs text-[#C9A86A] underline">מדיניות פרטיות ←</a>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">5. שמירת מידע</h2>
            <p>מידע ליצירת קשר נשמר עד 24 חודשים ממועד הגישה האחרונה, אלא אם תבקשי מחיקה מוקדמת יותר.</p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">6. זכויותיך</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { right: 'זכות עיון', desc: 'לבקש לראות את המידע שנאסף עליך' },
                { right: 'זכות תיקון', desc: 'לתקן מידע שגוי או לא מעודכן' },
                { right: 'זכות מחיקה', desc: 'לבקש מחיקת המידע שלך' },
                { right: 'זכות התנגדות', desc: 'להתנגד לעיבוד המידע שלך' },
              ].map((r, i) => (
                <div key={i} className="bg-white rounded-xl p-4 border border-[#E5D5C0]">
                  <p className="font-medium text-sm text-[#C9A86A]">{r.right}</p>
                  <p className="text-xs text-[#8B7355]">{r.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm">
              לממש זכויותיך — שלחי הודעה ל:{' '}
              <a href="mailto:Hagitargaman@gmail.com" className="text-[#C9A86A] underline">Hagitargaman@gmail.com</a>
              . נחזור תוך 30 יום.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">7. אבטחת מידע</h2>
            <p>האתר פועל תחת HTTPS עם הצפנה מלאה. אנו נוקטים באמצעי אבטחה סבירים, אך אין ביכולתנו להבטיח אבטחה מוחלטת של כל מידע המועבר דרך האינטרנט.</p>
          </section>

          <section>
            <h2 className="font-cormorant text-2xl font-semibold mb-4">8. יצירת קשר</h2>
            <div className="bg-white rounded-2xl p-6 border border-[#E5D5C0]">
              <p className="font-medium text-[#2C241A] mb-3">חגית ארגמן — אחראית פרטיות</p>
              <div className="space-y-1.5 text-sm text-[#4a3e2f]">
                <p>📧 <a href="mailto:Hagitargaman@gmail.com" className="text-[#C9A86A]">Hagitargaman@gmail.com</a></p>
                <p>📞 <a href="tel:052-267-6718" className="text-[#C9A86A]">052-267-6718</a></p>
                <p>🌐 <a href="https://suite-hagit.co.il" className="text-[#C9A86A]">suite-hagit.co.il</a></p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}
