import type { Metadata } from 'next'
import BlogLayout from '@/components/BlogLayout'

const SITE = 'https://suite-hagit.co.il'
const WA   = 'https://wa.me/972522676718?text=%D7%94%D7%99%D7%99%20%D7%97%D7%92%D7%99%D7%AA%2C%20%D7%A7%D7%A8%D7%90%D7%AA%D7%99%20%D7%A2%D7%9C%20%D7%A1%D7%95%D7%95%D7%99%D7%98%D7%AA%20%D7%94%D7%9B%D7%9C%D7%95%D7%AA%20%D7%95%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%A8%D7%99%D7%99%D7%9F%20%F0%9F%92%8D'

export const metadata: Metadata = {
  title: 'סוויטת כלות בהרי ירושלים — מה לצפות',
  description: 'כל מה שצריך לדעת לפני שבוחרים סוויטת כלות בהרי ירושלים: מה כוללת הסוויטה, כמה עולה, ומה הופך את האזור לבחירה האידיאלית לבוקר החתונה.',
  alternates: { canonical: `${SITE}/blog/suite-kalot-harei-yerushalayim` },
  openGraph: {
    title: 'סוויטת כלות בהרי ירושלים — מה לצפות',
    description: 'כל מה שצריך לדעת לפני שבוחרים סוויטת כלות בהרי ירושלים.',
    url: `${SITE}/blog/suite-kalot-harei-yerushalayim`,
    type: 'article',
  },
}

const articleLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'סוויטת כלות בהרי ירושלים — מה לצפות',
  author: { '@type': 'Person', name: 'חגית ארגמן', url: SITE },
  publisher: { '@type': 'Organization', name: 'חגית סוויטת כלות', url: SITE },
  datePublished: '2026-03-01',
  dateModified: '2026-03-24',
  url: `${SITE}/blog/suite-kalot-harei-yerushalayim`,
  inLanguage: 'he-IL',
}

export default function Article() {
  return (
    <BlogLayout title="סוויטת כלות בהרי ירושלים">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />

      <article>
        <header className="mb-12">
          <p className="text-[#A07840] text-sm tracking-[0.2em] uppercase font-medium mb-4">מדריך מקום</p>
          <h1 className="font-cormorant text-4xl md:text-5xl text-[#2C241A] font-light leading-tight mb-4">
            סוויטת כלות בהרי ירושלים — מה לצפות
          </h1>
          <p className="text-[#8B7355] text-sm font-light">4 דקות קריאה · עודכן מרץ 2026</p>
        </header>

        <div className="space-y-8 text-[#594937] font-light text-base leading-relaxed">

          <p>
            הרי ירושלים הם אחד המקומות היפים ביותר בישראל, ומסתבר שהם גם הבחירה המושלמת לבוקר חתונה. אם חשבת פעם לממש את החלום ולהתארגן מחוץ לבית — מאמר זה בשבילך.
          </p>

          <section>
            <h2 className="font-cormorant text-3xl text-[#2C241A] font-semibold mb-3">למה בכלל לצאת מהבית?</h2>
            <p>
              כלות רבות בוחרות להתארגן בבית — ואחר כך מתחרטות. הבית מרגיש מוכר ובטוח, אבל הוא גם מלא בהסחות דעת: בני משפחה שמתרוצצים, לוגיסטיקה של חתונה שדורשת תשומת לב, וטלפון שצלצל עשר פעמים בשעה האחרונה. סוויטה פרטית מספקת גבול פיזי ברור: ביום הזה, המקום הזה הוא שלך בלבד.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-3xl text-[#2C241A] font-semibold mb-3">מה מיוחד בהרי ירושלים?</h2>
            <p>
              הרי ירושלים מציעים שילוב נדיר: קרבה יחסית לעיר (20–40 דקות מרוב שכונות ירושלים, ושעה בערך מגוש דן) לצד שקט כפרי מוחלט. האוויר שם שונה — צח, קריר יחסית בקיץ, ומלא בריח של יערות אורנים. הנוף מחלונות הסוויטה לבדו שווה את הנסיעה.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-3xl text-[#2C241A] font-semibold mb-4">מה חייב להיות בסוויטת כלות טובה?</h2>
            <div className="space-y-3">
              {[
                ['עמדת ביוטי עם תאורה מקצועית', 'תאורה לא נכונה הורסת לא רק את האיפור, אלא את כל התמונות.'],
                ['מרחב לישיבה', 'סלון גדול שבו כולן יכולות לשבת בנוחות, לא להסתחרר בפינה קטנה.'],
                ['שירותים מסודרים ונגישים', 'נשמע בסיסי, אבל זה משנה.'],
                ['פינוקים שדאגו אליהם', 'קפה חם, פירות, יין, ארוחת בוקר. הכלה לא צריכה לדאוג לזה.'],
                ['פרטיות מלאה', 'רק הקבוצה שלך, לא אורחים חיצוניים.'],
              ].map(([title, desc], i) => (
                <div key={i} className="flex gap-3 bg-white rounded-xl p-4 border border-[#E5D5C0]">
                  <span className="text-[#C9A86A] font-cormorant text-xl font-semibold shrink-0">{i + 1}.</span>
                  <div>
                    <p className="text-[#2C241A] font-semibold text-sm mb-0.5">{title}</p>
                    <p className="text-[#594937] font-light text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-cormorant text-3xl text-[#2C241A] font-semibold mb-4">הסוויטה של חגית — מה שונה?</h2>
            <p>
              חגית פותחת את ביתה — ממש ביתה — לכלה ולמלוות. זה לא מלון, ולא אולם. זו וילה פרטית שמוקדשת לך ולאנשים הכי קרובים ליבך. היא שם, אישית, כל הבוקר. לא עובדת שכירה — חגית עצמה, עם כוס קפה, שאלה אם את צריכה עוד כלום.
            </p>
            <ul className="mt-4 space-y-2 list-disc list-inside marker:text-[#C9A86A]">
              {[
                'סלון מרווח עם ספות נוחות',
                'עמדות ביוטי עם תאורה ייעודית',
                'נוף פנורמי להרי ירושלים',
                'יין בוטיק מיקב מקומי',
                'פרחים טריים',
                'ארוחת בוקר כפרית (בחבילת פרימיום)',
                'מוזיקה ברקע ואווירה שקטה',
              ].map((item, i) => (
                <li key={i} className="text-[#594937] text-sm">{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-cormorant text-3xl text-[#2C241A] font-semibold mb-4">שאלות שכלות שואלות</h2>
            <div className="space-y-4">
              {[
                ['כמה רחוק זה?', 'הסוויטה נגישה מירושלים ומגוש דן כאחד, עם חניה פרטית בשטח הנכס.'],
                ['האם הדרך קשה?', 'הגישה נוחה ברכב פרטי. לא שביל עפר, לא ג\'יפ.'],
                ['מה אם רוצות להביא אוכל מהבית?', 'אפשר בהחלט. הסוויטה היא הבית שלך לאותו הבוקר.'],
              ].map(([q, a], i) => (
                <div key={i} className="bg-[#FAF6EE] rounded-xl p-5 border border-[#E5D5C0]">
                  <p className="font-cormorant text-lg text-[#2C241A] font-semibold mb-1">{q}</p>
                  <p className="text-[#594937] text-sm font-light">{a}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="flex-1 text-center bg-[#2C241A] hover:bg-[#4a3e2f] text-white px-6 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all">
              שרייני תאריך בוואטסאפ ←
            </a>
            <a href={`${SITE}/blog/hitargenut-kala-yom-chatuna`}
              className="flex-1 text-center border border-[#C9A86A] text-[#A07840] hover:bg-[#C9A86A] hover:text-white px-6 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all">
              מדריך התארגנות מלא →
            </a>
          </div>
        </div>
      </article>
    </BlogLayout>
  )
}
