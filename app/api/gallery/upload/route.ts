import { put } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file")

    if (!(file instanceof File) || !file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Seleccioná una imagen válida" }, { status: 400 })
    }

    if (file.size > 8 * 1024 * 1024) {
      return NextResponse.json({ error: "La imagen no puede superar los 8 MB" }, { status: 400 })
    }

    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg"
    const blob = await put(`gallery/${crypto.randomUUID()}.${extension}`, file, {
      access: "public",
      addRandomSuffix: false,
    })

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error("[v0] Gallery image upload failed", error)
    return NextResponse.json({ error: "No se pudo subir la imagen" }, { status: 500 })
  }
}
