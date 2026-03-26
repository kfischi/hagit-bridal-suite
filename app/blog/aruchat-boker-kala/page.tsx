import type { Metadata } from 'next'
import BlogLayout from '@/components/BlogLayout'

const SITE = 'https://suite-hagit.co.il'
const WA   = 'https://wa.me/972522676718?text=%D7%94%D7%99%D7%99%20%D7%97%D7%92%D7%99%D7%AA%2C%20%D7%A7%D7%A8%D7%90%D7%AA%D7%99%20%D7%A2%D7%9C%20%D7%90%D7%A8%D7%95%D7%97%D7%AA%20%D7%91%D7%95%D7%A7%D7%A8%20%D7%95%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%A8%D7%99%D7%99%D7%9F%20%F0%9F%92%8D'

export const metadata: Metadata = {
  title: 'מה אוכלים ביום החתונה — ארוחת בוקר לכלה',
  description: 'מה כדאי לאכול ביום החתונה? מדריך תזונה לכלה: אילו מזונות נותנים אנרגיה, מה להימנע ממנו, ומתי לאכול כדי להגיע לחופה בכוחות מלאים.',
  alternates: { canonical: `${SITE}/blog/aruchat-boker-kala` },
  openGraph: {
    title: 'מה אוכלים ביום החתונה — ארוחת בוקר לכלה',
    description: 'מדריך תזונה לכלה: מה לאכול ביום החתונה ולהגיע בכוחות מלאים.',
    url: `${SITE}/blog/aruchat-boker-kala`,
    type: 'article',
  },
}

const articleLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'מה אוכלים ביום החתונה — ארוחת בוקר לכלה',
  author: { '@type': 'Person', name: 'חגית ארגמן', url: SITE },
  publisher: { '@type': 'Organization', name: 'חגית סוויטת כלות', url: SITE },
  datePublished: '2026-03-10',
  dateModified: '2026-03-24',
  url: `${SITE}/blog/aruchat-boker-kala`,
  inLanguage: 'he-IL',
}

export default function Article() {
  return (
    <BlogLayout title="ארוחת בוקר לכלה">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />

      <article>
        <header className="mb-12">
          <p className="text-[#A07840] text-sm tracking-[0.2em] uppercase font-medium mb-4">תזונה ביום החתונה</p>
          <h1 className="font-cormorant text-4xl md:text-5xl text-[#2C241A] font-light leading-tight mb-4">
            מה אוכלים ביום החתונה — ארוחת בוקר לכלה
          </h1>
          <p className="text-[#8B7355] text-sm font-light">3 דקות קריאה · עודכן מרץ 2026</p>
        </header>

        <div className="space-y-8 text-[#594937] font-light text-base leading-relaxed">

          <p>
            ביום החתונה, כולם דואגים לכלה — חוץ מהכלה עצמה. בין האיפור, השמלה, המשפחה, והוואטסאפים שמגיעים כל שנייה, קל מאוד לשכוח לאכול. וזו טעות שמשפיעה על הכל.
          </p>

          <section>
            <h2 className="font-cormorant text-3xl text-[#2C241A] font-semibold mb-3">למה ארוחת בוקר היא לא אופציה</h2>
            <p>
              יום החתונה הוא ריצת מרתון. שעות של עמידה, ריקוד, חיבוקים, צחוקים, דמעות — הגוף שלך יעבוד קשה מאוד. ביום כזה, גוף שלא קיבל אנרגיה נופל מוקדם. ועייפות בשמונה בערב, כשהריקודים בשיא — זה לא מה שרצית. בנוסף: דם נמוך בסוכר גורם לעצבנות.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-3xl text-[#2C241A] font-semibold mb-4">מה לאכול — ומה להימנע</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-6 border border-[#E5D5C0]">
                <p className="font-cormorant text-xl text-[#2C241A] font-semibold mb-3">✅ מומלץ</p>
                <ul className="space-y-1.5">
                  {[
                    'ביצים — חלבון שמחזיק לאורך זמן',
                    'לחם מחיטה מלאה',
                    'פירות טריים',
                    'יוגורט עם גרנולה',
                    'אגוזים ושקדים',
                    'קפה — כוס אחת-שתיים',
                  ].map((item, i) => (
                    <li key={i} className="text-[#594937] text-sm font-light flex gap-2">
                      <span className="text-[#C9A86A]">·</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#FAF6EE] rounded-2xl p-6 border border-[#E5D5C0]">
                <p className="font-cormorant text-xl text-[#2C241A] font-semibold mb-3">❌ להימנע</p>
                <ul className="space-y-1.5">
                  {[
                    'אוכל שמן — כבד לעיכול',
                    'סושי וסלמון חי',
                    'כרוב, ברוקולי, בצל (נפיחות)',
                    'מיצים ממותקים מדי',
                    'ארוחה כבדה לפני החופה',
                  ].map((item, i) => (
                    <li key={i} className="text-[#594937] text-sm font-light flex gap-2">
                      <span className="text-[#8B7355]">·</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-cormorant text-3xl text-[#2C241A] font-semibold mb-3">מתי לאכול</h2>
            <p>
              ארוחת בוקר עד שעתיים לפני שמתחיל הסשן, ואז ציוד אוכל קל לאורך הבוקר — פרי, אגוזים, כריך קטן. אל תניחי שתספיקי לאכול לפני החופה בהאוס. תמיד יש עיכובים, תמיד מישהו מחכה לך.
            </p>
          </section>

          <section className="bg-[#2C241A] rounded-2xl p-8">
            <h2 className="font-cormorant text-2xl text-[#FAF6EE] font-light mb-3">ארוחת הבוקר של חגית</h2>
            <p className="text-[#B09880] font-light text-sm leading-relaxed mb-0">
              בסוויטה של חגית, בחבילת הפרימיום, מוגשת ארוחת בוקר כפרית עשירה: גבינות, ירקות טריים, ביצים, לחמים, פירות חתוכים, ריבות ומרמלדות ביתיות. לא קייטרינג קר — אוכל טרי שחגית מכינה עם אהבה, כי היא יודעת שהדלק הנכון בבוקר מוביל לחופה הכי טובה.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-3xl text-[#2C241A] font-semibold mb-3">טיפים פרקטיים</h2>
            <ol className="space-y-2 list-decimal list-inside marker:text-[#C9A86A] marker:font-semibold">
              {[
                'הכיני ארוחה בשקית יום קודם — גם אם את לא בסוויטה, דאגי שיהיה לך אוכל מוכן.',
                'תביאי בקבוק מים — הידרציה היא לא פחות חשובה מאוכל.',
                'מנת פחמימה קטנה לפני הקבלת פנים — כריך, בר אנרגיה, בננה.',
              ].map((tip, i) => (
                <li key={i} className="text-[#594937] text-sm leading-relaxed">{tip}</li>
              ))}
            </ol>
          </section>

          <section className="bg-[#FAF6EE] rounded-xl p-5 border border-[#E5D5C0]">
            <p className="font-cormorant text-xl text-[#2C241A] font-semibold mb-1">מה עם הדיאטה?</p>
            <p className="text-[#594937] text-sm font-light">
              אם התחלת דיאטה מיוחדת לחתונה — עצרי אותה שלושה ימים לפני. ביום החתונה, הגוף שלך צריך אנרגיה ויציבות, לא מחסור קלורי. יופי אמיתי מגיע ממקום של עוצמה, לא עייפות.
            </p>
          </section>

          <p>
            קראי עוד:{' '}
            <a href={`${SITE}/blog/tips-boker-chatuna`} className="text-[#C9A86A] hover:underline">
              10 טיפים לבוקר חתונה מושלם
            </a>{' '}
            ו
            <a href={`${SITE}/blog/hitargenut-kala-yom-chatuna`} className="text-[#C9A86A] hover:underline">
              המדריך המלא להתארגנות כלה
            </a>.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="flex-1 text-center bg-[#2C241A] hover:bg-[#4a3e2f] text-white px-6 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all">
              לסוויטה שמכינה לך ארוחת בוקר ←
            </a>
            <a href={`${SITE}/blog/suite-kalot-harei-yerushalayim`}
              className="flex-1 text-center border border-[#C9A86A] text-[#A07840] hover:bg-[#C9A86A] hover:text-white px-6 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all">
              על הסוויטה שלנו →
            </a>
          </div>
        </div>
      </article>
    </BlogLayout>
  )
}
