'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'היי, אני חגית :) איך אני יכולה לעזור לך לתכנן את בוקר ההתארגנות המושלם?' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    // סימולציה של תשובה (כאן אפשר לחבר ל-API אמיתי)
    setIsLoading(true)
    setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: 'תודה שפנית אליי! אשמח לענות לך על כל שאלה בוואטסאפ או בטלפון.' }])
        setIsLoading(false)
    }, 1000)
  }

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        // הוספתי כאן z-[100] כדי לוודא שזה מעל הכל
        className={`fixed bottom-6 left-6 z-[100] w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label="פתח צ'אט עם חגית"
      >
        <div className="relative w-full h-full">
            <div className="absolute inset-0 rounded-full border-2 border-[#C9A86A] overflow-hidden bg-white">
               <img 
                 src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1770072332/image_vr8xxb.png" 
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
            // גם כאן z-[100]
            className="fixed bottom-6 left-6 z-[100] w-[90vw] sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#E5D5C0] overflow-hidden flex flex-col max-h-[600px]"
          >
            <div className="bg-[#FAF6EE] p-4 flex items-center justify-between border-b border-[#E5D5C0]">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10">
                   <img 
                     src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1770072332/image_vr8xxb.png" 
                     alt="חגית" 
                     className="w-full h-full object-cover rounded-full border border-[#C9A86A]"
                   />
                   <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-cormorant font-bold text-[#2C241A]">חגית</h3>
                  <p className="text-xs text-gray-500">זמינה לענות לך</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAFAF8]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-[#2C241A] text-white rounded-br-none' 
                      : 'bg-white border border-[#E5D5C0] text-[#2C241A] rounded-bl-none shadow-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-[#E5D5C0] p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

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
                className="bg-[#C9A86A] text-white p-2 rounded-full hover:bg-[#b0935c] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
