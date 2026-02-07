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

        {/* Video Section (The Experience) */}
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
              {/* זו השורה שגרמה לשגיאה קודם - עכשיו היא תקינה */}
              <div className="absolute inset-0 bg-[#C9A86A] rounded-full opacity-20 blur-xl animate-pulse"></div>
              <img 
                src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1770475427/%D7%A2%D7%9D_%D7%A7%D7%A4%D7%94_z5rutm.jpg" 
                alt="חגית - המארחת שלך" 
                className="w-full h-full object-cover rounded-full border-[3px] border-white shadow-luxury relative z-10"
              />
            </motion.div>
            
            <h3 className="text-3xl sm:text-4xl font-cormorant text-[#2C241A] mb-4">מחכה לארח אותך</h3>
            <p className="text-lg text-[#594937] font-light italic leading-relaxed mb-6">
              "הבית שלי הוא הלב שלי, ואני פותחת אותו בפנייך באהבה גדולה.
              <br />
              מזמינה אותך להתחיל את היום המרגש בחייך באווירה של רוגע, פינוק וקסם."
            </p>
            <div className="w-12 h-px bg-[#C9A86A] mx-auto opacity-60 mb-2"></div>
            <p className="text-[#2C241A] font-cormorant text-xl font-medium">- חגית -</p>
          </div>
        </section>

        {/* Gallery Placeholder */}
        <section id="gallery" className="py-32 px-6 bg-[#FAF6EE]">
          <div className="max-w-7xl mx-auto text-center">
             <h2 className="text-4xl sm:text-6xl text-[#2C241A] font-light mb-4 font-cormorant">הגלריה</h2>
             <p className="text-[#8B7355] font-light tracking-wide text-sm mb-12 uppercase">רגעים של קסם</p>
             <div className="aspect-video bg-white/50 rounded-lg flex items-center justify-center border border-[#E5D5C0]">
                <p className="text-[#8B7355] font-light italic">גלריית תמונות תעלה בקרוב...</p>
             </div>
          </div>
        </section>

        {/* Pricing Packages */}
        <section id="pricing" className="py-32 px-6 bg-[#2C241A] text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl sm:text-6xl font-light mb-6 font-cormorant text-[#FAF6EE]">בחרי את החבילה שלך</h2>
            <div className="w-24 h-px bg-[#C9A86A] mx-auto mb-16 opacity-50" />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Package 1: Basic */}
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-[#FAF6EE]/5 border border-[#C9A86A]/20 p-8 rounded-2xl flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-[#C9A86A]/10 rounded-full flex items-center justify-center mb-6">
                  <Star className="text-[#C9A86A]" />
                </div>
                <h3 className="text-2xl font-cormorant mb-2 text-[#FAF6EE]">חבילת בסיס</h3>
                <p className="text-[#8B7355] text-sm mb-6">לאירוח קליל ונעים</p>
                <div className="text-4xl font-light font-cormorant mb-8">1,800 <span className="text-xl text-[#8B7355]">₪</span></div>
                
                <ul className="space-y-4 text-right w-full mb-8 flex-grow">
                   {[
                     'שימוש חופשי בוילה (בוקר עד יציאה)',
                     'שתייה חמה וקרה חופשי',
                     'פירות טריים ופינוקים מתוקים',
                     'יין בוטיק מיקב הרי ירושלים',
                     'שימוש במתקני הוילה'
                   ].map((item, i) => (
                     <li key={i} className="flex items-start gap-3 text-[#E5D5C0] font-light text-sm">
                       <Check size={16} className="text-[#C9A86A] mt-1 shrink-0" /> {item}
                     </li>
                   ))}
                </ul>
                <a href={`https://wa.me/${phoneNumber}?text=היי, אשמח לשריין את חבילת הבסיס`} className="w-full py-3 rounded-full border border-[#C9A86A] text-[#C9A86A] hover:bg-[#C9A86A] hover:text-white transition-all text-sm tracking-wide">
                  אני רוצה את זה
                </a>
              </motion.div>

              {/* Package 2: Premium (Recommended) */}
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-[#FAF6EE] text-[#2C241A] p-8 rounded-2xl flex flex-col items-center relative transform lg:-translate-y-4 shadow-xl border-2 border-[#C9A86A]"
              >
                <div className="absolute top-0 right-0 bg-[#C9A86A] text-white text-xs px-3 py-1 rounded-bl-lg rounded-tr-lg">מומלץ</div>
                <div className="w-16 h-16 bg-[#C9A86A]/20 rounded-full flex items-center justify-center mb-6">
                  <Gem className="text-[#C9A86A]" />
                </div>
                <h3 className="text-2xl font-cormorant mb-2 font-semibold">חבילת פרימיום</h3>
                <p className="text-[#8B7355] text-sm mb-6">הכי משתלמת ומפנקת</p>
                <div className="text-5xl font-light font-cormorant mb-8 text-[#2C241A]">2,200 <span className="text-xl text-[#8B7355]">₪</span></div>
                
                <ul className="space-y-4 text-right w-full mb-8 flex-grow">
                   {[
                     'כל מה שיש בחבילת הבסיס',
                     'ארוחת בוקר כפרית עשירה ומפנקת',
                     'שמפניה / קאווה חגיגית להרמת כוסית',
                     'פינוקים נוספים לאווירה מושלמת',
                     'מתאים לכלה + מלוות'
                   ].map((item, i) => (
                     <li key={i} className="flex items-start gap-3 text-[#594937] font-light text-sm">
                       <Check size={16} className="text-[#C9A86A] mt-1 shrink-0" /> <span className="font-medium">{item}</span>
                     </li>
                   ))}
                </ul>
                <a href={`https://wa.me/${phoneNumber}?text=היי, אשמח לשריין את חבילת הפרימיום`} className="w-full py-3 rounded-full bg-[#2C241A] text-white hover:bg-[#4a3e2f] transition-all text-sm tracking-wide shadow-lg">
                  זה בול בשבילי
                </a>
              </motion.div>

              {/* Package 3: All Inclusive */}
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-[#FAF6EE]/5 border border-[#C9A86A]/20 p-8 rounded-2xl flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-[#C9A86A]/10 rounded-full flex items-center justify-center mb-6">
                  <Camera className="text-[#C9A86A]" />
                </div>
                <h3 className="text-2xl font-cormorant mb-2 text-[#FAF6EE]">הכל כלול</h3>
                <p className="text-[#8B7355] text-sm mb-6">להגיע בראש שקט לגמרי</p>
                <div className="text-4xl font-light font-cormorant mb-8">
                  <span className="text-lg align-top">החל מ-</span>6,500 <span className="text-xl text-[#8B7355]">₪</span>
                </div>
                
                <ul className="space-y-4 text-right w-full mb-8 flex-grow">
                   {[
                     'כל מה שיש בחבילת הפרימיום',
                     'צלם מקצועי שילווה אתכן',
                     'עיצוב שיער לכלה ולמלוות',
                     'איפור מקצועי לכלה ולמלוות',
                     'חבילה מותאמת אישית לפי הצורך'
                   ].map((item, i) => (
                     <li key={i} className="flex items-start gap-3 text-[#E5D5C0] font-light text-sm">
                       <Check size={16} className="text-[#C9A86A] mt-1 shrink-0" /> {item}
                     </li>
                   ))}
                </ul>
                <a href={`https://wa.me/${phoneNumber}?text=היי, אשמח לשמוע על חבילת הכל-כלול`} className="w-full py-3 rounded-full border border-[#C9A86A] text-[#C9A86A] hover:bg-[#C9A86A] hover:text-white transition-all text-sm tracking-wide">
                  לפרטים נוספים
                </a>
              </motion.div>

            </div>

            <div className="mt-16">
              <button 
                onClick={() => {
                  const chatBtn = document.querySelector('[aria-label="פתח צ\'אט עם חגית"]') as HTMLButtonElement;
                  if (chatBtn) chatBtn.click();
                }}
                className="inline-flex items-center gap-2 text-[#E5D5C0] hover:text-[#C9A86A] transition-colors border-b border-[#E5D5C0] hover:border-[#C9A86A] pb-1"
              >
                <span>יש לך שאלות נוספות? בואי נתכתב</span>
                <MessageCircle size={16} />
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
