"use client"; // הכרחי עבור Next.js 15 בסביבת פיתוח זו

import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  X, 
  Send, 
  Instagram, 
  Mail
} from 'lucide-react';

/**
 * Multibrawn Unified Layout - Clean Production Version
 * קובץ זה מרכז את כל חוויית הממשק: ניווט, צ'אט AI ובאנר עוגיות.
 * תיקון: הסרת כל הייבואים שאינם בשימוש (Plus, Search, Home, Globe, ImageIcon) למניעת שגיאות Build.
 */

// --- רכיב ה-Navbar ---
const Navbar = ({ scrolled, setIsAiOpen, view, setView }) => (
  <nav className={`fixed top-0 w-full z-[100] px-8 md:px-16 py-8 flex justify-between items-center transition-all duration-700 ${
    scrolled ? 'bg-black/80 backdrop-blur-2xl py-5 border-b border-white/5 shadow-2xl' : 'bg-transparent'
  }`}>
    <div className="flex items-center gap-16">
      <div className="flex flex-col group cursor-pointer" onClick={() => setView('home')}>
         <span className="text-3xl font-black tracking-tighter uppercase italic text-[#c2a371] group-hover:text-white transition-colors duration-500">Multibrawn.</span>
         <span className="text-[8px] font-bold uppercase tracking-[0.6em] text-gray-500 -mt-1">Atelier Studio</span>
      </div>
      <div className="hidden lg:flex gap-10 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500">
        <button onClick={() => setView('gallery')} className={`hover:text-white transition-all ${view === 'gallery' ? 'text-white border-b border-[#c2a371] pb-1' : ''}`}>Gallery</button>
        <button onClick={() => setView('shop')} className={`hover:text-white transition-all ${view === 'shop' ? 'text-white border-b border-[#c2a371] pb-1' : ''}`}>Shop</button>
        <button onClick={() => setView('blog')} className={`hover:text-white transition-all ${view === 'blog' ? 'text-white border-b border-[#c2a371] pb-1' : ''}`}>Journal</button>
      </div>
    </div>
    <div className="flex items-center gap-8">
      <button onClick={() => setIsAiOpen(true)} className="flex items-center gap-3 bg-[#c2a371]/10 border border-[#c2a371]/20 px-5 py-2.5 rounded-full hover:bg-[#c2a371] hover:text-black transition-all group shadow-lg">
        <Sparkles className="w-4 h-4 text-[#c2a371] group-hover:text-black" />
        <span className="text-[10px] font-black uppercase tracking-widest">ערדית AI</span>
      </button>
      <div className="relative cursor-pointer group">
        <ShoppingBag className="w-5 h-5 text-gray-400 group-hover:text-white transition-all" />
      </div>
    </div>
  </nav>
);

// --- רכיב ה-Chatbot (ערדית) ---
const Chatbot = ({ isOpen, setIsOpen }) => (
  <div className={`fixed inset-y-0 left-0 w-full md:w-[450px] z-[200] bg-[#0c0c0c] border-r border-white/10 shadow-[30px_0_100px_rgba(0,0,0,0.9)] flex flex-col transition-transform duration-700 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
    <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 bg-gradient-to-tr from-[#c2a371] to-[#e6d5b8] rounded-2xl flex items-center justify-center shadow-2xl">
          <Sparkles className="text-black w-6 h-6 animate-pulse" />
        </div>
        <div className="text-right">
          <h4 className="text-xl font-bold italic text-white leading-none tracking-tighter">ערדית בראון AI</h4>
          <p className="text-[9px] text-[#c2a371] font-bold uppercase tracking-widest mt-2">Bespoke Curation Advisor</p>
        </div>
      </div>
      <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-gray-500 hover:text-white transition-all"><X /></button>
    </div>
    <div className="flex-1 p-10 overflow-y-auto space-y-6 no-scrollbar">
      <div className="bg-white/5 p-6 rounded-[2rem] rounded-bl-none text-right border border-white/5 text-sm leading-relaxed text-gray-300">
        שלום, אני ערדית. אני האוצרת הדיגיטלית של מולטיבראון. אני כאן כדי לעזור לכם למצוא את הלוקיישן או את יצירת האמנות המדויקת לחלל שלכם. במה אוכל לסייע?
      </div>
    </div>
    <div className="p-10 border-t border-white/5 bg-black/40">
      <div className="relative group">
        <input type="text" placeholder="איך אוכל לעזור היום?" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pr-14 pl-6 text-right text-sm focus:outline-none focus:border-[#c2a371] transition-all" />
        <button className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#c2a371] w-10 h-10 rounded-xl text-black shadow-lg hover:scale-110 transition-all shadow-[#c2a371]/20">
          <Send className="w-4 h-4 rotate-180" />
        </button>
      </div>
    </div>
  </div>
);

// --- רכיב ה-CookieBanner ---
const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const accepted = typeof window !== 'undefined' && localStorage.getItem('multibrawn-cookies');
    if (!accepted) setTimeout(() => setIsVisible(true), 3000);
  }, []);

  if (!isVisible) return null;
  return (
    <div className="fixed bottom-8 right-8 left-8 md:right-auto md:left-8 md:w-[400px] z-[150] bg-black/60 backdrop-blur-2xl border border-white/10 p-8 rounded-[3rem] shadow-2xl animate-in slide-in-from-bottom-10 duration-1000">
      <h4 className="text-sm font-bold uppercase tracking-widest text-[#c2a371] mb-2 text-right">Privacy & Experience</h4>
      <p className="text-xs leading-relaxed text-gray-400 mb-6 text-right">
        אנחנו משתמשים בעוגיות כדי לשפר את חווית הגלישה שלכם באתר ולוודא שהאוצרות שלנו מותאמת לטעם האישי שלכם.
      </p>
      <div className="flex gap-4">
        <button onClick={() => { localStorage.setItem('multibrawn-cookies', 'true'); setIsVisible(false); }} className="flex-1 bg-white text-black py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#c2a371] transition-all">מאשר/ת</button>
        <button onClick={() => setIsVisible(false)} className="flex-1 border border-white/10 py-3 rounded-2xl text-[10px] font-bold text-gray-500 hover:text-white transition-all">סגירה</button>
      </div>
    </div>
  );
};

// --- הקומפוננטה הראשית המשמשת כ-Root Layout ---
export default function App({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState('home');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <html lang="he" dir="rtl">
      <head>
        <title>MULTIBRAWN | High-End Atelier</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body className="bg-[#080808] text-white selection:bg-[#c2a371] selection:text-black overflow-x-hidden antialiased">
        {/* הזרקת סגנונות גלובליים ופונטים */}
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
          :root { --font-heebo: 'Heebo', sans-serif; --font-playfair: 'Playfair Display', serif; }
          body { font-family: var(--font-heebo); background-color: #080808; }
          h1, h2, h3, .font-serif { font-family: var(--font-playfair); }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />

        <Navbar scrolled={scrolled} setIsAiOpen={setIsAiOpen} view={view} setView={setView} />
        
        <main className="min-h-screen">
          {view === 'home' ? (
            <div className="pt-60 pb-32 container mx-auto px-8 md:px-24">
              <div className="max-w-5xl space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                 <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md">
                   <Sparkles className="w-4 h-4 text-[#c2a371]" />
                   <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400 italic">Personal Art & Interior Scouting</span>
                 </div>
                 <h1 className="text-7xl md:text-[9.5rem] font-light italic leading-[0.85] tracking-tighter text-white">
                   Bespoke <br /> <span className="font-bold not-italic text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-700 uppercase">Atelier.</span>
                 </h1>
                 <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed max-w-2xl">
                   מולטיבראון הוא סטודיו לאוצרות אישית המשלב אדריכלות פנים, סקאוטינג של אמנות ובינה מלאכותית ליצירת החלל המדויק עבורכם.
                 </p>
                 <div className="flex flex-col sm:flex-row gap-8 pt-8">
                   <button onClick={() => setView('gallery')} className="bg-white text-black px-14 py-6 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#c2a371] transition-all shadow-2xl hover:-translate-y-1">Explore Projects</button>
                   <button onClick={() => setView('shop')} className="border border-white/20 px-14 py-6 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all">The Collection</button>
                 </div>
              </div>
            </div>
          ) : (
            <div className="pt-60 text-center animate-in fade-in duration-700">
              <h2 className="text-6xl font-serif italic">{view.charAt(0).toUpperCase() + view.slice(1)}</h2>
              <p className="text-gray-500 mt-6 uppercase tracking-widest text-[10px]">Curating Experience...</p>
            </div>
          )}
          {/* הזרקת התוכן של הדפים במידה וקיימים בתיקייה */}
          {children}
        </main>

        <Chatbot isOpen={isAiOpen} setIsOpen={setIsAiOpen} />
        <CookieBanner />

        <footer className="py-24 border-t border-white/5 bg-black/50">
          <div className="container mx-auto px-8 md:px-24 grid md:grid-cols-3 gap-16">
            <div className="space-y-6">
               <span className="text-3xl font-black italic text-[#c2a371] tracking-tighter">Multibrawn.</span>
               <p className="text-gray-600 text-xs leading-relaxed max-w-xs">הדור הבא של איתור לוקיישנים ועיצוב. מחברים בין הנדסה לאסתטיקה בסטנדרט הגבוה בעולם.</p>
            </div>
            <div className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
               <button onClick={() => setView('gallery')} className="hover:text-white transition text-right">Gallery</button>
               <button onClick={() => setView('shop')} className="hover:text-white transition text-right">Collection</button>
               <button onClick={() => setView('blog')} className="hover:text-white transition text-right">Journal</button>
            </div>
            <div className="flex justify-center md:justify-end gap-6 text-gray-400">
               <Instagram className="w-5 h-5 hover:text-white transition cursor-pointer" />
               <Mail className="w-5 h-5 hover:text-white transition cursor-pointer" />
            </div>
          </div>
          <p className="text-center mt-20 text-[8px] font-black uppercase tracking-[0.8em] text-gray-800">© 2026 Multibrawn Global Atelier. Powered by Intelligence.</p>
        </footer>
      </body>
    </html>
  );
}
