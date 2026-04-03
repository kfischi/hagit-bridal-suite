'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, X, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type Msg = { from: 'bot' | 'user'; text: string }

type Lead = {
  date: string
  location: string
  needs: string
  package: string
  name: string
  phone: string
}

type StepDef = {
  botText: string
  field: keyof Lead
  options?: string[]
}

const STEPS: StepDef[] = [
  {
    field: 'date',
    botText: 'מתי תאריך החתונה שלך? 📅',
  },
  {
    field: 'location',
    botText: 'נהדר! 😊 איפה מתקיים האירוע?',
  },
  {
    field: 'needs',
    botText: 'מה את מחפשת לבוקר החתונה?',
    options: [
      'רק הסוויטה',
      'סוויטה + מאפרת',
      'סוויטה + מעצבת שיער',
      'סוויטה + מאפרת ושיער',
      'משהו אחר',
    ],
  },
  {
    field: 'package',
    botText:
      'יש לי שתי חבילות מושלמות:\n\n✦ בסיס — 2,000 ₪\nוילה, שתייה, פירות, יין, ביוטי, מוזיקה\n\n✦ פרימיום — 2,500 ₪\nכל הבסיס + ארוחת בוקר כפרית, שמפניה, זר פרחים',
    options: ['חבילת בסיס — 2,000 ₪', 'חבילת פרימיום — 2,500 ₪', 'עזרי לי לבחור 🤔'],
  },
  {
    field: 'name',
    botText: 'מה שמך? 💕',
  },
  {
    field: 'phone',
    botText: 'ומה מספר הטלפון שלך? 📱\n(כדי שאוכל לחזור אליך)',
  },
]

const PACKAGE_HELP =
  'לקבוצה עד 3 בנות — הבסיס מספיק בהחלט 😊\nל-4 ומעלה — הפרימיום משתלם יותר עם ארוחת הבוקר והשמפניה החגיגית\n\nאיזו מהחבילות מתאימה לך?'

function formatLead(lead: Lead): string {
  return (
    'ליד חדש מהאתר! 🎉\n\n' +
    `👤 שם: ${lead.name}\n` +
    `📞 טלפון: ${lead.phone}\n` +
    `📅 תאריך: ${lead.date}\n` +
    `💒 מיקום: ${lead.location}\n` +
    `🎯 צריכה: ${lead.needs}\n` +
    `📦 חבילה: ${lead.package}\n\n` +
    '⭐ עדיפות: גבוהה'
  )
}

function normalizePhone(raw: string): string | null {
  const digits = raw.replace(/[-\s]/g, '')
  if (/^05\d{8}$/.test(digits)) return '972' + digits.slice(1)
  return null
}

const OPENER = 'היי! מזל טוב 💍 אני חגית.\n\n' + STEPS[0].botText

export default function AIChatbot() {
  const [isOpen, setIsOpen]         = useState(false)
  const [msgs, setMsgs]             = useState<Msg[]>([{ from: 'bot', text: OPENER }])
  const [step, setStep]             = useState(0)
  const [lead, setLead]             = useState<Partial<Lead>>({})
  const [input, setInput]           = useState('')
  const [sending, setSending]       = useState(false)
  const [done, setDone]             = useState(false)
  const [hagitUrl, setHagitUrl]     = useState<string | null>(null)
  const [packageHelp, setPackageHelp] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  const hagitImage = 'https://res.cloudinary.com/decirk3zb/image/upload/v1772044210/%D7%97%D7%92%D7%99%D7%AA_pdkkr4.jpg'

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs, isOpen])

  useEffect(() => {
    (window as Window & { openHagitChat?: () => void }).openHagitChat = () => {
      setIsOpen(true)
    }
    return () => {
      delete (window as Window & { openHagitChat?: () => void }).openHagitChat
    }
  }, [])

  const addBot = (text: string) =>
    setMsgs(prev => [...prev, { from: 'bot', text }])

  const addUser = (text: string) =>
    setMsgs(prev => [...prev, { from: 'user', text }])

  const advanceStep = (value: string, currentStep: number, currentLead: Partial<Lead>) => {
    const newLead = { ...currentLead, [STEPS[currentStep].field]: value }
    setLead(newLead)
    const next = currentStep + 1

    if (next < STEPS.length) {
      setStep(next)
      setPackageHelp(false)
      setTimeout(() => addBot(STEPS[next].botText), 400)
    } else {
      sendToHagit(newLead as Lead)
    }
  }

  const handleOption = (option: string) => {
    if (option === 'עזרי לי לבחור 🤔') {
      addUser(option)
      setPackageHelp(true)
      setTimeout(() => addBot(PACKAGE_HELP), 400)
      return
    }
    addUser(option)
    advanceStep(option, step, lead)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const val = input.trim()
    if (!val || sending || done) return
    setInput('')

    if (step === 5) {
      const intl = normalizePhone(val)
      if (!intl) {
        addUser(val)
        setTimeout(() => addBot('המספר לא נראה תקין. אנא נסי שוב (לדוגמה: 0501234567) 😊'), 400)
        return
      }
      addUser(val)
      advanceStep(intl, step, lead)
      return
    }

    addUser(val)
    advanceStep(val, step, lead)
  }

  const sendToHagit = async (finalLead: Lead) => {
    setSending(true)
    setTimeout(() => addBot('תודה! שולחת את הפרטים לחגית... ✨'), 400)

    const text = formatLead(finalLead)
    const fallbackUrl = `https://wa.me/972522676718?text=${encodeURIComponent(text)}`

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ purpose: 'send', text }),
      })
      const data = await res.json()

      if (data.wahaSent) {
        setTimeout(() => {
          addBot('הפרטים שלך הגיעו לחגית ✅\nהיא תחזור אליך בהקדם 💛')
          setDone(true)
        }, 800)
      } else {
        setHagitUrl(data.hagitUrl || fallbackUrl)
        setTimeout(() => {
          addBot('לחצי על הכפתור הירוק כדי לשלוח את הפרטים לחגית 💚')
          setDone(true)
        }, 800)
      }
    } catch {
      setHagitUrl(fallbackUrl)
      setTimeout(() => {
        addBot('לחצי על הכפתור הירוק לשלוח לחגית 💚')
        setDone(true)
      }, 800)
    } finally {
      setSending(false)
    }
  }

  // Which options to show right now
  const currentOptions: string[] | undefined = (() => {
    if (done || sending) return undefined
    if (step === 3 && packageHelp) return ['חבילת בסיס — 2,000 ₪', 'חבילת פרימיום — 2,500 ₪']
    return STEPS[step]?.options
  })()

  const showInput = !currentOptions && !done && !sending

  return (
    <>
      {/* Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 2.5, duration: 0.4 }}
            className="fixed bottom-24 left-6 z-[99] origin-bottom-left"
          >
            <div className="bg-white text-[#2C241A] px-4 py-3 rounded-xl shadow-xl border border-[#C9A86A] text-sm font-medium relative max-w-[180px]">
              יש לך שאלה? דברי איתי ✨
              <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white border-b border-r border-[#C9A86A] transform rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        aria-label="פתח צ'אט עם חגית"
        className={`fixed bottom-6 left-6 z-[100] w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100'
        }`}
      >
        <img src={hagitImage} alt="חגית" className="w-full h-full rounded-full object-cover border-2 border-[#C9A86A]" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 left-6 z-[100] w-[340px] sm:w-[380px] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-[#E5D5C0]"
            style={{ maxHeight: '85vh' }}
          >
            {/* Header */}
            <div className="bg-[#2C241A] px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={hagitImage} alt="חגית" className="w-10 h-10 rounded-full object-cover border-2 border-[#C9A86A]" />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#2C241A]" />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">חגית</p>
                  <p className="text-[#C9A86A] text-xs">מייסדת סוויטת הכלות</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-[#8B7355] hover:text-white transition-colors p-1">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAFAF8]" style={{ minHeight: '260px' }}>
              {msgs.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.from === 'bot' && (
                    <img src={hagitImage} alt="" className="w-7 h-7 rounded-full object-cover border border-[#C9A86A] ml-2 mt-1 shrink-0" />
                  )}
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-line ${
                    msg.from === 'user'
                      ? 'bg-[#2C241A] text-white rounded-br-none'
                      : 'bg-white border border-[#E5D5C0] text-[#2C241A] rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {sending && (
                <div className="flex justify-start">
                  <img src={hagitImage} alt="" className="w-7 h-7 rounded-full object-cover border border-[#C9A86A] ml-2 mt-1 shrink-0" />
                  <div className="bg-white border border-[#E5D5C0] p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1.5 items-center">
                    <span className="w-2 h-2 bg-[#C9A86A] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-[#C9A86A] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-[#C9A86A] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Option Buttons */}
            {currentOptions && (
              <div className="px-3 py-3 bg-[#FAFAF8] border-t border-[#E5D5C0] flex flex-col gap-2 shrink-0">
                {currentOptions.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleOption(opt)}
                    className="w-full text-right text-sm px-4 py-2.5 rounded-xl border border-[#C9A86A] text-[#2C241A] bg-white hover:bg-[#C9A86A] hover:text-white transition-all font-medium"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* WhatsApp fallback button */}
            {done && hagitUrl && (
              <div className="px-3 py-3 bg-[#FAFAF8] border-t border-[#E5D5C0] shrink-0">
                <a
                  href={hagitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MessageCircle size={16} />
                  שלחי לחגית בוואטסאפ
                </a>
              </div>
            )}

            {/* Text Input */}
            {showInput && (
              <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-[#E5D5C0] flex gap-2 shrink-0">
                <input
                  type={step === 5 ? 'tel' : 'text'}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder={step === 5 ? '0501234567' : 'כתבי כאן...'}
                  className="flex-1 bg-[#FAFAF8] border border-[#E5D5C0] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#C9A86A] transition-colors"
                  dir="rtl"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="bg-[#C9A86A] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#b0935c] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm shrink-0"
                >
                  <Send size={16} />
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
