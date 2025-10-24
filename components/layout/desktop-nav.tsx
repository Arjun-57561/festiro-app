"use client"

import { MessageSquare, Calendar, Plus, Megaphone, BookOpen } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/chat-assistant", icon: MessageSquare, label: "Chat Assistant" },
  { href: "/calendar", icon: Calendar, label: "Calendar" },
  { href: "/event-create", icon: Plus, label: "Create Event" },
  { href: "/promotions", icon: Megaphone, label: "Promotions" },
  { href: "/learning", icon: BookOpen, label: "Learning Hub" },
]

export function DesktopNav() {
  const pathname = usePathname()

  return (
    <nav className="hidden w-64 flex-col gap-2 border-r bg-card p-4 md:flex">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="h-5 w-5" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
