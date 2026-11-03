import { list, put } from "@vercel/blob"
import { NextResponse } from "next/server"
import { defaultAboutImages, normalizeAboutImages, type AboutImages } from "@/lib/about-images"

const MANIFEST = "site/about-images.json"

async function readImages(): Promise<AboutImages> {
  try {
    const { blobs } = await list({ prefix: MANIFEST })
    const manifest = blobs.find((blob) => blob.pathname === MANIFEST)
    if (!manifest) return defaultAboutImages
    const response = await fetch(manifest.url, { cache: "no-store" })
    return response.ok ? normalizeAboutImages((await response.json()) as Partial<AboutImages>) : defaultAboutImages
  } catch { return defaultAboutImages }
}

export async function GET() { return NextResponse.json(await readImages()) }

export async function PUT(request: Request) {
  try {
    const images = normalizeAboutImages((await request.json()) as Partial<AboutImages>)
    await put(MANIFEST, JSON.stringify(images), { access: "public", addRandomSuffix: false, allowOverwrite: true, contentType: "application/json" })
    return NextResponse.json(images)
  } catch (error) {
    console.error("[v0] About images save failed", error)
    return NextResponse.json({ error: "No se pudieron guardar las imágenes" }, { status: 500 })
  }
}
