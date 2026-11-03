import { list, put } from "@vercel/blob"
import { NextResponse } from "next/server"
import { initialGalleryItems, type GalleryItem } from "@/lib/gallery-storage"

const GALLERY_MANIFEST = "gallery/gallery.json"

async function readManifest(): Promise<GalleryItem[]> {
  try {
    const { blobs } = await list({ prefix: GALLERY_MANIFEST })
    const manifest = blobs.find((blob) => blob.pathname === GALLERY_MANIFEST)
    if (!manifest) return initialGalleryItems
    const response = await fetch(manifest.url, { cache: "no-store" })
    if (!response.ok) return initialGalleryItems
    const items = (await response.json()) as GalleryItem[]
    return items.filter((item) => item.title?.trim() && item.imageUrl?.trim())
  } catch {
    return initialGalleryItems
  }
}

export async function GET() {
  return NextResponse.json(await readManifest())
}

export async function PUT(request: Request) {
  try {
    const items = (await request.json()) as GalleryItem[]
    const validItems = items.filter((item) => item.title?.trim() && item.imageUrl?.trim())

    const manifest = await put(GALLERY_MANIFEST, JSON.stringify(validItems), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    })

    return NextResponse.json({ items: validItems, url: manifest.url })
  } catch (error) {
    console.error("[v0] Gallery manifest save failed", error)
    return NextResponse.json({ error: "No se pudo guardar la galería" }, { status: 500 })
  }
}
