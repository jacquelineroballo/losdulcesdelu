"use client"

import { useEffect, useState } from "react"
import useSWR from "swr"
import { Check, ImagePlus, LoaderCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { defaultSiteImages, type SiteImages } from "@/lib/site-images"

const fetcher = (url: string) => fetch(url, { cache: "no-store" }).then((response) => response.json())

export function AdminHomeImagesPanel() {
  const { data, isLoading } = useSWR<SiteImages>("/api/site-images", fetcher, { fallbackData: defaultSiteImages })
  const [images, setImages] = useState<SiteImages>(defaultSiteImages)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => { if (data) setImages(data) }, [data])

  async function upload(file: File) {
    setUploading(true); setError(""); setMessage("")
    try {
      const formData = new FormData(); formData.append("file", file)
      const response = await fetch("/api/gallery/upload", { method: "POST", body: formData })
      const result = await response.json() as { url?: string; error?: string }
      if (!response.ok || !result.url) throw new Error(result.error || "No se pudo subir la imagen")
      setImages((current) => ({ ...current, homeHero: result.url! }))
    } catch (uploadError) { setError(uploadError instanceof Error ? uploadError.message : "No se pudo subir la imagen") } finally { setUploading(false) }
  }

  async function save() {
    setSaving(true); setError(""); setMessage("")
    try {
      const response = await fetch("/api/site-images", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(images) })
      if (!response.ok) throw new Error("No se pudieron guardar las imágenes")
      setMessage("La imagen de inicio se guardó correctamente.")
    } catch (saveError) { setError(saveError instanceof Error ? saveError.message : "No se pudieron guardar las imágenes") } finally { setSaving(false) }
  }

  if (isLoading && !data) return <div className="flex items-center gap-2 text-sm text-muted-foreground"><LoaderCircle className="animate-spin" /> Cargando imágenes…</div>

  return <div className="flex flex-col gap-6"><div><p className="text-sm text-muted-foreground">Elegí y reemplazá las imágenes que aparecen en las páginas públicas.</p><h2 className="mt-1 text-2xl font-semibold">Imágenes de inicio</h2></div>{message && <Alert><Check /><AlertDescription>{message}</AlertDescription></Alert>}{error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}<Card><CardHeader><CardTitle>Imagen principal</CardTitle><CardDescription>Es la imagen grande del inicio. Podés pegar una URL o subir un archivo nuevo.</CardDescription></CardHeader><CardContent className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_220px]"><div className="grid content-start gap-4"><label className="grid gap-2 text-sm font-medium">URL de imagen<Input value={images.homeHero} onChange={(event) => setImages((current) => ({ ...current, homeHero: event.target.value }))} /></label><label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-border px-4 py-5 text-sm font-medium transition-colors hover:bg-muted"><ImagePlus />{uploading ? "Subiendo…" : "Subir nueva imagen"}<input type="file" accept="image/*" className="sr-only" disabled={uploading} onChange={(event) => { const file = event.target.files?.[0]; if (file) void upload(file) }} /></label><Button onClick={save} disabled={saving || uploading}>{saving ? "Guardando…" : "Guardar imagen"}</Button></div><div className="overflow-hidden rounded-lg border border-border bg-muted"><img src={images.homeHero} alt="Vista previa de la imagen principal" className="aspect-square w-full object-cover" /></div></CardContent></Card></div>
}
