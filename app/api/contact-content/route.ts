import { list, put } from "@vercel/blob"
import { NextResponse } from "next/server"
import { defaultContactContent, normalizeContactContent, type ContactContent } from "@/lib/contact-content"

const MANIFEST = "site/contact-content.json"

async function readContent(): Promise<ContactContent> {
  try {
    const { blobs } = await list({ prefix: MANIFEST })
    const manifest = blobs.find((blob) => blob.pathname === MANIFEST)
    if (!manifest) return defaultContactContent
    const response = await fetch(manifest.url, { cache: "no-store" })
    return response.ok ? normalizeContactContent((await response.json()) as Partial<ContactContent>) : defaultContactContent
  } catch { return defaultContactContent }
}

export async function GET() { return NextResponse.json(await readContent()) }

export async function PUT(request: Request) {
  try {
    const content = normalizeContactContent((await request.json()) as Partial<ContactContent>)
    await put(MANIFEST, JSON.stringify(content), { access: "public", addRandomSuffix: false, allowOverwrite: true, contentType: "application/json" })
    return NextResponse.json(content)
  } catch (error) {
    console.error("[v0] Contact content save failed", error)
    return NextResponse.json({ error: "No se pudo guardar el contenido de contacto" }, { status: 500 })
  }
}
