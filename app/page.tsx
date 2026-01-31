'use client'

import { motion } from 'framer-motion'
import { 
  Heart, 
  Sparkles, 
  Star,
  ChevronDown,
  Check,
  Bot,
  Play,
  ArrowLeft
} from 'lucide-react'
import { useRef } from 'react'
import WhatsAppButton from '@/components/WhatsAppButton'
import AIChatbot from '@/components/AIChatbot'
import SocialMediaLinks, { FloatingSocialBar } from '@/components/SocialMediaLinks'
import LuxuryGallery from '@/components/LuxuryGallery'
import ParallaxSection from '@/components/ParallaxSection'
import ScrollProgress from '@/components/ScrollProgress'
import StatsCounter from '@/components/StatsCounter'
import VideoTestimonial from '@/components/VideoTestimonial'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '972522676718'

  return (
    <>
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      {/* Floating Components */}
      <WhatsAppButton phoneNumber={phoneNumber} />
      <AIChatbot />
      <FloatingSocialBar />

      <main ref={containerRef} className="relative bg-[#FAFAF8]">
        {/* Minimalist Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="fixed top-0 right-0 left-0 z-50 px-6 py-4"
        >
          <div className="max-w-7xl mx-auto">
            <div className="glass-dark px-8 py-4 rounded-full flex items-center justify-between">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-3"
              >
                <Heart className="w-6 h-6 text-[#D4AF37]" fill="#D4AF37" />
                <span className="font-cormorant text-lg sm:text-xl text-white font-semibold tracking-wide">
                  התארגנות כלה באווירה של בית
                </span>
              </motion.div>

              {/* Navigation */}
              <motion.nav
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="hidden lg:flex items-center gap-8"
              >
                <a href="#gallery" className="text-sm text-white/80 hover:text-[#D4AF37] transition-colors font-light tracking-wide">
                  גלריה
                </a>
                <a href="#experience" className="text-sm text-white/80 hover:text-[#D4AF37] transition-colors font-light tracking-wide">
                  החוויה
                </a>
                <a href="#testimonials" className="text-sm text-white/80 hover:text-[#D4AF37] transition-colors font-light tracking-wide">
                  המלצות
                </a>
                <a href="#pricing" className="text-sm text-white/80 hover:text-[#D4AF37] transition-colors font-light tracking-wide">
                  מחירים
                </a>
              </motion.nav>

              {/* WhatsApp CTA */}
              <motion.a
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent('היי, אני מעוניינת לשמוע פרטים על התארגנות כלות')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-2.5 rounded-full transition-all duration-300 shadow-lg"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span className="text-sm font-medium hidden sm:inline">שלחי הודעה</span>
              </motion.a>
            </div>
          </div>
        </motion.header>

        {/* Hero Section - Fullscreen Video */}
        <section className="relative h-screen flex items-end justify-center overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='%231A1A1A' width='1920' height='1080'/%3E%3C/svg%3E"
            >
              <source 
                src="https://Hagit-Bridal-Preperation.b-cdn.net/%D7%94%D7%AA%D7%90%D7%A8%D7%92%D7%A0%D7%95%D7%AA%20%D7%9B%D7%9C%D7%95%D7%AA/HERO.mp4" 
                type="video/mp4" 
              />
            </video>
            
            {/* Subtle Bottom Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>

          {/* Hero Content - Bottom Positioned */}
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pb-32">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="space-y-8"
            >
              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="inline-flex items-center gap-3 glass-dark px-6 py-3 rounded-full"
              >
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-white/90 text-sm font-light tracking-widest uppercase">
                  Villa in Jerusalem Hills
                </span>
              </motion.div>

              {/* Main Headline */}
              <h1 className="font-cormorant text-6xl sm:text-7xl lg:text-8xl text-white leading-[1.1] font-light">
                הרגע שלפני
                <br />
                <span className="gradient-text font-semibold">הרגע הגדול</span>
              </h1>

              {/* Description */}
              <p className="text-xl sm:text-2xl text-white/95 font-light leading-relaxed max-w-3xl mx-auto">
                וילה מעוצבת בלב הטבע
                <br className="sm:inline" />
                <span className="block sm:inline"> • </span>
                חוויה של יום שלם
                <br className="sm:hidden" />
                <br className="hidden sm:inline" />
                עם יין משובח, פינוקים ואווירה של בית
              </p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
              >
                <a
                  href="#pricing"
                  className="btn-luxury group flex items-center gap-3"
                >
                  <span>גלי את החבילה המושלמת</span>
                  <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                </a>
                
                <a
                  href="#gallery"
                  className="group px-8 py-4 glass-dark rounded-full text-white hover:bg-white/20 transition-all duration-300 flex items-center gap-3"
                >
                  <Play className="w-5 h-5" />
                  <span className="font-light">צפי בגלריה</span>
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-xs text-white/60 font-light tracking-widest uppercase">Scroll</span>
              <ChevronDown className="w-5 h-5 text-white/40" />
            </motion.div>
          </motion.div>
        </section>

        {/* About Section - Elegant Cards */}
        <section className="py-32 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <ParallaxSection speed={0.3}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-20"
              >
                <h2 className="font-cormorant text-5xl sm:text-6xl lg:text-7xl mb-6 text-[#1A1A1A] font-light">
                  יותר מסתם <span className="font-semibold italic">מקום</span>
                </h2>
                <div className="divider-luxury w-32 mx-auto my-8" />
                <p className="text-xl text-[#666] font-light leading-relaxed max-w-2xl mx-auto">
                  וילה בהרי ירושלים שבה הזמן עומד מלכת
                  <br />
                  והרגע שלך הופך לבלתי נשכח
                </p>
              </motion.div>
            </ParallaxSection>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: '🥂',
                  title: 'יין ופינוקים',
                  description: 'יין בוטיק מיקב הרי ירושלים, פירות העונה ומאפים ביתיים'
                },
                {
                  icon: '🌿',
                  title: 'השקט של ההרים',
                  description: 'וילה מבודדת המאפשרת ניתוק מוחלט מהלחץ'
                },
                {
                  icon: '💄',
                  title: 'מרחב ביוטי',
                  description: 'עמדות מוארות ומקצועיות למאפרת ומעצבת השיער'
                },
                {
                  icon: '✨',
                  title: 'זמן איכות',
                  description: 'מרחבים רחבים לך ולחברות להתרגש ביחד'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group p-8 rounded-2xl border border-[#F4E4E1] hover:border-[#D4AF37] bg-white hover-lift cursor-default"
                >
                  <div className="text-6xl mb-6 text-center transition-transform group-hover:scale-110 duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-cormorant text-2xl mb-3 text-[#1A1A1A] text-center font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-[#666] font-light leading-relaxed text-center text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section - Masonry Style */}
        <section id="gallery" className="py-32 px-6 bg-gradient-to-b from-white to-[#F4E4E1]/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="font-cormorant text-5xl sm:text-6xl lg:text-7xl mb-6 text-[#1A1A1A] font-light">
                רגעים <span className="gradient-text font-semibold italic">אמיתיים</span>
              </h2>
              <div className="divider-luxury w-32 mx-auto my-8" />
              <p className="text-xl text-[#666] font-light">
                כלות שהתארגנו אצלנו והרגישו את הקסם
              </p>
            </motion.div>

            {/* Gallery Grid with Lightbox */}
            <LuxuryGallery />
          </div>
        </section>

        {/* Stats Counter */}
        <StatsCounter />

        {/* Experience Section - Split Layout */}
        <section id="experience" className="py-32 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left - Optimized Video */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-luxury bg-gradient-to-br from-amber-100 to-rose-100"
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="absolute inset-0 w-full h-full object-cover"
                  poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect fill='%23F5E6D3' width='400' height='500'/%3E%3C/svg%3E"
                >
                  <source 
                    src="https://Hagit-Bridal-Preperation.b-cdn.net/%D7%94%D7%AA%D7%90%D7%A8%D7%92%D7%A0%D7%95%D7%AA%20%D7%9B%D7%9C%D7%95%D7%AA/VID-20260129-WA0099.mp4" 
                    type="video/mp4" 
                  />
                </video>
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </motion.div>

              {/* Right - Content */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-cormorant text-5xl sm:text-6xl mb-8 text-[#1A1A1A] font-light">
                  החוויה שלך
                  <br />
                  <span className="gradient-text font-semibold italic">בוילה</span>
                </h2>
                
                <p className="text-lg text-[#666] font-light leading-relaxed mb-10">
                  רגע לפני היום הגדול, את מגיעה לוילה עטופה בירוק ושקט,
                  ומתמסרת לזמן שהוא רק שלך. זמן להיות עם החברות הקרובות,
                  לצחוק, להתרגש ולרקום יחד את ההכנות ליום המיוחד
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    'שתייה חמה וקרה לאורך כל היום',
                    'פינוקים מתוקים ופירות טריים',
                    'יין מקומי משובח מיקב הרי ירושלים',
                    'מרחב המאפשר חיבור ונוכחות מלאה',
                    'אווירה רגועה, אישית ומפנקת'
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                      <span className="text-[#1A1A1A] font-light">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <blockquote className="border-r-2 border-[#D4AF37] pr-6 py-4">
                  <p className="text-[#1A1A1A] font-cormorant text-2xl italic font-light leading-relaxed">
                    "יום התארגנות שהוא חוויה, זיכרון,
                    <br />
                    והתחלה רכה ליום בלתי נשכח"
                  </p>
                </blockquote>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-32 px-6 bg-gradient-to-b from-white to-[#F4E4E1]/30">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="font-cormorant text-5xl sm:text-6xl lg:text-7xl mb-6 text-[#1A1A1A] font-light">
                מה <span className="gradient-text font-semibold italic">הכלות</span> אומרות
              </h2>
              <div className="divider-luxury w-32 mx-auto my-8" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
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
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white p-10 rounded-2xl shadow-luxury hover-lift"
                >
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#D4AF37] fill-[#D4AF37]" />
                    ))}
                  </div>
                  <p className="text-[#1A1A1A] mb-8 leading-relaxed font-light text-lg italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center justify-between border-t border-[#F4E4E1] pt-6">
                    <span className="font-medium text-[#1A1A1A]">{testimonial.name}</span>
                    <span className="text-sm text-[#666] font-light">{testimonial.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Video Testimonials */}
            <div className="grid md:grid-cols-2 gap-8">
              <VideoTestimonial
                name="מיכל ר."
                role="כלה • אוגוסט 2024"
                quote="החוויה הכי מדהימה! כל רגע היה פשוט מושלם"
              />
              <VideoTestimonial
                name="רונית ש."
                role="כלה • ספטמבר 2024"
                quote="חגית יצרה לנו אווירה כל כך מיוחדת, כמו בבית"
              />
            </div>
          </div>
        </section>

        {/* Pricing Section - Chatbot CTA */}
        <section id="pricing" className="py-32 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-cormorant text-5xl sm:text-6xl lg:text-7xl mb-6 text-[#1A1A1A] font-light">
                חבילת <span className="gradient-text font-semibold italic">פרימיום</span>
              </h2>
              <div className="divider-luxury w-32 mx-auto my-8" />
              <p className="text-xl text-[#666] font-light">
                יום שלם בוילה מהבוקר ועד היציאה לצילומים
              </p>
            </motion.div>

            {/* Pricing Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white to-[#F4E4E1]/20 p-12 rounded-3xl shadow-luxury border border-[#D4AF37]/20"
            >
              {/* What's Included */}
              <div className="mb-10">
                <h3 className="font-cormorant text-3xl mb-8 text-[#1A1A1A] text-center font-semibold">
                  מה כלול בחבילה?
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    'שהייה בווילה משעות הבוקר',
                    'פירות העונה ושתייה',
                    'יין משובח מיקב הרי ירושלים',
                    'שימוש מלא במתקני הווילה',
                    'ליווי צמוד ודאגה לכל פרט',
                    'אווירה רגועה ואינטימית'
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 }}
                      className="flex items-start gap-3"
                    >
                      <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <span className="text-[#1A1A1A] font-light">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="divider-luxury my-10" />

              {/* Pricing */}
              <div className="text-center mb-10">
                <p className="text-[#999] mb-2 line-through text-lg font-light">2,200 ₪</p>
                <div className="flex items-baseline justify-center gap-3 mb-4">
                  <span className="font-cormorant text-7xl gradient-text font-semibold">1,500</span>
                  <span className="text-3xl text-[#666] font-light">₪</span>
                </div>
                <div className="inline-block bg-[#D4AF37]/10 px-8 py-3 rounded-full">
                  <p className="text-[#D4AF37] font-medium">
                    מחיר השקה • חיסכון של 700 ₪
                  </p>
                </div>
              </div>

              {/* Chatbot CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center space-y-8"
              >
                <div className="bg-gradient-to-br from-[#D4AF37]/5 to-[#F4E4E1]/30 rounded-2xl p-8 border border-[#D4AF37]/20">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Bot className="w-10 h-10 text-[#D4AF37]" />
                    <h3 className="font-cormorant text-3xl text-[#1A1A1A] font-semibold">
                      דברי עם העוזרת החכמה
                    </h3>
                  </div>
                  <p className="text-[#666] mb-6 font-light leading-relaxed">
                    העוזרת הוירטואלית זמינה 24/7 לענות על כל שאלה:
                    <br />
                    מחירים • זמינות • פרטים על החבילה
                  </p>
                  <button
                    onClick={() => {
                      const chatbotButton = document.querySelector('[aria-label="פתח צ\'אט AI"]') as HTMLButtonElement
                      if (chatbotButton) chatbotButton.click()
                    }}
                    className="btn-luxury group flex items-center justify-center gap-3 mx-auto"
                  >
                    <Bot className="w-6 h-6" />
                    <span>פתחי שיחה עכשיו</span>
                    <motion.div
                      animate={{ x: [0, -5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </button>
                </div>

                <div className="divider-luxury my-8" />

                <div>
                  <p className="text-sm text-[#666] mb-4 font-light">או צרי קשר ישירות:</p>
                  <SocialMediaLinks className="justify-center" />
                </div>
              </motion.div>
            </motion.div>

            {/* Trust Elements */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center mt-12 space-y-2"
            >
              <p className="text-sm text-[#999] font-light">✨ ללא עמלות נסתרות</p>
              <p className="text-sm text-[#999] font-light">💝 ניתן לבטל עד 14 יום לפני</p>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-6 bg-gradient-to-b from-white to-[#F4E4E1]/20 border-t border-[#F4E4E1]">
          <div className="max-w-6xl mx-auto text-center space-y-8">
            <div className="flex items-center justify-center gap-3">
              <Heart className="w-8 h-8 text-[#D4AF37]" fill="#D4AF37" />
              <span className="font-cormorant text-4xl text-[#1A1A1A] font-semibold">חגית</span>
            </div>
            
            <p className="text-[#666] font-light text-lg">
              התארגנות כלות • הרגע שלפני הרגע הגדול
            </p>
            
            <div className="flex justify-center">
              <SocialMediaLinks className="justify-center" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#999]">
              <a href="tel:+972522676718" className="hover:text-[#D4AF37] transition-colors font-light">
                052-267-6718
              </a>
              <span>•</span>
              <a href="mailto:hagit@example.com" className="hover:text-[#D4AF37] transition-colors font-light">
                hagit@example.com
              </a>
            </div>

            <div className="divider-luxury w-48 mx-auto" />

            <div className="text-xs text-[#999] font-light">
              © 2025 חגית התארגנות כלות • כל הזכויות שמורות
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
