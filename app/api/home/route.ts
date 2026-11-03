import { list, put } from "@vercel/blob"
import { NextResponse } from "next/server"
import { defaultHomeContent, normalizeHomeContent, type HomeContent } from "@/lib/home-content"

const HOME_MANIFEST = "site/home.json"

async function readHomeContent(): Promise<HomeContent> {
  try {
    const { blobs } = await list({ prefix: HOME_MANIFEST })
    const manifest = blobs.find((blob) => blob.pathname === HOME_MANIFEST)
    if (!manifest) return defaultHomeContent
    const response = await fetch(manifest.url, { cache: "no-store" })
    if (!response.ok) return defaultHomeContent
    return normalizeHomeContent((await response.json()) as Partial<HomeContent>)
  } catch {
    return defaultHomeContent
  }
}

export async function GET() {
  return NextResponse.json(await readHomeContent())
}

export async function PUT(request: Request) {
  try {
    const content = normalizeHomeContent((await request.json()) as Partial<HomeContent>)
    const manifest = await put(HOME_MANIFEST, JSON.stringify(content), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    })
    return NextResponse.json({ content, url: manifest.url })
  } catch (error) {
    console.error("[v0] Home content save failed", error)
    return NextResponse.json({ error: "No se pudo guardar el contenido de inicio" }, { status: 500 })
  }
}
