'use client'

import { motion } from 'framer-motion'
import { 
  Heart, 
  MessageCircle, 
  ArrowLeft,
  Wine,
  Sun,
  Sparkles,
  Palette,
  Check,
  Star,
  Camera,
  Gem
} from 'lucide-react'
import { useRef } from 'react'
import WhatsAppButton from '@/components/WhatsAppButton'
import AccessibilityBtn from '@/components/AccessibilityBtn'
import AIChatbot from '@/components/AIChatbot'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '972522676718'

  return (
    <>
      <WhatsAppButton phoneNumber={phoneNumber} />
      <AccessibilityBtn />
      <AIChatbot />

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

        {/* Features */}
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

        {/* Video Section (The Experience) - התיקון כאן */}
        <section className="py-32 px-6 bg-[#FAF6EE]">
          <div className="max-w-7xl mx-auto">
             <div className="grid md:grid-cols-2 gap-16 items-center">
               <motion.div
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8 }}
               >
                 <span className="text-[#C9A86A] text-xs tracking-[0.2em] uppercase mb-4 block">The Experience</span>
                 <h2 className="text-4xl sm:text-5xl text-[#2C241A] font-cormorant mb-6">הצצה לתוך הסוויטה</h2>
                 <p className="text-[#594937] font-light text-lg leading-relaxed mb-8">
                   המרחב שבו הקסם קורה. סלון רחב ידיים, פינות ישיבה מפנקות, ושפע של אור טבעי שנכנס מהחלונות הגדולים ומשקיף אל הנוף ההררי.
                   <br/><br/>
                   כל פרט בוילה תוכנן כדי להעניק לך ולמלוות תחושת רוגע, מרחב ופרטיות מוחלטת.
                 </p>
                 <a href="#pricing" className="inline-flex items-center gap-2 text-[#2C241A] font-medium hover:text-[#C9A86A] transition-colors">
                   <span>לפרטים נוספים</span>
                   <ArrowLeft size={16} />
                 </a>
               </motion.div>

               <motion.div
                 initial={{ opacity: 0, scale: 0.95 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8 }}
                 className="relative aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/50"
               >
                 <video
                   controls
                   playsInline
                   preload="metadata"
                   className="absolute inset-0 w-full h-full object-cover"
                 >
                   <source 
                     src="https://res.cloudinary.com/dptyfvwyo/video/upload/v1769895273/VID-20260129-WA0099_ujpg85.mp4" 
                     type="video/mp4" 
                   />
                 </video>
               </motion.div>
             </div>
          </div>
        </section>

        {/* Meet Hagit */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-40 h-40 mx-auto mb-8"
            >
              <div className="absolute inset-0 bg-[#C9A86A] rounded-full opacity-
