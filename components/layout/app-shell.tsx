"use client"

import type React from "react"

import { useState } from "react"
import { AppHeader } from "./app-header"
import { DesktopNav } from "./desktop-nav"
import { MobileNav } from "./mobile-nav"

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <div className="flex h-screen flex-col">
      <AppHeader onMenuClick={() => setMobileNavOpen(!mobileNavOpen)} />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar navigation */}
        <DesktopNav />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">{children}</main>
      </div>

      {/* Mobile bottom navigation */}
      <MobileNav />
    </div>
  )
}
