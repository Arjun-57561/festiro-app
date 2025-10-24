"use client"

import { useState } from "react"
import { CalendarGrid } from "./calendar-grid"
import { EventsList } from "./events-list"
import { EventDrawer } from "./event-drawer"
import type { Event } from "@/lib/types"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  // Mock events data
  const mockEvents: Event[] = [
    {
      id: "1",
      title: "Diwali",
      description: "Festival of Lights",
      languages: ["en", "hi"],
      festival: "Diwali",
      region: "All India",
      startISO: "2025-10-20T00:00:00Z",
      endISO: "2025-10-20T23:59:59Z",
      tz: "Asia/Kolkata",
      venue: { lat: 0, lng: 0, address: "" },
      online_links: [],
      tags: ["festival", "lights"],
      organizer_id: "system",
    },
    {
      id: "2",
      title: "Holi",
      description: "Festival of Colors",
      languages: ["en", "hi"],
      festival: "Holi",
      region: "North India",
      startISO: "2025-03-14T00:00:00Z",
      endISO: "2025-03-14T23:59:59Z",
      tz: "Asia/Kolkata",
      venue: { lat: 0, lng: 0, address: "" },
      online_links: [],
      tags: ["festival", "colors"],
      organizer_id: "system",
    },
  ]

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const monthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b bg-card px-4 py-3 md:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-lg">Festival Calendar</h1>
            <p className="text-muted-foreground text-sm">Discover and track cultural celebrations</p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous month</span>
            </Button>
            <div className="min-w-[140px] text-center font-medium text-sm">{monthName}</div>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next month</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-4 md:flex-row md:p-6">
        {/* Calendar grid */}
        <div className="flex-1">
          <CalendarGrid
            currentDate={currentDate}
            events={mockEvents}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </div>

        {/* Events list */}
        <div className="md:w-80">
          <EventsList events={mockEvents} onSelectEvent={setSelectedEvent} />
        </div>
      </div>

      {/* Event drawer */}
      {selectedEvent && (
        <EventDrawer event={selectedEvent} open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)} />
      )}
    </div>
  )
}
