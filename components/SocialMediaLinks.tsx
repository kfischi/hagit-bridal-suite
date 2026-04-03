'use client'

import { Instagram, Facebook, Phone, Mail } from 'lucide-react'

const email    = process.env.NEXT_PUBLIC_EMAIL        || 'hagit@example.com'
const phone    = process.env.NEXT_PUBLIC_PHONE_NUMBER  || '+972522676718'
const fbUrl    = process.env.NEXT_PUBLIC_FACEBOOK_URL  || '#'
const igUrl    = process.env.NEXT_PUBLIC_INSTAGRAM_URL || '#'

export default function SocialMediaLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Mail */}
      <a
        href={`mailto:${email}`}
        className="w-10 h-10 rounded-full bg-white border border-[#E5D5C0] flex items-center justify-center text-[#2C241A] hover:bg-[#FAF6EE] hover:scale-110 transition-all shadow-sm"
        aria-label="שלח אימייל"
      >
        <Mail size={18} />
      </a>

      {/* Phone */}
      <a
        href={`tel:${phone.replace(/\D/g, '')}`}
        className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-white hover:bg-[#b5952f] hover:scale-110 transition-all shadow-md"
        aria-label="התקשר"
      >
        <Phone size={18} />
      </a>

      {/* Facebook */}
      <a
        href={fbUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:opacity-90 hover:scale-110 transition-all shadow-md"
        aria-label="פייסבוק"
      >
        <Facebook size={18} />
      </a>

      {/* Instagram */}
      <a
        href={igUrl}
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
