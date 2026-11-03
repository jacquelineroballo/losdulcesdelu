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
  { id: 1, title: "Torta Equina", description: "Torta de chocolate con relleno de frambuesas frescas y ganache", category: "customized", imageUrl: "/gallery/torta-equina.png", price: "Cotizar" },
  { id: 2, title: "Torta Casino", description: "Torta de casino con decoración de cartas y dados", category: "customized", imageUrl: "/gallery/torta-casino.png", price: "Cotizar" },
  { id: 3, title: "Torta Freefire", description: "Torta temática del juego Freefire con relleno de crema oreo y dulce de leche", category: "customized", imageUrl: "/gallery/torta-freefire.png", price: "Cotizar" },
  { id: 4, title: "Postre de Pascuas", description: "Postre especial de Pascuas con decoración temática y relleno a elección", category: "desserts", imageUrl: "/gallery/postre-pascuas.png", price: "$20.000" },
]

function validItems(items: GalleryItem[]) {
  return items.filter((item) => item.title.trim() && item.imageUrl.trim())
}

export function readGalleryItems() {
  if (typeof window === "undefined") return initialGalleryItems
  try {
    const stored = window.sessionStorage.getItem(GALLERY_STORAGE_KEY)
    return stored ? validItems(JSON.parse(stored) as GalleryItem[]) : initialGalleryItems
  } catch {
    return initialGalleryItems
  }
}

export async function loadGalleryItems() {
  try {
    const response = await fetch("/api/gallery", { cache: "no-store" })
    if (!response.ok) throw new Error("Gallery request failed")
    return validItems((await response.json()) as GalleryItem[])
  } catch {
    return readGalleryItems()
  }
}

export async function persistGalleryItems(items: GalleryItem[]) {
  const response = await fetch("/api/gallery", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validItems(items)),
  })
  if (!response.ok) throw new Error("No se pudo guardar la galería")
  return validItems(items)
}

export async function uploadGalleryImage(file: File) {
  const formData = new FormData()
  formData.append("file", file)
  const response = await fetch("/api/gallery/upload", { method: "POST", body: formData })
  const result = (await response.json()) as { url?: string; error?: string }
  if (!response.ok || !result.url) throw new Error(result.error || "No se pudo subir la imagen")
  return result.url
}

export function saveGalleryItems(items: GalleryItem[]) {
  if (typeof window === "undefined") return
  window.sessionStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(validItems(items)))
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
