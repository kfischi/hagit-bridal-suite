'use client'

import { motion } from 'framer-motion'
import { 
  Heart, 
  Check, 
  Bot, 
  Play, 
  ArrowLeft
} from 'lucide-react'
import { useRef } from 'react'
import WhatsAppButton from '@/components/WhatsAppButton'
import AccessibilityBtn from '@/components/AccessibilityBtn'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '972522676718'

  return (
    <>
      {/* התיקון נמצא כאן: העברנו את המספר לכפתור */}
      <WhatsAppButton phoneNumber={phoneNumber} />
      <AccessibilityBtn />

      <main ref={containerRef} className="relative bg-[#FAFAF8]">
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="fixed top-6 right-6 left-6 z-50 pointer-events-none"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-cream px-6 py-3 rounded-full flex items-center gap-2 pointer-events-auto shadow-warm bg-white/90 backdrop-blur-md border border-[#C9A86A]/20"
            >
              <Heart className="w-5 h-5 text-[#C9A86A]" fill="#C9A86A" />
              <span className="font-cormorant text-lg sm:text-xl text-[#2C241A] font-semibold whitespace-nowrap">
                התארגנות כלה באווירה של בית
              </span>
            </motion.div>

            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent('היי, אני מעוניינת לשמוע פרטים')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20BA5A] w-14 h-14 rounded-full flex items-center justify-center pointer-events-auto shadow-warm transition-all hover:shadow-lg text-white"
            >
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </motion.a>
          </div>
        </motion.header>

        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col overflow-hidden bg-gradient-to-b from-[#FFFBF5] to-[#FAF6EE]">
          <div className="relative h-[70vh] sm:h-[80vh] w-full overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              poster="https://res.cloudinary.com/dptyfvwyo/image/upload/v1769898872/poster_placeholder.jpg"
            >
              <source 
                src="https://res.cloudinary.com/dptyfvwyo/video/upload/q_auto,f_auto/v1769898872/HERO3_d2m9ny.mp4" 
                type="video/mp4" 
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFFBF5]/30 via-transparent to-[#FAF6EE]/80" />
          </div>

          <div className="relative bg-gradient-to-b from-[#FAF6EE] via-[#FFFBF5] to-[#FAF6EE] text-center px-6 py-16 -mt-32 z-10">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="space-y-7"
              >
                <h1 className="text-5xl sm:text-6xl lg:text-7xl text-[#2C241A] leading-[1.1] font-light font-serif">
                  הרגע שלפני
                  <br />
                  <span className="text-[#C9A86A] font-semibold block mt-3">
                    הרגע הגדול
                  </span>
                </h1>

                <div className="max-w-3xl mx-auto space-y-6">
                  <p className="text-xl sm:text-2xl text-[#2C241A] font-normal leading-relaxed">
                    וילה מעוצבת בלב הטבע
                    <span className="text-[#C9A86A] mx-3 font-semibold">•</span>
                    חוויה של יום שלם
                    <br className="hidden sm:block" />
                    <span className="text-[#C9A86A] mx-3 font-semibold">•</span>
                    עם יין משובח, פינוקים ואווירה של בית
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4"
                >
                  <a
                    href="#pricing"
                    className="bg-[#2C241A] text-white group flex items-center gap-3 px-10 py-4 rounded-full font-semibold relative z-10 hover:bg-[#4a3e2f] transition-all"
                  >
                    <span>גלי את החבילה המושלמת</span>
                    <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-2" />
                  </a>
                  
                  <a
                    href="#gallery"
                    className="group px-8 py-4 bg-white/50 rounded-full text-[#594937] border-2 border-[#C9A86A]/30 hover:border-[#C9A86A] hover:shadow-lg transition-all duration-300 flex items-center gap-3"
                  >
                    <Play className="w-5 h-5 text-[#C9A86A]" />
                    <span className="font-light">צפי בגלריה</span>
                  </a>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-32 px-6 bg-gradient-to-b from-[#FAF6EE] to-[#FFFBF5]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl sm:text-6xl text-[#2C241A] font-light mb-6 font-serif">
                יותר מסתם מקום
              </h2>
              <p className="text-xl text-[#2C241A] font-normal leading-relaxed max-w-2xl mx-auto">
                וילה בהרי ירושלים שבה הזמן עומד מלכת והרגע שלך הופך לבלתי נשכח
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
              {[
                { icon: '🥂', title: 'יין ופינוקים', description: 'יין בוטיק מיקב הרי ירושלים, פירות העונה ומאפים ביתיים' },
                { icon: '🌿', title: 'השקט של ההרים', description: 'וילה מבודדת המאפשרת ניתוק מוחלט מהלחץ' },
                { icon: '💄', title: 'מרחב ביוטי', description: 'עמדות מוארות ומקצועיות למאפרת ומעצבת השיער' },
                { icon: '✨', title: 'זמן איכות', description: 'מרחבים רחבים לך ולחברות להתרגש ביחד' }
              ].map((feature, index) => (
                <div key={index} className="p-10 bg-white border border-[#E5D5C0] rounded-lg text-center hover:shadow-xl transition-all duration-500">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl mb-4 text-[#2C241A] font-light tracking-wide font-serif">{feature.title}</h3>
                  <p className="text-[#2C241A] leading-relaxed font-normal text-base">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section Placeholder */}
        <section id="gallery" className="py-32 px-6 bg-gradient-to-b from-[#FFFBF5] to-[#FAF6EE]">
          <div className="max-w-7xl mx-auto text-center">
             <h2 className="text-5xl sm:text-6xl text-[#2C241A] font-light mb-6 font-serif">הגלריה שלנו</h2>
             <p className="text-gray-500">תמונות יעלו בקרוב...</p>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-32 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl sm:text-6xl mb-6 text-[#1A1A1A] font-light font-serif">חבילת פרימיום</h2>
            <div className="bg-gradient-to-br from-white to-[#F4E4E1]/20 p-12 rounded-3xl shadow-xl border border-[#D4AF37]/20 mt-10">
               <div className="grid sm:grid-cols-2 gap-4 mb-10 text-right">
                 {['שהייה בווילה משעות הבוקר', 'פירות העונה ושתייה', 'יין משובח', 'שימוש מלא במתקני הווילה'].map((item, i) => (
                   <div key={i} className="flex items-center gap-3">
                     <Check className="w-5 h-5 text-[#D4AF37]" /> <span className="text-[#1A1A1A] font-light">{item}</span>
                   </div>
                 ))}
               </div>
               <div className="text-center mb-10">
                 <p className="text-[#999] line-through text-lg">2,200 ₪</p>
                 <div className="text-7xl font-semibold text-[#1A1A1A]">1,500 <span className="text-3xl text-[#666]">₪</span></div>
                 <p className="text-[#D4AF37] mt-2">מחיר השקה לזמן מוגבל</p>
               </div>
               <a href={`https://wa.me/${phoneNumber}`} className="bg-[#1A1A1A] text-white px-8 py-4 rounded-full flex items-center justify-center gap-3 mx-auto hover:bg-black transition-colors w-full sm:w-auto">
                 <Bot className="w-6 h-6" /> <span>דברי עם העוזרת החכמה</span>
               </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
