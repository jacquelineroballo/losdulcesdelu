export type SiteImages = {
  homeHero: string
}

export const defaultSiteImages: SiteImages = {
  homeHero: "/gallery/hero.png",
}

export function normalizeSiteImages(value: Partial<SiteImages> | null | undefined): SiteImages {
  return { ...defaultSiteImages, ...value }
}
