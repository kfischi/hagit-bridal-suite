'use client'

import { motion } from 'framer-motion'
import {
  Heart,
  MessageCircle,
  ArrowLeft,
  Wine,
  Sun,
  Sparkles,
  Palette,
  Check,
  Gem,
  Star,
  Menu,
  X as XIcon
} from 'lucide-react'
import { useRef, useState, useEffect } from 'react'
import WhatsAppButton from '@/components/WhatsAppButton'
import AccessibilityBtn from '@/components/AccessibilityBtn'
import AIChatbot from '@/components/AIChatbot'
import LuxuryGallery from '@/components/LuxuryGallery'

const NAV_LINKS = [
  { label: 'הבית',    href: '#hero'       },
  { label: 'חוויה',   href: '#experience' },
  { label: 'גלריה',   href: '#gallery'    },
  { label: 'חבילות',  href: '#pricing'    },
  { label: 'צרי קשר', href: '#contact'    },
]

export default function Home() {
  const containerRef               = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen]    = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const [activeSection, setActive] = useState('hero')

  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '972522676718'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }) },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    setTimeout(() => {
      const el = document.querySelector(href) as HTMLElement
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top, behavior: 'smooth' })
    }, 150)
  }

  return (
    <>
      <WhatsAppButton phoneNumber={phoneNumber} />
      <AccessibilityBtn />
      <AIChatbot />

      <main ref={containerRef} className="relative bg-[#FAFAF8] text-[#2C241A]">

        {/* ══════════════════════════════════════════
            HEADER — תמיד גלוי, בולט
        ══════════════════════════════════════════ */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`
            fixed top-0 right-0 left-0 z-50
            bg-white backdrop-blur-md border-b border-[#E5D5C0]
            transition-all duration-300
            ${scrolled ? 'shadow-[0_2px_20px_rgba(44,36,26,0.1)] py-2' : 'shadow-sm py-3'}
          `}
        >
          <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">

            {/* ── Logo ── */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => scrollTo('#hero')}
              className="flex items-center gap-2.5"
            >
              <Heart className="w-5 h-5 text-[#C9A86A]" fill="#C9A86A" />
              <span className="font-cormorant text-[22px] text-[#2C241A] font-bold tracking-wide leading-none">
                חגית | סוויטת כלות
              </span>
            </motion.button>

            {/* ── Desktop Nav ── */}
            <nav className="hidden md:flex items-center gap-0.5">
              {NAV_LINKS.map(link => {
                const isActive = activeSection === link.href.replace('#', '')
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className={`
                      relative px-4 py-2 text-sm tracking-wide font-medium transition-colors duration-200 rounded-full
                      ${isActive
                        ? 'text-[#C9A86A] bg-[#FAF6EE]'
                        : 'text-[#4a3e2f] hover:text-[#C9A86A] hover:bg-[#FAF6EE]'}
                    `}
                  >
                    {link.label}
                  </button>
                )
              })}
            </nav>

            {/* ── CTA + Hamburger ── */}
            <div className="flex items-center gap-3">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent('היי, אשמח לשמוע פרטים על התארגנות בוילה')}`}
                target="_blank" rel="noopener noreferrer"
                className="hidden sm:flex bg-[#2C241A] hover:bg-[#4a3e2f] px-5 py-2.5 rounded-full items-center gap-2 shadow-md transition-all text-white font-medium tracking-wide text-sm"
              >
                <span>שרייני תאריך</span>
                <ArrowLeft size={14} />
              </motion.a>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl hover:bg-[#FAF6EE] transition-colors"
                aria-label="תפריט"
              >
                {menuOpen
                  ? <XIcon size={22} className="text-[#2C241A]" />
                  : <Menu size={22} className="text-[#2C241A]" />
                }
                <span className="text-[9px] tracking-widest text-[#8B7355] font-medium uppercase">תפריט</span>
              </button>
            </div>
          </div>

          {/* ── Mobile drawer ── */}
          <motion.div
            initial={false}
            animate={{ height: menuOpen ? 'auto' : 0, opacity: menuOpen ? 1 : 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-white border-t border-[#E5D5C0]"
          >
            <div className="px-6 py-3 flex flex-col">
              {NAV_LINKS.map(link => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`
                    text-right py-3.5 text-base font-medium border-b border-[#E5D5C0]/50 last:border-0
                    transition-colors duration-200
                    ${activeSection === link.href.replace('#', '') ? 'text-[#C9A86A]' : 'text-[#2C241A]'}
                  `}
                >
                  {link.label}
                </button>
              ))}
              <a
                href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent('היי, אשמח לשמוע פרטים על התארגנות בוילה')}`}
                target="_blank" rel="noopener noreferrer"
                className="mt-4 mb-2 w-full py-3.5 rounded-full bg-[#2C241A] text-white text-center text-sm font-medium tracking-wide"
              >
                שרייני תאריך
              </a>
            </div>
          </motion.div>
        </motion.header>

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden bg-[#FAF6EE] pt-[64px]">
          <div className="relative h-[70vh] sm:h-[80vh] w-full overflow-hidden">
            <video
              autoPlay muted loop playsInline preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              poster="https://res.cloudinary.com/dptyfvwyo/image/upload/v1769898872/poster_placeholder.jpg"
            >
              <source
                src="https://res.cloudinary.com/dptyfvwyo/video/upload/q_auto,f_auto/v1769898872/HERO3_d2m9ny.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-[#2C241A]/40 via-transparent to-[#FAF6EE]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 pt-10 pb-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {/* ── Gold label — גדול וכהה יותר ── */}
              <span className="text-[#7A5520] text-base tracking-[0.25em] uppercase font-semibold block mb-6">
                וילת כלות יוקרתית בהרי ירושלים
              </span>
              <h1 className="font-cormorant text-5xl sm:text-7xl md:text-8xl text-[#2C241A] font-light leading-none mb-8">
                הרגע שלפני<br />
                <em className="italic">הרגע הגדול</em>
              </h1>
              <p className="text-[#594937] font-light text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
                מרחב נשימה, יין משובח ואווירה של בית ביום המרגש בחייך.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent('היי, אשמח לשמוע פרטים על התארגנות בוילה')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="bg-[#2C241A] hover:bg-[#4a3e2f] text-white px-8 py-3.5 rounded-full text-sm tracking-widest font-medium transition-all shadow-lg"
                >
                  שרייני תאריך
                </a>
                <button
                  onClick={() => scrollTo('#gallery')}
                  className="text-[#2C241A] border-b border-[#2C241A]/40 pb-0.5 hover:text-[#C9A86A] hover:border-[#C9A86A] transition-all text-sm tracking-widest uppercase font-medium"
                >
                  צפי בגלריה
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FEATURES
        ══════════════════════════════════════════ */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { icon: Wine,     title: 'יין ופינוקים',   desc: 'יין בוטיק וכיבוד קל לאורך כל היום' },
                { icon: Sun,      title: 'השקט של ההרים',  desc: 'נוף עוצר נשימה ושקט מוחלט' },
                { icon: Palette,  title: 'עמדות ביוטי',    desc: 'תאורה מקצועית למאפרת ועיצוב שיער' },
                { icon: Sparkles, title: 'זמן איכות',       desc: 'סלון מרווח לך ולמלוות שלך' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="text-center group"
                >
                  <div className="flex justify-center mb-6">
                    <item.icon strokeWidth={1} size={40} className="text-[#C9A86A] group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="text-xl font-cormorant font-semibold text-[#2C241A] mb-3">{item.title}</h3>
                  <p className="text-[#8B7355] font-light text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            EXPERIENCE (Video)
        ══════════════════════════════════════════ */}
        <section id="experience" className="py-28 px-6 bg-[#FAF6EE]">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* ── Gold label — גדול וכהה יותר ── */}
                <span className="text-[#A07840] text-sm tracking-[0.2em] uppercase font-medium mb-4 block">
                  The Experience
                </span>
                <h2 className="text-4xl sm:text-5xl text-[#2C241A] font-cormorant mb-6">הצצה לתוך הסוויטה</h2>
                <p className="text-[#594937] font-light text-lg leading-relaxed mb-8">
                  המרחב שבו הקסם קורה. סלון רחב ידיים, פינות ישיבה מפנקות, ושפע של אור טבעי שנכנס מהחלונות הגדולים ומשקיף אל הנוף ההררי.
                  <br /><br />
                  כל פרט בוילה תוכנן כדי להעניק לך ולמלוות תחושת רוגע, מרחב ופרטיות מוחלטת.
                </p>
                <button
                  onClick={() => scrollTo('#gallery')}
                  className="inline-flex items-center gap-2 text-[#2C241A] font-medium hover:text-[#C9A86A] transition-colors"
                >
                  <span>לגלריה המלאה</span>
                  <ArrowLeft size={16} />
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/50"
              >
                <video
                  controls playsInline preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source
                    src="https://res.cloudinary.com/decirk3zb/video/upload/q_auto,f_auto/v1771445813/111_ezphwg.mp4"
                    type="video/mp4"
                  />
                </video>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            GALLERY
        ══════════════════════════════════════════ */}
        <section id="gallery" className="py-28 px-6 bg-[#FAF6EE]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-14"
            >
              <div className="flex items-center justify-center gap-4 mb-5">
                <div className="h-px w-14 bg-gradient-to-r from-transparent to-[#C9A86A]" />
                {/* ── Gold label — גדול וכהה יותר ── */}
                <span className="text-[#A07840] text-sm tracking-[0.3em] uppercase font-medium">הגלריה שלנו</span>
                <div className="h-px w-14 bg-gradient-to-l from-transparent to-[#C9A86A]" />
              </div>
              <h2 className="font-cormorant text-5xl md:text-6xl text-[#2C241A] font-light leading-none mb-3">
                רגעים של קסם
              </h2>
              <p className="text-[#6B5540] font-light tracking-widest text-sm">
                כל תמונה — סיפור של יום מושלם
              </p>
            </motion.div>

            <LuxuryGallery />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mt-12"
            >
              <a
                href="https://www.instagram.com/"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-[#C9A86A] text-[#A07840] px-8 py-3 rounded-full text-xs tracking-[0.25em] font-medium uppercase hover:bg-[#C9A86A] hover:text-white transition-all duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                <span>עוד תמונות באינסטגרם</span>
              </a>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            MEET HAGIT
        ══════════════════════════════════════════ */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-40 h-40 mx-auto mb-8"
            >
              <div className="absolute inset-0 bg-[#C9A86A] rounded-full opacity-20 blur-xl animate-pulse" />
              <img
                src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1770475427/%D7%A2%D7%9D_%D7%A7%D7%A4%D7%94_z5rutm.jpg"
                alt="חגית - המארחת שלך"
                className="w-full h-full object-cover rounded-full border-[3px] border-white shadow-luxury relative z-10"
              />
            </motion.div>
            <h3 className="text-3xl sm:text-4xl font-cormorant text-[#2C241A] mb-4">מחכה לארח אותך</h3>
            <p className="text-lg text-[#594937] font-light italic leading-relaxed mb-6">
              "הבית שלי הוא הלב שלי, ואני פותחת אותו בפנייך באהבה גדולה.
              <br />
              מזמינה אותך להתחיל את היום המרגש בחייך באווירה של רוגע, פינוק וקסם."
            </p>
            <div className="w-12 h-px bg-[#C9A86A] mx-auto opacity-60 mb-2" />
            <p className="text-[#2C241A] font-cormorant text-xl font-medium">- חגית -</p>
          </div>
        </section>


        {/* ══════════════════════════════════════════
            VILLA STORY — תוכן הוילה
        ══════════════════════════════════════════ */}
        <section className="py-28 px-6 bg-[#FAF6EE]">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-[#7A5520] text-base tracking-[0.25em] uppercase font-semibold block mb-5">
                היום הגדול שלך
              </span>
              <h2 className="font-cormorant text-4xl md:text-5xl text-[#2C241A] font-light leading-snug mb-6">
                מתחיל בסוויטה של חגית
              </h2>
              <p className="text-[#594937] font-light text-lg leading-relaxed max-w-2xl mx-auto">
                החופה שלך מתחילה הרבה לפני הצעידה בשביל. היא מתחילה ברגע שבו את פותחת את העיניים בבוקר.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  emoji: '✨',
                  title: 'מרחב שכולו שלווה',
                  text: 'הסוויטה מוארת, מעוצבת ומזמינה – בדיוק מה שהגוף שלך צריך כדי להוריד דופק. כאן תמצאי פינות צילום מושלמות ל"בקסטייג'" של האלבום שלך, באווירה אינטימית ונינוחה ששמורה רק לך ולמלוות שלך.'
                },
                {
                  emoji: '🥐',
                  title: 'בוקר של פינוקים',
                  text: 'אנחנו יודעות שעם כל ההתרגשות, קל לשכוח לאכול. דאגנו לך להכל: בראנץ' טרי, פירות חתוכים, קפה איכותי ושתייה קלה שזורמת לאורך כל היום. הכל כדי שתגיעי לחופה מלאת אנרגיה.'
                },
                {
                  emoji: '🚿',
                  title: 'ה-Reset שאת צריכה',
                  text: 'קמת מוקדם? נסעת? המקלחת המרווחת שלנו מחכה לך כדי לשטוף את כל המתח ולהתחיל את היום עם דף חלק, רעננה וזוהרת.'
                },
                {
                  emoji: '🛋️',
                  title: 'זמן נשימה פרטי',
                  text: 'רגע לפני שהצלמים נכנסים – מחכה לך חדר מנוחה פרטי. לעצום עיניים, לנשום עמוק, ולעכל שזה באמת קורה. בלי הפרעות ובלי לחץ.'
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-white rounded-3xl p-8 border border-[#E5D5C0] shadow-sm"
                >
                  <span className="text-3xl block mb-4">{item.emoji}</span>
                  <h3 className="font-cormorant text-2xl text-[#2C241A] font-semibold mb-3">{item.title}</h3>
                  <p className="text-[#6B5540] font-light text-sm leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-16 bg-[#2C241A] rounded-3xl p-10"
            >
              <p className="text-[#E5D5C0] font-cormorant text-2xl font-light italic mb-2">
                "זה לא רק מקום להתארגן בו.
              </p>
              <p className="text-[#C9A86A] font-cormorant text-2xl font-light italic mb-6">
                זו התחושה שאת בידיים טובות."
              </p>
              <p className="text-[#B09880] font-light text-sm mb-8 max-w-lg mx-auto">
                בסוויטה של חגית, המטרה שלנו היא אחת: שתגיעי לחופה לא רק הכי יפה שיש, אלא בעיקר רגועה, נוכחת ומוכנה.
              </p>
              <p className="text-[#D5C5B0] font-light text-sm mb-8">
                המקומות נתפסים מהר — דברי איתי ונשריין לך את השקט שמגיע לך.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            PRICING — 2 חבילות שוות
        ══════════════════════════════════════════ */}
        <section id="pricing" className="py-28 px-6 bg-[#2C241A] text-white">
          <div className="max-w-5xl mx-auto text-center">

            {/* ── Gold label — גדול וכהה יותר ── */}
            <span className="text-[#C9A86A] text-sm tracking-[0.3em] uppercase font-medium block mb-4">
              בחרי את מה שמתאים לך
            </span>
            <h2 className="text-4xl sm:text-6xl font-light mb-4 font-cormorant text-[#FAF6EE]">
              החבילות שלנו
            </h2>
            <p className="text-[#B09880] font-light mb-14 text-base max-w-xl mx-auto">
              שתי חבילות מושלמות, כל אחת כוללת את כל מה שצריך לבוקר הכי מרגש בחיים
            </p>
            <div className="w-24 h-px bg-[#C9A86A] mx-auto mb-14 opacity-40" />

            {/* ── 2 חבילות זהות בגודל ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

              {/* חבילה א — בסיס */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-[#FAF6EE]/8 border border-[#C9A86A]/30 p-10 rounded-3xl flex flex-col items-center text-right"
              >
                <div className="w-16 h-16 bg-[#C9A86A]/15 rounded-full flex items-center justify-center mb-6 border border-[#C9A86A]/30">
                  <Star strokeWidth={1.5} size={28} className="text-[#C9A86A]" />
                </div>

                <h3 className="text-3xl font-cormorant mb-1 text-[#FAF6EE] font-light">חבילת בסיס</h3>
                <p className="text-[#B09880] text-sm mb-8 tracking-wide">לאירוח קליל ומפנק</p>

                <div className="mb-10">
                  <span className="text-6xl font-cormorant font-light text-[#FAF6EE]">2,000</span>
                  <span className="text-2xl text-[#C9A86A] mr-1">₪</span>
                </div>

                <ul className="space-y-4 w-full mb-10 flex-grow">
                  {[
                    'שימוש בוילה מהבוקר עד אחה״צ',
                    'פינת שתייה חמה וקרה חופשית',
                    'פירות טריים ופינוקים מתוקים',
                    'יין בוטיק מיקב הרי ירושלים',
                    'עמדת ביוטי עם תאורה מקצועית',
                    'שימוש מלא במתקני הוילה',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#D5C5B0] font-light text-sm">
                      <Check size={15} className="text-[#C9A86A] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent('היי חגית, אשמח לשריין את חבילת הבסיס ב-2,000₪ 💍')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full py-4 rounded-full border border-[#C9A86A] text-[#C9A86A] hover:bg-[#C9A86A] hover:text-white transition-all text-sm tracking-widest font-medium text-center block"
                >
                  אני רוצה את זה
                </a>
              </motion.div>

              {/* חבילה ב — פרימיום */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="bg-[#FAF6EE] text-[#2C241A] p-10 rounded-3xl flex flex-col items-center text-right relative shadow-[0_20px_60px_rgba(0,0,0,0.3)] border-2 border-[#C9A86A]"
              >
                {/* Badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C9A86A] text-white text-xs px-5 py-1.5 rounded-full font-medium tracking-widest shadow-md">
                  ✦ המומלצת ✦
                </div>

                <div className="w-16 h-16 bg-[#C9A86A]/20 rounded-full flex items-center justify-center mb-6 border border-[#C9A86A]/40">
                  <Gem strokeWidth={1.5} size={28} className="text-[#C9A86A]" />
                </div>

                <h3 className="text-3xl font-cormorant mb-1 text-[#2C241A] font-light">חבילת פרימיום</h3>
                <p className="text-[#8B7355] text-sm mb-8 tracking-wide">החוויה המלאה והמפנקת</p>

                <div className="mb-10">
                  <span className="text-6xl font-cormorant font-light text-[#2C241A]">2,500</span>
                  <span className="text-2xl text-[#C9A86A] mr-1">₪</span>
                </div>

                <ul className="space-y-4 w-full mb-10 flex-grow">
                  {[
                    'כל מה שיש בחבילת הבסיס',
                    'ארוחת בוקר כפרית עשירה לכולן',
                    'שמפניה / קאווה חגיגית לצ\'ינ\'ין',
                    'זר פרחים טריים לסלון',
                    'מוזיקה אמבינטית ורקע מושלם',
                    'שעה נוספת בווילה — כמתנה',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#4a3e2f] font-light text-sm">
                      <Check size={15} className="text-[#C9A86A] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent('היי חגית, אשמח לשריין את חבילת הפרימיום ב-2,500₪ 💍')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full py-4 rounded-full bg-[#2C241A] text-white hover:bg-[#4a3e2f] transition-all text-sm tracking-widest font-medium text-center block shadow-lg"
                >
                  זה בול בשבילי
                </a>
              </motion.div>
            </div>

            {/* ── הערה תחתית ── */}
            <p className="text-[#7A6550] text-sm font-light mt-12">
              רוצה להוסיף צלמת, מאפרת או שירותים נוספים?{' '}
              <button
                onClick={() => {
                  const chatBtn = document.querySelector('[aria-label="פתח צ\'אט עם חגית"]') as HTMLButtonElement
                  if (chatBtn) chatBtn.click()
                }}
                className="text-[#C9A86A] hover:text-[#A07840] border-b border-[#C9A86A]/40 hover:border-[#A07840] transition-colors pb-0.5"
              >
                בואי נרכיב יחד חבילה מותאמת
              </button>
            </p>

          </div>
        </section>

        {/* ══════════════════════════════════════════
            CONTACT
        ══════════════════════════════════════════ */}
        <section id="contact" className="py-28 px-6 bg-white">
          <div className="max-w-xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center gap-4 mb-5">
                <div className="h-px w-14 bg-gradient-to-r from-transparent to-[#C9A86A]" />
                {/* ── Gold label — גדול וכהה יותר ── */}
                <span className="text-[#A07840] text-sm tracking-[0.3em] uppercase font-medium">צרי קשר</span>
                <div className="h-px w-14 bg-gradient-to-l from-transparent to-[#C9A86A]" />
              </div>
              <h2 className="font-cormorant text-4xl md:text-5xl text-[#2C241A] font-light mb-4">
                מוכנה להתחיל?
              </h2>
              <p className="text-[#6B5540] font-light mb-10 leading-relaxed">
                שלחי הודעה ונחזור אליך תוך שעה לקביעת תאריך וגיבוש חבילה מותאמת אישית.
              </p>
              <a
                href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent('היי חגית, אשמח לשמוע פרטים על ההתארגנות בוילה ולשריין תאריך 💍')}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-full text-sm tracking-widest font-medium transition-all shadow-lg"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>שרייני תאריך בוואטסאפ</span>
              </a>
            </motion.div>
          </div>
        </section>

      </main>
    </>
  )
}
