"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface ParallaxSectionProps {
  children: React.ReactNode
  bgImage?: string
  speed?: number
  className?: string
  overlayColor?: string
}

export function ParallaxSection({
  children,
  bgImage = "",
  speed = 0.5,
  className = "",
  overlayColor = "rgba(0, 0, 0, 0.4)",
}: ParallaxSectionProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6])

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {bgImage && (
        <motion.div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${bgImage})`,
            y,
            scale: 1.2,
          }}
        />
      )}
      <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: overlayColor }} />
      <motion.div className="relative z-10" style={{ opacity }}>
        {children}
      </motion.div>
    </motion.div>
  )
}
