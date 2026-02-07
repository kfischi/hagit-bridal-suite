'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, X, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type Message = {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'היי אהובה, מזל טוב! 💍 אני חגית. איזה כיף שנכנסת. מתי תאריך החתונה המרגש?' }
  ])
  
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSummarizing, setIsSummarizing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '972522676718'
  // התמונה הנכונה של חגית
  const hagitImage = "https://res.cloudinary.com/dptyfvwyo/image/upload/v1770072332/image_vr8xxb.png"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input
    setInput('')
    
    const newMessages = [...messages, { role: 'user', content: userMessage } as Message]
    setMessages(newMessages)
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })
      
      if (!response.ok) throw new Error('Network response was not ok')
      
      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch (error) {
      console.error(error)
      // זו ההודעה שראית כשהחיבור נכשל - זה אומר שהAPI לא מוגדר טוב
      setMessages(prev => [...prev, { role: 'assistant', content: 'סליחה אהובה, יש לי בעיה רגעית בתקשורת. בואי נדבר בוואטסאפ בינתיים (לחצי על הכפתור הירוק) 💖' }])
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
        const summaryText = data.reply

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(summaryText)}`
        window.open(whatsappUrl, '_blank')
        
        setMessages(prev => [...prev, { role: 'assistant', content: 'מעולה! העברתי אותך לוואטסאפ עם סיכום השיחה. מחכה לך שם! 😘' }])

    } catch (error) {
        console.error("Error creating summary", error)
    } finally {
        setIsSummarizing(false)
    }
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="fixed bottom-24 left-6 z-[99] origin-bottom-left"
          >
            <div className="bg-white text-[#2C241A] px-4 py-3 rounded-xl shadow-xl border border-[#C9A86A] text-sm font-medium relative">
              יש לך שאלה? דברי איתי ✨
              <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white border-b border-r border-[#C9A86A] transform rotate-45"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-[100] w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label="פתח צ'אט עם חגית"
      >
        <div className="relative w-full h-full">
            <div className="absolute inset-0 rounded-full border-2 border-[#C9A86A] overflow-hidden bg-white">
               <img 
                 src={hagitImage}
                 alt="חגית" 
                 className="w-full h-full object-cover"
               />
            </div>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full z-20"></div>
            <div className="absolute inset-0 rounded-full border border-[#C9A86A] opacity-50 animate-ping"></div>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 left-6 z-[100] w-[90vw] sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#E5D5C0] overflow-hidden flex flex-col max-h-[600px]"
          >
            {/* Header */}
            <div className="bg-[#FAF6EE] p-4 flex items-center justify-between border-b border-[#E5D5C0]">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10">
                   <img 
                     src={hagitImage}
                     alt="חגית" 
                     className="w-full h-full object-cover rounded-full border border-[#C9A86A]"
                   />
                   <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-cormorant font-bold text-[#2C241A]">חגית</h3>
                  <p className="text-xs text-gray-500">מחוברת כעת</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAFAF8]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
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
                  <div className="bg-white border border-[#E5D5C0] p-4 rounded-2xl rounded-bl-none shadow-sm flex gap-1.5 items-center">
                    <span className="w-2 h-2 bg-[#C9A86A] rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-[#C9A86A] rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-[#C9A86A] rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* כפתור סיכום */}
            {messages.length > 2 && (
                <div className="px-4 pb-2 bg-[#FAFAF8]">
                    <button 
                        onClick={handleFinishChat}
                        disabled={isSummarizing}
                        className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                        {isSummarizing ? (
                           <span>מכין סיכום...</span>
                        ) : (
                           <>
                             <MessageCircle size={16} />
                             <span>סיימנו? שלחי לי סיכום לוואטסאפ</span>
                           </>
                        )}
                    </button>
                </div>
            )}

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-[#E5D5C0] flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="כתבי הודעה..."
                className="flex-1 bg-[#FAFAF8] border border-[#E5D5C0] rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#C9A86A] transition-colors"
                dir="rtl"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="bg-[#C9A86A] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#b0935c] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <Send size={18} className={input.trim() && !isLoading ? 'ml-0.5' : ''} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
