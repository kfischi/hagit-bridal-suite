'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface GalleryImage {
  id: number
  src: string
  thumb: string
  alt: string
  rowSpan: string
}

function cloudSrc(pid: string, w: number) {
  return `https://res.cloudinary.com/decirk3zb/image/upload/q_auto:best,f_auto,w_${w}/${pid}`
}

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

const shimmerSvg = `<svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="400" fill="#F5EDE3"/>
  <rect width="400" height="400" fill="url(#g)">
    <animate attributeName="x" from="-400" to="400" dur="1.8s" repeatCount="indefinite"/>
  </rect>
  <defs>
    <linearGradient id="g" x1="0" x2="1">
      <stop offset="0%" stop-color="#F5EDE3"/>
      <stop offset="50%" stop-color="#EDE0D4"/>
      <stop offset="100%" stop-color="#F5EDE3"/>
    </linearGradient>
  </defs>
</svg>`

const IMAGES: GalleryImage[] = [
  { id: 1, alt: 'רגע מושלם',      rowSpan: 'row-span-2', pid: 'v1771444682/11_rvbqqs' },
  { id: 2, alt: 'הכנות לחתונה',  rowSpan: 'row-span-1', pid: 'v1771444678/10_uz5fhm' },
  { id: 3, alt: 'פרטי יופי',      rowSpan: 'row-span-1', pid: 'v1771444674/9_c3ekey'  },
  { id: 4, alt: 'אווירת קסם',     rowSpan: 'row-span-2', pid: 'v1771444671/8_oaoxjm'  },
  { id: 5, alt: 'שמחת הכלה',     rowSpan: 'row-span-1', pid: 'v1771444653/3_ppnjsc'  },
  { id: 6, alt: 'רגעים של אהבה', rowSpan: 'row-span-2', pid: 'v1771444664/6_wnpgt7'  },
  { id: 7, alt: 'הכנת הכלה',     rowSpan: 'row-span-1', pid: 'v1771444651/2_urkpep'  },
].map(img => ({
  ...img,
  src:   cloudSrc((img as any).pid, 1600),
  thumb: cloudSrc((img as any).pid, 600),
}))

export default function LuxuryGallery() {
  const [selected, setSelected] = useState<number | null>(null)

  const current = selected !== null ? IMAGES.find(g => g.id === selected) ?? null : null
  const currentIdx = selected !== null ? IMAGES.findIndex(g => g.id === selected) : -1

  const navigate = useCallback((dir: 1 | -1) => {
    if (selected === null) return
    const next = (currentIdx + dir + IMAGES.length) % IMAGES.length
    setSelected(IMAGES[next].id)
  }, [selected, currentIdx])

  useEffect(() => {
    if (selected === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  navigate(1)
      if (e.key === 'ArrowRight') navigate(-1)
      if (e.key === 'Escape')     setSelected(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected, navigate])

  useEffect(() => {
    document.body.style.overflow = selected !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  const blurUrl = `data:image/svg+xml;base64,${toBase64(shimmerSvg)}`

  return (
    <>
      {/* ── Grid ── */}
      <div
        className="
          grid grid-cols-2 md:grid-cols-3
          grid-rows-[repeat(6,160px)] md:grid-rows-[repeat(5,190px)]
          gap-3 md:gap-4
        "
      >
        {IMAGES.map((img, i) => (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setSelected(img.id)}
            className={`
              group relative cursor-pointer overflow-hidden rounded-2xl bg-[#EDE0D4]
              ${img.rowSpan}
              ${i === 0 ? 'col-span-2 md:col-span-1' : ''}
            `}
          >
            {/* Gold border hover */}
            <div className="absolute inset-0 z-10 rounded-2xl ring-1 ring-[#C9A86A]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <Image
              src={img.thumb}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              placeholder="blur"
              blurDataURL={blurUrl}
            />

            {/* Overlay */}
            <div className="
              absolute inset-0 z-10
              bg-gradient-to-t from-[#2C241A]/65 via-transparent to-transparent
              opacity-0 group-hover:opacity-100 transition-all duration-500
              flex items-end p-4 md:p-5
            ">
              <span className="
                font-cormorant text-white text-lg font-light
                translate-y-3 group-hover:translate-y-0 transition-transform duration-500
              ">{img.alt}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {current && (
          <motion.div
            key="lb"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[300] bg-[#0D0A07]/93 backdrop-blur-md flex items-center justify-center"
          >
            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all"
              aria-label="סגור"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-white/75 text-xs tracking-widest">
              {currentIdx + 1} / {IMAGES.length}
            </div>

            {/* Nav — RTL aware */}
            <button
              onClick={e => { e.stopPropagation(); navigate(-1) }}
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-[#C9A86A]/80 border border-white/20 flex items-center justify-center transition-all duration-300"
              aria-label="הקודם"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={e => { e.stopPropagation(); navigate(1) }}
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-[#C9A86A]/80 border border-white/20 flex items-center justify-center transition-all duration-300"
              aria-label="הבא"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            {/* Image */}
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              className="relative w-[88vw] h-[78vh] md:w-[72vw] md:h-[84vh] max-w-4xl rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.65)]"
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="85vw"
                className="object-contain"
                priority
                placeholder="blur"
                blurDataURL={blurUrl}
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/55 to-transparent p-6 text-center">
                <span className="font-cormorant text-white/90 text-xl font-light tracking-wide">{current.alt}</span>
              </div>
            </motion.div>

            {/* Thumbnail strip */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] pb-1">
              {IMAGES.map((img) => (
                <button
                  key={img.id}
                  onClick={e => { e.stopPropagation(); setSelected(img.id) }}
                  className={`relative flex-shrink-0 w-11 h-11 rounded-lg overflow-hidden border-2 transition-all duration-200
                    ${img.id === current.id ? 'border-[#C9A86A] opacity-100 scale-110' : 'border-transparent opacity-45 hover:opacity-70'}`}
                >
                  <Image src={img.thumb} alt={img.alt} fill sizes="44px" className="object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
