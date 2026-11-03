"use client"

import { useState } from "react"
import {
  CakeSlice,
  ImageIcon,
  LayoutDashboard,
  Mail,
  Menu,
  Settings,
  Sparkles,
  Store,
  Users,
} from "lucide-react"

import { AdminGalleryPanel } from "@/components/admin-gallery-panel"
import { AdminHomeImagesPanel } from "@/components/admin-home-images-panel"
import { AdminAboutContentPanel } from "@/components/admin-about-content-panel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type AdminSection = "overview" | "gallery" | "home" | "about" | "contact" | "settings"

type NavigationItem = {
  id: AdminSection
  label: string
  description: string
  icon: typeof LayoutDashboard
  available: boolean
}

const navigation: NavigationItem[] = [
  { id: "overview", label: "Resumen", description: "Vista general del negocio", icon: LayoutDashboard, available: true },
  { id: "gallery", label: "Galería", description: "Productos e imágenes", icon: ImageIcon, available: true },
  { id: "home", label: "Página de inicio", description: "Imágenes destacadas", icon: CakeSlice, available: true },
  { id: "about", label: "Sobre nosotros", description: "Imágenes e historia", icon: Users, available: true },
  { id: "contact", label: "Contacto", description: "Datos y horarios", icon: Mail, available: false },
  { id: "settings", label: "Configuración", description: "Preferencias del panel", icon: Settings, available: false },
]

const comingSoon: Record<Exclude<AdminSection, "overview" | "gallery">, { title: string; copy: string }> = {
  home: { title: "Página de inicio", copy: "Próximamente vas a poder editar el contenido principal, destacados y llamados a la acción desde acá." },
  about: { title: "Sobre nosotros", copy: "Próximamente vas a poder actualizar la historia, el equipo y las imágenes institucionales." },
  contact: { title: "Contacto", copy: "Próximamente vas a poder administrar horarios, teléfono, email, dirección y redes sociales." },
  settings: { title: "Configuración", copy: "Las preferencias generales y la seguridad del panel se incorporarán en una próxima etapa." },
}

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<AdminSection>("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const activeItem = navigation.find((item) => item.id === activeSection) ?? navigation[0]
  const ActiveIcon = activeItem.icon

  function selectSection(section: NavigationItem) {
    if (!section.available) return
    setActiveSection(section.id)
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-muted/30 text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        {sidebarOpen && <button type="button" aria-label="Cerrar menú" className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden" onClick={() => setSidebarOpen(false)} />}

        <aside className={cn("fixed inset-y-0 left-0 z-40 flex w-72 -translate-x-full flex-col border-r border-border bg-card transition-transform md:static md:translate-x-0", sidebarOpen && "translate-x-0")}>
          <div className="flex h-20 items-center gap-3 border-b border-border px-6">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground"><Store /></div>
            <div>
              <p className="font-display text-lg leading-none">Los Dulces de Lu</p>
              <p className="mt-1 text-xs text-muted-foreground">Panel de gestión</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-6">
            <p className="px-3 pb-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Administración</p>
            <nav className="flex flex-col gap-1" aria-label="Secciones del panel">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <button key={item.id} type="button" disabled={!item.available} onClick={() => selectSection(item)} className={cn("group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors", item.available ? "hover:bg-muted" : "cursor-not-allowed opacity-45", activeSection === item.id && "bg-primary/10 text-primary hover:bg-primary/10")}>
                    <Icon className="shrink-0" />
                    <span className="min-w-0 flex-1"><span className="block truncate text-sm font-medium">{item.label}</span><span className="mt-0.5 block truncate text-xs text-muted-foreground">{item.description}</span></span>
                    {!item.available && <Badge variant="outline" className="text-[10px]">Pronto</Badge>}
                  </button>
                )
              })}
            </nav>
          </div>

        </aside>

        <main className="min-w-0 flex-1">
          <header className="flex min-h-20 items-center justify-between gap-4 border-b border-border bg-card px-4 sm:px-8">
            <div className="flex items-center gap-3"><Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)} aria-label="Abrir menú"><Menu /></Button><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Panel de administración</p><h1 className="mt-1 font-display text-2xl font-normal leading-none sm:text-3xl">{activeItem.label}</h1></div></div>
          </header>

          <div className="p-4 sm:p-8">
            {activeSection === "overview" && <Overview onNavigate={setActiveSection} />}
            {activeSection === "gallery" && <AdminGalleryPanel />}
            {activeSection === "home" && <AdminHomeImagesPanel />}
            {activeSection === "about" && <AdminAboutContentPanel />}
            {activeSection !== "overview" && activeSection !== "gallery" && activeSection !== "home" && activeSection !== "about" && <ComingSoon section={activeSection} />}
          </div>
        </main>
      </div>
    </div>
  )
}

function Overview({ onNavigate }: { onNavigate: (section: AdminSection) => void }) {
  const pages = [
    { id: "home" as const, label: "Inicio", icon: CakeSlice, description: "Imágenes principales" },
    { id: "gallery" as const, label: "Galería", icon: ImageIcon, description: "Productos e imágenes" },
    { id: "about" as const, label: "Sobre nosotros", icon: Users, description: "Equipo e historia" },
    { id: "contact" as const, label: "Contacto", icon: Mail, description: "Datos y horarios" },
  ]

  return <div className="flex flex-col gap-8">
    <div className="max-w-3xl"><p className="text-sm text-primary">Centro de gestión</p><h2 className="mt-2 font-display text-3xl font-normal leading-tight sm:text-4xl">Gestioná tu pastelería.</h2></div>
    <Card className="overflow-hidden"><CardHeader><CardTitle className="font-display text-2xl font-normal">Páginas</CardTitle></CardHeader><Separator /><CardContent className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">{pages.map(({ id, label, icon: Icon, description }) => <button key={id} type="button" onClick={() => onNavigate(id)} className="group flex min-h-32 flex-col justify-between rounded-xl border border-border p-4 text-left transition-colors hover:border-primary/40 hover:bg-primary/5"><span className="flex size-10 items-center justify-center rounded-xl bg-muted text-primary transition-colors group-hover:bg-primary/10"><Icon /></span><span><span className="block font-normal">{label}</span><span className="mt-1 block text-sm text-muted-foreground">{description}</span></span></button>)}</CardContent></Card>
  </div>
}

function ComingSoon({ section }: { section: Exclude<AdminSection, "overview" | "gallery"> }) {
  const content = comingSoon[section]
  return <Card className="mx-auto max-w-2xl"><CardContent className="flex flex-col items-center p-10 text-center sm:p-16"><div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Sparkles /></div><h2 className="mt-6 font-display text-3xl font-normal">{content.title}</h2><p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">{content.copy}</p><Badge className="mt-6" variant="outline">Próximamente</Badge></CardContent></Card>
}
