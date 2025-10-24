import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { AppShell } from "@/components/layout/app-shell"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata = {
  title: "FestiRo - Cultural Calendar Assistant",
  description: "Your multilingual guide to cultural festivals and celebrations",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
