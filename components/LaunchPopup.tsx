'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles } from 'lucide-react'

const STORAGE_KEY = 'hagit_launch_popup_dismissed'
const LAUNCH_DEADLINE = new Date('2026-03-31T23:59:59')

function useCountdownShort(target: Date) {
  const [days, setDays] = useState(0)

  useEffect(() => {
    const calc = () => {
      const diff = target.getTime() - Date.now()
      setDays(Math.max(0, Math.floor(diff / 86400000)))
    }
    calc()
    const id = setInterval(calc, 60000)
    return () => clearInterval(id)
  }, [target])

  return days
}

export default function LaunchPopup() {
  const [visible, setVisible] = useState(false)
  const daysLeft = useCountdownShort(LAUNCH_DEADLINE)

  useEffect(() => {
    // לא מציגים אם כבר נסגר בביקור הזה
    if (sessionStorage.getItem(STORAGE_KEY)) return
    // לא מציגים אם עבר הדדליין
    if (Date.now() > LAUNCH_DEADLINE.getTime()) return

    const timer = setTimeout(() => setVisible(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  const dismiss = () => {
    setVisible(false)
    sessionStorage.setItem(STORAGE_KEY, '1')
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={dismiss}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998]"
          />

          {/* Popup */}
          <motion.div
            key="popup"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="fixed bottom-0 left-0 right-0 sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-[9999] w-full sm:max-w-sm sm:rounded-2xl overflow-hidden"
            dir="rtl"
          >
            {/* Background image strip */}
            <div className="relative">
              <div className="h-36 overflow-hidden">
                <img
                  src="https://res.cloudinary.com/decirk3zb/image/upload/f_auto,q_auto,w_600,h_200,c_fill,g_center/v1771444671/8_oaoxjm.jpg"
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(18,10,3,0.3) 0%, rgba(18,10,3,0.75) 100%)' }} />

                {/* Close */}
                <button
                  onClick={dismiss}
                  className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white transition-colors"
                  aria-label="סגרי"
                >
                  <X size={15} />
                </button>

                {/* Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C9A86A]/90 backdrop-blur-sm">
                  <Sparkles size={11} className="text-[#1A1209]" />
                  <span className="text-[#1A1209] text-[10px] font-medium tracking-wider uppercase">מחיר השקה</span>
                </div>

                {/* Headline over image */}
                <div className="absolute bottom-4 right-4 left-4">
                  <p
                    className="text-white font-light leading-snug"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.35rem' }}
                  >
                    הרגע שלפני הרגע הגדול
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="bg-[#FAF6EE] px-5 py-4">
                <p className="text-[#594937] font-light text-sm leading-relaxed mb-1">
                  חווית ההתארגנות שכולן מדברות עליה — עכשיו במחיר שלא יחזור.
                </p>
                <p className="text-[#8B7355] text-xs mb-4">
                  עוד {daysLeft} ימים במחיר ההשקה ·{' '}
                  <span className="line-through text-[#8B7355]">₪2,000</span>{' '}
                  <span className="text-[#C9A86A] font-medium">₪500</span>
                </p>

                <div className="flex gap-2">
                  <a
                    href="/hashaka"
                    onClick={dismiss}
                    className="flex-1 bg-[#C9A86A] hover:bg-[#b8955a] text-[#1A1209] text-sm font-medium py-2.5 px-4 rounded-full text-center transition-colors shadow-sm shadow-[#C9A86A]/20"
                  >
                    לפרטים המלאים
                  </a>
                  <button
                    onClick={dismiss}
                    className="px-4 py-2.5 rounded-full border border-[#E5D5C0] text-[#8B7355] text-sm hover:border-[#C9A86A] transition-colors"
                  >
                    אחר כך
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
