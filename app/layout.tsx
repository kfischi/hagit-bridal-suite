import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  X, 
  Send, 
  Menu, 
  Instagram, 
  Mail, 
  Plus
} from 'lucide-react';

// --- רכיב ה-Navbar המשולב ---
const Navbar = ({ scrolled, setIsAiOpen, view, setView }) => (
  <nav className={`fixed top-0 w-full z-[100] px-8 md:px-16 py-8 flex justify-between items-center transition-all duration-700 ${
    scrolled ? 'bg-black/80 backdrop-blur-2xl py-5 border-b border-white/5' : 'bg-transparent'
  }`}>
    <div className="flex items-center gap-16">
      <div className="flex flex-col group cursor-pointer" onClick={() => setView('home')}>
         <span className="text-3xl font-black tracking-tighter uppercase italic text-[#c2a371]">Multibrawn.</span>
         <span className="text-[8px] font-bold uppercase tracking-[0.6em] text-gray-500 -mt-1">Atelier Studio</span>
      </div>
      <div className="hidden lg:flex gap-10 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">
        <button onClick={() => setView('gallery')} className={`hover:text-white transition-all ${view === 'gallery' ? 'text-white border-b border-[#c2a371] pb-1' : ''}`}>Gallery</button>
        <button onClick={() => setView('shop')} className={`hover:text-white transition-all ${view === 'shop' ? 'text-white border-b border-[#c2a371] pb-1' : ''}`}>Shop</button>
        <button onClick={() => setView('blog')} className={`hover:text-white transition-all ${view === 'blog' ? 'text-white border-b border-[#c2a371] pb-1' : ''}`}>Journal</button>
      </div>
    </div>
    <div className="flex items-center gap-8">
      <button onClick={() => setIsAiOpen(true)} className="flex items-center gap-3 bg-[#c2a371]/10 border border-[#c2a371]/20 px-5 py-2.5 rounded-full hover:bg-[#c2a371] hover:text-black transition-all group">
        <Sparkles className="w-4 h-4 text-[#c2a371] group-hover:text-black" />
        <span className="text-[10px] font-black uppercase tracking-widest">ערדית AI</span>
      </button>
      <div className="relative cursor-pointer">
        <ShoppingBag className="w-5 h-5 text-gray-400 hover:text-white transition-all" />
      </div>
    </div>
  </nav>
);

// --- רכיב ה-Chatbot (ערדית) ---
const Chatbot = ({ isOpen, setIsOpen }) => (
  <div className={`fixed inset-y-0 left-0 w-full md:w-[450px] z-[200] bg-[#0c0c0c] border-r border-white/10 shadow-2xl flex flex-col transition-transform duration-700 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
    <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 bg-gradient-to-tr from-[#c2a371] to-[#e6d5b8] rounded-2xl flex items-center justify-center">
          <Sparkles className="text-black w-6 h-6" />
        </div>
        <div className="text-right">
          <h4 className="text-xl font-bold italic text-white leading-none">ערדית בראון AI</h4>
          <p className="text-[9px] text-[#c2a371] font-bold uppercase tracking-widest mt-2">Personal Curation Advisor</p>
        </div>
      </div>
      <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white"><X /></button>
    </div>
    <div className="flex-1 p-10 overflow-y-auto space-y-6">
      <div className="bg-white/5 p-6 rounded-2xl rounded-bl-none text-right border border-white/5 text-sm leading-relaxed text-gray-300">
        שלום, אני ערדית. אני כאן כדי לעזור לכם למצוא את הלוקיישן או את יצירת האמנות המדויקת לחלל שלכם. במה אוכל לסייע?
      </div>
    </div>
    <div className="p-10 border-t border-white/5 bg-black/40">
      <div className="relative">
        <input type="text" placeholder="איך אוכל לעזור היום?" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pr-12 pl-4 text-right text-sm focus:outline-none focus:border-[#c2a371]" />
        <button className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#c2a371] p-2 rounded-xl text-black"><Send className="w-4 h-4 rotate-180" /></button>
      </div>
    </div>
  </div>
);

// --- רכיב ה-CookieBanner ---
const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const accepted = localStorage.getItem('multibrawn-cookies');
    if (!accepted) setTimeout(() => setIsVisible(true), 3000);
  }, []);

  if (!isVisible) return null;
  return (
    <div className="fixed bottom-8 right-8 left-8 md:right-auto md:left-8 md:w-96 z-[150] bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] shadow-2xl">
      <p className="text-xs leading-relaxed text-gray-300 mb-4 text-right">
        אנחנו משתמשים בעוגיות כדי לשפר את חווית הגלישה שלכם באתר. המשך הגלישה מהווה הסכמה לתנאים שלנו.
      </p>
      <div className="flex gap-4">
        <button onClick={() => { localStorage.setItem('multibrawn-cookies', 'true'); setIsVisible(false); }} className="flex-1 bg-white text-black py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">מאשר/ת</button>
        <button onClick={() => setIsVisible(false)} className="flex-1 border border-white/10 py-2 rounded-xl text-[10px] font-bold text-gray-500 hover:text-white">סגירה</button>
      </div>
    </div>
  );
};

// --- הקומפוננטה הראשית (App) ---
export default function App() {
  const [view, setView] = useState('home');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans selection:bg-[#c2a371] selection:text-black overflow-x-hidden" dir="rtl">
      {/* פונטים דרך Google Fonts Link בתוך ה-DOM */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        :root { --font-heebo: 'Heebo', sans-serif; --font-playfair: 'Playfair Display', serif; }
        body { font-family: var(--font-heebo); }
        h1, h2, h3, .font-serif { font-family: var(--font-playfair); }
      `}</style>

      <Navbar scrolled={scrolled} setIsAiOpen={setIsAiOpen} view={view} setView={setView} />
      
      {/* אזור התוכן המרכזי */}
      <main className="transition-opacity duration-700">
        {view === 'home' && (
          <div className="pt-60 pb-32 container mx-auto px-8 md:px-24">
            <div className="max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
               <p className="text-[#c2a371] text-[10px] font-bold uppercase tracking-[0.6em] italic">Interior Design & Art Scouting</p>
               <h1 className="text-7xl md:text-[9rem] font-light italic leading-none tracking-tighter text-white">
                 Bespoke <br /> <span className="font-bold not-italic text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 uppercase">Sanctuary.</span>
               </h1>
               <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed max-w-2xl">
                 אנחנו בונים חללים שמעניקים שקט. מולטיבראון הוא סטודיו לאוצרות אישית המשלב אדריכלות פנים ובינה מלאכותית ליצירת הבית המושלם.
               </p>
               <div className="flex gap-8 pt-8">
                 <button onClick={() => setView('gallery')} className="bg-white text-black px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#c2a371] transition-all">Explore Projects</button>
                 <button onClick={() => setView('shop')} className="border border-white/20 px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all">The Collection</button>
               </div>
            </div>
          </div>
        )}
        
        {/* Placeholder Views */}
        {view !== 'home' && (
          <div className="pt-60 pb-32 container mx-auto px-8 text-center h-[80vh] flex flex-col items-center justify-center animate-in fade-in duration-500">
            <h2 className="text-6xl font-serif italic mb-6">Coming Soon</h2>
            <p className="text-gray-500 text-xl font-light">אנחנו מעדכנים את דף ה-{view} בסטנדרט הגבוה ביותר.</p>
            <button onClick={() => setView('home')} className="mt-12 text-[#c2a371] border-b border-[#c2a371] pb-1 text-[10px] font-black uppercase tracking-widest">חזרה לדף הבית</button>
          </div>
        )}
      </main>

      {/* רכיבים גלובליים */}
      <Chatbot isOpen={isAiOpen} setIsOpen={setIsAiOpen} />
      <CookieBanner />

      {/* Footer פשוט */}
      <footer className="py-20 border-t border-white/5 bg-black/50 text-center">
        <div className="flex justify-center gap-8 mb-8 text-[9px] font-bold uppercase tracking-[0.4em] text-gray-600">
          <Instagram className="w-4 h-4" />
          <Mail className="w-4 h-4" />
          <span>Israel // Global</span>
        </div>
        <p className="text-[8px] font-black uppercase tracking-[0.8em] text-gray-800">© 2026 Multibrawn Global Atelier. Powered by Next Intelligence.</p>
      </footer>
    </div>
  );
}
