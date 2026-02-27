'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Heart, Check, ChevronDown, Star, Phone, MessageCircle, Sparkles } from 'lucide-react'

// ============================================================
// CONFIGURATION — שני מהכאן לפי הצורך
// ============================================================
const CONFIG = {
  phoneNumber: '972522676718',
  whatsappMessage: 'היי חגית! ראיתי את מחיר ההשקה המיוחד ואני רוצה לשמוע פרטים 💍',
  regularPrice: 2000,
  launchPrice: 500,
  deadline: new Date('2026-03-31T23:59:59'),
  spotsLeft: 7,
}

// ============================================================
// COUNTDOWN HOOK
// ============================================================
function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calc = () => {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [target])

  return timeLeft
}

// ============================================================
// ANIMATED SECTION WRAPPER
// ============================================================
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================================
// COUNTDOWN BLOCK
// ============================================================
function CountdownBlock() {
  const t = useCountdown(CONFIG.deadline)
  const units = [
    { label: 'ימים', value: t.days },
    { label: 'שעות', value: t.hours },
    { label: 'דקות', value: t.minutes },
    { label: 'שניות', value: t.seconds },
  ]
  return (
    <div className="flex gap-3 justify-center flex-wrap">
      {units.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center">
          <div className="w-[72px] h-[72px] bg-white/10 border border-[#C9A86A]/40 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <AnimatePresence mode="wait">
              <motion.span
                key={value}
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 16, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="font-cormorant text-3xl font-light text-[#F5EDDF]"
              >
                {String(value).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="text-[10px] tracking-[0.2em] text-[#C9A86A] mt-1.5 uppercase">{label}</span>
        </div>
      ))}
    </div>
  )
}

// ============================================================
// TESTIMONIAL CARD
// ============================================================
const testimonials = [
  {
    text: 'לא האמנתי שאפשר להגיע לחתונה כל כך רגועה. חגית יצרה אווירה שגרמה לנו לשכוח שיש חתונה בכלל.',
    name: 'שירה מ.',
    date: 'נשואה ינואר 2025',
    stars: 5,
  },
  {
    text: 'הבוקר הזה היה המתנה הכי טובה שנתתי לעצמי. בואי, תשתי, תנשמי — וזהו. הכל מוכן לפניך.',
    name: 'מיכל ר.',
    date: 'נשואה מרץ 2025',
    stars: 5,
  },
  {
    text: 'עזבי את כל הסטרס לשאר. אצל חגית שעתיים של עולם אחר לגמרי. המלוות שלי עוד מדברות על זה.',
    name: 'נועה א.',
    date: 'נשואה מאי 2025',
    stars: 5,
  },
]

// ============================================================
// WHAT'S INCLUDED
// ============================================================
const included = [
  'חדר פרטי בלעדי לך ולמלוות בלבד',
  'יין ספארקלינג + מגש ממתקים מפנק',
  'פרחים טריים ועיצוב חדר מושלם',
  'תאורה רכה מוכנה לצילומים',
  'ווי-פיי, מוזיקה ואווירה שלכן',
  'ליווי אישי של חגית לאורך כל הבוקר',
]

// ============================================================
// MAIN PAGE
// ============================================================
export default function HashakPage() {
  const whatsappUrl = `https://wa.me/${CONFIG.phoneNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`
  const discount = Math.round((1 - CONFIG.launchPrice / CONFIG.regularPrice) * 100)

  return (
    <>
      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Heebo:wght@300;400;500&display=swap');

        html { scroll-behavior: smooth; }

        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-heebo     { font-family: 'Heebo', sans-serif; }

        .shimmer {
          background: linear-gradient(90deg, #C9A86A 0%, #F0D98A 40%, #C9A86A 60%, #A07840 100%);
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        @keyframes shimmer {
          to { background-position: 200% center; }
        }

        .grain::after {
          content: '';
          position: fixed;
          inset: -50%;
          width: 200%;
          height: 200%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.025;
          pointer-events: none;
          z-index: 100;
        }

        .price-line-through {
          position: relative;
          color: #8B7355;
        }
        .price-line-through::after {
          content: '';
          position: absolute;
          left: -2px;
          right: -2px;
          top: 50%;
          height: 2px;
          background: #C9A86A;
          opacity: 0.7;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #1A1209; }
        ::-webkit-scrollbar-thumb { background: #C9A86A; border-radius: 2px; }

        .cta-btn {
          position: relative;
          overflow: hidden;
        }
        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.15) 50%, transparent 80%);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }
        .cta-btn:hover::before {
          transform: translateX(100%);
        }
      `}</style>

      <div className="font-heebo grain" dir="rtl">

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section className="min-h-screen relative flex flex-col items-center justify-center px-6 overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #1A1209 0%, #2C1F0E 40%, #1E150A 100%)' }}>

          {/* Ambient glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(201,168,106,0.12) 0%, transparent 70%)' }} />

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full border border-[#C9A86A]/30 bg-white/5 backdrop-blur-sm"
          >
            <Sparkles size={13} className="text-[#C9A86A]" />
            <span className="text-[#C9A86A] text-xs tracking-[0.22em] uppercase font-light">מחיר השקה בלעדי</span>
            <Sparkles size={13} className="text-[#C9A86A]" />
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="text-center max-w-3xl"
          >
            <p className="text-[#8B7355] font-light text-sm tracking-[0.3em] uppercase mb-5">
              לפני שנפתח לכולן
            </p>
            <h1 className="font-cormorant text-5xl sm:text-7xl lg:text-8xl text-[#F5EDDF] font-light leading-[1.05] mb-6">
              הרגע שלפני
              <br />
              <span className="italic">הרגע הגדול</span>
            </h1>
            <p className="text-[#BFA882] font-light text-lg sm:text-xl leading-relaxed max-w-xl mx-auto">
              חווית ההתארגנות שכולן מדברות עליה — עכשיו במחיר שלא יחזור.
              <br />
              <span className="text-[#C9A86A]">נשארו {CONFIG.spotsLeft} מקומות בלבד.</span>
            </p>
          </motion.div>

          {/* Price reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-10 flex items-center gap-5 bg-white/5 border border-[#C9A86A]/25 rounded-2xl px-8 py-5 backdrop-blur-sm"
          >
            <div className="text-center">
              <span className="text-xs text-[#6B5740] tracking-widest block mb-1">המחיר הרגיל</span>
              <span className="font-cormorant text-3xl price-line-through">₪{CONFIG.regularPrice.toLocaleString()}</span>
            </div>
            <div className="w-px h-12 bg-[#C9A86A]/20" />
            <div className="text-center">
              <span className="text-xs text-[#C9A86A] tracking-widest block mb-1">מחיר ההשקה</span>
              <span className="shimmer font-cormorant text-4xl font-light">₪{CONFIG.launchPrice.toLocaleString()}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#C9A86A]/15 border border-[#C9A86A]/40 flex items-center justify-center">
              <span className="text-[#C9A86A] text-xs font-medium">-{discount}%</span>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="mt-8 flex flex-col sm:flex-row items-center gap-4"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn inline-flex items-center gap-3 bg-[#C9A86A] hover:bg-[#B8955A] text-[#1A1209] font-medium text-base px-8 py-4 rounded-full transition-colors duration-300 shadow-lg shadow-[#C9A86A]/20"
            >
              <MessageCircle size={18} />
              אני רוצה את המחיר המיוחד
            </a>
            <a
              href={`tel:052-267-6718`}
              className="inline-flex items-center gap-2 text-[#8B7355] hover:text-[#C9A86A] transition-colors text-sm border-b border-[#8B7355]/40 hover:border-[#C9A86A] pb-0.5"
            >
              <Phone size={14} />
              או התקשרי: 052-267-6718
            </a>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 text-center"
          >
            <p className="text-[#6B5740] text-xs tracking-[0.25em] uppercase mb-4">המחיר תקף עד</p>
            <CountdownBlock />
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#4A3820]"
          >
            <span className="text-xs tracking-[0.2em]">גלי למטה</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
              <ChevronDown size={16} />
            </motion.div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════
            WHAT'S INCLUDED
        ══════════════════════════════════════════ */}
        <section className="py-28 px-6" style={{ background: '#FAF6EE' }}>
          <div className="max-w-2xl mx-auto">
            <FadeIn className="text-center mb-16">
              <span className="text-[#C9A86A] text-xs tracking-[0.3em] uppercase block mb-3">מה כלול</span>
              <h2 className="font-cormorant text-4xl sm:text-5xl text-[#2C241A] font-light">
                הכל מוכן לפניך
              </h2>
              <div className="w-16 h-px bg-[#C9A86A] mx-auto mt-5 opacity-50" />
            </FadeIn>

            <div className="grid gap-4">
              {included.map((item, i) => (
                <FadeIn key={i} delay={i * 0.07}>
                  <div className="flex items-start gap-4 bg-white border border-[#E5D5C0] rounded-xl px-6 py-4 hover:border-[#C9A86A]/50 transition-colors">
                    <div className="mt-0.5 w-6 h-6 rounded-full bg-[#C9A86A]/10 flex items-center justify-center shrink-0">
                      <Check size={13} className="text-[#C9A86A]" />
                    </div>
                    <span className="text-[#2C241A] font-light leading-relaxed">{item}</span>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.5} className="mt-10 text-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn inline-flex items-center gap-3 bg-[#2C241A] hover:bg-[#3D3020] text-[#F5EDDF] text-sm px-7 py-3.5 rounded-full transition-colors duration-300"
              >
                <MessageCircle size={16} />
                אני רוצה לשמוע עוד
              </a>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            TESTIMONIALS
        ══════════════════════════════════════════ */}
        <section className="py-28 px-6" style={{ background: '#F2EBE1' }}>
          <div className="max-w-4xl mx-auto">
            <FadeIn className="text-center mb-16">
              <span className="text-[#C9A86A] text-xs tracking-[0.3em] uppercase block mb-3">כבר יודעות עלינו</span>
              <h2 className="font-cormorant text-4xl sm:text-5xl text-[#2C241A] font-light">
                מה אומרות הכלות
              </h2>
            </FadeIn>

            <div className="grid sm:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <FadeIn key={i} delay={i * 0.12}>
                  <div className="bg-white rounded-2xl p-6 border border-[#E5D5C0] h-full flex flex-col">
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(t.stars)].map((_, s) => (
                        <Star key={s} size={13} className="text-[#C9A86A] fill-[#C9A86A]" />
                      ))}
                    </div>
                    <p className="text-[#594937] font-light leading-relaxed flex-grow text-sm mb-5">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="border-t border-[#E5D5C0] pt-4">
                      <p className="text-[#2C241A] text-sm font-medium">{t.name}</p>
                      <p className="text-[#8B7355] text-xs mt-0.5">{t.date}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.45} className="mt-6 text-center">
              <p className="text-[#8B7355] text-xs italic">* המלל הוא placeholder — יש להחליף בעדויות אמיתיות</p>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            ABOUT HAGIT
        ══════════════════════════════════════════ */}
        <section className="py-28 px-6" style={{ background: '#FAF6EE' }}>
          <div className="max-w-xl mx-auto text-center">
            <FadeIn>
              <div className="w-20 h-20 rounded-full bg-[#E5D5C0] mx-auto mb-6 flex items-center justify-center">
                <Heart size={28} className="text-[#C9A86A]" fill="#C9A86A" />
              </div>
              <h2 className="font-cormorant text-4xl text-[#2C241A] font-light mb-5">אני חגית</h2>
              <p className="text-[#594937] font-light leading-relaxed text-lg">
                יצרתי את החלל הזה כי הבנתי שהבוקר של יום החתונה צריך להיות שלך —
                רגוע, פנוי ומלא נשימה.
                <br /><br />
                לא לרוץ. לא לדאוג. פשוט להיות.
              </p>
              <div className="w-12 h-px bg-[#C9A86A] mx-auto mt-8 opacity-50" />
              <p className="text-[#C9A86A] font-cormorant text-xl italic mt-4">— חגית —</p>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FINAL CTA — STICKY URGENCY
        ══════════════════════════════════════════ */}
        <section className="py-28 px-6" style={{ background: 'linear-gradient(160deg, #1A1209 0%, #2C1F0E 100%)' }}>
          <div className="max-w-2xl mx-auto text-center">
            <FadeIn>
              <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#C9A86A]/40 mx-auto mb-10" />
              <span className="text-[#C9A86A] text-xs tracking-[0.3em] uppercase block mb-4">רגע לפני שאת עוזבת</span>
              <h2 className="font-cormorant text-4xl sm:text-6xl text-[#F5EDDF] font-light mb-6">
                הצעה שלא תחזור
              </h2>
              <p className="text-[#BFA882] font-light leading-relaxed mb-3">
                מחיר ₪{CONFIG.launchPrice} במקום ₪{CONFIG.regularPrice.toLocaleString()} — בתוקף עד 31.03.2026
              </p>
              <p className="text-[#C9A86A] text-sm mb-10">
                נשארו <strong>{CONFIG.spotsLeft}</strong> מקומות במחיר הזה
              </p>

              <div className="mb-8">
                <CountdownBlock />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-btn inline-flex items-center gap-3 bg-[#C9A86A] hover:bg-[#D4B97A] text-[#1A1209] font-medium text-base px-10 py-4 rounded-full transition-colors duration-300 shadow-xl shadow-[#C9A86A]/20 w-full sm:w-auto justify-center"
                >
                  <MessageCircle size={18} />
                  שמרי לי מקום עכשיו
                </a>
                <a
                  href={`tel:052-267-6718`}
                  className="inline-flex items-center gap-2 text-[#8B7355] hover:text-[#C9A86A] transition-colors text-sm border-b border-[#8B7355]/40 hover:border-[#C9A86A] pb-0.5"
                >
                  <Phone size={14} />
                  052-267-6718
                </a>
              </div>

              <p className="text-[#4A3820] text-xs mt-8">
                אין התחייבות. רק שיחה קצרה עם חגית.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            MINIMAL FOOTER
        ══════════════════════════════════════════ */}
        <footer className="py-6 px-6 text-center border-t border-white/5" style={{ background: '#110C05' }}>
          <p className="text-[#3D2E1A] text-xs font-light">
            © 2026 חגית התארגנות כלות • כל הזכויות שמורות
          </p>
        </footer>

      </div>
    </>
  )
}
