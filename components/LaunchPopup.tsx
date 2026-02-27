'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, ArrowLeft } from 'lucide-react'

const STORAGE_KEY = 'hagit_launch_popup_v2'
const LAUNCH_DEADLINE = new Date('2026-03-31T23:59:59')

function useDaysLeft(target: Date) {
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
  const daysLeft = useDaysLeft(LAUNCH_DEADLINE)

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return
    if (Date.now() > LAUNCH_DEADLINE.getTime()) return
    const timer = setTimeout(() => setVisible(true), 10000)
    return () => clearTimeout(timer)
  }, [])

  const dismiss = () => {
    setVisible(false)
    sessionStorage.setItem(STORAGE_KEY, '1')
  }

  const goToLaunch = () => {
    dismiss()
    window.location.href = '/hashaka'
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* BACKDROP */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={dismiss}
            className="fixed inset-0 z-[9990]"
            style={{ background: 'rgba(10,6,2,0.65)', backdropFilter: 'blur(4px)' }}
          />

          {/* POPUP */}
          <motion.div
            key="popup"
            dir="rtl"
            initial={{ opacity: 0, scale: 0.88, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 16 }}
            transition={{ type: 'spring', damping: 20, stiffness: 260, delay: 0.05 }}
            className="fixed z-[9999] inset-x-4 bottom-4 sm:inset-x-auto sm:left-1/2 sm:bottom-auto sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[420px] rounded-2xl overflow-hidden shadow-2xl"
            style={{ boxShadow: '0 24px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(201,168,106,0.2)' }}
          >
            {/* IMAGE */}
            <div className="relative h-48 overflow-hidden">
              <img
                src="https://res.cloudinary.com/decirk3zb/image/upload/f_auto,q_auto,w_840,h_400,c_fill,g_center/v1771444671/8_oaoxjm.jpg"
                alt="חגית התארגנות כלות"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(180deg, rgba(10,6,2,0.15) 0%, rgba(10,6,2,0.70) 100%)' }}
              />

              {/* CLOSE */}
              <button
                onClick={dismiss}
                aria-label="סגרי"
                className="absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center transition-colors"
                style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}
              >
                <X size={16} className="text-white" />
              </button>

              {/* BADGE */}
              <div
                className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(201,168,106,0.95)' }}
              >
                <Sparkles size={12} className="text-[#1A1209]" />
                <span className="text-[#1A1209] text-[11px] font-semibold tracking-widest uppercase">מחיר השקה</span>
              </div>

              {/* HEADLINE */}
              <div className="absolute bottom-0 right-0 left-0 px-5 pb-4">
                <p className="text-white text-[11px] tracking-[0.25em] uppercase mb-1 opacity-70">
                  לזמן מוגבל בלבד
                </p>
                <h3
                  className="text-white font-light leading-tight"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem' }}
                >
                  הרגע שלפני הרגע הגדול
                </h3>
              </div>
            </div>

            {/* CONTENT */}
            <div className="bg-[#FAF6EE] px-5 pt-5 pb-5">
              <p className="text-[#2C241A] text-base leading-relaxed mb-3" style={{ fontFamily: 'Heebo, sans-serif' }}>
                חווית ההתארגנות שכולן מדברות עליה —<br />
                <span className="font-medium">עכשיו במחיר שלא יחזור.</span>
              </p>

              {/* PRICE ROW */}
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-[#E5D5C0]">
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-3xl font-light"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A86A' }}
                  >
                    ₪500
                  </span>
                  <span
                    className="text-lg line-through"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: '#B0A090' }}
                  >
                    ₪2,000
                  </span>
                </div>
                <div className="mr-auto bg-[#C9A86A]/15 border border-[#C9A86A]/30 rounded-full px-2.5 py-0.5">
                  <span className="text-[#C9A86A] text-xs font-medium">-75%</span>
                </div>
                <span className="text-[#8B7355] text-xs">עוד {daysLeft} ימים</span>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={goToLaunch}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium text-base transition-all active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #C9A86A 0%, #D4B97A 50%, #C9A86A 100%)',
                    color: '#1A1209',
                    boxShadow: '0 4px 16px rgba(201,168,106,0.35)',
                    fontFamily: 'Heebo, sans-serif',
                  }}
                >
                  <span>אני רוצה את המחיר המיוחד</span>
                  <ArrowLeft size={17} />
                </button>

                <button
                  onClick={dismiss}
                  className="w-full py-2.5 rounded-xl text-sm transition-colors"
                  style={{ color: '#8B7355', fontFamily: 'Heebo, sans-serif' }}
                >
                  אחר כך
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
