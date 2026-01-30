'use client'

import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface WhatsAppButtonProps {
  phoneNumber: string
  message?: string
}

export default function WhatsAppButton({ 
  phoneNumber, 
  message = "היי, אני מעוניינת לשמוע פרטים על התארגנות כלות" 
}: WhatsAppButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    const formattedPhone = phoneNumber.replace(/\D/g, '')
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 left-6 z-50 group"
      aria-label="פתח צ'אט בוואטסאפ"
    >
      {/* Pulse Ring Effect */}
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
      
      {/* Main Button */}
      <div className="relative w-16 h-16 bg-[#25D366] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
        <MessageCircle className="w-8 h-8 text-white" strokeWidth={2} />
      </div>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
        className="absolute left-20 top-1/2 -translate-y-1/2 glass-soft px-4 py-2 rounded-full whitespace-nowrap pointer-events-none"
      >
        <span className="text-sm font-medium text-[#2D2D2D]">שלחי הודעה בוואטסאפ</span>
      </motion.div>
    </motion.button>
  )
}
