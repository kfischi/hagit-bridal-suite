import type { Metadata } from 'next'
import BlogLayout from '@/components/BlogLayout'

const SITE = 'https://suite-hagit.co.il'
const WA   = 'https://wa.me/972522676718?text=%D7%94%D7%99%D7%99%20%D7%97%D7%92%D7%99%D7%AA%2C%20%D7%A7%D7%A8%D7%90%D7%AA%D7%99%20%D7%90%D7%AA%20%D7%94%D7%98%D7%99%D7%A4%D7%99%D7%9D%20%D7%95%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A9%D7%A8%D7%99%D7%99%D7%9F%20%F0%9F%92%8D'

export const metadata: Metadata = {
  title: '10 טיפים לבוקר חתונה מושלם | חגית סוויטת כלות',
  description: '10 טיפים שיהפכו את בוקר החתונה שלך מכאוטי למאגי: לוח זמנים, מה לאכול, מה להכין מראש ואיך להגיע לחופה רגועה.',
  alternates: { canonical: `${SITE}/blog/tips-boker-chatuna` },
  openGraph: {
    title: '10 טיפים לבוקר חתונה מושלם',
    description: 'טיפים שיהפכו את בוקר החתונה שלך לחוויה קסומה.',
    url: `${SITE}/blog/tips-boker-chatuna`,
    type: 'article',
  },
}

const articleLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '10 טיפים לבוקר חתונה מושלם',
  author: { '@type': 'Person', name: 'חגית ארגמן', url: SITE },
  publisher: { '@type': 'Organization', name: 'חגית סוויטת כלות', url: SITE },
  datePublished: '2026-03-05',
  dateModified: '2026-03-24',
  url: `${SITE}/blog/tips-boker-chatuna`,
  inLanguage: 'he-IL',
}

const TIPS = [
  ['התחילי מוקדם יותר ממה שחושבת', 'גם אם המאפרת אמרה לך 11:00 — תבואי ב-10:30. תמיד יש עיכובים, תמיד יש דבר קטן שלא חשבת עליו. הזמן הנוסף יהיה מתנה.'],
  ['אכלי ארוחת בוקר אמיתית', 'כלות רבות שוכחות לאכול ביום החתונה. דם נמוך בסוכר גורם לעייפות ועצבנות. ארוחת בוקר מזינה — ביצים, לחם, פירות, חלבון — היא הבסיס לאנרגיה טובה לאורך כל הערב.'],
  ['הכיני שקית "חירום" מראש', 'שקית קטנה עם: סיכות ביטחון, מדבקות לנעליים, שפתון בגוון האיפור, ספוג, אספירין, מדבקת בדק בית לשמלה. ריסים בודדים ודבק ריסים.'],
  ['הגבילי את מספר האנשים בחדר', 'עד 6-7 מלוות זה מוגבל ונינוח. מעבר לזה — שמרי אותן לחופה. רעש יוצר עצבנות, ועצבנות ביום החתונה היא האחרון שצריך.'],
  ['תורידי הודעות ל-DND', '"Do Not Disturb" לשלוש השעות הראשונות של הבוקר. הטלפון הוא מקלחת הפתעות שמישהי תמיד מגיעה עם "שאלה קטנה". ספרי לכולם מראש שאת לא זמינה.'],
  ['צלמי "before" מהיפות הקטנות', 'לפני האיפור, לפני הכל — הכניסי תמונה. את, כוס קהווה בידך, אור הבוקר מאחוריך. זה תמיד יוצא מדהים.'],
  ['בחרי מקום שיסדר לך את הלוגיסטיקה', 'אוכל, שתייה, מקלחת, מקום לנשום — אלה פריטי יסוד. אם הסביבה פנויה מלוגיסטיקה, הראש שלך פנוי לרגש.'],
  ['קחי עשר דקות לעצמך לפני שהצלמת נכנסת', 'חדר מנוחה, ספה שקטה, עיניים עצומות. תני לרגש לשקוע. זה לא זמן אבוד — זה ההשקעה הכי טובה שתעשי ביום.'],
  ['כתבי פתק לחתן', 'כן, בכתב יד. לא ווטסאפ. שורה אחת, שתיים, שלוש. תתני לשושבין שיעביר אותו אליו לפני החופה. זה אחד הרגעים שהכלות מדברות עליו שנים.'],
  ['תרשי לרגע לקרות', 'הכלות שמגיעות לחופה הכי מאושרות הן לא אלה שתכננו הכי הרבה — הן אלה שהכי שחררו. תצחקי עם אמא שלך. תשתי עוד כוס קפה. זה שלך.'],
]

export default function Article() {
  return (
    <BlogLayout title="10 טיפים לבוקר חתונה מושלם">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />

      <article>
        <header className="mb-12">
          <p className="text-[#A07840] text-sm tracking-[0.2em] uppercase font-medium mb-4">רשימת טיפים</p>
          <h1 className="font-cormorant text-4xl md:text-5xl text-[#2C241A] font-light leading-tight mb-4">
            10 טיפים לבוקר חתונה מושלם
          </h1>
          <p className="text-[#8B7355] text-sm font-light">4 דקות קריאה · עודכן מרץ 2026</p>
        </header>

        <div className="space-y-8 text-[#594937] font-light text-base leading-relaxed">

          <p>
            בוקר החתונה הוא אחד הרגעים הכי אינטנסיביים ביום שלך — גם כי הוא הכי ממושך, וגם כי הוא הכי טעון רגשית. הנה 10 דברים שיהפכו אותו ממרוץ מחסומים לחוויה שתזכרי לכל החיים.
          </p>

          <div className="space-y-5">
            {TIPS.map(([title, desc], i) => (
              <div key={i} className="flex gap-5 items-start">
                <span className="font-cormorant text-4xl text-[#C9A86A] font-light leading-none shrink-0 w-10 text-center">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-cormorant text-xl text-[#2C241A] font-semibold mb-1">{title}</h3>
                  <p className="text-[#594937] font-light text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#2C241A] rounded-2xl p-8 text-center">
            <p className="font-cormorant text-2xl text-[#FAF6EE] font-light italic mb-2">
              &ldquo;הכלות שמגיעות לחופה הכי מאושרות הן לא אלה שתכננו הכי הרבה —
            </p>
            <p className="font-cormorant text-2xl text-[#C9A86A] font-light italic mb-4">
              הן אלה שהכי שחררו.&rdquo;
            </p>
          </div>

          <p>
            אם את רוצה שמישהו ידאג לכל הפרטים עבורך — קראי את{' '}
            <a href={`${SITE}/blog/hitargenut-kala-yom-chatuna`} className="text-[#C9A86A] hover:underline">
              המדריך שלנו להתארגנות כלה
            </a>{' '}
            ואיך{' '}
            <a href={`${SITE}/blog/aruchat-boker-kala`} className="text-[#C9A86A] hover:underline">
              ארוחת הבוקר הנכונה
            </a>{' '}
            יכולה לשנות את כל הדינמיקה של הבוקר.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="flex-1 text-center bg-[#2C241A] hover:bg-[#4a3e2f] text-white px-6 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all">
              שרייני בוקר חתונה מושלם ←
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
