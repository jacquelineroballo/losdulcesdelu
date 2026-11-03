"use client"

import { useEffect, useState } from "react"
import useSWR from "swr"
import { Check, LoaderCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { defaultContactContent, type ContactContent } from "@/lib/contact-content"

const fetcher = (url: string) => fetch(url, { cache: "no-store" }).then((response) => response.json())

export function AdminContactPanel() {
  const { data, isLoading } = useSWR<ContactContent>("/api/contact-content", fetcher, { fallbackData: defaultContactContent })
  const [content, setContent] = useState<ContactContent>(defaultContactContent)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  useEffect(() => { if (data) setContent(data) }, [data])

  function update(field: keyof ContactContent, value: string) { setMessage(""); setError(""); setContent((current) => ({ ...current, [field]: value })) }

  async function save() {
    setSaving(true); setMessage(""); setError("")
    try {
      const response = await fetch("/api/contact-content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) })
      if (!response.ok) throw new Error("No se pudo guardar")
      setMessage("La información de contacto se guardó correctamente.")
    } catch { setError("No se pudo guardar la información. Intentá nuevamente.") } finally { setSaving(false) }
  }

  if (isLoading && !data) return <div className="flex items-center gap-2 text-sm text-muted-foreground"><LoaderCircle className="animate-spin" /> Cargando contacto…</div>
  return <div className="flex flex-col gap-6"><div><p className="text-sm text-muted-foreground">Actualizá los datos que ven tus clientes en la página de contacto.</p><h2 className="mt-1 font-display text-3xl font-normal">Contacto</h2></div>{message && <Alert><Check /><AlertDescription>{message}</AlertDescription></Alert>}{error && <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>}<Card><CardHeader><CardTitle>Presentación</CardTitle><CardDescription>Título y descripción del encabezado.</CardDescription></CardHeader><CardContent className="grid gap-4"><Field label="Título" value={content.heroTitle} onChange={(value) => update("heroTitle", value)} /><Field label="Descripción" value={content.heroDescription} onChange={(value) => update("heroDescription", value)} multiline /></CardContent></Card><Card><CardHeader><CardTitle>Información de contacto</CardTitle><CardDescription>Estos datos aparecen en la tarjeta principal.</CardDescription></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2"><Field label="Email" value={content.email} onChange={(value) => update("email", value)} type="email" /><Field label="Teléfono" value={content.phone} onChange={(value) => update("phone", value)} /><Field label="Dirección" value={content.address} onChange={(value) => update("address", value)} /><Field label="Horarios" value={content.hours} onChange={(value) => update("hours", value)} multiline /></CardContent></Card><Card><CardHeader><CardTitle>Redes sociales</CardTitle><CardDescription>Usá las URLs completas de cada perfil.</CardDescription></CardHeader><CardContent className="grid gap-4 sm:grid-cols-3"><Field label="Instagram" value={content.instagram} onChange={(value) => update("instagram", value)} type="url" /><Field label="Facebook" value={content.facebook} onChange={(value) => update("facebook", value)} type="url" /><Field label="Twitter / X" value={content.twitter} onChange={(value) => update("twitter", value)} type="url" /></CardContent></Card><Button onClick={save} disabled={saving} className="w-full sm:w-fit">{saving ? "Guardando…" : "Guardar cambios"}</Button></div>
}

function Field({ label, value, onChange, multiline = false, type = "text" }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean; type?: string }) { return <label className="grid gap-2 text-sm font-medium"><span>{label}</span>{multiline ? <Textarea value={value} onChange={(event) => onChange(event.target.value)} /> : <Input type={type} value={value} onChange={(event) => onChange(event.target.value)} />}</label> }
