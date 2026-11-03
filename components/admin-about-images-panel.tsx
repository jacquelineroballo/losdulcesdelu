"use client"

import { useEffect, useState } from "react"
import useSWR from "swr"
import { Check, ImagePlus, LoaderCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { defaultAboutImages, type AboutImages } from "@/lib/about-images"

const fetcher = (url: string) => fetch(url, { cache: "no-store" }).then((response) => response.json())

export function AdminAboutImagesPanel() {
  const { data, isLoading } = useSWR<AboutImages>("/api/about-images", fetcher, { fallbackData: defaultAboutImages })
  const [images, setImages] = useState<AboutImages>(defaultAboutImages)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => { if (data) setImages(data) }, [data])

  async function upload(file: File, key: keyof AboutImages) {
    setUploading(true); setError(""); setMessage("")
    try {
      const body = new FormData(); body.append("file", file)
      const response = await fetch("/api/gallery/upload", { method: "POST", body })
      const result = await response.json() as { url?: string; error?: string }
      if (!response.ok || !result.url) throw new Error(result.error || "No se pudo subir la imagen")
      setImages((current) => ({ ...current, [key]: result.url! }))
    } catch (uploadError) { setError(uploadError instanceof Error ? uploadError.message : "No se pudo subir la imagen") } finally { setUploading(false) }
  }

  async function save() {
    setSaving(true); setError(""); setMessage("")
    try {
      const response = await fetch("/api/about-images", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(images) })
      if (!response.ok) throw new Error("No se pudieron guardar las imágenes")
      setMessage("Las imágenes de Sobre nosotros se guardaron correctamente.")
    } catch (saveError) { setError(saveError instanceof Error ? saveError.message : "No se pudieron guardar las imágenes") } finally { setSaving(false) }
  }

  if (isLoading && !data) return <div className="flex items-center gap-2 text-sm text-muted-foreground"><LoaderCircle className="animate-spin" /> Cargando imágenes…</div>
  return <div className="flex flex-col gap-6"><div><p className="text-sm text-muted-foreground">Reemplazá las imágenes institucionales sin modificar los textos.</p><h2 className="mt-1 text-2xl font-semibold">Imágenes de Sobre nosotros</h2></div>{message && <Alert><Check /><AlertDescription>{message}</AlertDescription></Alert>}{error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}<Card><CardHeader><CardTitle>Imágenes institucionales</CardTitle><CardDescription>Podés pegar una URL o subir un archivo nuevo para cada espacio.</CardDescription></CardHeader><CardContent className="grid gap-5 md:grid-cols-3">{([['hero', 'Imagen principal'], ['teamBackground', 'Fondo del equipo'], ['workshop', 'Taller de pastelería']] as const).map(([key, label]) => <ImageField key={key} label={label} value={images[key]} uploading={uploading} onChange={(value) => setImages((current) => ({ ...current, [key]: value }))} onUpload={(file) => void upload(file, key)} />)}</CardContent></Card><Button onClick={save} disabled={saving || uploading} className="w-full sm:w-fit">{saving ? "Guardando…" : "Guardar imágenes"}</Button></div>
}

function ImageField({ label, value, uploading, onChange, onUpload }: { label: string; value: string; uploading: boolean; onChange: (value: string) => void; onUpload: (file: File) => void }) {
  return <div className="grid gap-3"><div className="overflow-hidden rounded-lg border border-border bg-muted"><img src={value} alt={`Vista previa: ${label}`} className="aspect-video w-full object-cover" /></div><label className="grid gap-2 text-sm font-medium"><span>{label}</span><Input value={value} onChange={(event) => onChange(event.target.value)} /></label><label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-border px-3 py-2 text-xs font-medium hover:bg-muted"><ImagePlus />{uploading ? "Subiendo…" : "Reemplazar imagen"}<input type="file" accept="image/*" className="sr-only" disabled={uploading} onChange={(event) => { const file = event.target.files?.[0]; if (file) onUpload(file) }} /></label></div>
}
