"use client"

import type React from "react"

import { z } from "zod"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Phone, MapPin, Clock, CheckCircle2, Send } from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"
import { Card3D } from "@/components/3d-card"
import { FadeIn, StaggerChildren, StaggerItem } from "@/components/scroll-animations"

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor ingresa un email válido." }),
  phone: z.string().min(8, { message: "Por favor ingresa un número de teléfono válido." }),
  eventType: z.string({ required_error: "Por favor selecciona un tipo de evento." }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
})

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: React.MouseEvent<Element, MouseEvent> | MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventType: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Simular envío de formulario
    setTimeout(() => {
      setIsSubmitted(true)
      console.log(values)
    }, 1000)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <AnimatedBackground variant="bubbles" />

        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }}
              className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto"
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
                📨
              </motion.div>
            </motion.div>

            <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl gradient-text font-display">Contáctanos</h1>

            <p className="text-xl text-muted-foreground">
              Estamos aquí para ayudarte a hacer realidad tus ideas más dulces
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 relative">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="grid gap-10 md:grid-cols-2 items-start">
            <FadeIn direction="left">
              <Card3D>
                <Card className="overflow-hidden border-2 border-primary/20">
                  <CardHeader className="bg-primary/5 border-b border-primary/10">
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-primary" />
                      Información de Contacto
                    </CardTitle>
                    <CardDescription>
                      Contáctanos a través de los siguientes medios o completa el formulario
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-8">
                    <StaggerChildren staggerDelay={0.1}>
                      {[
                        {
                          icon: <Mail className="h-6 w-6 text-primary" />,
                          title: "Email",
                          content: "info@losdulcesdelu.com",
                          action: "mailto:info@losdulcesdelu.com",
                        },
                        {
                          icon: <Phone className="h-6 w-6 text-primary" />,
                          title: "Teléfono",
                          content: "(+54) 11 1234 5678",
                          action: "tel:+5411123456789",
                        },
                        {
                          icon: <MapPin className="h-6 w-6 text-primary" />,
                          title: "Dirección",
                          content: "Av. Pastelería 123, Ciudad Dulce, Argentina",
                          action: "https://maps.google.com",
                        },
                        {
                          icon: <Clock className="h-6 w-6 text-primary" />,
                          title: "Horario de Atención",
                          content: "Lunes a Viernes: 9:00 - 18:00\nSábados: 10:00 - 15:00",
                        },
                      ].map((item, index) => (
                        <StaggerItem key={index} direction="left">
                          <motion.div className="flex items-start gap-4 group" whileHover={{ x: 5 }}>
                            <motion.div
                              className="rounded-full bg-primary/10 p-3"
                              whileHover={{ rotate: 10, scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              {item.icon}
                            </motion.div>
                            <div>
                              <h3 className="font-bold text-lg">{item.title}</h3>
                              {item.content.split("\n").map((line, i) => (
                                <p key={i} className="text-muted-foreground">
                                  {line}
                                </p>
                              ))}
                              {item.action && (
                                <motion.a
                                  href={item.action}
                                  className="text-primary text-sm mt-1 inline-block opacity-0 group-hover:opacity-100 transition-opacity"
                                  whileHover={{ x: 2 }}
                                >
                                  Contactar →
                                </motion.a>
                              )}
                            </div>
                          </motion.div>
                        </StaggerItem>
                      ))}
                    </StaggerChildren>

                    <div className="pt-6 border-t">
                      <h3 className="font-bold text-lg mb-4">Síguenos</h3>
                      <div className="flex space-x-4">
                        {["instagram", "facebook", "twitter"].map((social) => (
                          <motion.a
                            key={social}
                            href={`https://${social}.com`}
                            className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300"
                            whileHover={{ y: -5, scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            {social === "instagram" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
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
                            )}
                            {social === "facebook" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                              </svg>
                            )}
                            {social === "twitter" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                              </svg>
                            )}
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Card3D>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <div>
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                      className="bg-primary-50 p-10 rounded-lg text-center"
                    >
                      <motion.div
                        className="flex justify-center mb-6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: 0.2,
                        }}
                      >
                        <div className="relative">
                          <CheckCircle2 className="h-20 w-20 text-green-500" />
                          <motion.div
                            className="absolute -top-2 -right-2"
                            animate={{
                              scale: [1, 1.2, 1],
                              rotate: [0, 10, -10, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "reverse",
                            }}
                          >
                            ✨
                          </motion.div>
                        </div>
                      </motion.div>
                      <motion.h2
                        className="text-3xl font-bold mb-4 gradient-text"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        ¡Mensaje Enviado!
                      </motion.h2>
                      <motion.p
                        className="text-lg text-muted-foreground mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        Gracias por contactarnos. Nos pondremos en contacto contigo lo antes posible.
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <Button onClick={() => setIsSubmitted(false)} className="btn-fancy" size="lg">
                          Enviar otro mensaje
                        </Button>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card3D>
                        <Card className="border-2 border-primary/20">
                          <CardHeader className="bg-primary/5 border-b border-primary/10">
                            <CardTitle className="flex items-center gap-2">
                              <Send className="h-5 w-5 text-primary" />
                              Envíanos un mensaje
                            </CardTitle>
                            <CardDescription>
                              Completa el formulario a continuación y te responderemos a la brevedad
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="p-6">
                            <Form {...form}>
                              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                  control={form.control}
                                  name="name"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Nombre completo</FormLabel>
                                      <FormControl>
                                        <div className="relative">
                                          <Input
                                            placeholder="Tu nombre"
                                            {...field}
                                            className="pl-10 py-6 border-2 focus:border-primary transition-colors"
                                          />
                                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                            👤
                                          </div>
                                        </div>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <div className="grid gap-6 md:grid-cols-2">
                                  <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                          <div className="relative">
                                            <Input
                                              placeholder="tu@email.com"
                                              {...field}
                                              className="pl-10 py-6 border-2 focus:border-primary transition-colors"
                                            />
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                              ✉️
                                            </div>
                                          </div>
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Teléfono</FormLabel>
                                        <FormControl>
                                          <div className="relative">
                                            <Input
                                              placeholder="Tu número de teléfono"
                                              {...field}
                                              className="pl-10 py-6 border-2 focus:border-primary transition-colors"
                                            />
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                              📞
                                            </div>
                                          </div>
                                        </FormControl>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />
                                </div>
                                <FormField
                                  control={form.control}
                                  name="eventType"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Tipo de evento</FormLabel>
                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                          <div className="relative">
                                            <SelectTrigger className="pl-10 py-6 border-2 focus:border-primary transition-colors">
                                              <SelectValue placeholder="Selecciona el tipo de evento" />
                                            </SelectTrigger>
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                              🎂
                                            </div>
                                          </div>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem value="birthday">Cumpleaños</SelectItem>
                                          <SelectItem value="wedding">Boda</SelectItem>
                                          <SelectItem value="anniversary">Aniversario</SelectItem>
                                          <SelectItem value="corporate">Evento Corporativo</SelectItem>
                                          <SelectItem value="other">Otro</SelectItem>
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="message"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Mensaje</FormLabel>
                                      <FormControl>
                                        <div className="relative">
                                          <Textarea
                                            placeholder="Cuéntanos sobre tu evento y qué tipo de pastel te gustaría..."
                                            className="min-h-[120px] pl-10 pt-10 border-2 focus:border-primary transition-colors"
                                            {...field}
                                          />
                                          <div className="absolute left-3 top-8 text-muted-foreground">💬</div>
                                        </div>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                  <Button type="submit" className="w-full py-6 text-lg btn-fancy">
                                    <span className="mr-2">Enviar Mensaje</span>
                                    <motion.div
                                      animate={{
                                        x: [0, 5, 0],
                                      }}
                                      transition={{
                                        duration: 1,
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatType: "reverse",
                                      }}
                                    >
                                      <Send className="h-5 w-5" />
                                    </motion.div>
                                  </Button>
                                </motion.div>
                              </form>
                            </Form>
                          </CardContent>
                        </Card>
                      </Card3D>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-background relative overflow-hidden">
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
            <div className="max-w-3xl mx-auto space-y-4 mb-16">
              <h2 className="text-4xl font-bold tracking-tighter gradient-text font-display">Preguntas Frecuentes</h2>
              <p className="text-xl text-muted-foreground">
                Consulta algunas de las preguntas más comunes que recibimos
              </p>
            </div>
          </FadeIn>

          <StaggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                question: "¿Con cuánta anticipación debo realizar mi pedido?",
                answer:
                  "Recomendamos realizar el pedido con al menos 1 semana de anticipación para garantizar disponibilidad.",
              },
              {
                question: "¿Hacen entregas a domicilio?",
                answer:
                  "Sí, contamos con servicio de entrega dentro de la ciudad y alrededores. El costo varía según la distancia.",
              },
              {
                question: "¿Tienen opciones para personas con restricciones alimentarias?",
                answer:
                  "Ofrecemos opciones sin gluten, sin lácteos y bajas en azúcar. Consulta por opciones específicas.",
              },
              {
                question: "¿Cuáles son las formas de pago aceptadas?",
                answer:
                  "Aceptamos efectivo, transferencias bancarias, tarjetas de crédito/débito y pagos a través de aplicaciones móviles.",
              },
              {
                question: "¿Puedo solicitar una degustación antes de hacer un pedido grande?",
                answer:
                  "Sí, ofrecemos degustaciones para pedidos de eventos especiales como bodas o grandes celebraciones.",
              },
              {
                question: "¿Realizan tortas temáticas para niños?",
                answer:
                  "¡Por supuesto! Nos especializamos en tortas temáticas para todas las edades y personajes favoritos.",
              },
            ].map((faq, index) => (
              <StaggerItem key={index} direction="up">
                <Card3D className="h-full">
                  <Card className="h-full border-2 hover:border-primary transition-colors duration-300">
                    <CardContent className="p-6 h-full">
                      <motion.h3
                        className="text-xl font-bold mb-3 gradient-text"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {faq.question}
                      </motion.h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </Card3D>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </>
  )
}
