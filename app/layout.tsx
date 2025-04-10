import type React from "react"
import { Inter, Pacifico, Poppins } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

// Configure the Inter font
const inter = Inter({ subsets: ["latin"] })

// Configure the Poppins font
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
})

// Configure the Pacifico font
const pacifico = Pacifico({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-pacifico",
  display: "swap",
})

export const metadata = {
  title: "Los dulces de Lu - Pastelería Personalizada",
  description: "Pastelería artesanal con diseños personalizados para cada ocasión",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${poppins.variable} ${pacifico.variable}`}>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'