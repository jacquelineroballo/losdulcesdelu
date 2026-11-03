"use client"

import { useEffect, useState } from "react"
import useSWR from "swr"
import { AlertCircle, Check, LoaderCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { defaultHomeContent, type HomeContent } from "@/lib/home-content"

const fetcher = (url: string) => fetch(url, { cache: "no-store" }).then((response) => response.json())

export function AdminHomePanel() {
  const { data, mutate, isLoading } = useSWR<HomeContent>("/api/home", fetcher, { fallbackData: defaultHomeContent })
  const [form, setForm] = useState<HomeContent>(defaultHomeContent)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState("")
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (data && !initialized) {
      setForm(data)
      setInitialized(true)
    }
  }, [data, initialized])

  function update(field: keyof HomeContent, value: string) {
    setSaved(false)
    setError("")
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function save() {
    setSaved(false)
    setError("")
    try {
      const response = await fetch("/api/home", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      if (!response.ok) throw new Error("No se pudo guardar")
      const result = (await response.json()) as { content: HomeContent }
      await mutate(result.content, false)
      setForm(result.content)
      setSaved(true)
    } catch {
      setError("No se pudo guardar el contenido. Revisá la conexión e intentá nuevamente.")
    }
  }

  if (isLoading && !data) return <div className="flex items-center gap-2 text-sm text-muted-foreground"><LoaderCircle className="animate-spin" /> Cargando contenido…</div>

  return <div className="flex flex-col gap-6">
    <div><p className="text-sm text-muted-foreground">Contenido editable de la página pública</p><h2 className="mt-1 text-2xl font-semibold">Página de inicio</h2></div>
    {error && <Alert variant="destructive"><AlertCircle /><AlertDescription>{error}</AlertDescription></Alert>}
    {saved && <Alert><Check /><AlertDescription>Los cambios de inicio se guardaron correctamente.</AlertDescription></Alert>}
    <Card><CardHeader><CardTitle>Hero principal</CardTitle><CardDescription>El primer mensaje que ven tus visitantes.</CardDescription></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2"><Field label="Etiqueta" value={form.heroBadge} onChange={(value) => update("heroBadge", value)} /><Field label="Título" value={form.heroTitle} onChange={(value) => update("heroTitle", value)} /><Field label="Texto destacado" value={form.heroHighlight} onChange={(value) => update("heroHighlight", value)} /><Field label="Botón principal" value={form.primaryCta} onChange={(value) => update("primaryCta", value)} /><Field label="Botón secundario" value={form.secondaryCta} onChange={(value) => update("secondaryCta", value)} /><Field label="Descripción" value={form.heroDescription} onChange={(value) => update("heroDescription", value)} multiline /></CardContent></Card>
    <Card><CardHeader><CardTitle>Secciones de contenido</CardTitle><CardDescription>Editá los títulos y textos principales de la página.</CardDescription></CardHeader><CardContent className="grid gap-4"><Field label="Por qué elegirnos — título" value={form.whyTitle} onChange={(value) => update("whyTitle", value)} /><Field label="Por qué elegirnos — descripción" value={form.whyDescription} onChange={(value) => update("whyDescription", value)} multiline /><Field label="Especialidades — título" value={form.specialtiesTitle} onChange={(value) => update("specialtiesTitle", value)} /><Field label="Especialidades — descripción" value={form.specialtiesDescription} onChange={(value) => update("specialtiesDescription", value)} multiline /><Field label="Testimonios — título" value={form.testimonialsTitle} onChange={(value) => update("testimonialsTitle", value)} /><Field label="Suscripción — título" value={form.newsletterTitle} onChange={(value) => update("newsletterTitle", value)} /><Field label="Suscripción — descripción" value={form.newsletterDescription} onChange={(value) => update("newsletterDescription", value)} multiline /></CardContent></Card>
    <Button onClick={save} className="w-full sm:w-fit">Guardar cambios</Button>
  </div>
}

function Field({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean }) {
  return <label className="grid gap-2 text-sm font-medium"><span>{label}</span>{multiline ? <Textarea value={value} onChange={(event) => onChange(event.target.value)} /> : <Input value={value} onChange={(event) => onChange(event.target.value)} />}</label>
}
