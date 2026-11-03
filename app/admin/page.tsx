import { AdminGalleryPanel } from "@/components/admin-gallery-panel"

export const metadata = {
  title: "Admin | Los Dulces de Lu",
  description: "Panel provisional para gestionar la galería de productos.",
}

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <header className="max-w-2xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Panel de administración</p>
          <h1 className="font-display text-4xl text-foreground sm:text-5xl">Gestioná tu galería</h1>
          <p className="text-base leading-relaxed text-muted-foreground">Agregá, editá o quitá productos de la galería desde un solo lugar.</p>
        </header>
        <AdminGalleryPanel />
      </div>
    </main>
  )
}
