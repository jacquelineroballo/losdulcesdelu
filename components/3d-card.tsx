"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"

interface Card3DProps {
  children: React.ReactNode
  className?: string
  intensity?: number
}

export function Card3D({ children, className = "", intensity = 15 }: Card3DProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    setMouseX(e.clientX - centerX)
    setMouseY(e.clientY - centerY)

    const rotateXValue = ((e.clientY - rect.top) / rect.height - 0.5) * intensity
    const rotateYValue = ((e.clientX - rect.left) / rect.width - 0.5) * intensity * -1

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setMouseX(0)
    setMouseY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative transform-gpu ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease",
      }}
    >
      <div className="relative z-10 h-full w-full">{children}</div>
      <div
        className="absolute inset-0 rounded-lg bg-white/5"
        style={{
          transform: "translateZ(-40px)",
          boxShadow: `
            ${mouseX / 25}px ${mouseY / 25}px 40px rgba(225, 29, 72, 0.1),
            ${mouseX / 15}px ${mouseY / 15}px 24px rgba(225, 29, 72, 0.1),
            inset -5px -5px 10px rgba(255, 255, 255, 0.05),
            inset 5px 5px 10px rgba(0, 0, 0, 0.05)
          `,
        }}
      />
    </motion.div>
  )
}
