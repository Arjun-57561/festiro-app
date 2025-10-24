"use client"

import { cn } from "@/lib/utils"
import type { Event } from "@/lib/types"

interface CalendarGridProps {
  currentDate: Date
  events: Event[]
  selectedDate: Date | null
  onSelectDate: (date: Date) => void
}

export function CalendarGrid({ currentDate, events, selectedDate, onSelectDate }: CalendarGridProps) {
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // Create array of dates
  const dates: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) {
    dates.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(i)
  }

  // Check if date has events
  const hasEvents = (day: number) => {
    const dateStr = new Date(year, month, day).toISOString().split("T")[0]
    return events.some((event) => event.startISO.split("T")[0] === dateStr)
  }

  const isToday = (day: number) => {
    const today = new Date()
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year
  }

  const isSelected = (day: number) => {
    if (!selectedDate) return false
    return selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year
  }

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="rounded-lg border bg-card p-4">
      {/* Week day headers */}
      <div className="mb-2 grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center font-medium text-muted-foreground text-xs">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar dates */}
      <div className="grid grid-cols-7 gap-2">
        {dates.map((day, index) => (
          <button
            key={index}
            onClick={() => day && onSelectDate(new Date(year, month, day))}
            disabled={!day}
            className={cn(
              "relative aspect-square rounded-lg p-2 text-center text-sm transition-colors",
              day && "hover:bg-muted",
              !day && "cursor-default",
              isToday(day!) && "bg-primary/10 font-semibold text-primary",
              isSelected(day!) && "bg-primary text-primary-foreground",
            )}
          >
            {day && (
              <>
                <span>{day}</span>
                {hasEvents(day) && (
                  <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-0.5">
                    <div className="h-1 w-1 rounded-full bg-secondary" />
                  </div>
                )}
              </>
            )}
          </button>
        ))}
      </div>

      {/* Timezone indicator */}
      <div className="mt-4 text-center text-muted-foreground text-xs">Timezone: Asia/Kolkata (IST)</div>
    </div>
  )
}
