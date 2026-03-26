import type { Metadata } from 'next'
import BlogLayout from '@/components/BlogLayout'

const SITE = 'https://suite-hagit.co.il'
const WA   = 'https://wa.me/972522676718?text=%D7%94%D7%99%D7%99%20%D7%97%D7%92%D7%99%D7%AA%2C%20%D7%A7%D7%A8%D7%90%D7%AA%D7%99%20%D7%90%D7%AA%20%D7%94%D7%9E%D7%93%D7%A8%D7%99%D7%9A%20%D7%95%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%A8%D7%99%D7%99%D7%9F%20%F0%9F%92%8D'

export const metadata: Metadata = {
  title: 'התארגנות כלה ביום החתונה — המדריך המלא',
  description: 'המדריך המלא להתארגנות כלה ביום החתונה: לוח זמנים מומלץ, רשימת ציוד חובה, ואיך לבחור מקום שיגרום לך להגיע לחופה רגועה ומאושרת.',
  alternates: { canonical: `${SITE}/blog/hitargenut-kala-yom-chatuna` },
  openGraph: {
    title: 'התארגנות כלה ביום החתונה — המדריך המלא',
    description: 'המדריך המלא להתארגנות כלה ביום החתונה: לוח זמנים, רשימת ציוד ואיך לבחור מקום.',
    url: `${SITE}/blog/hitargenut-kala-yom-chatuna`,
    type: 'article',
  },
}

const articleLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'התארגנות כלה ביום החתונה — המדריך המלא',
  author: { '@type': 'Person', name: 'חגית ארגמן', url: SITE },
  publisher: { '@type': 'Organization', name: 'חגית סוויטת כלות', url: SITE },
  datePublished: '2026-03-01',
  dateModified: '2026-03-24',
  url: `${SITE}/blog/hitargenut-kala-yom-chatuna`,
  inLanguage: 'he-IL',
  description: 'המדריך המלא להתארגנות כלה ביום החתונה',
}

export default function Article() {
  return (
    <BlogLayout title="התארגנות כלה ביום החתונה">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      <article className="prose-custom">
        <header className="mb-12">
          <p className="text-[#A07840] text-sm tracking-[0.2em] uppercase font-medium mb-4">מדריך מלא</p>
          <h1 className="font-cormorant text-4xl md:text-5xl text-[#2C241A] font-light leading-tight mb-4">
            התארגנות כלה ביום החתונה — המדריך המלא
          </h1>
          <p className="text-[#8B7355] text-sm font-light">5 דקות קריאה · עודכן מרץ 2026</p>
        </header>

        <div className="space-y-8 text-[#594937] font-light text-base leading-relaxed">

          <p>
            יום החתונה מתחיל הרבה לפני שהמוזיקה מתנגנת בחופה. הוא מתחיל ברגע שבו את פותחת את העיניים בבוקר — ומה שקורה בין הרגע הזה לבין הצעידה לחופה קובע, במידה רבה, את האנרגיה שאיתה תגיעי לרגע הגדול.
          </p>

          <section>
            <h2 className="font-cormorant text-3xl text-[#2C241A] font-semibold mb-3">מה זה בכלל "התארגנות כלה"?</h2>
            <p>
              "התארגנות כלה" היא הסשן הקדם-חתוני שבו הכלה מאורגנת, מאופרת, מסודרת שיער ולבושה, בדרך כלל בנוכחות המלוות הקרובות לה ביותר: אמא, אחיות, חברות ילדות. זה זמן של חיבוק, של קפה, של צחוקים ודמעות — ושל מתח שצריך לנהל אותו בצורה נכונה.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-3xl text-[#2C241A] font-semibold mb-3">מתי להתחיל?</h2>
            <p>
              ההמלצה הכללית היא להתחיל 5-6 שעות לפני טקס החופה. אם החופה ב-19:00, כדאי שתהיי במקום ב-13:00 לכל היותר. חלק מהכלות מגיעות גם ב-11:00 כדי לקחת קפה, להירגע ולתת לעצמן זמן של נשימה לפני שהמאפרת מתחילה.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-3xl text-[#2C241A] font-semibold mb-4">לוח זמנים מומלץ ליום החתונה</h2>
            <div className="bg-white rounded-2xl border border-[#E5D5C0] overflow-hidden">
              {[
                ['11:00', 'הגעה למקום ההתארגנות, ארוחת בוקר קלה, קפה'],
                ['12:30', 'התחלת עיצוב שיער'],
                ['13:30', 'התחלת איפור'],
                ['15:30', 'סיום איפור ושיער, לבישת שמלת הכלה'],
                ['16:00', 'צילומים פרטיים בסוויטה לפני החתונה'],
                ['17:00', 'יציאה לטקס'],
              ].map(([time, desc], i) => (
                <div key={i} className={`flex items-start gap-4 px-6 py-4 ${i < 5 ? 'border-b border-[#E5D5C0]' : ''}`}>
                  <span className="font-cormorant text-lg text-[#C9A86A] font-semibold shrink-0 w-14">{time}</span>
                  <span className="text-[#594937] text-sm leading-relaxed">{desc}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-cormorant text-3xl text-[#2C241A] font-semibold mb-4">רשימת ציוד חובה שלא לשכוח</h2>
            <ol className="space-y-2 list-decimal list-inside marker:text-[#C9A86A] marker:font-semibold">
              {[
                'שמלת הכלה + תחתיות',
                'נעלי החתונה + נעלי נוחות להחלפה',
                'תיק יום קטן עם: ספוג, שפתון, עט להחתמת כתובה',
                'ערכת חירום: סיכות בטחון, מדבקות לנעליים, אספירין',
                'ריסים בודדים + דבק, ספריי לשיער',
                'מסמכים: ת.ז., טבעות החתונה (לוודא!)',
                'מטען טלפון + אוזניות',
              ].map((item, i) => (
                <li key={i} className="text-[#594937] text-sm leading-relaxed pr-1">{item}</li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="font-cormorant text-3xl text-[#2C241A] font-semibold mb-3">איפה להתארגן?</h2>
            <p>
              הבית הוא האפשרות הנוחה, אבל לעיתים גם הכאוטית ביותר. תמיד יש מישהו שלא סיים להתלבש, כלב שקופץ לסלון, ילד שבוכה. מלון יכול להרגיש קר ובירוקרטי — חדר זר שאין בו שום נגיעה אישית.
            </p>
            <p className="mt-3">
              <strong className="font-semibold text-[#2C241A]">סוויטת כלות פרטית</strong> — כמו{' '}
              <a href={`${SITE}/blog/suite-kalot-harei-yerushalayim`} className="text-[#C9A86A] hover:underline">
                הוילה של חגית בהרי ירושלים
              </a>{' '}
              — מציעה משהו שהביתה לא יכול לתת: שקט מוחלט, מרחב מעוצב, עמדות ביוטי מקצועיות ותאורה נכונה. האוכל כבר שם. הפרחים כבר בסלון. היין כבר קר. את רק צריכה להגיע ולנשום.
            </p>
          </section>

          <section className="bg-[#FAF6EE] rounded-2xl p-6 border border-[#E5D5C0]">
            <h3 className="font-cormorant text-2xl text-[#2C241A] font-semibold mb-2">הטיפ שאף אחד לא אומר לך</h3>
            <p>
              תכנני 30 דקות "בלום" בלוח הזמנים שלך. לא לצילומים, לא למאפרת — פשוט זמן ריק. כי תמיד יקרה משהו שלא תכננת. אם לא יקרה — יש לך 30 דקות לישון, לנשום, או לשבת עם אמא שלך בשקט.
            </p>
          </section>

          <section>
            <h2 className="font-cormorant text-3xl text-[#2C241A] font-semibold mb-3">מה הופך התארגנות מ"סשן" לחוויה?</h2>
            <p>
              כלות שמתארגנות בסוויטה פרטית מדווחות שוב ושוב על אותה תחושה: "הרגשתי שסוף סוף מישהו דאג לי". זה לא עניין של מותרות — זה עניין של מיינדסט. כשהסביבה רגועה, את רגועה. כשאת רגועה, את נוכחת. וכשאת נוכחת — זה מה שיראה בתמונות.
            </p>
          </section>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="flex-1 text-center bg-[#2C241A] hover:bg-[#4a3e2f] text-white px-6 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all">
              שרייני תאריך בוואטסאפ ←
            </a>
            <a href={`${SITE}/blog/tips-boker-chatuna`}
              className="flex-1 text-center border border-[#C9A86A] text-[#A07840] hover:bg-[#C9A86A] hover:text-white px-6 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all">
              10 טיפים לבוקר חתונה →
            </a>
          </div>
        </div>
      </article>
    </BlogLayout>
  )
}
