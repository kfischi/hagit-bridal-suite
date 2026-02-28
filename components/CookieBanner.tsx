'use client';

import { useState, useEffect } from 'react';
import { x } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // בדיקה אם המשתמש כבר אישר עוגיות בעבר (סימולציה)
    const hasAccepted = localStorage.getItem('cookies-accepted');
    if (!hasAccepted) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookies-accepted', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 left-6 md:right-12 md:left-auto md:w-[400px] z-[10000] animate-in slide-in-from-bottom-10 duration-700">
      <div className="bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] shadow-2xl flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <h4 className="text-sm font-bold uppercase tracking-widest text-[#FF5EA1]">פרטיות וחוויה</h4>
          <button onClick={() => setIsVisible(false)} className="text-gray-500 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">
          אנחנו משתמשים בעוגיות כדי להבטיח שתקבלו את החוויה הטובה ביותר באתר של Multibrawn. המשך הגלישה מהווה הסכמה לתנאי השימוש שלנו.
        </p>
        <div className="flex gap-3">
          <button 
            onClick={acceptCookies}
            className="flex-1 bg-gradient-to-r from-[#FF5EA1] to-[#A06BFF] text-white py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity"
          >
            מאשר/ת
          </button>
          <button 
            onClick={() => setIsVisible(false)}
            className="px-4 py-2.5 border border-white/10 rounded-xl text-[10px] font-bold text-gray-400 hover:bg-white/5 transition-all"
          >
            פרטים נוספים
          </button>
        </div>
      </div>
    </div>
  );
}
