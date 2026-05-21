"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Cake } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  }

  // Definir las rutas correctas para la navegación
  const navItems = [
    { name: "Inicio", path: "/" },
    { name: "Galería", path: "/gallery" },
    { name: "Nosotros", path: "/about" },
    { name: "Contacto", path: "/contact" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "glass py-2" : "bg-transparent py-4"}`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: -10, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="relative"
          >
            <Cake className="h-8 w-8 text-primary" />
            <motion.div
              className="absolute -top-1 -right-1 h-3 w-3 bg-secondary rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl font-display gradient-text"
          >
            Los dulces de Lu
          </motion.div>
        </Link>
        <motion.nav className="hidden md:flex gap-6" variants={navVariants} initial="hidden" animate="visible">
          {navItems.map((item) => (
            <motion.div key={item.name} variants={itemVariants}>
              <Link href={item.path} className="text-lg font-medium relative group">
                <span className="relative z-10">{item.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-1 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </motion.div>
          ))}
        </motion.nav>
        <div className="hidden md:flex gap-4">
          <Button asChild variant="default" className="btn-fancy">
            <Link href="/contact">
              <span className="relative z-10">Pedir Ahora</span>
            </Link>
          </Button>
        </div>
        <motion.button className="md:hidden relative" whileTap={{ scale: 0.9 }} onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
          <motion.div
            className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden glass"
          >
            <div className="container px-4 py-6 flex flex-col gap-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.path}
                    onClick={() => setIsOpen(false)}
                    className="py-2 text-xl font-medium block relative overflow-hidden group"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Button asChild className="w-full btn-fancy">
                  <Link href="/contact" onClick={() => setIsOpen(false)}>
                    Pedir Ahora
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
