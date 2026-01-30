'use client'

import { Instagram, Facebook, Phone, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

interface SocialLink {
  name: string
  icon: React.ReactNode
  href: string
  color: string
  hoverColor: string
}

const socialLinks: SocialLink[] = [
  {
    name: 'Instagram',
    icon: <Instagram className="w-5 h-5" />,
    href: 'https://instagram.com/hagit_bridal',
    color: 'from-purple-600 to-pink-500',
    hoverColor: 'hover:from-purple-700 hover:to-pink-600'
  },
  {
    name: 'Facebook',
    icon: <Facebook className="w-5 h-5" />,
    href: 'https://facebook.com/hagitbridal',
    color: 'from-blue-600 to-blue-700',
    hoverColor: 'hover:from-blue-700 hover:to-blue-800'
  },
  {
    name: 'Phone',
    icon: <Phone className="w-5 h-5" />,
    href: 'tel:+972501234567',
    color: 'from-[#DABB99] to-[#C9A87C]',
    hoverColor: 'hover:from-[#C9A87C] hover:to-[#B89968]'
  },
  {
    name: 'Email',
    icon: <Mail className="w-5 h-5" />,
    href: 'mailto:hagit@example.com',
    color: 'from-rose-400 to-rose-500',
    hoverColor: 'hover:from-rose-500 hover:to-rose-600'
  }
]

interface SocialMediaLinksProps {
  variant?: 'horizontal' | 'vertical'
  className?: string
}

export default function SocialMediaLinks({ 
  variant = 'horizontal',
  className = '' 
}: SocialMediaLinksProps) {
  return (
    <div 
      className={`flex ${variant === 'horizontal' ? 'flex-row' : 'flex-col'} gap-3 ${className}`}
    >
      {socialLinks.map((link, index) => (
        <motion.a
          key={link.name}
          href={link.href}
          target={link.href.startsWith('http') ? '_blank' : '_self'}
          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className={`w-12 h-12 rounded-full bg-gradient-to-br ${link.color} ${link.hoverColor} shadow-soft hover:shadow-lg flex items-center justify-center text-white transition-all duration-300 group`}
          aria-label={link.name}
        >
          {link.icon}
        </motion.a>
      ))}
    </div>
  )
}

// Floating Social Bar Component (for sidebar)
export function FloatingSocialBar() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 1.5 }}
      className="hidden lg:flex fixed top-1/2 left-6 -translate-y-1/2 z-40"
    >
      <div className="glass-soft rounded-full p-3 space-y-3">
        <SocialMediaLinks variant="vertical" />
      </div>
    </motion.div>
  )
}
