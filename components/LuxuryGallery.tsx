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
  <defs>
    <linearGradient id="g" x1="0" x2="1">
      <stop offset="0%" stop-color="#F5EDE3"/>
      <stop offset="50%" stop-color="#EDE0D4"/>
      <stop offset="100%" stop-color="#F5EDE3"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#g)">
    <animate attributeName="x" from="-400" to="400" dur="1.8s" repeatCount="indefinite"/>
  </rect>
</svg>`

const IMAGES: GalleryImage[] = [
  { id: 1, alt: 'רגע מושלם',      rowSpan: 'row-span-2', pid: 'v1771444682/11_rvbqqs' },
  { id: 2, alt: 'הכנות לחתונה',   rowSpan: 'row-span-1', pid: 'v1771444678/10_uz5fhm' },
  { id: 3, alt: 'פרטי יופי',       rowSpan: 'row-span-1', pid: 'v1771444674/9_c3ekey'  },
  { id: 4, alt: 'אווירת קסם',      rowSpan: 'row-span-2', pid: 'v1771444671/8_oaoxjm'  },
  { id: 5, alt: 'שמחת הכלה',      rowSpan: 'row-span-1', pid: 'v1771444653/3_ppnjsc'  },
  { id: 6, alt: 'רגעים של אהבה',  rowSpan: 'row-span-2', pid: 'v1771444664/6_wnpgt7'  },
  { id: 7, alt: 'הכנת הכלה',      rowSpan: 'row-span-1', pid: 'v1771444651/2_urkpep'  },
].map(img => ({
  ...img,
  src:   cloudSrc((img as any).pid, 1600),
  thumb: cloudSrc((img as any).pid, 700),
}))

export default function LuxuryGallery() {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const current    = selectedId !== null ? IMAGES.find(g => g.id === selectedId) ?? null : null
  const currentIdx = selectedId !== null ? IMAGES.findIndex(g => g.id === selectedId) : -1

  const close = useCallback(() => setSelectedId(null), [])

  const navigate = useCallback((dir: 1 | -1) => {
    if (selectedId === null) return
    const next = (currentIdx + dir + IMAGES.length) % IMAGES.length
    setSelectedId(IMAGES[next].id)
  }, [selectedId, currentIdx])

  useEffect(() => {
    if (selectedId === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  navigate(1)
      if (e.key === 'ArrowRight') navigate(-1)
      if (e.key === 'Escape')     close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedId, navigate, close])

  useEffect(() => {
    document.body.style.overflow = selectedId !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedId])

  const blurUrl = `data:image/svg+xml;base64,${toBase64(shimmerSvg)}`

  return (
    <>
      {/* ── Grid ── */}
      <div className="
        grid grid-cols-2 md:grid-cols-3
        grid-rows-[repeat(6,160px)] md:grid-rows-[repeat(5,190px)]
        gap-3 md:gap-4
      ">
        {IMAGES.map((img, i) => (
          <motion.div
            key={img.id}
            layoutId={`gallery-img-${img.id}`}
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => setSelectedId(img.id)}
            className={`
              group relative cursor-zoom-in overflow-hidden rounded-2xl bg-[#EDE0D4]
              ${img.rowSpan}
              ${i === 0 ? 'col-span-2 md:col-span-1' : ''}
            `}
          >
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
            <div className="
              absolute inset-0 z-10
              bg-gradient-to-t from-[#2C241A]/65 via-transparent to-transparent
              opacity-0 group-hover:opacity-100 transition-all duration-500
              flex items-end p-4 md:p-5
            ">
              <span className="font-cormorant text-white text-lg font-light translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                {img.alt}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {current && (
          <>
            {/* Backdrop — click to close */}
            <motion.div
              key="lb-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={close}
              className="fixed inset-0 z-[299] bg-[#0D0A07]/92 backdrop-blur-md cursor-zoom-out"
            />

            {/* Shared image — animates FROM grid position */}
            <motion.div
              key={`lb-frame-${current.id}`}
              layoutId={`gallery-img-${current.id}`}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[400] flex items-center justify-center pointer-events-none"
            >
              {/* Inner box: click image itself to close */}
              <motion.div
                className="relative rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.7)] cursor-zoom-out pointer-events-auto"
                style={{ width: 'min(88vw, 900px)', height: 'min(82vh, 700px)' }}
                onClick={close}
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  sizes="90vw"
                  className="object-contain"
                  priority
                  placeholder="blur"
                  blurDataURL={blurUrl}
                />
              </motion.div>
            </motion.div>

            {/* Controls — fade in after image settles */}
            <motion.div
              key="lb-controls"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.2 }}
              className="fixed inset-0 z-[401] pointer-events-none"
            >
              {/* Close button */}
              <button
                onClick={close}
                className="pointer-events-auto absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center transition-all duration-200"
                aria-label="סגור"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Counter */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-white/75 text-xs tracking-widest select-none">
                {currentIdx + 1} / {IMAGES.length}
              </div>

              {/* Prev (RTL: right = prev) */}
              <button
                onClick={() => navigate(-1)}
                className="pointer-events-auto absolute top-1/2 -translate-y-1/2 right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-[#C9A86A]/80 border border-white/20 flex items-center justify-center transition-all duration-300"
                aria-label="הקודם"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Next (RTL: left = next) */}
              <button
                onClick={() => navigate(1)}
                className="pointer-events-auto absolute top-1/2 -translate-y-1/2 left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-[#C9A86A]/80 border border-white/20 flex items-center justify-center transition-all duration-300"
                aria-label="הבא"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              {/* Caption */}
              <div className="absolute bottom-20 inset-x-0 text-center pointer-events-none select-none">
                <span className="font-cormorant text-white/85 text-xl font-light tracking-wide">
                  {current.alt}
                </span>
              </div>

              {/* Thumbnail strip */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] pb-1 pointer-events-auto">
                {IMAGES.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedId(img.id)}
                    className={`
                      relative flex-shrink-0 w-11 h-11 rounded-lg overflow-hidden border-2 transition-all duration-200
                      ${img.id === current.id
                        ? 'border-[#C9A86A] opacity-100 scale-110'
                        : 'border-transparent opacity-40 hover:opacity-70'}
                    `}
                  >
                    <Image src={img.thumb} alt={img.alt} fill sizes="44px" className="object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
