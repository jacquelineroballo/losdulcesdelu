"use client"

import { useState } from "react"
import useSWR from "swr"
import { Save, Sparkles } from "lucide-react"
import { initialHomeContent, type HomeContent } from "@/lib/home-content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const fetcher = (url: string) => fetch(url).then((response) => response.json())

export function AdminHomePanel() {
  const [form, setForm] = useState<HomeContent>(initialHomeContent)
  const [saving, setSaving] = useState(false)
  const { data, isLoading, mutate } = useSWR<HomeContent>("/api/site/home", fetcher, { fallbackData: initialHomeContent, onSuccess: (next) => setForm(next) })
  const [message, setMessage] = useState("")
  function updateField<K extends keyof HomeContent>(field: K, value: HomeContent[K]) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function syncFromServer(next: HomeContent) {
    setForm(next)
    void mutate(next, false)
  }

  async function saveContent() {
    setSaving(true)
    setMessage("")
    try {
      const response = await fetch("/api/site/home", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      if (!response.ok) throw new Error("No se pudo guardar")
      syncFromServer(await response.json())
      setMessage("Cambios guardados correctamente.")
    } catch {
      setMessage("No se pudieron guardar los cambios.")
    } finally {
      setSaving(false)
    }
  }

  if (isLoading) return <Card><CardContent className="p-8 text-sm text-muted-foreground">Cargando contenido de Inicio...</CardContent></Card>

  return <div className="flex flex-col gap-6">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><Badge variant="secondary" className="gap-2"><Sparkles /> Editor de contenido</Badge><h2 className="mt-3 font-display text-4xl">Página de inicio</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">Editá los textos principales que ven tus visitantes. Los cambios se guardan permanentemente.</p></div><Button onClick={saveContent} disabled={saving}><Save data-icon="inline-start" />{saving ? "Guardando..." : "Guardar cambios"}</Button></div>
    {message && <p role="status" className="rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground">{message}</p>}
    <div className="grid gap-6 xl:grid-cols-2">
      <Card><CardHeader><CardTitle>Hero principal</CardTitle><CardDescription>El primer mensaje que aparece en la página.</CardDescription></CardHeader><CardContent className="flex flex-col gap-4"><Input value={form.eyebrow} onChange={(event) => updateField("eyebrow", event.target.value)} placeholder="Texto superior" aria-label="Texto superior" /><Input value={form.heroTitle} onChange={(event) => updateField("heroTitle", event.target.value)} placeholder="Título principal" aria-label="Título principal" /><Input value={form.heroHighlight} onChange={(event) => updateField("heroHighlight", event.target.value)} placeholder="Título destacado" aria-label="Título destacado" /><Textarea value={form.heroDescription} onChange={(event) => updateField("heroDescription", event.target.value)} placeholder="Descripción" aria-label="Descripción" /><Input value={form.heroImage} onChange={(event) => updateField("heroImage", event.target.value)} placeholder="URL de imagen" aria-label="URL de imagen" /><div className="grid gap-3 sm:grid-cols-2"><Input value={form.primaryCta} onChange={(event) => updateField("primaryCta", event.target.value)} placeholder="Botón principal" aria-label="Botón principal" /><Input value={form.secondaryCta} onChange={(event) => updateField("secondaryCta", event.target.value)} placeholder="Botón secundario" aria-label="Botón secundario" /></div></CardContent></Card>
      <Card><CardHeader><CardTitle>Secciones principales</CardTitle><CardDescription>Títulos y descripciones de la página.</CardDescription></CardHeader><CardContent className="flex flex-col gap-4"><Input value={form.whyTitle} onChange={(event) => updateField("whyTitle", event.target.value)} placeholder="Título por qué elegirnos" aria-label="Título por qué elegirnos" /><Textarea value={form.whyDescription} onChange={(event) => updateField("whyDescription", event.target.value)} placeholder="Descripción por qué elegirnos" aria-label="Descripción por qué elegirnos" /><Input value={form.specialtiesTitle} onChange={(event) => updateField("specialtiesTitle", event.target.value)} placeholder="Título especialidades" aria-label="Título especialidades" /><Textarea value={form.specialtiesDescription} onChange={(event) => updateField("specialtiesDescription", event.target.value)} placeholder="Descripción especialidades" aria-label="Descripción especialidades" /><Input value={form.testimonialsTitle} onChange={(event) => updateField("testimonialsTitle", event.target.value)} placeholder="Título testimonios" aria-label="Título testimonios" /></CardContent></Card>
      <Card className="xl:col-span-2"><CardHeader><CardTitle>Testimonios</CardTitle><CardDescription>Editá cada testimonio y su autor.</CardDescription></CardHeader><CardContent className="grid gap-4 md:grid-cols-3">{form.testimonials.map((testimonial, index) => <div key={index} className="flex flex-col gap-3 rounded-xl border border-border p-4"><Textarea value={testimonial.text} onChange={(event) => { const testimonials = [...form.testimonials]; testimonials[index] = { ...testimonial, text: event.target.value }; updateField("testimonials", testimonials) }} placeholder="Testimonio" aria-label={`Testimonio ${index + 1}`} /><Input value={testimonial.author} onChange={(event) => { const testimonials = [...form.testimonials]; testimonials[index] = { ...testimonial, author: event.target.value }; updateField("testimonials", testimonials) }} placeholder="Autor" aria-label={`Autor ${index + 1}`} /></div>)}</CardContent></Card>
      <Card className="xl:col-span-2"><CardHeader><CardTitle>Especialidades destacadas</CardTitle><CardDescription>Contenido de las tarjetas de especialidades.</CardDescription></CardHeader><CardContent className="grid gap-4 md:grid-cols-3">{form.specialties.map((specialty, index) => <div key={index} className="flex flex-col gap-3 rounded-xl border border-border p-4"><Input value={specialty.title} onChange={(event) => { const specialties = [...form.specialties]; specialties[index] = { ...specialty, title: event.target.value }; updateField("specialties", specialties) }} placeholder="Título" aria-label={`Título especialidad ${index + 1}`} /><Textarea value={specialty.description} onChange={(event) => { const specialties = [...form.specialties]; specialties[index] = { ...specialty, description: event.target.value }; updateField("specialties", specialties) }} placeholder="Descripción" aria-label={`Descripción especialidad ${index + 1}`} /><Input value={specialty.image} onChange={(event) => { const specialties = [...form.specialties]; specialties[index] = { ...specialty, image: event.target.value }; updateField("specialties", specialties) }} placeholder="URL de imagen" aria-label={`Imagen especialidad ${index + 1}`} /></div>)}</CardContent></Card>
    </div>
    <div className="flex justify-end"><Button onClick={saveContent} disabled={saving}><Save data-icon="inline-start" />{saving ? "Guardando..." : "Guardar cambios"}</Button></div>
  </div>
}
