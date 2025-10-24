// components/calendar/events-list.tsx
"use client"

import { useState, useMemo } from "react"
import { Calendar, MapPin, Search, Sparkles, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import type { Event } from "@/lib/types"
import { cn } from "@/lib/utils"

interface EventsListProps {
  events: Event[]
  selectedDate?: Date | null
  onSelectEvent: (event: Event) => void
}

export function EventsList({ events, selectedDate, onSelectEvent }: EventsListProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter events by search query
  const filteredEvents = useMemo(() => {
    if (!searchQuery.trim()) return events

    const query = searchQuery.toLowerCase()
    return events.filter(event =>
      event.title.toLowerCase().includes(query) ||
      event.description.toLowerCase().includes(query) ||
      event.festival.toLowerCase().includes(query) ||
      event.region.toLowerCase().includes(query) ||
      event.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }, [events, searchQuery])

  // Filter events by selected date if provided
  const dateFilteredEvents = useMemo(() => {
    if (!selectedDate) return filteredEvents

    const selectedDateStr = selectedDate.toISOString().split("T")[0]
    return filteredEvents.filter(event => 
      event.startISO.split("T")[0] === selectedDateStr
    )
  }, [filteredEvents, selectedDate])

  // Sort events by date
  const sortedEvents = useMemo(() => {
    return [...dateFilteredEvents].sort((a, b) => 
      new Date(a.startISO).getTime() - new Date(b.startISO).getTime()
    )
  }, [dateFilteredEvents])

  // Group events by month
  const groupedEvents = useMemo(() => {
    const groups: Record<string, Event[]> = {}
    
    sortedEvents.forEach(event => {
      const date = new Date(event.startISO)
      const monthYear = date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
      
      if (!groups[monthYear]) {
        groups[monthYear] = []
      }
      groups[monthYear].push(event)
    })

    return groups
  }, [sortedEvents])

  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric",
      weekday: "short"
    })
  }

  const formatTime = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleTimeString("en-US", { 
      hour: "2-digit", 
      minute: "2-digit"
    })
  }

  const isPastEvent = (isoString: string) => {
    return new Date(isoString) < new Date()
  }

  const isUpcoming = (isoString: string) => {
    const eventDate = new Date(isoString)
    const today = new Date()
    const sevenDaysLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    return eventDate >= today && eventDate <= sevenDaysLater
  }

  const getMajorFestivalBadge = (event: Event) => {
    const majorFestivals = ["Diwali", "Holi", "Dussehra", "Eid ul-Fitr", "Christmas", "Ganesh Chaturthi"]
    return majorFestivals.includes(event.festival)
  }

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Header with search */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-base md:text-lg">
            {selectedDate ? "Events on this day" : "Upcoming Events"}
          </h2>
          <Badge variant="secondary" className="font-semibold">
            {sortedEvents.length}
          </Badge>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search festivals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9"
          />
        </div>
      </div>

      {/* Events list */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-1">
        {Object.keys(groupedEvents).length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <Calendar className="mx-auto mb-3 h-12 w-12 text-muted-foreground/50" />
            <p className="font-medium text-sm mb-1">
              {searchQuery ? "No matching events" : "No events scheduled"}
            </p>
            <p className="text-muted-foreground text-xs">
              {searchQuery ? "Try a different search term" : "Check back later for upcoming festivals"}
            </p>
          </div>
        ) : (
          Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
            <div key={monthYear} className="space-y-3">
              {/* Month header */}
              {!selectedDate && (
                <div className="flex items-center gap-2 px-1">
                  <div className="h-px flex-1 bg-border" />
                  <h3 className="font-semibold text-xs text-muted-foreground uppercase tracking-wider">
                    {monthYear}
                  </h3>
                  <div className="h-px flex-1 bg-border" />
                </div>
              )}

              {/* Events in this month */}
              {monthEvents.map((event) => {
                const isMajor = getMajorFestivalBadge(event)
                const isPast = isPastEvent(event.startISO)
                const isComingSoon = isUpcoming(event.startISO)

                return (
                  <button
                    key={event.id}
                    onClick={() => onSelectEvent(event)}
                    className={cn(
                      "w-full rounded-lg border bg-card p-3 md:p-4 text-left transition-all duration-200",
                      "hover:bg-accent hover:shadow-md hover:border-primary/50",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      isPast && "opacity-60"
                    )}
                  >
                    <div className="space-y-2.5">
                      {/* Title row */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm md:text-base leading-tight truncate">
                            {event.title}
                          </h3>
                          {isMajor && (
                            <div className="flex items-center gap-1 mt-1">
                              <Sparkles className="h-3 w-3 text-yellow-500" />
                              <span className="text-yellow-600 dark:text-yellow-500 text-xs font-medium">
                                Major Festival
                              </span>
                            </div>
                          )}
                        </div>
                        <Badge 
                          variant={isComingSoon ? "default" : "outline"} 
                          className={cn(
                            "shrink-0 text-xs font-medium",
                            isComingSoon && "bg-primary/90"
                          )}
                        >
                          {event.festival}
                        </Badge>
                      </div>

                      {/* Description */}
                      <p className="line-clamp-2 text-muted-foreground text-xs md:text-sm leading-relaxed">
                        {event.description}
                      </p>

                      {/* Meta information */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-muted-foreground text-xs">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          <span className="font-medium">{formatDate(event.startISO)}</span>
                        </div>

                        {event.muhurat && (
                          <div className="flex items-center gap-1.5 text-primary">
                            <Clock className="h-3.5 w-3.5" />
                            <span className="font-medium">Muhurat: {formatTime(event.muhurat.startISO)}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          <span>{event.region}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      {event.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {event.tags.slice(0, 3).map((tag) => (
                            <Badge 
                              key={tag} 
                              variant="secondary" 
                              className="text-[10px] md:text-xs px-2 py-0 h-5"
                            >
                              #{tag}
                            </Badge>
                          ))}
                          {event.tags.length > 3 && (
                            <Badge variant="secondary" className="text-[10px] md:text-xs px-2 py-0 h-5">
                              +{event.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Coming soon badge */}
                      {isComingSoon && !isPast && (
                        <div className="pt-1">
                          <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800 text-xs">
                            📅 Coming soon - within 7 days
                          </Badge>
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
