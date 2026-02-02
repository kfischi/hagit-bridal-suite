'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Sparkles, Phone, Mail } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  quickReplies?: string[]
}

const predefinedResponses: Record<string, { text: string; quickReplies?: string[] }> = {
  'היי': {
    text: 'שלום! 👋 אני כאן לעזור לך עם כל שאלה על ההתארגנות שלך ביום החתונה. במה אוכל לעזור?',
    quickReplies: ['מחיר', 'זמינות', 'מה כלול?', 'איפה זה?']
  },
  'שלום': {
    text: 'היי! 😊 נעים מאוד. אני הצ\'אטבוט של חגית. יש לי תשובות לכל השאלות שלך!',
    quickReplies: ['מחיר', 'זמינות', 'מה כלול?', 'איפה זה?']
  },
  'מחיר': {
    text: '💰 המחיר המיוחד שלנו:\n\n✨ 1,500₪ במקום 2,200₪\n\n✅ כולל:\n• שתייה חמה וקרה כל היום\n• פינת יין ושמפניה\n• תאורה מקצועית\n• צילום 360\n• מוזיקה ורמקולים\n• חניה פרטית',
    quickReplies: ['איך מזמינים?', 'זמינות', 'ביטול?']
  },
  'זמינות': {
    text: '📅 הזמינות שלנו מתעדכנת בזמן אמת!\n\nאשמח לבדוק עבורך תאריך ספציפי. איזה תאריך מעניין אותך?',
    quickReplies: ['צור קשר', 'מחיר', 'מיקום']
  },
  'מה כלול?': {
    text: '🎉 החבילה שלנו כוללת:\n\n✅ שתייה חמה וקרה ללא הגבלה\n✅ פינת יין ושמפניה\n✅ תאורה מקצועית לצילומים\n✅ צילום 360 מהנה\n✅ מערכת קול ומוזיקה\n✅ חניה פרטית\n✅ נוף הררי מדהים\n\nרוצה לשמוע עוד?',
    quickReplies: ['מחיר', 'איך מזמינים?', 'כמה שעות?']
  },
  'איפה זה?': {
    text: '📍 מיקום:\nוילה בהרי ירושלים, אזור שקט ומרהיב עם נוף לא פחות ממושלם!\n\nרוצה הוראות הגעה מדויקות?',
    quickReplies: ['צור קשר', 'מחיר', 'כמה שעות?']
  },
  'כמה שעות?': {
    text: '⏰ הזמנה ליום שלם!\n\nהוילה שלך מהבוקר ועד הערב. זמן להתארגן בנחת, לצלם, ליהנות.',
    quickReplies: ['מחיר', 'איך מזמינים?']
  },
  'איך מזמינים?': {
    text: '📲 סופר פשוט!\n\n1️⃣ לחץ על "צור קשר" למטה\n2️⃣ שלח לנו את התאריך המבוקש\n3️⃣ נחזור אליך תוך שעה\n\nאפשר גם דרך המייל או טלפון!',
    quickReplies: ['צור קשר', 'מחיר']
  },
  'ביטול?': {
    text: '🔄 מדיניות ביטול:\n\n✅ ביטול חינם עד 14 יום לפני\n✅ אחרי זה - החזר חלקי\n✅ בעיות בריאות? נמצא פתרון!\n\nרוצה לדבר עם חגית?',
    quickReplies: ['צור קשר', 'מחיר']
  },
  'צור קשר': {
    text: '📞 דרכי יצירת קשר:\n\n💚 וואטסאפ - הכי מהיר!\n📧 מייל - נחזור תוך 24 שעות\n☎️ טלפון - זמינים בשעות היום\n\nאיך נוח לך?',
    quickReplies: ['וואטסאפ', 'מייל', 'טלפון']
  },
  'default': {
    text: 'אני לא בטוח שהבנתי 🤔\n\nאולי תרצה לשאול על אחד מהנושאים האלה?',
    quickReplies: ['מחיר', 'זמינות', 'מה כלול?', 'איפה זה?']
  }
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'היי! 👋 אני הצ\'אטבוט של חגית. שמחה לעזור! במה תרצי להתחיל?',
      sender: 'bot',
      timestamp: new Date(),
      quickReplies: ['מחיר', 'זמינות', 'מה כלול?', 'איפה זה?']
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const findBestResponse = (userInput: string): { text: string; quickReplies?: string[] } => {
    const lowerInput = userInput.toLowerCase().trim()
    
    // מילות מפתח
    const keywords: Record<string, string[]> = {
      'מחיר': ['מחיר', 'כמה עולה', 'עלות', 'כסף', 'תשלום'],
      'זמינות': ['זמינות', 'פנוי', 'תאריך', 'תורים', 'להזמין'],
      'מה כלול?': ['כלול', 'מה יש', 'שירותים', 'מתקנים', 'מוצע'],
      'איפה זה?': ['איפה', 'מיקום', 'כתובת', 'הגעה', 'נגישות'],
      'כמה שעות?': ['שעות', 'זמן', 'כמה זמן', 'משך'],
      'איך מזמינים?': ['איך', 'הזמנה', 'לשריין', 'לקבוע'],
      'ביטול?': ['ביטול', 'לבטל', 'החזר', 'ביטולים'],
      'צור קשר': ['קשר', 'דבר', 'חגית', 'פרטים', 'טלפון', 'מייל']
    }

    for (const [key, terms] of Object.entries(keywords)) {
      if (terms.some(term => lowerInput.includes(term))) {
        return predefinedResponses[key]
      }
    }

    // ברכות
    if (['היי', 'שלום', 'הי', 'hello', 'שלום לך'].some(term => lowerInput.includes(term))) {
      return predefinedResponses['היי']
    }

    return predefinedResponses['default']
  }

  const handleSendMessage = (text: string = inputValue) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot typing
    setTimeout(() => {
      const response = findBestResponse(text)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        quickReplies: response.quickReplies
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 800 + Math.random() * 400)
  }

  const handleQuickReply = (reply: string) => {
    // פעולות מיוחדות
    if (reply === 'וואטסאפ') {
      window.open(`https://wa.me/972522676718?text=${encodeURIComponent('היי, אני מעוניינת לשמוע פרטים')}`, '_blank')
      return
    }
    if (reply === 'מייל') {
      window.location.href = 'mailto:hagit@example.com?subject=פניה מהאתר'
      return
    }
    if (reply === 'טלפון') {
      window.location.href = 'tel:+972522676718'
      return
    }

    handleSendMessage(reply)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Button */}
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
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
          >
            <Sparkles className="w-3 h-3" />
          </motion.div>
        )}
        
        <div className="absolute inset-0 rounded-full bg-[#D4AF37] animate-ping opacity-20" />
        
        <div className="relative w-20 h-20 rounded-full shadow-gold hover:shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden border-3 border-[#D4AF37]">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div 
                key="close" 
                initial={{ rotate: -90 }} 
                animate={{ rotate: 0 }}
                className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#C9A87C] flex items-center justify-center"
              >
                <X className="w-10 h-10 text-white" strokeWidth={2} />
              </motion.div>
            ) : (
              <motion.div 
                key="hagit" 
                initial={{ scale: 0.8 }} 
                animate={{ scale: 1 }}
                className="absolute inset-0"
              >
                <img 
                  src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1770072332/image_vr8xxb.png"
                  alt="חגית - התארגנות כלה"
                  className="w-full h-full object-cover scale-125"
                />
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
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-28 right-6 w-[400px] h-[600px] z-50 bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#F4E4E1]"
          >
            {/* Header with Hagit's Photo - Larger */}
            <div className="bg-gradient-to-r from-[#C9A86A] to-[#DABC8A] p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/40 shadow-lg">
                  <img 
                    src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1770072332/image_vr8xxb.png"
                    alt="חגית"
                    className="w-full h-full object-cover scale-125"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-cormorant text-xl font-semibold">צ'אט עם חגית</h3>
                  <p className="text-white/80 text-sm font-light">מגיבה מיד ✨</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAFAF8]">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[75%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.sender === 'user'
                          ? 'bg-[#D4AF37] text-white rounded-br-none'
                          : 'bg-white text-[#1A1A1A] rounded-bl-none shadow-sm border border-[#F4E4E1]'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                    </div>
                    
                    {/* Quick Replies */}
                    {message.sender === 'bot' && message.quickReplies && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.quickReplies.map((reply) => (
                          <motion.button
                            key={reply}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleQuickReply(reply)}
                            className="px-3 py-1.5 bg-white border-2 border-[#D4AF37] text-[#D4AF37] rounded-full text-xs font-medium hover:bg-[#D4AF37] hover:text-white transition-all"
                          >
                            {reply}
                          </motion.button>
                        ))}
                      </div>
                    )}
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
                  <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-sm border border-[#F4E4E1]">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-[#D4AF37] rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-[#D4AF37] rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-[#D4AF37] rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-[#F4E4E1]">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="שאלי אותי משהו..."
                  className="flex-1 px-4 py-3 bg-[#FAFAF8] border border-[#F4E4E1] rounded-full text-sm focus:outline-none focus:border-[#D4AF37] transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim()}
                  className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#C9A87C] rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
                >
                  <Send className="w-5 h-5 text-white" />
                </motion.button>
              </div>
              
              {/* Quick Actions */}
              <div className="flex gap-2 mt-3 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => window.open(`https://wa.me/972522676718`, '_blank')}
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#25D366] text-white rounded-full text-xs hover:bg-[#20BA5A] transition-all"
                >
                  <Phone className="w-3 h-3" />
                  <span>וואטסאפ</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => window.location.href = 'mailto:hagit@example.com'}
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#D4AF37] text-white rounded-full text-xs hover:bg-[#C9A87C] transition-all"
                >
                  <Mail className="w-3 h-3" />
                  <span>מייל</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
