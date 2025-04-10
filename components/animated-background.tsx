"use client"

import { useEffect, useRef } from "react"

interface Bubble {
  x: number
  y: number
  radius: number
  color: string
  speedX: number
  speedY: number
  opacity: number
}

interface Particle {
  x: number
  y: number
  size: number
  color: string
  shape: string
  speedX: number
  speedY: number
  rotation: number
  rotationSpeed: number
}

interface AnimatedBackgroundProps {
  variant?: "default" | "bubbles" | "waves" | "confetti"
}

export function AnimatedBackground({ variant = "default" }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Ajustar el tamaño del canvas al tamaño de la ventana
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    let animationFrameId: number

    // Configuración según la variante
    if (variant === "bubbles") {
      const bubbles: Bubble[] = []
      const colors = ["#FDA4AF", "#FB7185", "#F43F5E", "#E11D48", "#9F1239"]

      // Crear burbujas
      for (let i = 0; i < 50; i++) {
        bubbles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 20 + 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
          opacity: Math.random() * 0.5 + 0.1,
        })
      }

      // Función de animación
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        bubbles.forEach((bubble) => {
          // Actualizar posición
          bubble.x += bubble.speedX
          bubble.y += bubble.speedY

          // Rebotar en los bordes
          if (bubble.x < 0 || bubble.x > canvas.width) bubble.speedX *= -1
          if (bubble.y < 0 || bubble.y > canvas.height) bubble.speedY *= -1

          // Dibujar burbuja
          ctx.beginPath()
          ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2)
          ctx.fillStyle =
            bubble.color +
            Math.floor(bubble.opacity * 255)
              .toString(16)
              .padStart(2, "0")
          ctx.fill()
        })

        animationFrameId = requestAnimationFrame(animate)
      }

      animate()
    } else if (variant === "waves") {
      let time = 0
      const waves = 3
      const colors = ["rgba(253, 164, 175, 0.2)", "rgba(251, 113, 133, 0.2)", "rgba(244, 63, 94, 0.2)"]

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        time += 0.01

        for (let i = 0; i < waves; i++) {
          const amplitude = 20 + i * 10
          const wavelength = 200 + i * 50
          const frequency = 0.02 - i * 0.005

          ctx.beginPath()
          ctx.moveTo(0, canvas.height / 2)

          for (let x = 0; x < canvas.width; x++) {
            const y = Math.sin(x * frequency + time) * amplitude + canvas.height / 2
            ctx.lineTo(x, y)
          }

          ctx.lineTo(canvas.width, canvas.height)
          ctx.lineTo(0, canvas.height)
          ctx.closePath()

          ctx.fillStyle = colors[i]
          ctx.fill()
        }

        animationFrameId = requestAnimationFrame(animate)
      }

      animate()
    } else if (variant === "confetti") {
      const particles: Particle[] = []
      const colors = ["#FDA4AF", "#FB7185", "#F43F5E", "#E11D48", "#9F1239"]
      const shapes = ["circle", "square", "triangle"]

      // Crear partículas
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 10 + 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 2 - 1,
        })
      }

      // Función de animación
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        particles.forEach((particle) => {
          // Actualizar posición
          particle.x += particle.speedX
          particle.y += particle.speedY
          particle.rotation += particle.rotationSpeed

          // Rebotar en los bordes
          if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
          if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

          // Dibujar partícula
          ctx.save()
          ctx.translate(particle.x, particle.y)
          ctx.rotate((particle.rotation * Math.PI) / 180)
          ctx.fillStyle = particle.color

          if (particle.shape === "circle") {
            ctx.beginPath()
            ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2)
            ctx.fill()
          } else if (particle.shape === "square") {
            ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
          } else if (particle.shape === "triangle") {
            ctx.beginPath()
            ctx.moveTo(0, -particle.size / 2)
            ctx.lineTo(particle.size / 2, particle.size / 2)
            ctx.lineTo(-particle.size / 2, particle.size / 2)
            ctx.closePath()
            ctx.fill()
          }

          ctx.restore()
        })

        animationFrameId = requestAnimationFrame(animate)
      }

      animate()
    } else {
      // Variante por defecto: gradiente animado
      let hue = 0

      const animate = () => {
        hue = (hue + 0.5) % 360

        // Crear gradiente
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        gradient.addColorStop(0, `hsl(${hue}, 100%, 90%)`)
        gradient.addColorStop(0.5, `hsl(${(hue + 60) % 360}, 100%, 80%)`)
        gradient.addColorStop(1, `hsl(${(hue + 120) % 360}, 100%, 90%)`)

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        animationFrameId = requestAnimationFrame(animate)
      }

      animate()
    }

    // Limpiar
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [variant])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />
}
