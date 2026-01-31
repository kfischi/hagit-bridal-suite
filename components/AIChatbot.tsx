'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X, Send, Sparkles } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

// Predefined responses for the chatbot
const botResponses: Record<string, string> = {
  'שלום': 'שלום! אני כאן לעזור לך עם כל שאלה על התארגנות הכלות שלנו 💍',
  'היי': 'היי! שמחה לעזור 😊 יש לך שאלות על הוילה או על החבילה?',
  'מחיר': 'מחיר השקה מיוחד: 1,500₪ במקום 2,200₪! החבילה כוללת יום שלם בוילה, יין משובח, פינוקים והכל. רוצה פרטים נוספים?',
  'זמינות': 'בואי נבדוק יחד! מה התאריך המשוער של החתונה שלך? 📅 אפשר גם לשלוח וואטסאפ ל-052-267-6718',
  'מיקום': 'הווילה שלנו נמצאת בהרי ירושלים, במיקום שקט ומבודד עטוף בטבע. רוצה לתאם ביקור?',
  'כלול': 'בחבילה כלול: יום שלם בוילה, יין מיקב הרי ירושלים, פירות ומאפים, שתייה חמה וקרה, עמדות מוארות לאיפור, ליווי אישי ואווירה מפנקת 💝',
  'שעות': 'אפשר להגיע משעות הבוקר ועד היציאה לצילומים - בדרך כלל 5-8 שעות. אפשר להתאים לפי הצורך שלך!',
  'תאורה': 'יש לנו תאורת LED מקצועית מושלמת לאיפור! המאפרת שלך תאהב 💄',
  'אנשים': 'הווילה מתאימה לכלה ועד 10 חברות בנוחות מלאה. יש מספיק מקום לכולן!',
  'חניה': 'יש חניה פרטית נוחה ליד הווילה. אין בעיה של חניה!',
  'כשר': 'כל המזון והיין כשרים בהשגחה. היין מיקב הרי ירושלים בכשרות מהדרין.',
  'ביטול': 'אפשר לבטל עד 14 יום לפני התאריך. אין עמלות נסתרות ואנחנו גמישים!',
  'הזמנה': 'מעולה! הדרך הכי מהירה זה לשלוח לי וואטסאפ: 052-267-6718 או להתקשר ישירות. אשמח לשמור לך תאריך! 🎉',
  'תודה': 'בשמחה! אם יש עוד שאלות אני כאן 💕',
  'default': 'תודה על השאלה! אפשר לשלוח לי הודעת וואטסאפ או להתקשר ישירות ל-052-267-6718 📞'
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'שלום! 👋 אני עוזרת וירטואלית של חגית. איך אפשר לעזור לך היום?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    for (const [keyword, response] of Object.entries(botResponses)) {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        return response
      }
    }
    
    return botResponses.default
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 group"
        aria-label="פתח צ'אט AI"
      >
        {/* Notification Badge */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-[#DABB99] rounded-full flex items-center justify-center"
          >
            <Sparkles className="w-3 h-3 text-white" />
          </motion.div>
        )}

        {/* Pulse Ring Effect */}
        <div className="absolute inset-0 rounded-full bg-[#DABB99] animate-ping opacity-20" />
        
        {/* Main Button */}
        <div className="relative w-16 h-16 bg-gradient-to-br from-[#DABB99] to-[#C9A87C] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="w-8 h-8 text-white" strokeWidth={2} />
              </motion.div>
            ) : (
              <motion.div
                key="bot"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <Bot className="w-8 h-8 text-white" strokeWidth={2} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-28 right-6 w-[380px] h-[500px] z-50 glass-soft rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#DABB99] to-[#C9A87C] p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-playfair text-white text-lg">עוזרת חגית</h3>
                <p className="text-white/80 text-xs">מקוון עכשיו</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/40">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-[#DABB99] text-white rounded-br-none'
                        : 'bg-white text-[#2D2D2D] rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-[#DABB99] rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-[#DABB99] rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-[#DABB99] rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white/60 border-t border-rose-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="כתבי הודעה..."
                  className="flex-1 px-4 py-3 rounded-full bg-white border border-rose-100 focus:border-[#DABB99] focus:outline-none focus:ring-2 focus:ring-[#DABB99]/20 text-sm transition-all"
                />
                <button
                  onClick={handleSendMessage}
                  className="w-12 h-12 bg-[#DABB99] hover:bg-[#C9A87C] rounded-full flex items-center justify-center transition-colors shadow-soft"
                  aria-label="שלח הודעה"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
