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
  // ברכות ופתיחה
  'היי': {
    text: 'שלום! 👋 אני חגית, שמחה מאוד שפנית! איך אפשר לעזור לך היום?',
    quickReplies: ['מחיר', 'זמינות', 'מה כלול?', 'מיקום']
  },
  'שלום': {
    text: 'היי יקרה! 😊 ברוכה הבאה לוילה שלנו. במה אוכל לעזור?',
    quickReplies: ['מחיר', 'זמינות', 'מה כלול?', 'מיקום']
  },
  'בוקר טוב': {
    text: 'בוקר טוב ומבורך! ☀️ תכננת כבר את יום ההתארגנות שלך?',
    quickReplies: ['מחיר', 'זמינות', 'מה כלול?']
  },
  'ערב טוב': {
    text: 'ערב טוב! 🌙 איזה כיף שפנית. מה מעניין אותך?',
    quickReplies: ['מחיר', 'זמינות', 'מה כלול?']
  },
  
  // מחיר ותשלום
  'מחיר': {
    text: '💰 המחיר המיוחד שלנו:\n\n✨ 1,500₪ במקום 2,200₪\n\n✅ כולל הכל:\n• שתייה חמה וקרה כל היום\n• פינת יין ושמפניה מקומית\n• תאורה מקצועית לצילומים\n• צילום 360 מהנה\n• מערכת קול ומוזיקה\n• חניה פרטית\n• שירותים נקיים',
    quickReplies: ['איך מזמינים?', 'זמינות', 'הנחות?']
  },
  'כמה עולה': {
    text: '💰 1,500₪ במקום 2,200₪!\n\nמחיר מיוחד שכולל את הכל - וילה ליום שלם, יין משובח, תאורה, צילום 360, חניה ועוד!',
    quickReplies: ['מה כלול?', 'הנחות?', 'איך משלמים?']
  },
  'מחיר מיוחד': {
    text: '🎉 המחיר המבצע שלנו: 1,500₪!\n\nזה כולל את כל השירותים. חוסך לך 700₪!',
    quickReplies: ['איך מזמינים?', 'מה כלול?']
  },
  'הנחות': {
    text: '🎁 המבצע כבר כולל הנחה של 700₪!\n\nלתאריכים באמצע השבוע יש מחיר עוד יותר מיוחד. רוצה לבדוק?',
    quickReplies: ['צור קשר', 'זמינות', 'מחיר']
  },
  'הנחה': {
    text: '💝 יש לנו מחיר מיוחד לתאריכים באמצע השבוע!\n\nצרי קשר איתי ונבדוק ביחד את האופציות.',
    quickReplies: ['צור קשר', 'זמינות']
  },
  'איך משלמים': {
    text: '💳 תשלום נוח ופשוט:\n\n1️⃣ מקדמה להזמנה\n2️⃣ יתרה שבועיים לפני\n3️⃣ העברה בנקאית / ביט\n\nהכל מאובטח ועם קבלה!',
    quickReplies: ['איך מזמינים?', 'ביטול?', 'מחיר']
  },
  'תשלום': {
    text: '💰 התשלום:\n• מקדמה להזמנה\n• יתרה לפני שבועיים\n• העברה בנקאית או ביט\n\nפשוט ובטוח!',
    quickReplies: ['איך מזמינים?', 'מחיר']
  },
  
  // זמינות ותאריכים
  'זמינות': {
    text: '📅 הזמינות שלנו מתעדכנת בזמן אמת!\n\nאיזה תאריך מעניין אותך? שלחי לי ואבדוק מיד!',
    quickReplies: ['צור קשר', 'מחיר', 'מיקום']
  },
  'תאריכים': {
    text: '📆 יש לנו עדיין תאריכים פנויים!\n\nמה התאריך המשוער שלך? אבדוק עבורך מיד.',
    quickReplies: ['צור קשר', 'מחיר']
  },
  'תאריך': {
    text: '📅 אשמח לבדוק זמינות עבורך!\n\nשלחי לי את התאריך המדויק דרך הוואטסאפ ואחזור תוך דקות.',
    quickReplies: ['צור קשר', 'מחיר']
  },
  
  // מה כלול ופרטים
  'מה כלול': {
    text: '🎉 החבילה המלאה שלנו:\n\n✅ וילה ליום שלם (בוקר-ערב)\n✅ שתייה חמה וקרה ללא הגבלה\n✅ פינת יין ושמפניה מקומית\n✅ תאורה מקצועית לצילומים\n✅ צילום 360 מהנה\n✅ מערכת קול ומוזיקה\n✅ חניה פרטית\n✅ שירותים נקיים\n✅ נוף הררי עוצר נשימה\n\nהכל כלול במחיר!',
    quickReplies: ['מחיר', 'איך מזמינים?', 'כמה שעות?']
  },
  'מה יש': {
    text: '✨ בוילה שלנו יש הכל:\n\n• יין משובח מקומי\n• פינוקים מתוקים\n• תאורה מקצועית\n• צילום 360\n• מוזיקה\n• נוף מדהים\n• אווירה ביתית וחמה\n\nרוצה לשמוע עוד?',
    quickReplies: ['מחיר', 'מיקום', 'איך מזמינים?']
  },
  'שירותים': {
    text: '🏠 השירותים שלנו:\n\n✅ מטבח מאובזר\n✅ שירותים נקיים\n✅ מראות מוארות\n✅ חדרי הלבשה\n✅ אזור צילום\n✅ חניה פרטית\n\nהכל במצב מושלם!',
    quickReplies: ['מחיר', 'מה כלול?']
  },
  
  // זמן ושעות
  'כמה שעות': {
    text: '⏰ הוילה שלך ליום שלם!\n\nמהבוקר ועד הערב - כל הזמן שצריך. בדרך כלל 8-10 שעות.\n\nזמן להתארגן בנחת, לצלם, ליהנות עם החברות!',
    quickReplies: ['מחיר', 'איך מזמינים?', 'מה כלול?']
  },
  'כמה זמן': {
    text: '⏰ יום שלם! בערך 8-10 שעות.\n\nאת מגיעה בבוקר ונהנית עד לפני החתונה. ללא לחץ, ללא מגבלות.',
    quickReplies: ['מחיר', 'מה כלול?']
  },
  'שעות': {
    text: '🕐 השעות גמישות!\n\nבדרך כלל 10:00-18:00, אבל אפשר להתאים לצרכים שלך.',
    quickReplies: ['מחיר', 'איך מזמינים?']
  },
  
  // מיקום והגעה
  'מיקום': {
    text: '📍 וילה בהרי ירושלים!\n\nאזור שקט ומרהיב עם נוף פנורמי. נגישה, קרובה, ומושלמת לצילומים.\n\nרוצה קישור למפה?',
    quickReplies: ['צור קשר', 'הוראות הגעה', 'מחיר']
  },
  'איפה זה': {
    text: '🗺️ הרי ירושלים!\n\n20 דקות מהעיר, באזור שקט עם נוף מדהים. חניה פרטית במקום.',
    quickReplies: ['הוראות הגעה', 'מחיר', 'צור קשר']
  },
  'הוראות הגעה': {
    text: '🚗 נגישות מעולה!\n\nשולחת לך קישור למפה בוואטסאפ. קל להגיע, יש חניה במקום.',
    quickReplies: ['צור קשר', 'מחיר']
  },
  'איך מגיעים': {
    text: '🛣️ הגעה נוחה:\n\n• 20 דקות מירושלים\n• חניה פרטית\n• כביש סלול\n• קל למצוא\n\nשולחת קישור למפות בוואטסאפ!',
    quickReplies: ['צור קשר', 'מחיר']
  },
  'חניה': {
    text: '🅿️ חניה פרטית במקום!\n\nיש מקום לכל האורחים שלך, בחינם, ממש ליד הכניסה.',
    quickReplies: ['מיקום', 'מה כלול?']
  },
  
  // הזמנה וביטול
  'איך מזמינים': {
    text: '📲 ההזמנה סופר פשוטה!\n\n1️⃣ תשלחי לי תאריך בוואטסאפ\n2️⃣ אאשר זמינות תוך דקות\n3️⃣ תשלום מקדמה להזמנה\n4️⃣ זהו! התאריך שלך מוזמן 🎉\n\nמוכנה? לחצי "צור קשר"!',
    quickReplies: ['צור קשר', 'מחיר', 'ביטול?']
  },
  'להזמין': {
    text: '✅ בואי נזמין!\n\nשלחי לי את התאריך בוואטסאפ ואדאג לשמור אותו בשבילך.',
    quickReplies: ['צור קשר', 'מחיר']
  },
  'לקבוע': {
    text: '📅 בואי נקבע!\n\nרק צריך את התאריך שלך ואת מזמינה מיד.',
    quickReplies: ['צור קשר', 'זמינות']
  },
  'ביטול': {
    text: '🔄 מדיניות ביטול הוגנת:\n\n✅ ביטול חינם עד 14 יום לפני\n✅ 14-7 ימים - החזר 50%\n✅ פחות משבוע - ללא החזר\n\n*במקרה של בעיה רפואית - נמצא פתרון!',
    quickReplies: ['צור קשר', 'מחיר', 'איך מזמינים?']
  },
  'ביטול הזמנה': {
    text: '📋 מדיניות ביטול:\n\nביטול חופשי עד 14 יום לפני. אחרי זה - לפי תנאים.\n\nרוצה לדבר איתי על זה?',
    quickReplies: ['צור קשר', 'מחיר']
  },
  
  // יין ושתייה
  'יין': {
    text: '🍷 יין בוטיק מקומי!\n\nמיקב הרי ירושלים - יין משובח, לבן ואדום. בחינם וללא הגבלה!',
    quickReplies: ['מה כלול?', 'מחיר']
  },
  'שתייה': {
    text: '🥤 שתייה ללא הגבלה!\n\n• קפה ותה כל היום\n• מיצים טבעיים\n• מים ומשקאות קלים\n• יין ושמפניה\n\nהכל כלול!',
    quickReplies: ['מה עוד כלול?', 'מחיר']
  },
  'קפה': {
    text: '☕ קפה טעים כל היום!\n\nמכונת אספרסו מקצועית, תה, חלב - מה שרוצים!',
    quickReplies: ['מה כלול?', 'מחיר']
  },
  
  // אוכל
  'אוכל': {
    text: '🍰 אין אוכל כבד במחיר, אבל:\n\n✅ מאפים קלים\n✅ פירות העונה\n✅ ממתקים\n✅ נשנושים\n\nאפשר להביא אוכל משלכם!',
    quickReplies: ['מחיר', 'מה כלול?']
  },
  'ארוחה': {
    text: '🥗 אין ארוחה מלאה במחיר.\n\nאבל יש פינוקים, פירות וממתקים. ואפשר להביא מה שרוצים!',
    quickReplies: ['מחיר', 'מה כלול?']
  },
  
  // צילום ותאורה
  'צילום': {
    text: '📸 מושלם לצילומים!\n\n✅ תאורה מקצועית\n✅ צילום 360 כיפי\n✅ נוף מדהים\n✅ פינות צילום מעוצבות\n\nהצלם שלך יאהב!',
    quickReplies: ['תאורה', 'מה כלול?', 'מחיר']
  },
  'תאורה': {
    text: '💡 תאורה מקצועית!\n\nמאור חם ומשלים - התמונות שלך יצאו מדהימות!',
    quickReplies: ['צילום', 'מחיר']
  },
  '360': {
    text: '🎥 צילום 360 מהנה!\n\nהחברות שלך יאהבו - זה כיף והתוצאה מדהימה!',
    quickReplies: ['מה כלול?', 'מחיר']
  },
  
  // אווירה וחוויה
  'אווירה': {
    text: '✨ אווירה ביתית וחמה!\n\nלא סטרילי, לא מלאכותי. כמו להתארגן בבית, רק יותר יפה!',
    quickReplies: ['מחיר', 'איך מזמינים?']
  },
  'נוף': {
    text: '🏔️ נוף הררי עוצר נשימה!\n\nהרי ירושלים בכל פאר. מושלם לצילומים ולרגע של שקט.',
    quickReplies: ['מיקום', 'מחיר']
  },
  
  // קבוצה וחברות
  'כמה אנשים': {
    text: '👯‍♀️ מספר אנשים:\n\nמתאים לעד 15-20 איש בנוחות. הכלה + החברות הקרובות!',
    quickReplies: ['מחיר', 'מה כלול?']
  },
  'חברות': {
    text: '💕 בואו עם כל החברות!\n\nיש מקום לכולן. הוילה מתאימה ל-15-20 איש.',
    quickReplies: ['מחיר', 'מה כלול?']
  },
  
  // המלצות
  'המלצות': {
    text: '⭐ הכלות שלנו מאושרות!\n\n"המקום הכי מושלם"\n"האווירה הייתה קסומה"\n"התמונות יצאו מדהימות"\n\nרוצה לדבר עם כלה שהייתה?',
    quickReplies: ['צור קשר', 'מחיר']
  },
  'ביקורות': {
    text: '💬 100% שביעות רצון!\n\nכל הכלות שלנו יוצאות מאושרות. רוצה לשמוע עוד?',
    quickReplies: ['המלצות', 'מחיר']
  },
  
  // צור קשר
  'צור קשר': {
    text: '📞 בואי נדבר!\n\n💚 וואטסאפ - מגיבה תוך דקות\n📧 מייל - תוך 24 שעות\n☎️ טלפון - זמינה ביום\n\nאיך נוח לך?',
    quickReplies: ['וואטסאפ', 'מייל', 'טלפון']
  },
  'לדבר': {
    text: '💬 אשמח לדבר איתך!\n\nשלחי הודעה בוואטסאפ ונסדר הכל.',
    quickReplies: ['צור קשר']
  },
  'טלפון': {
    text: '☎️ הנה הטלפון:\n\n052-267-6718\n\nמוזמנת להתקשר בשעות היום!',
    quickReplies: ['וואטסאפ', 'מייל']
  },
  
  // Default
  'default': {
    text: 'לא בטוחה שהבנתי... 🤔\n\nבואי ננסה אחרת - מה מעניין אותך?',
    quickReplies: ['מחיר', 'זמינות', 'מה כלול?', 'מיקום', 'איך מזמינים?']
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
    
    // מילות מפתח מורחבות
    const keywords: Record<string, string[]> = {
      // ברכות
      'היי': ['היי', 'הי', 'hello'],
      'שלום': ['שלום', 'שלום לך', 'ערב טוב', 'בוקר טוב'],
      'בוקר טוב': ['בוקר טוב', 'בוקר'],
      'ערב טוב': ['ערב טוב', 'ערב'],
      
      // מחיר ותשלום
      'מחיר': ['מחיר', 'כמה עולה', 'עלות', 'מחיר מיוחד'],
      'כמה עולה': ['כמה עולה', 'כמה זה עולה'],
      'הנחות': ['הנחה', 'הנחות', 'מבצע', 'הנחה?'],
      'הנחה': ['הנחה'],
      'איך משלמים': ['איך משלמים', 'תשלום', 'אמצעי תשלום'],
      'תשלום': ['תשלום', 'לשלם'],
      
      // זמינות
      'זמינות': ['זמינות', 'פנוי', 'תורים'],
      'תאריכים': ['תאריכים', 'מתי פנוי'],
      'תאריך': ['תאריך', 'תאריך ספציפי'],
      
      // מה כלול
      'מה כלול': ['מה כלול', 'מה כולל'],
      'מה יש': ['מה יש', 'מה מקבלים'],
      'שירותים': ['שירותים', 'מתקנים'],
      
      // זמן
      'כמה שעות': ['כמה שעות', 'כמה זמן'],
      'כמה זמן': ['כמה זמן'],
      'שעות': ['שעות', 'משך זמן'],
      
      // מיקום
      'מיקום': ['מיקום', 'איפה', 'איפה זה'],
      'איפה זה': ['איפה זה', 'איפה נמצא'],
      'הוראות הגעה': ['הוראות הגעה', 'איך מגיעים', 'כיוון'],
      'איך מגיעים': ['איך מגיעים'],
      'חניה': ['חניה', 'חנייה', 'פרקינג'],
      
      // הזמנה
      'איך מזמינים': ['איך מזמינים', 'איך להזמין'],
      'להזמין': ['להזמין', 'לשריין'],
      'לקבוע': ['לקבוע', 'לתאם'],
      'ביטול': ['ביטול', 'לבטל', 'החזר כספי'],
      'ביטול הזמנה': ['ביטול הזמנה'],
      
      // יין ושתייה
      'יין': ['יין', 'אלכוהול'],
      'שתייה': ['שתייה', 'משקאות'],
      'קפה': ['קפה', 'תה'],
      
      // אוכל
      'אוכל': ['אוכל', 'לאכול'],
      'ארוחה': ['ארוחה', 'אוכל כבד'],
      
      // צילום
      'צילום': ['צילום', 'צלם', 'תמונות'],
      'תאורה': ['תאורה', 'אור', 'תאורת צילום'],
      '360': ['360', 'סלופי'],
      
      // אווירה
      'אווירה': ['אווירה', 'איך זה'],
      'נוף': ['נוף', 'נופים', 'נוף יפה'],
      
      // קבוצה
      'כמה אנשים': ['כמה אנשים', 'מספר אנשים'],
      'חברות': ['חברות', 'קבוצה'],
      
      // המלצות
      'המלצות': ['המלצות', 'חוות דעת'],
      'ביקורות': ['ביקורות', 'מה אומרים'],
      
      // צור קשר
      'צור קשר': ['צור קשר', 'ליצור קשר', 'פרטים'],
      'לדבר': ['לדבר', 'לדבר איתך'],
      'טלפון': ['טלפון', 'פלאפון', 'מספר טלפון']
    }

    // חיפוש מדויק
    for (const [key, terms] of Object.entries(keywords)) {
      if (terms.some(term => lowerInput.includes(term))) {
        return predefinedResponses[key] || predefinedResponses['default']
      }
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
