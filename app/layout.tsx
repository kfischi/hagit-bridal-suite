'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Heart, 
  Sparkles, 
  Camera, 
  Phone,
  Star,
  ChevronDown,
  Check
} from 'lucide-react'
import { useRef } from 'react'
import WhatsAppButton from '@/components/WhatsAppButton'
import AIChatbot from '@/components/AIChatbot'
import SocialMediaLinks, { FloatingSocialBar } from '@/components/SocialMediaLinks'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05])

  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '972501234567'

  return (
    <>
      {/* Floating Components */}
      <WhatsAppButton phoneNumber={phoneNumber} />
      <AIChatbot />
      <FloatingSocialBar />

      <main ref={containerRef} className="relative">
        {/* Floating Header */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="fixed top-0 right-0 left-0 z-50 px-6 py-6"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-soft px-6 py-3 rounded-full"
            >
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-[#DABB99]" fill="#DABB99" />
                <span className="font-playfair text-xl text-[#2D2D2D]">חגית</span>
              </div>
            </motion.div>
            
            <motion.a
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              href={`tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER || '+972501234567'}`}
              className="glass-soft px-6 py-3 rounded-full hover:bg-[#DABB99]/20 transition-all duration-300 flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#DABB99]" />
              <span className="text-sm font-medium hidden sm:inline">050-123-4567</span>
            </motion.a>
          </div>
        </motion.header>

        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <motion.div 
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="absolute inset-0 z-0"
          >
            {/* Video Background */}
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source 
                src="https://Hagit-Bridal-Preperation.b-cdn.net/%D7%94%D7%AA%D7%90%D7%A8%D7%92%D7%A0%D7%95%D7%AA%20%D7%9B%D7%9C%D7%95%D7%AA/VID-20260129-WA0099.mp4" 
                type="video/mp4" 
              />
            </video>
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
            
            {/* Decorative Glow */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-[#DABB99]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-200/15 rounded-full blur-3xl" />
          </motion.div>

          <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="inline-flex items-center gap-2 mb-6 glass-soft px-5 py-2 rounded-full border border-white/20"
            >
              <Sparkles className="w-4 h-4 text-[#DABB99]" />
              <span className="text-sm text-white/90 font-light">וילה בהרי ירושלים</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="font-playfair text-5xl sm:text-6xl lg:text-7xl mb-6 text-white leading-[1.15]"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
            >
              להתעורר מול הרי ירושלים.
              <br />
              <span className="text-[#DABB99]">לנשום. לחגוג.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg sm:text-xl text-white/95 font-light mb-12 max-w-3xl mx-auto leading-relaxed"
              style={{ textShadow: '0 1px 10px rgba(0,0,0,0.3)' }}
            >
              וילה מעוצבת בלב הטבע, עטופה בשקט ובירוק.
              <br className="hidden sm:inline" />
              המקום המושלם לך ולחברות לרקום יחד את הרגעים שלפני החופה,
              <br className="hidden sm:inline" />
              עם יין מקומי, פינוקים ואווירה של בית.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="#availability"
                className="group px-10 py-5 bg-white/95 text-[#2D2D2D] rounded-full hover:bg-white transition-all duration-300 shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center gap-3"
              >
                <span className="font-medium text-lg">לפרטים ובדיקת זמינות</span>
                <ChevronDown className="w-5 h-5 transition-transform group-hover:translate-y-1" />
              </a>
              
              <a
                href="#gallery"
                className="group px-10 py-5 bg-transparent border-2 border-white/60 text-white rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 flex items-center gap-3"
              >
                <Camera className="w-5 h-5" />
                <span className="font-medium text-lg">הווילה שלנו</span>
              </a>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="mt-8 text-sm text-white/80 font-light"
            >
              מחירי השקה מיוחדים לתקופה הקרובה
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-xs text-[#737373] font-light">גללי למטה</span>
              <div className="w-[1px] h-12 bg-gradient-to-b from-[#DABB99]/50 to-transparent" />
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section className="py-24 px-6 bg-white/40">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl mb-6 text-[#2D2D2D]">
                יותר מסתם מקום להתארגן בו
              </h2>
              <div className="divider-elegant my-8 max-w-xs mx-auto" />
              <p className="text-lg sm:text-xl text-[#737373] font-light leading-relaxed mb-16 max-w-3xl mx-auto">
                בלב הרי ירושלים, בתוך וילה שעטופה בירוק, מחכה לך אי של שקט.
                <br className="hidden sm:inline" />
                המקום לנשום עמוק, להתנתק מהרעש ולהתחבר לרגע שלפני החופה.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                {[
                  {
                    icon: '🥂',
                    title: 'יין ופינוקים',
                    description: 'בר פתוח של פירות טריים, מאפים מתוקים ויין בוטיק מיקב הרי ירושלים'
                  },
                  {
                    icon: '🌿',
                    title: 'השקט של ההרים',
                    description: 'וילה מבודדת ושקטה המאפשרת ניתוק מוחלט מהלחץ וחיבור לרגע'
                  },
                  {
                    icon: '💄',
                    title: 'מרחב ביוטי',
                    description: 'עמדות מוארות ומרווחות למאפרת ומעצבת השיער שלך'
                  },
                  {
                    icon: '✨',
                    title: 'זמן איכות',
                    description: 'סלון רחב ופינות ישיבה מושלמות לצחוק ולהתרגש עם החברות'
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="glass-soft p-8 rounded-2xl hover-lift shadow-soft"
                  >
                    <div className="text-5xl mb-4 flex justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="font-playfair text-xl mb-3 text-[#2D2D2D]">
                      {feature.title}
                    </h3>
                    <p className="text-[#737373] font-light leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Gallery Preview */}
        <section id="gallery" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-playfair text-4xl sm:text-5xl lg:text-6xl mb-4 text-[#2D2D2D]"
              >
                רגעים אמיתיים
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-[#737373] text-lg font-light"
              >
                כלות שהתארגנו אצלי והרגישו את הקסם
              </motion.p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative aspect-[3/4] bg-gradient-to-br from-rose-100 to-amber-50 rounded-2xl overflow-hidden shadow-soft hover-lift cursor-pointer group"
                >
                  <div className="absolute inset-0 bg-[#2D2D2D]/0 group-hover:bg-[#2D2D2D]/10 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="glass-soft px-4 py-2 rounded-full">
                      <span className="text-sm text-[#2D2D2D]">לחצי להגדלה</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The Villa Experience */}
        <section className="py-24 px-6 bg-gradient-to-b from-white/40 to-rose-50/30">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-playfair text-4xl sm:text-5xl mb-6 text-[#2D2D2D]">
                  החוויה שלך בוילה
                </h2>
                <p className="text-lg text-[#737373] font-light leading-relaxed mb-8">
                  רגע לפני היום הגדול, כלה מגיעה לוילה עטופה בירוק, שקט ואור,
                  ומתמסרת לזמן שהוא רק שלה. זמן להיות יחד עם החברות הקרובות,
                  לצחוק, להתרגש, לנשום ולרקום יחד את ההכנות ליום המיוחד.
                </p>

                <div className="space-y-4">
                  {[
                    'שתייה חמה וקרה לאורך כל היום',
                    'פינוקים מתוקים ופירות טריים',
                    'יין מקומי משובח מיקב הרי ירושלים',
                    'מרחב שמאפשר חיבור, רוגע ונוכחות מלאה',
                    'ליווי מעצבת שיער (אופציונלי)',
                    'אווירה רגועה, אישית ומפנקת'
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#DABB99]/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-[#DABB99]" />
                      </div>
                      <span className="text-[#2D2D2D]">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="mt-8 p-6 glass-soft rounded-2xl border-r-4 border-[#DABB99]"
                >
                  <p className="text-[#2D2D2D] font-playfair text-lg italic leading-relaxed">
                    "יום התארגנות שהוא חוויה, זיכרון, והתחלה רכה ליום בלתי נשכח"
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative aspect-[4/5] bg-gradient-to-br from-amber-100 to-rose-100 rounded-3xl overflow-hidden shadow-soft"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Camera className="w-16 h-16 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60 font-light">תמונת הוילה תתווסף בקרוב</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-playfair text-4xl sm:text-5xl mb-4 text-[#2D2D2D]">
                מה הכלות אומרות
              </h2>
              <div className="divider-elegant my-8 max-w-xs mx-auto" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  name: 'שירה כ.',
                  date: 'יולי 2024',
                  text: 'המקום הכי מושלם להתארגנות! התאורה עשתה את כל ההבדל בתמונות, והאווירה הייתה כל כך רגועה. ממליצה בחום!'
                },
                {
                  name: 'נועה ל.',
                  date: 'יוני 2024',
                  text: 'חגית הייתה פשוט מדהימה. כל פרט קטן היה מושלם, והרגשתי כמו נסיכה. תודה על הבוקר הכי יפה!'
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="glass-soft p-8 rounded-2xl shadow-soft"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#DABB99] fill-[#DABB99]" />
                    ))}
                  </div>
                  <p className="text-[#2D2D2D] mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#2D2D2D]">{testimonial.name}</span>
                    <span className="text-sm text-[#737373]">{testimonial.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA - Pricing & Availability */}
        <section id="availability" className="py-24 px-6 bg-gradient-to-br from-rose-50 via-amber-50/50 to-rose-100/40">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl mb-6 text-[#2D2D2D]">
                חבילת התארגנות פרימיום
              </h2>
              <p className="text-xl text-[#737373] font-light mb-4">
                יום שלם בוילה מהבוקר ועד היציאה לצילומים
              </p>
            </motion.div>

            {/* Pricing Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-soft p-10 sm:p-12 rounded-3xl shadow-2xl max-w-3xl mx-auto mb-12"
            >
              {/* What's Included */}
              <div className="mb-8">
                <h3 className="font-playfair text-2xl mb-6 text-[#2D2D2D] text-center">
                  מה כלול בחבילה?
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    'שהייה בווילה משעות הבוקר ועד היציאה',
                    'כיבוד עשיר: פירות העונה, שתייה חמה וקרה',
                    'יין משובח מיקב הרי ירושלים',
                    'שימוש מלא במתקני הווילה',
                    'ליווי צמוד ודאגה לכל הפרטים',
                    'אווירה רגועה ואינטימית'
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <Check className="w-5 h-5 text-[#DABB99] flex-shrink-0 mt-0.5" />
                      <span className="text-[#2D2D2D] text-sm">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="divider-elegant my-8" />

              {/* Pricing */}
              <div className="text-center mb-8">
                <p className="text-[#737373] mb-3 line-through text-lg">2,200 ₪</p>
                <div className="flex items-baseline justify-center gap-2 mb-3">
                  <span className="font-playfair text-6xl text-[#DABB99]">1,500</span>
                  <span className="text-2xl text-[#737373]">₪</span>
                </div>
                <div className="inline-block bg-[#DABB99]/10 px-6 py-2 rounded-full">
                  <p className="text-[#DABB99] font-medium text-sm">
                    מחיר השקה מיוחד - חיסכון של 700 ₪
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="השם שלך"
                    required
                    className="w-full px-6 py-4 rounded-full bg-white/70 border border-rose-100 focus:border-[#DABB99] focus:outline-none focus:ring-2 focus:ring-[#DABB99]/20 transition-all"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="טלפון (לחזרה אליך)"
                    required
                    className="w-full px-6 py-4 rounded-full bg-white/70 border border-rose-100 focus:border-[#DABB99] focus:outline-none focus:ring-2 focus:ring-[#DABB99]/20 transition-all"
                  />
                </div>
                <div>
                  <input
                    type="date"
                    placeholder="תאריך החתונה"
                    className="w-full px-6 py-4 rounded-full bg-white/70 border border-rose-100 focus:border-[#DABB99] focus:outline-none focus:ring-2 focus:ring-[#DABB99]/20 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-5 bg-[#DABB99] text-white rounded-full hover:bg-[#C9A87C] transition-all duration-300 shadow-soft hover:shadow-xl font-medium text-lg"
                >
                  שרייני את התאריך שלי עכשיו
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-rose-100/50">
                <p className="text-sm text-[#737373] mb-4 text-center">או צרי קשר ישירות:</p>
                <SocialMediaLinks className="justify-center" />
              </div>
            </motion.div>

            {/* Trust Elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <p className="text-sm text-[#737373] mb-2">✨ ללא עמלות נסתרות</p>
              <p className="text-sm text-[#737373]">💝 ניתן לבטל עד 14 יום לפני המועד</p>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 bg-white/60 border-t border-rose-100">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-[#DABB99]" fill="#DABB99" />
              <span className="font-playfair text-2xl text-[#2D2D2D]">חגית</span>
            </div>
            <p className="text-[#737373] font-light mb-6">
              התארגנות כלות | הרגע שלפני הרגע הגדול
            </p>
            
            <div className="mb-6">
              <SocialMediaLinks className="justify-center" />
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-[#737373] mb-6">
              <a href="tel:+972501234567" className="hover:text-[#DABB99] transition-colors">
                050-123-4567
              </a>
              <span>|</span>
              <a href="mailto:hagit@example.com" className="hover:text-[#DABB99] transition-colors">
                hagit@example.com
              </a>
            </div>

            <div className="mt-8 text-xs text-[#737373]">
              © 2025 חגית התארגנות כלות. כל הזכויות שמורות.
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
