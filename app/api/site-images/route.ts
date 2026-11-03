import { list, put } from "@vercel/blob"
import { NextResponse } from "next/server"
import { defaultSiteImages, normalizeSiteImages, type SiteImages } from "@/lib/site-images"

const MANIFEST = "site/images.json"

async function readImages(): Promise<SiteImages> {
  try {
    const { blobs } = await list({ prefix: MANIFEST })
    const manifest = blobs.find((blob) => blob.pathname === MANIFEST)
    if (!manifest) return defaultSiteImages
    const response = await fetch(manifest.url, { cache: "no-store" })
    return response.ok ? normalizeSiteImages((await response.json()) as Partial<SiteImages>) : defaultSiteImages
  } catch {
    return defaultSiteImages
  }
}

export async function GET() {
  return NextResponse.json(await readImages())
}

export async function PUT(request: Request) {
  try {
    const images = normalizeSiteImages((await request.json()) as Partial<SiteImages>)
    await put(MANIFEST, JSON.stringify(images), { access: "public", addRandomSuffix: false, allowOverwrite: true, contentType: "application/json" })
    return NextResponse.json(images)
  } catch (error) {
    console.error("[v0] Site images save failed", error)
    return NextResponse.json({ error: "No se pudieron guardar las imágenes" }, { status: 500 })
  }
}
