'use client'

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface StatItemProps {
  value: number
  label: string
  suffix?: string
  prefix?: string
}

function StatItem({ value, label, suffix = '', prefix = '' }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100
  })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + Math.floor(latest).toLocaleString() + suffix
      }
    })
    return unsubscribe
  }, [springValue, prefix, suffix])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="font-cormorant text-5xl sm:text-6xl gradient-text font-bold mb-2" ref={ref}>
        0
      </div>
      <div className="text-[#666] font-light tracking-wide">{label}</div>
    </motion.div>
  )
}

export default function StatsCounter() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#F4E4E1]/20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <StatItem value={500} label="כלות מאושרות" suffix="+" />
          <StatItem value={100} label="אחוז שביעות רצון" suffix="%" />
          <StatItem value={5} label="שנות ניסיון" suffix="+" />
          <StatItem value={15} label="דירוג ממוצע" prefix="4." />
        </div>
      </div>
    </section>
  )
}
