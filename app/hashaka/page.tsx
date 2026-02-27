'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown, Phone, MessageCircle } from 'lucide-react'

const CONFIG = {
  phoneNumber: '972522676718',
  whatsappMessage: 'היי חגית! ראיתי את מחיר ההשקה המיוחד ואני רוצה לשמוע פרטים 💍',
  regularPrice: 2000,
  launchPrice: 500,
  deadline: new Date('2026-03-31T23:59:59'),
}

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

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function CountdownBlock() {
  const t = useCountdown(CONFIG.deadline)
  const units = [
    { label: 'ימים', value: t.days },
    { label: 'שעות', value: t.hours },
    { label: 'דקות', value: t.minutes },
    { label: 'שניות', value: t.seconds },
  ]
  return (
    <div className="flex gap-2.5 justify-center flex-wrap">
      {units.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center">
          <div className="w-[68px] h-[68px] rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(212,185,122,0.35)', backdropFilter: 'blur(12px)' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={value}
                initial={{ y: -12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 12, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 400, color: '#EDE0C8' }}
              >
                {String(value).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </div>
          <span style={{ fontFamily: "'Heebo', sans-serif", fontSize: '10px', letterSpacing: '0.18em', color: '#D4B97A', marginTop: '6px', textTransform: 'uppercase' }}>{label}</span>
        </div>
      ))}
    </div>
  )
}

const included = [
  'חדר פרטי בלעדי לך ולמלוות בלבד',
  'יין ספארקלינג + מגש ממתקים מפנק',
  'פרחים טריים ועיצוב חדר מושלם',
  'תאורה רכה מוכנה לצילומים',
  'ווי-פיי, מוזיקה ואווירה שלכן',
  'ליווי אישי של חגית לאורך כל הבוקר',
]

export default function HashakPage() {
  const whatsappUrl = `https://wa.me/${CONFIG.phoneNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`
  const discount = Math.round((1 - CONFIG.launchPrice / CONFIG.regularPrice) * 100)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=Heebo:wght@300;400;500&display=swap');

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        /* ── Scrollbar ── */
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #0D0800; }
        ::-webkit-scrollbar-thumb { background: #D4B97A; border-radius: 2px; }

        /* ── Gold shimmer on price ── */
        .gold-shimmer {
          background: linear-gradient(90deg, #B8892A 0%, #E8CC78 35%, #F5E09A 50%, #E8CC78 65%, #B8892A 100%);
          background-size: 250% auto;
          animation: gs 3.5s linear infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        @keyframes gs { to { background-position: 250% center; } }

        /* ── Subtle grain overlay ── */
        .grain-overlay::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
          opacity: 0.03;
          pointer-events: none;
          z-index: 999;
        }

        /* ── CTA shine effect ── */
        .cta-shine { position: relative; overflow: hidden; }
        .cta-shine::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.7s ease;
        }
        .cta-shine:hover::after { transform: translateX(100%); }

        /* ── Divider line ── */
        .gold-line {
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, transparent, #D4B97A, transparent);
          margin: 0 auto;
        }
      `}</style>

      <div className="grain-overlay" dir="rtl" style={{ fontFamily: "'Heebo', sans-serif", background: '#0D0800' }}>

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section className="min-h-screen relative flex flex-col items-center justify-center px-6 overflow-hidden">

          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://res.cloudinary.com/decirk3zb/image/upload/f_auto,q_auto,w_1400/v1771444671/8_oaoxjm.jpg"
              alt=""
              className="w-full h-full object-cover object-center"
              loading="eager"
              fetchPriority="high"
            />
            {/* Multi-layer overlay for drama + readability */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(170deg, rgba(8,4,0,0.78) 0%, rgba(15,8,2,0.55) 45%, rgba(8,4,0,0.82) 100%)' }} />
            <div className="absolute bottom-0 left-0 right-0 h-48" style={{ background: 'linear-gradient(to bottom, transparent, #0D0800)' }} />
          </div>

          {/* Radial glow */}
          <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(212,185,122,0.07) 0%, transparent 70%)' }} />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-8 flex items-center gap-2 px-5 py-2 rounded-full"
              style={{ border: '1px solid rgba(212,185,122,0.4)', background: 'rgba(212,185,122,0.08)', backdropFilter: 'blur(16px)' }}
            >
              <span style={{ color: '#D4B97A', fontSize: '11px', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 500 }}>
                ✦ מחיר השקה בלעדי ✦
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.35 }}
            >
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 300 }}>
                לפני שנפתח לכולן
              </p>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.8rem, 8vw, 5.5rem)', fontWeight: 400, color: '#F0E6D3', lineHeight: 1.08, marginBottom: '20px' }}>
                הרגע שלפני<br />
                <em style={{ fontStyle: 'italic', color: '#EDE0C8' }}>הרגע הגדול</em>
              </h1>
              <p style={{ color: 'rgba(240,230,210,0.75)', fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.7, maxWidth: '440px', margin: '0 auto 28px' }}>
                חווית ההתארגנות שכולן מדברות עליה —
                עכשיו במחיר שלא יחזור.{' '}
                <span style={{ color: '#D4B97A', fontWeight: 400 }}>רק לחודש הקרוב.</span>
              </p>
            </motion.div>

            {/* Price block */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="flex items-center gap-6 mb-8 px-8 py-5 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,185,122,0.2)', backdropFilter: 'blur(20px)' }}
            >
              <div className="text-center">
                <span style={{ display: 'block', fontSize: '10px', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: '4px' }}>המחיר הרגיל</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through', textDecorationColor: 'rgba(212,185,122,0.5)' }}>
                  ₪{CONFIG.regularPrice.toLocaleString()}
                </span>
              </div>
              <div style={{ width: '1px', height: '40px', background: 'rgba(212,185,122,0.25)' }} />
              <div className="text-center">
                <span style={{ display: 'block', fontSize: '10px', letterSpacing: '0.22em', color: '#D4B97A', textTransform: 'uppercase', marginBottom: '4px' }}>מחיר ההשקה</span>
                <span className="gold-shimmer" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 500 }}>
                  ₪{CONFIG.launchPrice.toLocaleString()}
                </span>
              </div>
              <div style={{ background: 'rgba(212,185,122,0.12)', border: '1px solid rgba(212,185,122,0.35)', borderRadius: '50px', padding: '4px 12px' }}>
                <span style={{ color: '#D4B97A', fontSize: '12px', fontWeight: 500 }}>-{discount}%</span>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-shine flex items-center gap-3 px-8 py-4 rounded-full font-medium transition-all"
                style={{
                  background: 'linear-gradient(135deg, #C9A55A 0%, #E8CC78 50%, #C9A55A 100%)',
                  color: '#1A0F00',
                  fontSize: '1rem',
                  boxShadow: '0 0 32px rgba(212,185,122,0.25), 0 4px 16px rgba(0,0,0,0.4)',
                  fontWeight: 500,
                }}
              >
                <MessageCircle size={18} />
                אני רוצה את המחיר המיוחד
              </a>
              <a
                href={`tel:052-267-6718`}
                className="flex items-center gap-2 transition-colors"
                style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '2px' }}
              >
                <Phone size={13} />
                052-267-6718
              </a>
            </motion.div>

            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-12 text-center"
            >
              <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: '14px' }}>
                המחיר תקף עד
              </p>
              <CountdownBlock />
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
            style={{ color: 'rgba(212,185,122,0.4)' }}
          >
            <span style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>גלי למטה</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
              <ChevronDown size={15} />
            </motion.div>
          </motion.div>
        </section>

        {/* ══════════════════════════════════════════
            WHAT'S INCLUDED
        ══════════════════════════════════════════ */}
        <section style={{ padding: '100px 24px', background: '#F7F2EA' }}>
          <div style={{ maxWidth: '560px', margin: '0 auto' }}>
            <FadeIn className="text-center" style={{ marginBottom: '52px' }}>
              <p style={{ color: '#A07840', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 500 }}>
                מה כלול
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 2.8rem)', color: '#1A1008', fontWeight: 400, lineHeight: 1.2 }}>
                הכל מוכן לפניך
              </h2>
              <div style={{ width: '40px', height: '1px', background: '#D4B97A', margin: '20px auto 0', opacity: 0.6 }} />
            </FadeIn>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {included.map((item, i) => (
                <FadeIn key={i} delay={i * 0.07}>
                  <div
                    className="flex items-center gap-4"
                    style={{ background: '#fff', border: '1px solid #EAE0D0', borderRadius: '14px', padding: '16px 20px', transition: 'border-color 0.2s' }}
                  >
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(212,185,122,0.12)', border: '1px solid rgba(212,185,122,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={13} color="#C9A55A" />
                    </div>
                    <span style={{ color: '#2C1E0F', fontWeight: 300, fontSize: '15px', lineHeight: 1.5 }}>{item}</span>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.5} className="text-center" style={{ marginTop: '44px' }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-shine inline-flex items-center gap-3 px-7 py-3.5 rounded-full transition-all"
                style={{ background: '#1A1008', color: '#EDE0C8', fontSize: '14px', fontWeight: 400, letterSpacing: '0.05em', boxShadow: '0 4px 20px rgba(0,0,0,0.18)' }}
              >
                <MessageCircle size={15} />
                אני רוצה לשמוע עוד
              </a>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            ABOUT HAGIT
        ══════════════════════════════════════════ */}
        <section style={{ padding: '100px 24px', background: '#EDE5D8' }}>
          <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
            <FadeIn>
              {/* Photo */}
              <div style={{ width: '112px', height: '112px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 28px', boxShadow: '0 0 0 3px #EDE5D8, 0 0 0 5px rgba(212,185,122,0.4), 0 12px 40px rgba(0,0,0,0.15)' }}>
                <img
                  src="https://res.cloudinary.com/decirk3zb/image/upload/f_auto,q_auto,w_200,h_200,c_fill,g_face/v1772200008/%D7%97%D7%92%D7%99%D7%AA_heyobf.jpg"
                  alt="חגית"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
              </div>

              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', color: '#1A1008', fontWeight: 400, marginBottom: '20px' }}>
                אני חגית
              </h2>
              <p style={{ color: '#5C4030', fontWeight: 300, fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '28px' }}>
                יצרתי את החלל הזה כי הבנתי שהבוקר של יום החתונה צריך להיות שלך —
                רגוע, פנוי ומלא נשימה.
                <br /><br />
                לא לרוץ. לא לדאוג. פשוט להיות.
              </p>
              <div style={{ width: '40px', height: '1px', background: '#C9A55A', margin: '0 auto 16px', opacity: 0.5 }} />
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontStyle: 'italic', color: '#C9A55A' }}>— חגית —</p>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FINAL CTA
        ══════════════════════════════════════════ */}
        <section style={{ padding: '110px 24px', background: 'linear-gradient(170deg, #0D0800 0%, #1A0F02 100%)' }}>
          <div style={{ maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
            <FadeIn>
              <div className="gold-line" style={{ marginBottom: '48px' }} />

              <p style={{ color: '#D4B97A', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 500 }}>
                רגע לפני שאת עוזבת
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 6vw, 3.2rem)', color: '#F0E6D3', fontWeight: 400, lineHeight: 1.15, marginBottom: '20px' }}>
                הצעה שלא תחזור
              </h2>
              <p style={{ color: 'rgba(240,230,210,0.6)', fontWeight: 300, marginBottom: '8px', fontSize: '15px' }}>
                מחיר ₪{CONFIG.launchPrice} במקום ₪{CONFIG.regularPrice.toLocaleString()} — בתוקף עד 31.03.2026
              </p>
              <p style={{ color: '#D4B97A', fontSize: '14px', marginBottom: '36px', fontWeight: 400 }}>
                המחיר הזה לא יחזור אחרי ה-31.03
              </p>

              <div style={{ marginBottom: '40px' }}>
                <CountdownBlock />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-shine w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 rounded-full font-medium transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #C9A55A 0%, #E8CC78 50%, #C9A55A 100%)',
                    color: '#1A0F00',
                    fontSize: '1rem',
                    boxShadow: '0 0 40px rgba(212,185,122,0.2), 0 4px 20px rgba(0,0,0,0.5)',
                    fontWeight: 500,
                  }}
                >
                  <MessageCircle size={18} />
                  שמרי לי מקום עכשיו
                </a>
                <a
                  href={`tel:052-267-6718`}
                  className="flex items-center gap-2 transition-colors"
                  style={{ color: 'rgba(255,255,255,0.35)', fontSize: '14px', borderBottom: '1px solid rgba(255,255,255,0.12)', paddingBottom: '2px' }}
                >
                  <Phone size={13} />
                  052-267-6718
                </a>
              </div>

              <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '12px', marginTop: '28px' }}>
                אין התחייבות. רק שיחה קצרה עם חגית.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ padding: '20px 24px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.04)', background: '#080500' }}>
          <p style={{ color: 'rgba(255,255,255,0.15)', fontSize: '11px' }}>
            © 2026 חגית התארגנות כלות • כל הזכויות שמורות
          </p>
        </footer>

      </div>
    </>
  )
}
