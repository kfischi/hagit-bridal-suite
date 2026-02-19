'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, X, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function AIChatbot() {
  const [isOpen, setIsOpen]       = useState(false)
  const [messages, setMessages]   = useState<Message[]>([
    {
      role: 'assistant',
      content: 'היי אהובה, מזל טוב! 💍 אני חגית. כל כך שמחה שנכנסת.\n\nספרי לי קצת — מתי תאריך החתונה שלך?'
    }
  ])
  const [input, setInput]           = useState('')
  const [isLoading, setIsLoading]   = useState(false)
  const [isSummarizing, setIsSummarizing] = useState(false)
  const messagesEndRef              = useRef<HTMLDivElement>(null)

  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '972522676718'
  const hagitImage  = 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1770072332/image_vr8xxb.png'

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isOpen])

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
        body: JSON.stringify({ messages: newMessages }),
      })

      if (!response.ok) throw new Error('Network error')

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch (error) {
      console.error(error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'סליחה אהובה, יש לי בעיה רגעית בתקשורת. בואי נדבר בוואטסאפ בינתיים 💖'
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
        body: JSON.stringify({ messages, purpose: 'summary' }),
      })
      const data = await response.json()
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(data.reply)}`
      window.open(whatsappUrl, '_blank')
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'מעולה! העברתי אותך לוואטסאפ עם סיכום השיחה שלנו. מחכה לך שם 😘'
      }])
    } catch (error) {
      console.error(error)
    } finally {
      setIsSummarizing(false)
    }
  }

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

      {/* FAB Button */}
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
            <div className="bg-[#2C241A] px-4 py-3 flex items-center justify-between">
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
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#8B7355] hover:text-white transition-colors p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAFAF8]" style={{ minHeight: '300px' }}>
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <img src={hagitImage} alt="" className="w-7 h-7 rounded-full object-cover border border-[#C9A86A] ml-2 mt-1 shrink-0" />
                  )}
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-[#2C241A] text-white rounded-br-none'
                      : 'bg-white border border-[#E5D5C0] text-[#2C241A] rounded-bl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <img src={hagitImage} alt="" className="w-7 h-7 rounded-full object-cover border border-[#C9A86A] ml-2 mt-1 shrink-0" />
                  <div className="bg-white border border-[#E5D5C0] p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1.5 items-center">
                    <span className="w-2 h-2 bg-[#C9A86A] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-[#C9A86A] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-[#C9A86A] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* WhatsApp summary button — after 4 messages */}
            {messages.length >= 4 && (
              <div className="px-4 py-2 bg-[#FAFAF8] border-t border-[#E5D5C0]">
                <button
                  onClick={handleFinishChat}
                  disabled={isSummarizing}
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  {isSummarizing ? (
                    <span>מכינה סיכום...</span>
                  ) : (
                    <>
                      <MessageCircle size={15} />
                      <span>סיימנו? שלחי לי סיכום לוואטסאפ</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-[#E5D5C0] flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="כתבי הודעה..."
                className="flex-1 bg-[#FAFAF8] border border-[#E5D5C0] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#C9A86A] transition-colors"
                dir="rtl"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-[#C9A86A] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#b0935c] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm shrink-0"
              >
                <Send size={16} className={input.trim() && !isLoading ? 'ml-0.5' : ''} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
