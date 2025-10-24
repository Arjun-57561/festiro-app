"use client"

import { Calendar, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Event } from "@/lib/types"

interface EventsListProps {
  events: Event[]
  onSelectEvent: (event: Event) => void
}

export function EventsList({ events, onSelectEvent }: EventsListProps) {
  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => new Date(a.startISO).getTime() - new Date(b.startISO).getTime())

  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-base">Upcoming Events</h2>
        <Badge variant="secondary">{events.length}</Badge>
      </div>

      <div className="space-y-3">
        {sortedEvents.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <Calendar className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">No events scheduled</p>
          </div>
        ) : (
          sortedEvents.map((event) => (
            <button
              key={event.id}
              onClick={() => onSelectEvent(event)}
              className="w-full rounded-lg border bg-card p-4 text-left transition-colors hover:bg-muted"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-sm leading-tight">{event.title}</h3>
                  <Badge variant="outline" className="shrink-0 text-xs">
                    {event.festival}
                  </Badge>
                </div>

                <p className="line-clamp-2 text-muted-foreground text-xs leading-relaxed">{event.description}</p>

                <div className="flex items-center gap-4 text-muted-foreground text-xs">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(event.startISO)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{event.region}</span>
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
