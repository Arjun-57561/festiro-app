// components/layout/app-shell.tsx
"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Home, Calendar, MessageSquare, BookOpen, Gift, Settings } from "lucide-react"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/calendar", label: "Calendar", icon: Calendar },
    { href: "/chat-assistant", label: "Chat", icon: MessageSquare },
    { href: "/learning", label: "Learning", icon: BookOpen },
    { href: "/promotions", label: "Promotions", icon: Gift },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },  // ← ADD THIS
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="flex h-screen flex-col">
      {/* Header Navigation */}
      <header className="border-b bg-white dark:bg-slate-950">
        <nav className="flex items-center gap-1 overflow-x-auto p-4">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 transition-colors ${
                pathname === href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
