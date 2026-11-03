"use client"

import { useState } from "react"
import {
  BarChart3,
  CakeSlice,
  ChevronRight,
  ClipboardList,
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
  { id: "home", label: "Página de inicio", description: "Textos y destacados", icon: CakeSlice, available: false },
  { id: "about", label: "Sobre nosotros", description: "Historia y equipo", icon: Users, available: false },
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

          <div className="border-t border-border p-4"><div className="rounded-xl bg-muted/70 p-4"><div className="flex items-center gap-2 text-sm font-medium"><Sparkles /> Próxima etapa</div><p className="mt-2 text-xs leading-relaxed text-muted-foreground">Vamos a sumar editores para cada página pública, uno por uno.</p></div></div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="flex min-h-20 items-center justify-between gap-4 border-b border-border bg-card px-4 sm:px-8">
            <div className="flex items-center gap-3"><Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(true)} aria-label="Abrir menú"><Menu /></Button><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Panel de administración</p><h1 className="mt-1 text-xl font-semibold sm:text-2xl">{activeItem.label}</h1></div></div>
            <Badge variant="secondary" className="hidden gap-2 sm:flex"><span className="size-2 rounded-full bg-emerald-500" /> Guardado permanente activo</Badge>
          </header>

          <div className="p-4 sm:p-8">
            {activeSection === "overview" && <Overview onOpenGallery={() => setActiveSection("gallery")} />}
            {activeSection === "gallery" && <AdminGalleryPanel />}
            {activeSection !== "overview" && activeSection !== "gallery" && <ComingSoon section={activeSection} />}
          </div>
        </main>
      </div>
    </div>
  )
}

function Overview({ onOpenGallery }: { onOpenGallery: () => void }) {
  return <div className="flex flex-col gap-8">
    <div className="max-w-2xl"><p className="text-sm text-muted-foreground">Bienvenida al centro de gestión de tu pastelería.</p><h2 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">Todo tu contenido, en un solo lugar.</h2><p className="mt-4 leading-relaxed text-muted-foreground">Desde acá vas a poder mantener actualizados tus productos, imágenes y la información de cada página pública.</p></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><MetricCard icon={ImageIcon} label="Galería" value="Activa" detail="Productos administrables" /><MetricCard icon={BarChart3} label="Páginas" value="1 / 4" detail="Módulos disponibles" /><MetricCard icon={ClipboardList} label="Contenido" value="En progreso" detail="Migración por etapas" /><MetricCard icon={Sparkles} label="Persistencia" value="Blob" detail="Guardado permanente" /></div>
    <Card className="overflow-hidden"><CardHeader className="flex-row items-center justify-between gap-4"><div><CardTitle>Accesos rápidos</CardTitle><p className="mt-1 text-sm text-muted-foreground">Empezá por el módulo que querés actualizar.</p></div><Button onClick={onOpenGallery}>Abrir galería <ChevronRight data-icon="inline-end" /></Button></CardHeader><Separator /><CardContent className="grid gap-3 p-4 sm:grid-cols-2"><QuickAction icon={ImageIcon} title="Gestionar galería" copy="Agregá, editá o quitá productos e imágenes." onClick={onOpenGallery} /><QuickAction icon={CakeSlice} title="Editar página de inicio" copy="Este módulo estará disponible en la próxima etapa." disabled /></CardContent></Card>
  </div>
}

function MetricCard({ icon: Icon, label, value, detail }: { icon: typeof ImageIcon; label: string; value: string; detail: string }) {
  return <Card><CardContent className="flex items-start gap-4 p-5"><div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon /></div><div className="min-w-0"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-1 text-xl font-semibold">{value}</p><p className="mt-1 truncate text-xs text-muted-foreground">{detail}</p></div></CardContent></Card>
}

function QuickAction({ icon: Icon, title, copy, onClick, disabled = false }: { icon: typeof ImageIcon; title: string; copy: string; onClick?: () => void; disabled?: boolean }) {
  return <button type="button" disabled={disabled} onClick={onClick} className={cn("flex items-start gap-4 rounded-xl border border-border p-4 text-left transition-colors", disabled ? "cursor-not-allowed opacity-50" : "hover:bg-muted")}><div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted"><Icon /></div><div><p className="font-medium">{title}</p><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{copy}</p></div></button>
}

function ComingSoon({ section }: { section: Exclude<AdminSection, "overview" | "gallery"> }) {
  const content = comingSoon[section]
  return <Card className="mx-auto max-w-2xl"><CardContent className="flex flex-col items-center p-10 text-center sm:p-16"><div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Sparkles /></div><h2 className="mt-6 font-display text-4xl">{content.title}</h2><p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">{content.copy}</p><Badge className="mt-6" variant="outline">Próximamente</Badge></CardContent></Card>
}
