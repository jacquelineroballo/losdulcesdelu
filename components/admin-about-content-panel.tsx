"use client"

import { useEffect, useState } from "react"
import useSWR from "swr"
import { Check, ImagePlus, LoaderCircle, Plus, Trash2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { defaultAboutImages, type AboutImages, type TeamMember } from "@/lib/about-images"

const fetcher = (url: string) => fetch(url, { cache: "no-store" }).then((response) => response.json())

export function AdminAboutContentPanel() {
  const { data, isLoading } = useSWR<AboutImages>("/api/about-images", fetcher, { fallbackData: defaultAboutImages })
  const [content, setContent] = useState<AboutImages>(defaultAboutImages)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => { if (data) setContent(data) }, [data])

  async function upload(file: File, update: (url: string) => void) {
    setUploading(true); setError(""); setMessage("")
    try {
      const body = new FormData(); body.append("file", file)
      const response = await fetch("/api/gallery/upload", { method: "POST", body })
      const result = await response.json() as { url?: string; error?: string }
      if (!response.ok || !result.url) throw new Error(result.error || "No se pudo subir la imagen")
      update(result.url)
    } catch (uploadError) { setError(uploadError instanceof Error ? uploadError.message : "No se pudo subir la imagen") } finally { setUploading(false) }
  }

  async function save() {
    setSaving(true); setError(""); setMessage("")
    try {
      const response = await fetch("/api/about-images", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) })
      if (!response.ok) throw new Error("No se pudieron guardar los cambios")
      setMessage("Los cambios de Sobre nosotros se guardaron correctamente.")
    } catch (saveError) { setError(saveError instanceof Error ? saveError.message : "No se pudieron guardar los cambios") } finally { setSaving(false) }
  }

  function updateMember(id: string, patch: Partial<TeamMember>) {
    setContent((current) => ({ ...current, teamMembers: current.teamMembers.map((member) => member.id === id ? { ...member, ...patch } : member) }))
  }

  function addMember() {
    setContent((current) => ({ ...current, teamMembers: [...current.teamMembers, { id: `member-${Date.now()}`, name: "Nueva persona", role: "Rol", bio: "", image: "/placeholder.svg?height=300&width=300" }] }))
  }

  function removeMember(id: string) {
    setContent((current) => ({ ...current, teamMembers: current.teamMembers.filter((member) => member.id !== id) }))
  }

  if (isLoading && !data) return <div className="flex items-center gap-2 text-sm text-muted-foreground"><LoaderCircle className="animate-spin" /> Cargando contenido…</div>
  return <div className="flex flex-col gap-6"><div><p className="text-sm text-muted-foreground">Administrá las imágenes y personas visibles en esta página. La tarjeta de cita ahora tiene un fondo opaco para mejorar la lectura.</p><h2 className="mt-1 text-2xl font-semibold">Sobre nosotros</h2></div>{message && <Alert><Check /><AlertDescription>{message}</AlertDescription></Alert>}{error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}
    <div className="grid gap-6 lg:grid-cols-2"><ImageCard title="Imagen grande del hero" description="La imagen principal de la tarjeta." value={content.hero} uploading={uploading} onChange={(value) => setContent((current) => ({ ...current, hero: value }))} onUpload={(file) => void upload(file, (url) => setContent((current) => ({ ...current, hero: url })))} /><ImageCard title="Imagen pequeña del hero" description="La decoración de la esquina inferior izquierda." value={content.heroDecoration} uploading={uploading} onChange={(value) => setContent((current) => ({ ...current, heroDecoration: value }))} onUpload={(file) => void upload(file, (url) => setContent((current) => ({ ...current, heroDecoration: url })))} /></div>
    <Card><CardHeader><CardTitle>Fotos de Nuestra Historia</CardTitle><CardDescription>Reemplazá cualquiera de las cuatro imágenes del mosaico.</CardDescription></CardHeader><CardContent className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{content.historyImages.map((image, index) => <ImageField key={`${index}-${image}`} label={`Foto ${index + 1}`} value={image} uploading={uploading} onChange={(value) => setContent((current) => ({ ...current, historyImages: current.historyImages.map((item, itemIndex) => itemIndex === index ? value : item) }))} onUpload={(file) => void upload(file, (url) => setContent((current) => ({ ...current, historyImages: current.historyImages.map((item, itemIndex) => itemIndex === index ? url : item) })))} />)}</CardContent></Card>
    <ImageCard title="Fondo del equipo" description="Imagen de fondo detrás de las personas." value={content.teamBackground} uploading={uploading} onChange={(value) => setContent((current) => ({ ...current, teamBackground: value }))} onUpload={(file) => void upload(file, (url) => setContent((current) => ({ ...current, teamBackground: url })))} />
    <Card><CardHeader className="flex-row items-center justify-between gap-4"><div><CardTitle>Miembros del equipo</CardTitle><CardDescription>Podés editar las dos personas actuales o agregar más.</CardDescription></div><Button variant="outline" onClick={addMember}><Plus /> Agregar persona</Button></CardHeader><CardContent className="grid gap-5">{content.teamMembers.map((member) => <MemberEditor key={member.id} member={member} uploading={uploading} onChange={(patch) => updateMember(member.id, patch)} onUpload={(file) => void upload(file, (url) => updateMember(member.id, { image: url }))} onRemove={() => removeMember(member.id)} />)}</CardContent></Card>
    <ImageCard title="Imagen de Valores" description="La foto del taller que acompaña esta sección." value={content.workshop} uploading={uploading} onChange={(value) => setContent((current) => ({ ...current, workshop: value }))} onUpload={(file) => void upload(file, (url) => setContent((current) => ({ ...current, workshop: url })))} />
    <Button onClick={save} disabled={saving || uploading} className="w-full sm:w-fit">{saving ? "Guardando…" : "Guardar cambios"}</Button>
  </div>
}

function ImageCard({ title, description, value, uploading, onChange, onUpload }: { title: string; description: string; value: string; uploading: boolean; onChange: (value: string) => void; onUpload: (file: File) => void }) { return <Card><CardHeader><CardTitle>{title}</CardTitle><CardDescription>{description}</CardDescription></CardHeader><CardContent className="grid gap-4 sm:grid-cols-[180px_minmax(0,1fr)]"><img src={value} alt={`Vista previa: ${title}`} className="aspect-video w-full rounded-lg border border-border bg-muted object-cover" /><div className="grid content-start gap-3"><Input value={value} onChange={(event) => onChange(event.target.value)} aria-label={`URL de ${title}`} /><UploadButton uploading={uploading} onUpload={onUpload} /></div></CardContent></Card> }
function ImageField({ label, value, uploading, onChange, onUpload }: { label: string; value: string; uploading: boolean; onChange: (value: string) => void; onUpload: (file: File) => void }) { return <div className="grid gap-2"><img src={value} alt={`Vista previa: ${label}`} className="aspect-square w-full rounded-lg border border-border bg-muted object-cover" /><p className="text-sm font-medium">{label}</p><Input value={value} onChange={(event) => onChange(event.target.value)} aria-label={`URL de ${label}`} /><UploadButton uploading={uploading} onUpload={onUpload} /></div> }
function UploadButton({ uploading, onUpload }: { uploading: boolean; onUpload: (file: File) => void }) { return <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-border px-3 py-2 text-xs font-medium hover:bg-muted"><ImagePlus />{uploading ? "Subiendo…" : "Reemplazar"}<input type="file" accept="image/*" className="sr-only" disabled={uploading} onChange={(event) => { const file = event.target.files?.[0]; if (file) onUpload(file) }} /></label> }
function MemberEditor({ member, uploading, onChange, onUpload, onRemove }: { member: TeamMember; uploading: boolean; onChange: (patch: Partial<TeamMember>) => void; onUpload: (file: File) => void; onRemove: () => void }) { return <div className="grid gap-4 rounded-xl border border-border p-4 sm:grid-cols-[120px_minmax(0,1fr)_auto]"><div><img src={member.image} alt={`Foto de ${member.name}`} className="aspect-square w-full rounded-full border border-border bg-muted object-cover" /><div className="mt-2"><UploadButton uploading={uploading} onUpload={onUpload} /></div></div><div className="grid gap-3 sm:grid-cols-2"><Input value={member.name} onChange={(event) => onChange({ name: event.target.value })} aria-label="Nombre" placeholder="Nombre" /><Input value={member.role} onChange={(event) => onChange({ role: event.target.value })} aria-label="Rol" placeholder="Rol" /><Textarea value={member.bio} onChange={(event) => onChange({ bio: event.target.value })} aria-label="Biografía" placeholder="Biografía" className="sm:col-span-2" /></div><Button type="button" variant="ghost" size="icon" onClick={onRemove} aria-label={`Eliminar a ${member.name}`}><Trash2 /></Button></div> }
