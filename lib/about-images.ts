export type TeamMember = {
  id: string
  name: string
  role: string
  bio: string
  image: string
}

export type AboutImages = {
  hero: string
  teamBackground: string
  workshop: string
  historyImages: string[]
  teamMembers: TeamMember[]
}

const placeholder = (height: number, width: number) => `/placeholder.svg?height=${height}&width=${width}`

export const defaultAboutImages: AboutImages = {
  hero: placeholder(600, 800),
  teamBackground: placeholder(1000, 2000),
  workshop: placeholder(600, 800),
  historyImages: [
    "/gallery/torta-casino.png",
    "/gallery/torta-equina.png",
    "/gallery/postre-pascuas.png",
    "/gallery/candybar-bautismo.png",
  ],
  teamMembers: [
    { id: "luciana-roballo", name: "Luciana Roballo", role: "Fundadora y Pastelera Principal", bio: "Con más de 15 años de experiencia, Luciana combina técnicas tradicionales con innovación.", image: placeholder(300, 300) },
    { id: "cristian-pilla", name: "Cristian Pilla", role: "Administrador", bio: "Se encarga de la gestión y entrega de pedidos de los clientes.", image: placeholder(300, 300) },
  ],
}

export function normalizeAboutImages(value: Partial<AboutImages> | null | undefined): AboutImages {
  return {
    ...defaultAboutImages,
    ...value,
    historyImages: value?.historyImages?.length ? value.historyImages : defaultAboutImages.historyImages,
    teamMembers: value?.teamMembers?.length ? value.teamMembers : defaultAboutImages.teamMembers,
  }
}
