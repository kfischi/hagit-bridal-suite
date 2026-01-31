'use client'

import { motion } from 'framer-motion'
import { Play, Quote } from 'lucide-react'
import { useState } from 'react'

interface VideoTestimonialProps {
  name: string
  role: string
  quote: string
}

export default function VideoTestimonial({ 
  name, 
  role, 
  quote
}: VideoTestimonialProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl overflow-hidden shadow-luxury hover-lift"
    >
      {/* Video/Thumbnail */}
      <div className="relative aspect-video bg-gradient-to-br from-rose-100 to-amber-50 flex items-center justify-center group cursor-pointer">
        {!isPlaying && (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-gold"
          >
            <Play className="w-10 h-10 text-[#D4AF37] mr-1" fill="#D4AF37" />
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-8">
        <Quote className="w-10 h-10 text-[#D4AF37]/20 mb-4" />
        <p className="text-[#1A1A1A] text-lg font-light leading-relaxed mb-6 italic">
          "{quote}"
        </p>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F5E6D3]" />
          <div>
            <div className="font-medium text-[#1A1A1A]">{name}</div>
            <div className="text-sm text-[#666] font-light">{role}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
