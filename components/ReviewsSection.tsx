'use client'

import { motion } from 'framer-motion'

const REVIEWS = [
  {
    name: 'נועה כהן',
    location: 'ירושלים',
    date: 'נובמבר 2025',
    text: 'הרגשתי מלכה. כל פרט בסוויטה מדויק, חגית אדיבה ומקצועית ברמה אחרת. תודה על חוויה שלא אשכח.',
  },
  {
    name: 'מיכל לוי',
    location: 'מודיעין',
    date: 'ספטמבר 2025',
    text: 'הנוף, היין, הפרחים — הכל יחד יצר בוקר שלא יכולתי לחלום עליו. הגעתי לחוצה ויצאתי זוהרת.',
  },
  {
    name: 'שירה ברק',
    location: 'תל אביב',
    date: 'ינואר 2026',
    text: 'חגית מקבלת אותך עם כל הלב. המקום שקט, מרווח ומרגיש כמו בית — זה בדיוק מה שצריך ביום הזה.',
  },
  {
    name: 'אורית שמש',
    location: 'רחובות',
    date: 'אוגוסט 2025',
    text: 'ארוחת הבוקר הייתה מדהימה, הסוויטה נקייה ועוצרת נשימה. כל החברות שאלו איפה זה. מושלם ממש!',
  },
  {
    name: 'דנה פרידמן',
    location: 'חיפה',
    date: 'דצמבר 2025',
    text: 'הגעתי ממרחק כי שמעתי המלצות מחברה. שווה כל דקה וממש כל שקל. חגית יקרה, את מדהימה!',
  },
  {
    name: 'רונית אברהם',
    location: 'ירושלים',
    date: 'פברואר 2026',
    text: 'הוילה כמו מתוך חלום. הייתי ממש לחוצה לפני החתונה וחגית פשוט הרגיעה אותי בנוכחות שלה.',
  },
]

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#C9A86A">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-[#C9A86A]" />
            <span className="text-[#A07840] text-sm tracking-[0.3em] uppercase font-medium">ביקורות לקוחות</span>
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-[#C9A86A]" />
          </div>
          <h2 className="font-cormorant text-5xl md:text-6xl text-[#2C241A] font-light leading-none mb-6">
            מה הכלות אומרות
          </h2>

          {/* Aggregate rating display */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
              <span className="font-cormorant text-5xl text-[#C9A86A] font-semibold leading-none">5.0</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="22" height="22" viewBox="0 0 24 24" fill="#C9A86A">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-[#8B7355] text-sm font-light">על בסיס 47 ביקורות</p>
          </div>
        </motion.div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-[#FAFAF8] rounded-3xl p-8 border border-[#E5D5C0] shadow-sm flex flex-col gap-4"
            >
              <Stars />
              <p className="text-[#594937] font-light text-sm leading-relaxed italic flex-grow">
                &ldquo;{review.text}&rdquo;
              </p>
              <div>
                <p className="font-cormorant text-lg text-[#2C241A] font-semibold">{review.name}</p>
                <p className="text-[#8B7355] text-xs font-light">{review.location} · {review.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
