'use client'

import { Instagram, Facebook, Phone, Mail } from 'lucide-react'

export default function SocialMediaLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Mail */}
      <a 
        href="mailto:hagit@example.com"
        className="w-10 h-10 rounded-full bg-white border border-[#E5D5C0] flex items-center justify-center text-[#2C241A] hover:bg-[#FAF6EE] hover:scale-110 transition-all shadow-sm"
        aria-label="שלח אימייל"
      >
        <Mail size={18} />
      </a>

      {/* Phone */}
      <a 
        href="tel:0522676718"
        className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-white hover:bg-[#b5952f] hover:scale-110 transition-all shadow-md"
        aria-label="התקשר"
      >
        <Phone size={18} />
      </a>

      {/* Facebook */}
      <a 
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:opacity-90 hover:scale-110 transition-all shadow-md"
        aria-label="פייסבוק"
      >
        <Facebook size={18} />
      </a>

      {/* Instagram */}
      <a 
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#C13584] flex items-center justify-center text-white hover:opacity-90 hover:scale-110 transition-all shadow-md"
        aria-label="אינסטגרם"
      >
        <Instagram size={18} />
      </a>
    </div>
  )
}
