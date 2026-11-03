export type SiteImages = {
  homeHero: string
  specialtyBirthday: string
  specialtyCupcakes: string
  specialtyDesserts: string
}

export const defaultSiteImages: SiteImages = {
  homeHero: "/gallery/hero.png",
  specialtyBirthday: "/placeholder.svg?height=400&width=400",
  specialtyCupcakes: "/placeholder.svg?height=400&width=400",
  specialtyDesserts: "/placeholder.svg?height=400&width=400",
}

export function normalizeSiteImages(value: Partial<SiteImages> | null | undefined): SiteImages {
  return { ...defaultSiteImages, ...value }
}
