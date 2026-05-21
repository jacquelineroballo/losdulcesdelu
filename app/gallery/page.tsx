"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Card3D } from "@/components/3d-card"
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/scroll-animations"

interface CakeItem {
  id: number
  title: string
  description: string
  category: string
  imageUrl: string
}

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<CakeItem | null>(null)
  const [filter, setFilter] = useState("all")
  const galleryRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start start", "end start"],
  })

  const headerY = useTransform(scrollYProgress, [0, 0.5], [0, -100])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const cakeItems: CakeItem[] = [
    {
      id: 1,
      title: "Torta de Chocolate y Frambuesas",
      description: "Deliciosa torta de chocolate con relleno de frambuesas frescas",
      category: "birthday",
      imageUrl: "/placeholder.svg?height=500&width=500",
    },
    {
      id: 2,
      title: "Cupcakes de Vainilla",
      description: "Cupcakes de vainilla con frosting de crema de mantequilla",
      category: "cupcakes",
      imageUrl: "/placeholder.svg?height=500&width=500",
    },
    {
      id: 3,
      title: "Torta de Boda Elegante",
      description: "Torta de tres pisos con decoración floral para bodas",
      category: "wedding",
      imageUrl: "/placeholder.svg?height=500&width=500",
    },
    {
      id: 4,
      title: "Torta de Cumpleaños de Unicornio",
      description: "Colorida torta temática de unicornio ideal para fiestas infantiles",
      category: "birthday",
      imageUrl: "/placeholder.svg?height=500&width=500",
    },
    {
      id: 5,
      title: "Cupcakes de Chocolate",
      description: "Cupcakes de chocolate con chips de chocolate y frosting de ganache",
      category: "cupcakes",
      imageUrl: "/placeholder.svg?height=500&width=500",
    },
    {
      id: 6,
      title: "Torta de Aniversario",
      description: "Elegante torta para celebrar aniversarios con decoración dorada",
      category: "wedding",
      imageUrl: "/placeholder.svg?height=500&width=500",
    },
    {
      id: 7,
      title: "Torta de Princesa",
      description: "Torta de cumpleaños con temática de princesa y castillo",
      category: "birthday",
      imageUrl: "/placeholder.svg?height=500&width=500",
    },
    {
      id: 8,
      title: "Cupcakes de Fresa",
      description: "Cupcakes de vainilla con frosting de fresa y decoraciones rosadas",
      category: "cupcakes",
      imageUrl: "/placeholder.svg?height=500&width=500",
    },
    {
      id: 9,
      title: "Torta de Compromiso",
      description: "Elegante torta para celebrar compromisos con detalles personalizados",
      category: "wedding",
      imageUrl: "/placeholder.svg?height=500&width=500",
    },
  ]

  // Filtrar los elementos según la categoría seleccionada
  const filteredItems = filter === "all" ? cakeItems : cakeItems.filter((item) => item.category === filter)

  // Función para manejar el cambio de filtro
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-pink-50 to-white">
        <div className="container px-4 md:px-6 text-center relative z-10">
          <motion.div style={{ y: headerY, opacity: headerOpacity }} className="max-w-3xl mx-auto space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }}
              className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              >
                🍰
              </motion.div>
            </motion.div>

            <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl gradient-text font-display">
              Nuestra Galería de Tortas
            </h1>

            <p className="text-muted-foreground text-xl">
              Explora nuestra colección de creaciones únicas y personalizadas para cada ocasión
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              {[
                { label: "Todas", value: "all" },
                { label: "Cumpleaños", value: "birthday" },
                { label: "Bodas", value: "wedding" },
                { label: "Cupcakes", value: "cupcakes" },
              ].map((category) => (
                <motion.div key={category.value} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant={filter === category.value ? "default" : "outline"}
                    className="rounded-full px-6 py-2 text-lg"
                    onClick={() => handleFilterChange(category.value)}
                  >
                    {category.label}
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Gallery Section */}
      <section ref={galleryRef} className="py-20 relative bg-white">
        <div className="container px-4 md:px-6">
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredItems.length > 0 ? (
                filteredItems.map((cake) => (
                  <StaggerItem key={cake.id} direction="up">
                    <Card3D className="h-full">
                      <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 h-full border-0">
                        <Dialog>
                          <DialogTrigger asChild>
                            <CardContent className="p-0 h-full" onClick={() => setSelectedImage(cake)}>
                              <div className="relative aspect-square overflow-hidden">
                                <Image
                                  src={cake.imageUrl || "/placeholder.svg"}
                                  alt={cake.title}
                                  fill
                                  className="object-cover transition-transform duration-700 hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                  <span className="text-white text-sm font-medium px-3 py-1 bg-primary/80 rounded-full w-fit mb-2">
                                    {cake.category === "birthday"
                                      ? "Cumpleaños"
                                      : cake.category === "wedding"
                                        ? "Bodas"
                                        : "Cupcakes"}
                                  </span>
                                  <h3 className="text-xl font-bold text-white">{cake.title}</h3>
                                  <p className="text-white/80 text-sm mt-1">{cake.description}</p>
                                </div>
                              </div>
                              <div className="p-6">
                                <h3 className="text-xl font-bold">{cake.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{cake.description}</p>
                              </div>
                            </CardContent>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-transparent border-0">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              className="bg-background rounded-lg overflow-hidden"
                            >
                              <div className="grid md:grid-cols-2 gap-0">
                                <div className="relative aspect-square w-full overflow-hidden">
                                  <Image
                                    src={cake.imageUrl || "/placeholder.svg"}
                                    alt={cake.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="p-8 flex flex-col">
                                  <DialogHeader className="mb-4">
                                    <DialogTitle className="text-2xl font-display gradient-text">
                                      {cake.title}
                                    </DialogTitle>
                                    <DialogDescription className="text-lg">{cake.description}</DialogDescription>
                                  </DialogHeader>

                                  <div className="flex flex-col gap-4 flex-grow">
                                    <div className="space-y-2">
                                      <h4 className="font-medium">Detalles:</h4>
                                      <ul className="space-y-1">
                                        <li className="flex items-center gap-2">
                                          <span className="h-2 w-2 bg-primary rounded-full"></span>
                                          <span>Sabores personalizables</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                          <span className="h-2 w-2 bg-primary rounded-full"></span>
                                          <span>Decoración artesanal</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                          <span className="h-2 w-2 bg-primary rounded-full"></span>
                                          <span>Ingredientes de alta calidad</span>
                                        </li>
                                      </ul>
                                    </div>

                                    <div className="space-y-2 mt-auto">
                                      <h4 className="font-medium">Perfecto para:</h4>
                                      <div className="flex flex-wrap gap-2">
                                        {cake.category === "birthday" && (
                                          <>
                                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                              Cumpleaños
                                            </span>
                                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                              Fiestas
                                            </span>
                                          </>
                                        )}
                                        {cake.category === "wedding" && (
                                          <>
                                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                              Bodas
                                            </span>
                                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                              Aniversarios
                                            </span>
                                          </>
                                        )}
                                        {cake.category === "cupcakes" && (
                                          <>
                                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                              Eventos
                                            </span>
                                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                              Regalos
                                            </span>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex justify-end gap-4 mt-6">
                                    <Button variant="outline" className="border-animated">
                                      Compartir
                                    </Button>
                                    <Button className="btn-fancy">Pedir Similar</Button>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </DialogContent>
                        </Dialog>
                      </Card>
                    </Card3D>
                  </StaggerItem>
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <div className="text-5xl mx-auto">🔍</div>
                    <h3 className="text-2xl font-bold">No se encontraron resultados</h3>
                    <p className="text-muted-foreground">No hay productos que coincidan con el filtro seleccionado.</p>
                    <Button onClick={() => setFilter("all")} className="mt-4">
                      Ver todos los productos
                    </Button>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </StaggerChildren>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-background relative overflow-hidden">
        <div className="container px-4 md:px-6 text-center relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-4xl font-bold tracking-tighter gradient-text font-display">
                ¿Quieres ver tu torta soñada en nuestra galería?
              </h2>
              <p className="text-xl text-muted-foreground">Contáctanos para hacer realidad tus ideas más dulces</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="mt-4 px-8 py-6 text-lg btn-fancy">
                  <a href="/contact">Contactar Ahora</a>
                </Button>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
