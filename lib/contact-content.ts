export type ContactContent = {
  heroTitle: string
  heroDescription: string
  email: string
  phone: string
  address: string
  hours: string
  instagram: string
  facebook: string
  twitter: string
}

export const defaultContactContent: ContactContent = {
  heroTitle: "Contáctanos",
  heroDescription: "Estamos aquí para ayudarte a hacer realidad tus ideas más dulces",
  email: "info@losdulcesdelu.com",
  phone: "(+54) 11 1234 5678",
  address: "Av. Pastelería 123, Ciudad Dulce, Argentina",
  hours: "Lunes a Viernes: 9:00 - 18:00\nSábados: 10:00 - 15:00",
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  twitter: "https://twitter.com/",
}

export function normalizeContactContent(value: Partial<ContactContent> | null | undefined): ContactContent {
  return { ...defaultContactContent, ...value }
}
