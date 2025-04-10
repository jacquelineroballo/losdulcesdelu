"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface FadeInProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right" | "scale" | "none"
  delay?: number
  duration?: number
  className?: string
  threshold?: number
  once?: boolean
}

interface StaggerChildrenProps {
  children: React.ReactNode
  staggerDelay?: number
  duration?: number
  className?: string
  threshold?: number
  once?: boolean
}

interface StaggerItemProps {
  children: React.ReactNode
  direction?: "up" | "down" | "left" | "right" | "scale" | "none"
  duration?: number
  className?: string
}

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className = "",
  threshold = 0.1,
  once = true,
}: FadeInProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once, threshold })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [isInView, controls, once])

  const getVariants = () => {
    switch (direction) {
      case "up":
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }
      case "down":
        return {
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0 },
        }
      case "left":
        return {
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0 },
        }
      case "right":
        return {
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        }
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
        }
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={getVariants()}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerChildren({
  children,
  staggerDelay = 0.1,
  duration = 0.5,
  className = "",
  threshold = 0.1,
  once = true,
}: StaggerChildrenProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once, threshold })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [isInView, controls, once])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, direction = "up", duration = 0.5, className = "" }: StaggerItemProps) {
  const getVariants = () => {
    switch (direction) {
      case "up":
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }
      case "down":
        return {
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0 },
        }
      case "left":
        return {
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0 },
        }
      case "right":
        return {
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        }
      case "scale":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 },
        }
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
        }
    }
  }

  return (
    <motion.div variants={getVariants()} transition={{ duration, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  )
}
