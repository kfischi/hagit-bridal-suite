'use client'

import { motion } from 'framer-motion'
import { 
  Heart, 
  MessageCircle, 
  ArrowLeft,
  Wine,
  Sun,
  Sparkles,
  Palette
} from 'lucide-react'
import { useRef } from 'react'
import WhatsAppButton from '@/components/WhatsAppButton'
import AccessibilityBtn from '@/components/AccessibilityBtn'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '972522676718'

  return (
    <>
      <WhatsAppButton phoneNumber={phoneNumber} />
      <AccessibilityBtn />

      <main ref={containerRef} className="relative bg-[#FAFAF8] text-[#2C241A]">
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
              className="glass-cream px-6 py-3 rounded-full flex items-center gap-2 pointer-events-auto shadow-sm bg-white/90 backdrop-blur-md border border-[#E5D5C0]"
            >
              <Heart className="w-4 h-4 text-[#C9A86A]" fill="#C9A86A" />
              <span className="font-cormorant text-lg text-[#2C241A] font-medium tracking-wide">
                חגית | סוויטת כלות
              </span>
            </motion.div>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent('היי, אשמח לשמוע פרטים על התארגנות בוילה')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2C241A] hover:bg-[#4a3e2f] px-6 py-3 rounded-full flex items-center gap-3 pointer-events-auto shadow-md transition-all text-white font-light tracking-wide text-sm"
            >
              <span>שרייני תאריך</span>
              <ArrowLeft size={16} />
            </motion.a>
          </div>
        </motion.header>

        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#FAF6EE]">
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
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6EE] via-transparent to-transparent" />
          </div>

          <div className="relative z-10 px-6 -mt-32 pb-20">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <span className="inline-block py-1 px-3 border border-[#C9A86A] rounded-full text-[#C9A86A] text-xs tracking-[0.2em] uppercase mb-4 bg-white/50 backdrop-blur-sm">
                  Luxury Bridal Suite
                </span>
                <h1 className="text-5xl sm:text-7xl lg:text-8xl text-[#2C241A] leading-[1.1] font-light font-cormorant">
                  הרגע שלפני
                  <br />
                  <span className="italic font-normal">הרגע הגדול</span>
                </h1>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-xl sm:text-2xl text-[#594937] font-light max-w-2xl mx-auto leading-relaxed"
              >
                וילה פרטית בלב הטבע הירושלמי.
                <br className="hidden sm:block" />
                מרחב נשימה, יין משובח ואווירה של בית ביום המרגש בחייך.
              </motion.p>
              
              <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.7 }}
                 className="pt-4"
              >
                <a href="#pricing" className="text-[#2C241A] border-b border-[#2C241A] pb-1 hover:text-[#C9A86A] hover:border-[#C9A86A] transition-all text-sm tracking-widest uppercase">
                  גלי את החבילה
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features - Minimalist Icons */}
        <section className="py-32 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { icon: Wine, title: 'יין ופינוקים', desc: 'יין בוטיק וכיבוד קל לאורך כל היום' },
                { icon: Sun, title: 'השקט של ההרים', desc: 'נוף עוצר נשימה ושקט מוחלט' },
                { icon: Palette, title: 'עמדות ביוטי', desc: 'תאורה מקצועית למאפרת ועיצוב שיער' },
                { icon: Sparkles, title: 'זמן איכות', desc: 'סלון מרווח לך ולמלוות שלך' }
              ].map((item, i) => (
                <div key={i} className="text-center group">
                  <div className="flex justify-center mb-6">
                    <item.icon strokeWidth={1} size={40} className="text-[#C9A86A] group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="text-xl font-cormorant font-semibold text-[#2C241A] mb-3">{item.title}</h3>
                  <p className="text-[#8B7355] font-light text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Placeholder */}
        <section id="gallery" className="py-32 px-6 bg-[#FAF6EE]">
          <div className="max-w-7xl mx-auto text-center">
             <h2 className="text-4xl sm:text-6xl text-[#2C241A] font-light mb-4 font-cormorant">הגלריה</h2>
             <p className="text-[#8B7355] font-light tracking-wide text-sm mb-12 uppercase">רגעים של קסם</p>
             <div className="aspect-video bg-[#E5D5C0]/20 rounded-lg flex items-center justify-center border border-[#E5D5C0]">
                <p className="text-[#8B7355] font-light italic">גלריית תמונות תעלה בקרוב...</p>
             </div>
          </div>
        </section>

        {/* Testimonials - Clean Design */}
        <section id="testimonials" className="py-32 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl sm:text-6xl text-[#2C241A] font-light mb-16 text-center font-cormorant">מילים חמות</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {[
                { name: 'שירה כהן', date: 'יולי 2024', text: 'המקום הכי מושלם להתארגנות! התאורה עשתה את כל ההבדל בתמונות, והאווירה הייתה כל כך רגועה.' },
                { name: 'נועה לוי', date: 'יוני 2024', text: 'חגית הייתה פשוט מדהימה. כל פרט קטן היה מושלם, והרגשתי כמו נסיכה. תודה על הבוקר הכי יפה!' }
              ].map((t, i) => (
                <div key={i} className="bg-[#FAF6EE] p-10 rounded-sm relative">
                  <div className="absolute -top-4 right-8 text-6xl text-[#E5D5C0] font-serif">"</div>
                  <p className="text-[#594937] mb-8 leading-relaxed font-light text-lg italic relative z-10">{t.text}</p>
                  <div className="flex items-center gap-4 border-t border-[#E5D5C0]/50 pt-6">
                    <div>
                      <h4 className="font-medium text-[#2C241A] font-cormorant text-lg">{t.name}</h4>
                      <span className="text-xs text-[#8B7355] uppercase tracking-widest">{t.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing - Elegant */}
        <section id="pricing" className="py-32 px-6 bg-[#2C241A] text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-6xl font-light mb-6 font-cormorant text-[#FAF6EE]">חבילת הכלולות</h2>
            <div className="w-24 h-px bg-[#C9A86A] mx-auto mb-12 opacity-50" />
            
            <div className="grid sm:grid-cols-2 gap-12 text-right max-w-2xl mx-auto mb-16">
              <ul className="space-y-4">
                {['שהייה משעות הבוקר המוקדמות', 'ארוחת בוקר כפרית עשירה', 'יין מיקב הרי ירושלים'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#E5D5C0] font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A]" /> {item}
                  </li>
                ))}
              </ul>
              <ul className="space-y-4">
                 {['שימוש מלא במתקני הווילה', 'ליווי אישי וצמוד', 'מרחב התארגנות מרווח'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#E5D5C0] font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A]" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center mb-12">
              <div className="inline-block border border-[#C9A86A] px-6 py-2 rounded-full mb-6">
                 <span className="text-[#C9A86A] text-sm tracking-widest uppercase">מחיר השקה</span>
              </div>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-6xl font-light font-cormorant">1,500</span>
                <span className="text-2xl text-[#8B7355]">₪</span>
              </div>
              <p className="text-[#666] line-through text-sm mt-2">במקום 2,200 ₪</p>
            </div>

            <a 
              href={`https://wa.me/${phoneNumber}`} 
              className="bg-[#FAF6EE] text-[#2C241A] px-10 py-4 rounded-full inline-flex items-center gap-3 hover:bg-[#C9A86A] hover:text-white transition-all duration-300"
            >
              <MessageCircle size={18} />
              <span className="font-medium tracking-wide">דברי איתנו בוואטסאפ</span>
            </a>
          </div>
        </section>
      </main>
    </>
  )
}
