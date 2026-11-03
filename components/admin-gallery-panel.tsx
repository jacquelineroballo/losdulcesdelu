"use client"

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"
import {
  type GalleryItem,
  initialGalleryItems,
  loadGalleryItems,
  persistGalleryItems,
  subscribeToGalleryItems,
  uploadGalleryImage,
} from "@/lib/gallery-storage"
import { ImagePlus, Pencil, Plus, Search, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const emptyForm = { title: "", description: "", category: "customized", imageUrl: "", price: "" }

const categoryLabels: Record<string, string> = {
  customized: "Temáticas",
  desserts: "Postres",
  birthday: "Cumpleaños",
  cupcakes: "Cupcakes",
  wedding: "Bodas y eventos",
  candybar: "Candy Bar",
  special: "Especiales",
}

export function AdminGalleryPanel() {
  const [items, setItems] = useState<GalleryItem[]>(initialGalleryItems)
  const [editingId, setEditingId] = useState<number | null>(null)

  useEffect(() => {
    const syncItems = () => { void loadGalleryItems().then(setItems) }
    syncItems()
    return subscribeToGalleryItems(syncItems)
  }, [])
  const [form, setForm] = useState(emptyForm)
  const [query, setQuery] = useState("")
  const [formError, setFormError] = useState("")

  const filteredItems = useMemo(
    () => items.filter((item) => `${item.title} ${item.category}`.toLowerCase().includes(query.toLowerCase())),
    [items, query],
  )

  function startNew() {
    setEditingId(null)
    setForm(emptyForm)
    setFormError("")
  }

  function startEdit(item: GalleryItem) {
    setEditingId(item.id)
    setFormError("")
    setForm({ title: item.title, description: item.description, category: item.category, imageUrl: item.imageUrl, price: item.price })
  }

  async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const imageUrl = await uploadGalleryImage(file)
      setForm((current) => ({ ...current, imageUrl }))
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "No se pudo subir la imagen")
    }
  }

  async function saveItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError("")
    if (!form.title.trim()) {
      setFormError("Escribí el nombre del producto.")
      return
    }
    if (!form.imageUrl.trim()) {
      setFormError("Subí una imagen o pegá una URL antes de guardar.")
      return
    }

    const nextItems = editingId === null
      ? [...items, { ...form, id: Date.now() }]
      : items.map((item) => item.id === editingId ? { ...item, ...form } : item)

    try {
      await persistGalleryItems(nextItems)
      setItems(nextItems)
      startNew()
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "No se pudo guardar la galería")
    }
  }

  async function deleteItem(id: number) {
    const nextItems = items.filter((item) => item.id !== id)
    try {
      await persistGalleryItems(nextItems)
      setItems(nextItems)
      if (editingId === id) startNew()
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "No se pudo eliminar el producto")
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section className="space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Contenido</p>
            <h2 className="font-display text-3xl text-foreground">Galería de productos</h2>
          </div>
          <Button onClick={startNew} className="gap-2"><Plus className="size-4" />Agregar imagen</Button>
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por nombre o categoría" className="pl-9" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredItems.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-2xl border bg-card shadow-sm">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img src={item.imageUrl} alt={item.title} className="size-full object-cover" />
              </div>
              <div className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div><p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{categoryLabels[item.category] ?? item.category}</p><h3 className="font-semibold text-foreground">{item.title}</h3></div>
                  <p className="font-semibold text-primary">{item.price || "Sin precio"}</p>
                </div>
                <p className="line-clamp-2 text-sm text-muted-foreground">{item.description || "Sin descripción"}</p>
                <div className="flex gap-2 pt-1">
                  <Button variant="outline" size="sm" onClick={() => startEdit(item)} className="gap-2"><Pencil className="size-3.5" />Editar</Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteItem(item.id)} className="gap-2 text-destructive hover:text-destructive"><Trash2 className="size-3.5" />Eliminar</Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="h-fit rounded-2xl border bg-card p-5 shadow-sm lg:sticky lg:top-24">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div><p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Editor</p><h2 className="text-xl font-semibold text-foreground">{editingId === null ? "Nueva imagen" : "Editar producto"}</h2></div>
          {editingId !== null && <Button variant="ghost" size="icon" onClick={startNew} aria-label="Cancelar edición"><X className="size-4" /></Button>}
        </div>
        <form onSubmit={saveItem} className="space-y-4">
          <div className="rounded-xl border border-dashed p-4 text-center">
            {form.imageUrl ? <img src={form.imageUrl} alt="Vista previa" className="mx-auto mb-3 aspect-video w-full rounded-lg object-cover" /> : <ImagePlus className="mx-auto mb-2 size-8 text-muted-foreground" />}
            <label className="cursor-pointer text-sm font-medium text-primary hover:underline">{form.imageUrl ? "Cambiar imagen" : "Subir imagen"}<input type="file" accept="image/*" onChange={handleImageUpload} className="sr-only" /></label>
            <Input value={form.imageUrl} onChange={(event) => setForm((current) => ({ ...current, imageUrl: event.target.value }))} placeholder="o pega una URL" className="mt-3" aria-label="URL de imagen" />
          </div>
          <Input value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} placeholder="Nombre del producto" aria-label="Nombre del producto" />
          <Textarea value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} placeholder="Descripción" aria-label="Descripción" />
          <div className="grid grid-cols-2 gap-3"><select value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} aria-label="Categoría" className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"><option value="customized">Temáticas</option><option value="desserts">Postres</option><option value="birthday">Cumpleaños</option><option value="cupcakes">Cupcakes</option><option value="wedding">Bodas y eventos</option><option value="candybar">Candy Bar</option><option value="special">Especiales</option></select><Input value={form.price} onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))} placeholder="Precio" aria-label="Precio" /></div>
          {formError && <p role="alert" className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{formError}</p>}
          <Button type="submit" className="w-full">{editingId === null ? "Agregar a la galería" : "Guardar cambios"}</Button>
        </form>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">Los cambios se guardan permanentemente en la galería.</p>
      </aside>
    </div>
  )
}
