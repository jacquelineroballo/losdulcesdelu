"use client"

import { useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Medal, Check } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ParticlesBackground } from "@/components/particles-background"
import { AnimatedBackground } from "@/components/animated-background"
import { ParallaxSection } from "@/components/parallax-section"
import { Card3D } from "@/components/3d-card"
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/scroll-animations"

export default function AboutPage() {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <AnimatedBackground variant="default" />

        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2,
                }}
                className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center"
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
                  🧁
                </motion.div>
              </motion.div>

              <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
                Sobre <span className="font-display gradient-text">Los dulces de Lu</span>
              </h1>

              <p className="text-xl text-muted-foreground">
                Nuestra pasión es crear momentos dulces que se conviertan en recuerdos inolvidables
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button className="btn-fancy">
                  <span className="mr-2">Nuestra Historia</span>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Heart className="h-5 w-5" />
                  </motion.div>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
              className="relative"
            >
              <Card3D className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Nuestro equipo de pastelería"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                <motion.div
                  className="absolute bottom-6 right-6 glass p-4 rounded-lg max-w-[200px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <p className="text-sm">"Cada pastel cuenta una historia y crea un recuerdo inolvidable"</p>
                  <p className="text-xs mt-2 font-medium">— Lucía, Fundadora</p>
                </motion.div>
              </Card3D>

              <motion.div
                className="absolute -bottom-6 -left-6 w-24 h-24"
                initial={{ opacity: 0, scale: 0, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <Image
                  src="/placeholder.svg?height=100&width=100"
                  alt="Decoración"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section ref={targetRef} className="py-20 relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="space-y-6">
              <FadeIn>
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm">
                  <span className="gradient-text font-bold">Nuestra Historia</span>
                </div>
              </FadeIn>

              <FadeIn delay={0.1}>
                <h2 className="text-4xl font-bold tracking-tighter">
                  Pasión por la <span className="gradient-text">Pastelería Creativa</span>
                </h2>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="text-muted-foreground text-lg">
                  Los dulces de Lu nació de la pasión por la repostería de Lucía, quien comenzó horneando para su
                  familia y amigos. Lo que empezó como un hobby se convirtió en un emprendimiento al ver la alegría que
                  sus creaciones traían a las personas. Hoy, nuestro equipo sigue creciendo, manteniendo la misma
                  dedicación y amor por cada detalle.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="text-muted-foreground text-lg">
                  Nos especializamos en diseños personalizados, adaptándonos a las necesidades de cada cliente y
                  ocasión. Utilizamos ingredientes seleccionados cuidadosamente para garantizar no solo la belleza, sino
                  también el sabor inigualable de nuestros productos.
                </p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Button className="flex items-center gap-2 btn-fancy">
                    <Heart className="h-5 w-5" /> Nuestra Filosofía
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 border-animated">
                    <Medal className="h-5 w-5" /> Nuestros Logros
                  </Button>
                </div>
              </FadeIn>
            </div>

            <motion.div style={{ scale, opacity }} className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Card3D key={i} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-square">
                      <Image
                        src={`/placeholder.svg?height=400&width=400&text=Imagen ${i}`}
                        alt={`Imagen ${i}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </CardContent>
                </Card3D>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nuestro Equipo */}
      <ParallaxSection bgImage="/placeholder.svg?height=1000&width=2000" className="py-20" speed={0.3}>
        <div className="container px-4 md:px-6">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <h2 className="text-4xl font-bold tracking-tighter text-white">
                Nuestro <span className="font-display">Equipo</span>
              </h2>
              <p className="text-xl text-white/80">Conoce a las personas detrás de las maravillosas creaciones</p>
            </div>
          </FadeIn>

          <StaggerChildren className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Lucía González",
                role: "Fundadora y Pastelera Principal",
                bio: "Con más de 10 años de experiencia, Lucía combina técnicas tradicionales con innovación.",
              },
              {
                name: "Carlos Martínez",
                role: "Chef Pastelero",
                bio: "Especialista en sabores únicos y combinaciones que sorprenden a todos nuestros clientes.",
              },
              {
                name: "Ana Rodríguez",
                role: "Diseñadora de Pasteles",
                bio: "Artista con habilidades excepcionales para convertir ideas en creaciones visuales impresionantes.",
              },
            ].map((member, index) => (
              <StaggerItem key={index} direction="up">
                <Card3D className="h-full">
                  <Card className="overflow-hidden h-full glass-dark border-0">
                    <CardContent className="p-8 text-center">
                      <div className="relative h-40 w-40 mx-auto rounded-full overflow-hidden mb-6">
                        <Image
                          src="/placeholder.svg?height=300&width=300"
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                      <p className="text-sm text-primary mb-4">{member.role}</p>
                      <p className="text-white/80">{member.bio}</p>
                      <div className="mt-6 flex justify-center space-x-3">
                        <motion.a
                          href="#"
                          className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors duration-300"
                          whileHover={{ y: -3, scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <span className="sr-only">Instagram</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                          </svg>
                        </motion.a>
                        <motion.a
                          href="#"
                          className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary hover:text-white transition-colors duration-300"
                          whileHover={{ y: -3, scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <span className="sr-only">LinkedIn</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect width="4" height="12" x="2" y="9" />
                            <circle cx="4" cy="4" r="2" />
                          </svg>
                        </motion.a>
                      </div>
                    </CardContent>
                  </Card>
                </Card3D>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </ParallaxSection>

      {/* Valores */}
      <section className="py-20 relative overflow-hidden">
        <ParticlesBackground variant="default" />

        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            <FadeIn direction="left">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold tracking-tighter gradient-text">Valores que nos definen</h2>
                <p className="text-xl text-muted-foreground">
                  Cada dulce que creamos está impregnado de estos valores que nos hacen únicos
                </p>
                <ul className="space-y-6 mt-8">
                  {[
                    {
                      title: "Calidad sin compromisos",
                      description:
                        "Seleccionamos los mejores ingredientes y cuidamos cada detalle en nuestros procesos.",
                    },
                    {
                      title: "Creatividad e innovación",
                      description: "Nos desafiamos constantemente para crear diseños únicos y sorprendentes.",
                    },
                    {
                      title: "Personalización",
                      description:
                        "Cada cliente es único, y adaptamos nuestras creaciones a sus necesidades específicas.",
                    },
                    {
                      title: "Pasión",
                      description: "Amamos lo que hacemos, y esa pasión se refleja en cada una de nuestras creaciones.",
                    },
                  ].map((value, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <motion.div
                        className="rounded-full bg-primary/10 p-2 mt-1"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Check className="h-5 w-5 text-primary" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold">{value.title}</h3>
                        <p className="text-muted-foreground mt-1">{value.description}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <Card3D className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Nuestro taller de pastelería"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="h-20 w-20 bg-primary/80 rounded-full flex items-center justify-center cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </motion.div>
                </motion.div>
              </Card3D>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-accent to-background relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 20 + 5}px`,
                height: `${Math.random() * 20 + 5}px`,
                backgroundColor: `rgba(225, 29, 72, ${Math.random() * 0.3 + 0.1})`,
                animation: `float ${Math.random() * 5 + 5}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="container px-4 md:px-6 text-center relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-4xl font-bold tracking-tighter gradient-text font-display">
                ¿Listo para vivir la experiencia Los dulces de Lu?
              </h2>
              <p className="text-xl text-muted-foreground">
                Ponte en contacto con nosotros y haz realidad tus ideas más dulces
              </p>
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
