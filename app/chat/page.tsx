'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, MessageCircle, Heart, Menu, X as XIcon, ArrowLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

type Message = { role: 'user' | 'assistant'; content: string }

const HAGIT_IMAGE = 'https://res.cloudinary.com/decirk3zb/image/upload/v1771449984/Gemini_Generated_Image_b9r9hrb9r9hrb9r9_kanqpt.png'
const HAGIT_PHONE = '972522676718'
const WHATSAPP_URL = `https://wa.me/${HAGIT_PHONE}?text=${encodeURIComponent('היי, אשמח לשמוע פרטים על התארגנות בוילה')}`

const NAV_LINKS = [
  { label: 'חוויה',   href: '/#experience' },
  { label: 'גלריה',   href: '/#gallery'    },
  { label: 'חבילות',  href: '/#pricing'    },
  { label: 'צרי קשר', href: '/#contact'    },
]

const OPENING: Message = {
  role: 'assistant',
  content: 'היי! שמי חגית 💍\nאני בעלת סוויטת הכלות בהרי ירושלים.\n\nאשמח לעזור לך לשריין מקום או לבנות חבילה מותאמת אישית.\n\nמה שמך?'
}

export default function ChatPage() {
  const [messages, setMessages]           = useState<Message[]>([OPENING])
  const [input, setInput]                 = useState('')
  const [isLoading, setIsLoading]         = useState(false)
  const [isSummarizing, setIsSummarizing] = useState(false)
  const [menuOpen, setMenuOpen]           = useState(false)
  const [scrolled, setScrolled]           = useState(false)
  const messagesEndRef                    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, mode: 'standard' }),
      })
      if (!response.ok) throw new Error('Network error')
      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'יש לי בעיה טכנית. אנא נסי שוב או צרי קשר ישירות בוואטסאפ 💚'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleFinishChat = async () => {
    setIsSummarizing(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, purpose: 'summary', mode: 'standard' }),
      })
      const data = await response.json()

      if (!response.ok || !data.reply || data.reply.includes('בעיה טכנית')) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'היה קושי ביצירת הסיכום. נסי שוב בעוד רגע 🙏'
        }])
        return
      }

      const hagitUrl = data.hagitUrl || `https://wa.me/${HAGIT_PHONE}?text=${encodeURIComponent(data.reply)}`
      window.open(hagitUrl, '_blank')
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'שלחתי את הפרטים שלך לחגית — היא תחזור אליך בהקדם 💚'
      }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'היה קושי ביצירת הסיכום. נסי שוב בעוד רגע 🙏'
      }])
    } finally {
      setIsSummarizing(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF6EE] flex flex-col" dir="rtl">

      {/* ── Navbar ── */}
      <motion.header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur shadow-md' : 'bg-white'
        } border-b border-[#E5D5C0]`}
      >
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#C9A86A]" fill="#C9A86A" />
            <span className="font-cormorant text-[22px] text-[#2C241A] font-bold tracking-wide leading-none">
              חגית | סוויטת כלות
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm tracking-wide font-medium text-[#4a3e2f] hover:text-[#C9A86A] hover:bg-[#FAF6EE] rounded-full transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank" rel="noopener noreferrer"
              className="hidden sm:flex bg-[#2C241A] hover:bg-[#4a3e2f] px-5 py-2.5 rounded-full items-center gap-2 shadow-md transition-all text-white font-medium tracking-wide text-sm"
            >
              <span>שרייני תאריך</span>
              <ArrowLeft size={14} />
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex items-center justify-center w-11 h-11 rounded-2xl bg-[#C9A86A]/15 hover:bg-[#C9A86A]/25 border border-[#C9A86A]/40 transition-all active:scale-95"
              aria-label="תפריט"
            >
              {menuOpen
                ? <XIcon size={26} className="text-[#2C241A]" strokeWidth={2} />
                : <Menu size={26} className="text-[#2C241A]" strokeWidth={2} />
              }
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden bg-white border-t border-[#E5D5C0]"
            >
              <div className="px-6 py-3 flex flex-col">
                {NAV_LINKS.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-right py-3.5 text-base font-medium border-b border-[#E5D5C0]/50 last:border-0 text-[#2C241A] hover:text-[#C9A86A] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href={WHATSAPP_URL}
                  target="_blank" rel="noopener noreferrer"
                  className="mt-4 mb-2 w-full py-3.5 rounded-full bg-[#2C241A] text-white text-center text-sm font-medium tracking-wide"
                >
                  שרייני תאריך
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── Chat area ── */}
      <div className="flex-1 flex flex-col pt-16">

        {/* Chat header strip */}
        <div className="bg-[#2C241A] px-6 py-4 flex items-center gap-3">
          <div className="relative">
            <img src={HAGIT_IMAGE} alt="חגית" className="w-11 h-11 rounded-full object-cover border-2 border-[#C9A86A]" />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#2C241A]" />
          </div>
          <div>
            <p className="text-white font-medium text-sm">חגית</p>
            <p className="text-[#C9A86A] text-xs">מייסדת סוויטת הכלות • הרי ירושלים</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-2xl mx-auto w-full">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <img src={HAGIT_IMAGE} alt="" className="w-8 h-8 rounded-full object-cover border border-[#C9A86A] ml-3 mt-1 shrink-0" />
              )}
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-line ${
                msg.role === 'user'
                  ? 'bg-[#2C241A] text-white rounded-br-none'
                  : 'bg-white border border-[#E5D5C0] text-[#2C241A] rounded-bl-none'
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <img src={HAGIT_IMAGE} alt="" className="w-8 h-8 rounded-full object-cover border border-[#C9A86A] ml-3 mt-1 shrink-0" />
              <div className="bg-white border border-[#E5D5C0] p-4 rounded-2xl rounded-bl-none shadow-sm flex gap-1.5 items-center">
                <span className="w-2 h-2 bg-[#C9A86A] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-[#C9A86A] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-[#C9A86A] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* WhatsApp button */}
        {messages.length >= 4 && (
          <div className="px-4 pb-2 max-w-2xl mx-auto w-full">
            <button
              onClick={handleFinishChat}
              disabled={isSummarizing}
              className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-3 rounded-2xl text-sm font-medium flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              {isSummarizing ? <span>מכינה סיכום...</span> : (
                <><MessageCircle size={16} /><span>שלחי לחגית את הפרטים</span></>
              )}
            </button>
          </div>
        )}

        {/* Input */}
        <div className="bg-white border-t border-[#E5D5C0] px-4 py-3">
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-2xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="כתבי הודעה..."
              className="flex-1 bg-[#FAFAF8] border border-[#E5D5C0] rounded-full px-4 py-3 text-sm focus:outline-none focus:border-[#C9A86A] transition-colors"
              dir="rtl"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-[#C9A86A] text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#b0935c] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm shrink-0"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
