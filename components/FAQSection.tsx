'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'מה כולל השימוש בסוויטה?',
    a: 'הסוויטה כוללת שימוש מלא בוילה מהבוקר עד אחרי הצהריים, עמדת ביוטי עם תאורה מקצועית, יין בוטיק מיקב הרי ירושלים, פירות טריים, שתייה חמה וקרה, מוזיקת רקע אמבינטית ושימוש במתקני הוילה. בחבילת פרימיום מצורפת גם ארוחת בוקר כפרית עשירה ושמפניה חגיגית.',
  },
  {
    q: 'כמה אנשים יכולים להיות בסוויטה?',
    a: 'הסוויטה מיועדת לכלה ולמלוות שלה — מאפרת, עיצוב שיער, צלמת ובני משפחה קרובים. הסלון המרווח נוח לקבוצה של עד 8-10 אנשים בו-זמנית.',
  },
  {
    q: 'איפה הסוויטה ממוקמת?',
    a: 'הסוויטה ממוקמת בהרי ירושלים, מרחק נסיעה קצר ממרכז ירושלים ומהאזור המטרופוליני של תל אביב. הכתובת המדויקת נמסרת לאחר אישור ההזמנה.',
  },
  {
    q: 'האם ניתן להזמין גם צלמת, מאפרת וספרית?',
    a: 'כן! חגית עובדת עם רשת אנשי מקצוע מנוסים ותשמח לסייע בהרכבת חבילה מלאה עם צלמת, מאפרת, עיצוב שיער וקייטרינג — הכל מותאם אישית לצרכים שלך.',
  },
  {
    q: 'מה ההפרש בין חבילת הבסיס לחבילת הפרימיום?',
    a: 'חבילת הבסיס עולה 2,000₪ וכוללת את השימוש המלא בוילה עם כל המתקנים, יין, פינוקים ותאורה מקצועית. חבילת הפרימיום עולה 2,500₪ ומוסיפה ארוחת בוקר כפרית עשירה לכולן, שמפניה חגיגית, זר פרחים טריים וכריכים לאורך הבוקר.',
  },
  {
    q: 'כמה זמן מראש צריך להזמין?',
    a: 'מומלץ מאוד לשריין תאריך לפחות 3-6 חודשים מראש, במיוחד בעונת האביב והסתיו שהן עמוסות מאוד. צרי קשר בוואטסאפ לבדיקת זמינות.',
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-28 px-6 bg-[#FAF6EE]">
      <div className="max-w-3xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-[#C9A86A]" />
            <span className="text-[#A07840] text-sm tracking-[0.3em] uppercase font-medium">שאלות נפוצות</span>
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-[#C9A86A]" />
          </div>
          <h2 className="font-cormorant text-5xl md:text-6xl text-[#2C241A] font-light leading-none">
            כל מה שרצית לדעת
          </h2>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="bg-white rounded-2xl border border-[#E5D5C0] overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-right px-6 py-5 flex items-center justify-between gap-4 hover:bg-[#FAF6EE] transition-colors"
                aria-expanded={open === i}
              >
                <span className="font-cormorant text-xl text-[#2C241A] font-medium leading-snug">
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0 text-[#C9A86A]"
                >
                  <ChevronDown size={20} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-6 pb-6 text-[#594937] font-light text-sm leading-relaxed border-t border-[#E5D5C0] pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
