// components/calendar/calendar-grid.tsx
"use client"

import { cn } from "@/lib/utils"
import type { Event } from "@/lib/types"
import { motion, AnimatePresence } from "framer-motion"

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
  const prevMonthDays = new Date(year, month, 0).getDate()

  // Create array of dates with previous/next month overflow
  const dates: Array<{ day: number; isCurrentMonth: boolean; date: Date }> = []
  
  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    dates.push({
      day: prevMonthDays - i,
      isCurrentMonth: false,
      date: new Date(year, month - 1, prevMonthDays - i)
    })
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push({
      day: i,
      isCurrentMonth: true,
      date: new Date(year, month, i)
    })
  }
  
  // Next month days to fill grid
  const remainingCells = 42 - dates.length // 6 rows × 7 days
  for (let i = 1; i <= remainingCells; i++) {
    dates.push({
      day: i,
      isCurrentMonth: false,
      date: new Date(year, month + 1, i)
    })
  }

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return events.filter((event) => event.startISO.split("T")[0] === dateStr)
  }

  const hasEvents = (date: Date) => {
    return getEventsForDate(date).length > 0
  }

  const getEventCount = (date: Date) => {
    return getEventsForDate(date).length
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      today.getDate() === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear()
    )
  }

  const isSelected = (date: Date) => {
    if (!selectedDate) return false
    return (
      selectedDate.getDate() === date.getDate() &&
      selectedDate.getMonth() === date.getMonth() &&
      selectedDate.getFullYear() === date.getFullYear()
    )
  }

  const isPastDate = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const compareDate = new Date(date)
    compareDate.setHours(0, 0, 0, 0)
    return compareDate < today
  }

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Get event color based on festival type
  const getEventColor = (date: Date) => {
    const dateEvents = getEventsForDate(date)
    if (dateEvents.length === 0) return "bg-secondary"
    
    // Priority: major festivals > regional > minor
    const majorFestivals = ["Diwali", "Holi", "Dussehra", "Eid", "Christmas", "Ganesh Chaturthi"]
    const hasMajor = dateEvents.some(e => majorFestivals.includes(e.festival))
    
    if (hasMajor) return "bg-purple-500 dark:bg-purple-400"
    if (dateEvents[0].region === "All India") return "bg-blue-500 dark:bg-blue-400"
    return "bg-teal-500 dark:bg-teal-400"
  }

  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <div className="p-4 md:p-6">
        {/* Week day headers */}
        <div className="mb-3 grid grid-cols-7 gap-1 md:gap-2">
          {weekDays.map((day) => (
            <div 
              key={day} 
              className="text-center font-semibold text-muted-foreground text-xs md:text-sm py-2"
            >
              <span className="hidden md:inline">{day}</span>
              <span className="md:hidden">{day.charAt(0)}</span>
            </div>
          ))}
        </div>

        {/* Calendar dates */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${year}-${month}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-7 gap-1 md:gap-2"
          >
            {dates.map((item, index) => {
              const hasEvent = hasEvents(item.date)
              const eventCount = getEventCount(item.date)
              const isCurrentDay = isToday(item.date)
              const isSelectedDay = isSelected(item.date)
              const isPast = isPastDate(item.date)

              return (
                <motion.button
                  key={`${index}-${item.day}`}
                  onClick={() => onSelectDate(item.date)}
                  whileHover={{ scale: item.isCurrentMonth ? 1.05 : 1 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "relative aspect-square rounded-lg p-1 md:p-2 text-center text-sm md:text-base transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    item.isCurrentMonth 
                      ? "hover:bg-muted cursor-pointer" 
                      : "text-muted-foreground/40 cursor-default hover:bg-transparent",
                    isCurrentDay && item.isCurrentMonth && !isSelectedDay && "bg-primary/10 font-bold text-primary ring-2 ring-primary/20",
                    isSelectedDay && "bg-primary text-primary-foreground shadow-md font-semibold",
                    isPast && item.isCurrentMonth && !isSelectedDay && "opacity-60",
                    !item.isCurrentMonth && "font-normal"
                  )}
                  disabled={!item.isCurrentMonth}
                  aria-label={`${item.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}${hasEvent ? ` - ${eventCount} event${eventCount > 1 ? 's' : ''}` : ''}`}
                >
                  <span className={cn(
                    "block",
                    !item.isCurrentMonth && "opacity-50"
                  )}>
                    {item.day}
                  </span>

                  {/* Event indicators */}
                  {hasEvent && item.isCurrentMonth && (
                    <div className="absolute bottom-0.5 md:bottom-1 left-1/2 flex -translate-x-1/2 gap-0.5">
                      {eventCount === 1 ? (
                        <div className={cn(
                          "h-1 w-1 md:h-1.5 md:w-1.5 rounded-full",
                          getEventColor(item.date)
                        )} />
                      ) : eventCount === 2 ? (
                        <>
                          <div className={cn("h-1 w-1 md:h-1.5 md:w-1.5 rounded-full", getEventColor(item.date))} />
                          <div className={cn("h-1 w-1 md:h-1.5 md:w-1.5 rounded-full", getEventColor(item.date))} />
                        </>
                      ) : (
                        <div className={cn(
                          "h-1 md:h-1.5 px-1 rounded-full text-[8px] md:text-[10px] font-bold text-white flex items-center justify-center",
                          getEventColor(item.date)
                        )}>
                          {eventCount}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Today indicator ring */}
                  {isCurrentDay && !isSelectedDay && (
                    <div className="absolute inset-0 rounded-lg ring-2 ring-primary/30 pointer-events-none" />
                  )}
                </motion.button>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Legend & Timezone */}
      <div className="border-t bg-muted/30 px-4 md:px-6 py-3 space-y-2">
        <div className="flex items-center justify-center gap-4 md:gap-6 text-xs flex-wrap">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-purple-500" />
            <span className="text-muted-foreground">Major Festivals</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-muted-foreground">National</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-teal-500" />
            <span className="text-muted-foreground">Regional</span>
          </div>
        </div>
        <div className="text-center text-muted-foreground text-xs">
          Timezone: Asia/Kolkata (IST) • UTC+5:30
        </div>
      </div>
    </div>
  )
}
