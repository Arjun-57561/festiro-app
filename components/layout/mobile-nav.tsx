"use client"

import { MessageSquare, Calendar, Plus, Megaphone, BookOpen } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/chat-assistant", icon: MessageSquare, label: "Chat" },
  { href: "/calendar", icon: Calendar, label: "Calendar" },
  { href: "/event-create", icon: Plus, label: "Create" },
  { href: "/promotions", icon: Megaphone, label: "Promos" },
  { href: "/learning", icon: BookOpen, label: "Learn" },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex border-t bg-card md:hidden">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium transition-colors",
              isActive ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
