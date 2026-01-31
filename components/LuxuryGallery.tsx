'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

interface GalleryImage {
  id: number
  placeholder: string
  alt: string
}

const galleryImages: GalleryImage[] = [
  { id: 1, placeholder: 'from-rose-100 to-amber-50', alt: 'כלה מתארגנת' },
  { id: 2, placeholder: 'from-amber-50 to-rose-100', alt: 'פרטי איפור' },
  { id: 3, placeholder: 'from-rose-50 to-champagne-100', alt: 'הווילה' },
  { id: 4, placeholder: 'from-champagne-100 to-rose-50', alt: 'רגעים מיוחדים' },
  { id: 5, placeholder: 'from-amber-100 to-rose-50', alt: 'חברות ביחד' },
  { id: 6, placeholder: 'from-rose-50 to-amber-100', alt: 'שמפניה' },
  { id: 7, placeholder: 'from-champagne-50 to-rose-100', alt: 'שמלת כלה' },
  { id: 8, placeholder: 'from-rose-100 to-champagne-50', alt: 'נוף ההרים' },
]

export default function LuxuryGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (id: number) => setSelectedImage(id)
  const closeLightbox = () => setSelectedImage(null)

  const goToNext = () => {
    if (selectedImage === null) return
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage)
    const nextIndex = (currentIndex + 1) % galleryImages.length
    setSelectedImage(galleryImages[nextIndex].id)
  }

  const goToPrev = () => {
    if (selectedImage === null) return
    const currentIndex = galleryImages.findIndex(img => img.id === selectedImage)
    const prevIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1
    setSelectedImage(galleryImages[prevIndex].id)
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            onClick={() => openLightbox(image.id)}
            className={`group relative cursor-pointer rounded-xl overflow-hidden ${
              index === 0 ? 'md:col-span-2 md:row-span-2' : 
              index === 4 ? 'md:col-span-2' : ''
            }`}
          >
            <div className={`relative bg-gradient-to-br ${image.placeholder} ${
              index === 0 ? 'aspect-square' : 'aspect-[3/4]'
            } transition-transform duration-700 group-hover:scale-110`}>
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <div className="glass-dark px-6 py-3 rounded-full flex items-center gap-2">
                    <ZoomIn className="w-5 h-5 text-white" />
                    <span className="text-white text-sm font-light">הגדל</span>
                  </div>
                </motion.div>
              </div>

              {/* Gold border on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#D4AF37] transition-all duration-500 rounded-xl" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={closeLightbox}
              className="absolute top-6 right-6 glass-dark p-3 rounded-full hover:bg-white/20 transition-all z-10"
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>

            {/* Navigation */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              className="absolute left-6 glass-dark p-4 rounded-full hover:bg-white/20 transition-all z-10"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-6 glass-dark p-4 rounded-full hover:bg-white/20 transition-all z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </motion.button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-gold"
            >
              {galleryImages.map(img => {
                if (img.id === selectedImage) {
                  return (
                    <motion.div
                      key={img.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`w-full h-full bg-gradient-to-br ${img.placeholder} flex items-center justify-center`}
                    >
                      <span className="text-white/60 font-light text-lg">{img.alt}</span>
                    </motion.div>
                  )
                }
                return null
              })}
            </motion.div>

            {/* Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-6 glass-dark px-6 py-3 rounded-full"
            >
              <span className="text-white font-light">
                {galleryImages.findIndex(img => img.id === selectedImage) + 1} / {galleryImages.length}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
