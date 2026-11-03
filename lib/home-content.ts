export type HomeContent = {
  heroBadge: string
  heroTitle: string
  heroHighlight: string
  heroDescription: string
  primaryCta: string
  secondaryCta: string
  whyTitle: string
  whyDescription: string
  specialtiesTitle: string
  specialtiesDescription: string
  testimonialsTitle: string
  newsletterTitle: string
  newsletterDescription: string
}

export const defaultHomeContent: HomeContent = {
  heroBadge: "Pastelería Artesanal",
  heroTitle: "Delicias",
  heroHighlight: "Personalizadas para cada ocasión",
  heroDescription: "Transformamos ingredientes simples en obras de arte comestibles. Siempre con ese sabor único que te hace sentir en casa.",
  primaryCta: "Ver Galería",
  secondaryCta: "Contactar",
  whyTitle: "Por qué elegirnos",
  whyDescription: "En Los dulces de Lu, cada creación es única y especial, hecha con amor e ingredientes de calidad",
  specialtiesTitle: "Nuestras Especialidades",
  specialtiesDescription: "Descubre nuestra variedad de creaciones para cada momento especial",
  testimonialsTitle: "Testimonios de Clientes Satisfechos",
  newsletterTitle: "¿Listos para probar la magia?",
  newsletterDescription: "Da el primer paso hacia la satisfacción dulce: realiza tu pedido o suscríbete a nuestro boletín para recibir actualizaciones y promociones.",
}

export function normalizeHomeContent(value: Partial<HomeContent> | null | undefined): HomeContent {
  return { ...defaultHomeContent, ...value }
}
