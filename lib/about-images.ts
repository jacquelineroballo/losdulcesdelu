export type AboutImages = {
  hero: string
  teamBackground: string
  workshop: string
}

export const defaultAboutImages: AboutImages = {
  hero: "/placeholder.svg?height=600&width=800",
  teamBackground: "/placeholder.svg?height=1000&width=2000",
  workshop: "/placeholder.svg?height=600&width=800",
}

export function normalizeAboutImages(value: Partial<AboutImages> | null | undefined): AboutImages {
  return { ...defaultAboutImages, ...value }
}
