export type HomeTestimonial = {
  text: string
  author: string
}

export type HomeSpecialty = {
  title: string
  description: string
  image: string
}

export type HomeContent = {
  eyebrow: string
  heroTitle: string
  heroHighlight: string
  heroDescription: string
  heroImage: string
  primaryCta: string
  secondaryCta: string
  whyTitle: string
  whyDescription: string
  specialtiesTitle: string
  specialtiesDescription: string
  testimonialsTitle: string
  testimonials: HomeTestimonial[]
  specialties: HomeSpecialty[]
}

export const initialHomeContent: HomeContent = {
  eyebrow: "Pastelería Artesanal",
  heroTitle: "Delicias",
  heroHighlight: "Personalizadas para cada ocasión",
  heroDescription: "Transformamos ingredientes simples en obras de arte comestibles. Siempre con ese sabor único que te hace sentir en casa.",
  heroImage: "/gallery/hero.png",
  primaryCta: "Ver Galería",
  secondaryCta: "Contactar",
  whyTitle: "Por qué elegirnos",
  whyDescription: "En Los dulces de Lu, cada creación es única y especial, hecha con amor e ingredientes de calidad",
  specialtiesTitle: "Nuestras Especialidades",
  specialtiesDescription: "Descubre nuestra variedad de creaciones para cada momento especial",
  testimonialsTitle: "Testimonios de Clientes Satisfechos",
  testimonials: [
    { text: "Increíble sabor y diseño. Todos en la fiesta quedaron encantados con la torta.", author: "María López" },
    { text: "Su atención es excelente y los detalles en las tortas son impresionantes.", author: "Carlos Gómez" },
    { text: "Siempre pido mis pasteles aquí. Nunca me han decepcionado.", author: "Ana Martínez" },
  ],
  specialties: [
    { title: "Tortas de Cumpleaños", description: "Diseños personalizados para celebrar tu día especial", image: "/gallery/torta-equina.png" },
    { title: "Cupcakes Decorados", description: "Pequeños bocados de felicidad decorados con creatividad", image: "/gallery/torta-casino.png" },
    { title: "Postres Especiales", description: "Creaciones exclusivas para eventos y momentos inolvidables", image: "/gallery/postre-pascuas.png" },
  ],
}

export function normalizeHomeContent(value: Partial<HomeContent>): HomeContent {
  return {
    ...initialHomeContent,
    ...value,
    testimonials: Array.isArray(value.testimonials) && value.testimonials.length > 0 ? value.testimonials : initialHomeContent.testimonials,
    specialties: Array.isArray(value.specialties) && value.specialties.length > 0 ? value.specialties : initialHomeContent.specialties,
  }
}
