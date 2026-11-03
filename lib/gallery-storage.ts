export type GalleryItem = {
  id: number
  title: string
  description: string
  category: string
  imageUrl: string
  price: string
}

export const GALLERY_STORAGE_KEY = "los-dulces-de-lu-gallery"

export const initialGalleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Torta Equina",
    description: "Torta de chocolate con relleno de frambuesas frescas y ganache",
    category: "customized",
    imageUrl: "/gallery/torta-equina.png",
    price: "Cotizar",
  },
  {
    id: 2,
    title: "Torta Casino",
    description: "Torta de casino con decoración de cartas y dados",
    category: "customized",
    imageUrl: "/gallery/torta-casino.png",
    price: "Cotizar",
  },
  {
    id: 3,
    title: "Torta Freefire",
    description: "Torta temática del juego Freefire con relleno de crema oreo y dulce de leche",
    category: "customized",
    imageUrl: "/gallery/torta-freefire.png",
    price: "Cotizar",
  },
  {
    id: 4,
    title: "Postre de Pascuas",
    description: "Postre especial de Pascuas con decoración temática y relleno a elección",
    category: "desserts",
    imageUrl: "/gallery/postre-pascuas.png",
    price: "$20.000",
  },
]

export function readGalleryItems() {
  if (typeof window === "undefined") return initialGalleryItems

  try {
    const storedItems = window.sessionStorage.getItem(GALLERY_STORAGE_KEY)
    if (!storedItems) return initialGalleryItems

    const parsedItems = JSON.parse(storedItems) as GalleryItem[]
    return parsedItems.filter((item) => item.title.trim() && item.imageUrl.trim())
  } catch {
    return initialGalleryItems
  }
}

export function saveGalleryItems(items: GalleryItem[]) {
  if (typeof window === "undefined") return
  window.sessionStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(items))
  window.dispatchEvent(new CustomEvent(GALLERY_STORAGE_KEY))
}

export function subscribeToGalleryItems(onChange: () => void) {
  window.addEventListener(GALLERY_STORAGE_KEY, onChange)
  window.addEventListener("storage", onChange)

  return () => {
    window.removeEventListener(GALLERY_STORAGE_KEY, onChange)
    window.removeEventListener("storage", onChange)
  }
}
