// components/calendar/calendar-view.tsx
"use client"

import { useState, useMemo } from "react"
import { CalendarGrid } from "./calendar-grid"
import { EventsList } from "./events-list"
import { EventDrawer } from "./event-drawer"
import type { Event } from "@/lib/types"
import { ChevronLeft, ChevronRight, Filter, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [regionFilter, setRegionFilter] = useState<string>("all")
  const [festivalFilter, setFestivalFilter] = useState<string>("all")

  // Real Indian festival data for 2025-2026
  const allEvents: Event[] = [
    {
      id: "1",
      title: "Makar Sankranti",
      description: "Harvest festival marking the sun's transition into Capricorn. Celebrated with kite flying, bonfires, and traditional sweets.",
      languages: ["en", "hi", "mr", "gu"],
      festival: "Makar Sankranti",
      region: "All India",
      startISO: "2025-01-14T00:00:00+05:30",
      endISO: "2025-01-14T23:59:59+05:30",
      tz: "Asia/Kolkata",
      venue: { lat: 0, lng: 0, address: "Pan-India" },
      online_links: [],
      tags: ["harvest", "kite-flying", "sweets", "major-festival"],
      organizer_id: "system",
    },
    {
      id: "2",
      title: "Republic Day",
      description: "Commemorates the adoption of India's Constitution. Grand parade at Rajpath, New Delhi.",
      languages: ["en", "hi"],
      festival: "Republic Day",
      region: "All India",
      startISO: "2025-01-26T00:00:00+05:30",
      endISO: "2025-01-26T23:59:59+05:30",
      tz: "Asia/Kolkata",
      venue: { lat: 28.6139, lng: 77.2090, address: "Rajpath, New Delhi" },
      online_links: [],
      tags: ["national", "patriotic", "parade"],
      organizer_id: "system",
    },
    {
      id: "3",
      title: "Maha Shivaratri",
      description: "Night dedicated to Lord Shiva. Devotees observe fasts and perform night-long vigils.",
      languages: ["en", "hi", "ta", "te"],
      festival: "Maha Shivaratri",
      region: "All India",
      startISO: "2025-02-26T00:00:00+05:30",
      endISO: "2025-02-27T06:00:00+05:30",
      tz: "Asia/Kolkata",
      venue: { lat: 0, lng: 0, address: "Temples across India" },
      online_links: [],
      tags: ["religious", "shiva", "fasting", "major-festival"],
      organizer_id: "system",
      muhurat: {
        startISO: "2025-02-26T18:30:00+05:30",
        endISO: "2025-02-27T02:15:00+05:30",
        rule: "Nishita Kaal - Most auspicious time for worship"
      }
    },
    {
      id: "4",
      title: "Holi",
      description: "Festival of Colors celebrating the victory of good over evil. Play with colors, enjoy traditional drinks.",
      languages: ["en", "hi", "gu", "mr"],
      festival: "Holi",
      region: "North India",
      startISO: "2025-03-14T00:00:00+05:30",
      endISO: "2025-03-14T23:59:59+05:30",
      tz: "Asia/Kolkata",
      venue: { lat: 0, lng: 0, address: "North & Central India" },
      online_links: [],
      tags: ["colors", "spring", "major-festival", "outdoor"],
      organizer_id: "system",
    },
    {
      id: "5",
      title: "Ugadi",
      description: "Telugu and Kannada New Year. Families prepare special dishes like Ugadi Pachadi representing life's emotions.",
      languages: ["en", "te", "kn"],
      festival: "Ugadi",
      region: "South India",
      startISO: "2025-03-30T00:00:00+05:30",
      endISO: "2025-03-30T23:59:59+05:30",
      tz: "Asia/Kolkata",
      venue: { lat: 0, lng: 0, address: "Andhra Pradesh, Telangana, Karnataka" },
      online_links: [],
      tags: ["new-year", "regional", "food"],
      organizer_id: "system",
    },
    {
      id: "6",
      title: "Ram Navami",
      description: "Celebrates the birth of Lord Rama. Devotees recite Ramayana and visit temples.",
      languages: ["en", "hi", "mr", "te"],
      festival: "Ram Navami",
      region: "All India",
      startISO: "2025-04-06T00:00:00+05:30",
      endISO: "2025-04-06T23:59:59+05:30",
      tz: "Asia/Kolkata",
      venue: { lat: 0, lng: 0, address: "Pan-India" },
      online_links: [],
      tags: ["religious", "rama", "major-festival"],
      organizer_id: "system",
      muhurat: {
        startISO: "2025-04-06T11:00:00+05:30",
        endISO: "2025-04-06T13:30:00+05:30",
        rule: "Madhyahna Kaal - Ideal time for puja"
      }
    },
    {
      id: "7",
      title: "Eid ul-Fitr",
      description: "Marks the end of Ramadan. Celebrated with prayers, feasts, and charity.",
      languages: ["en", "hi", "ur"],
      festival: "Eid ul-Fitr",
      region: "All India",
      startISO: "2025-03-31T00:00:00+05:30",
      endISO: "2025-03-31T23:59:59+05:30",
      tz: "Asia/Kolkata",
      venue: { lat: 0, lng: 0, address: "Pan-India" },
      online_links: [],
      tags: ["islamic", "prayer", "feast", "major-festival"],
      organizer_id: "system",
    },
    {
      id: "8",
      title: "Independence Day",
      description: "Celebrates India's independence from British rule. Flag hoisting and cultural programs.",
      languages: ["en", "hi"],
      festival: "Independence Day",
      region: "All India",
      startISO: "2025-08-15T00:00:00+05:30",
      endISO: "2025-08-15T23:59:59+05:30",
      tz: "Asia/Kolkata",
      venue: { lat: 28.6562, lng: 77.2410, address: "Red Fort, Delhi" },
      online_links: [],
      tags: ["national", "patriotic", "flag"],
      organizer_id: "system",
    },
    {
      id: "9",
      title: "Janmashtami",
      description: "Celebrates Lord Krishna's birth. Midnight celebrations with devotional songs and Dahi Handi.",
      languages: ["en", "hi", "mr", "gu"],
      festival: "Janmashtami",
      region: "All India",
      startISO: "2025-08-16T00:00:00+05:30",
      endISO: "2025-08-17T06:00:00+05:30",
      tz: "Asia/Kolkata",
      venue: { lat: 0, lng: 0, address: "Pan-India" },
      online_links: [],
      tags: ["krishna", "midnight", "major-festival", "dahi-handi"],
      organizer_id: "system",
      muhurat: {
        startISO: "2025-08-16T23:30:00+05:30",
        endISO: "2025-08-17T00:45:00+05:30",
        rule: "Nishita Kaal - Krishna's birth time"
      }
    },
    {
      id: "10",
      title: "Ganesh Chaturthi",
      description: "Honors Lord Ganesha's birth. 10-day celebration with elaborate pandals and immersion ceremonies.",
      languages: ["en", "hi", "mr"],
      festival: "Ganesh Chaturthi",
      region: "West India",
      startISO: "2025-08-27T00:00:00+05:30",
      endISO: "2025-09-05T23:59:59+05:30",
      tz: "Asia/Kolkata",
      venue: { lat: 19.0760, lng: 72.8777, address: "Maharashtra (main)" },
      online_links: [],
      tags: ["ganesha", "immersion", "major-festival", "10-day"],
      organizer_id: "system",
      muhurat: {
        startISO: "2025-08-27T10:45:00+05:30",
        endISO: "2025-08-27T13:15:00+05:30",
        rule: "Madhyahna Kaal - Best for installation"
      }
    },
    {
      id: "11",
      title: "Onam",
      description: "Kerala's harvest festival celebrating King Mahabali's return. Features Pookalam, Onasadya, and boat races.",
      languages: ["en", "ml"],
      festival: "Onam",
      region: "South India",
      startISO: "2025-09-05T00:00:00+05:30",
      endISO: "2025-09-15T23:59:59+05:30",
      tz: "Asia/Kolkata",
      venue: { lat: 9.9312, lng: 76.2673, address: "Kerala" },
      online_links: [],
      tags: ["harvest", "kerala", "regional", "boat-race", "feast"],
      organizer_id: "system",
    },
    {
      id: "12",
      title: "Dussehra",
      description: "Celebrates victory of good over evil. Ram Lila performances and Ravana effigies burnt.",
      languages: ["en", "hi", "bn", "te"],
      festival: "Dussehra",
      region: "All India",
      startISO: "2025-10-02T00:00:00+05:30",
      endISO: "2025-10-02T23:59:59+05:30",
      tz: "Asia/Kolkata",
      venue: { lat: 0, lng: 0, address: "Pan-India" },
      online_links: [],
      tags: ["rama", "ravana", "major-festival", "victory"],
      organizer_id: "system",
    },
    {
      id: "13",
      title: "Diwali",
      description: "Festival of Lights celebrating triumph of light over darkness. Lamps, fireworks, sweets, and Lakshmi puja.",
      languages: ["en", "hi", "gu", "mr", "te"],
      festival: "Diwali",
      region: "All India",
      startISO: "2025-10-20T00:00:00+05:30",
      endISO: "2025-10-20T23:59:59+05:30",
      tz: "Asia/Kolkata",
      venue: { lat: 0, lng: 0, address: "Pan-India" },
      online_links: [],
      tags: ["lights", "lakshmi", "major-festival", "fireworks", "sweets"],
      organizer_id: "system",
      muhurat: {
        startISO: "2025-10-20T18:15:00+05:30",
        endISO: "2025-10-20T20:00:00+05:30",
        rule: "Lakshmi Puja Muhurat - Most auspicious time"
      }
    },
    {
      id: "14",
      title: "Bhai Dooj",
      description: "Celebrates brother-sister bond. Sisters apply tilak on brothers' foreheads for their well-being.",
      languages: ["en", "hi"],
      festival: "Bhai Dooj",
      region: "North India",
      startISO: "2025-10-22T00:00:00+05:30",
      endISO: "2025-10-22T23:59:59+05:30",
      tz: "Asia/Kolkata",
      venue: { lat: 0, lng: 0, address: "North India" },
      online_links: [],
      tags: ["family", "siblings", "tilak"],
      organizer_id: "system",
    },
    {
      id: "15",
      title: "Guru Nanak Jayanti",
      description: "Celebrates birth of Guru Nanak, founder of Sikhism. Processions, prayers, and langar.",
      languages: ["en", "pa", "hi"],
      festival: "Guru Nanak Jayanti",
      region: "North India",
      startISO: "2025-11-05T00:00:00+05:30",
      endISO: "2025-11-05T23:59:59+05:30",
      tz: "Asia/Kolkata",
      venue: { lat: 31.6200, lng: 74.8765, address: "Golden Temple, Amritsar" },
      online_links: [],
      tags: ["sikh", "guru-nanak", "langar", "procession"],
      organizer_id: "system",
    },
    {
      id: "16",
      title: "Christmas",
      description: "Celebrates birth of Jesus Christ. Midnight mass, Christmas trees, carols, and family gatherings.",
      languages: ["en", "hi"],
      festival: "Christmas",
      region: "All India",
      startISO: "2025-12-25T00:00:00+05:30",
      endISO: "2025-12-25T23:59:59+05:30",
      tz: "Asia/Kolkata",
      venue: { lat: 0, lng: 0, address: "Pan-India" },
      online_links: [],
      tags: ["christian", "christmas-tree", "major-festival", "carols"],
      organizer_id: "system",
    }
  ]

  // Filter events based on selected filters
  const filteredEvents = useMemo(() => {
    return allEvents.filter(event => {
      const matchesRegion = regionFilter === "all" || event.region === regionFilter || event.region === "All India"
      const matchesFestival = festivalFilter === "all" || event.festival === festivalFilter
      return matchesRegion && matchesFestival
    })
  }, [regionFilter, festivalFilter])

  // Get events for selected month
  const monthEvents = useMemo(() => {
    return filteredEvents.filter(event => {
      const eventDate = new Date(event.startISO)
      return eventDate.getMonth() === currentDate.getMonth() && 
             eventDate.getFullYear() === currentDate.getFullYear()
    })
  }, [filteredEvents, currentDate])

  // Get unique regions and festivals for filters
  const regions = ["all", ...new Set(allEvents.map(e => e.region))]
  const festivals = ["all", ...new Set(allEvents.map(e => e.festival))]

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    setSelectedDate(null)
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    setSelectedDate(null)
  }

  const handleToday = () => {
    const today = new Date()
    setCurrentDate(today)
    setSelectedDate(today)
  }

  const monthName = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })

  // Count active filters
  const activeFiltersCount = (regionFilter !== "all" ? 1 : 0) + (festivalFilter !== "all" ? 1 : 0)

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-card px-4 py-4 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-bold text-xl md:text-2xl flex items-center gap-2">
              <CalendarDays className="h-6 w-6 text-primary" />
              Festival Calendar
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Discover and track Indian cultural celebrations
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Today button */}
            <Button variant="outline" size="sm" onClick={handleToday}>
              Today
            </Button>

            {/* Month navigation */}
            <div className="flex items-center gap-1 border rounded-lg p-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handlePreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous month</span>
              </Button>
              <div className="min-w-[140px] text-center font-semibold text-sm px-2">
                {monthName}
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleNextMonth}>
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next month</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Filter className="h-4 w-4" />
            <span className="font-medium">Filters:</span>
          </div>

          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="w-[160px] h-9">
              <SelectValue placeholder="All Regions" />
            </SelectTrigger>
            <SelectContent>
              {regions.map(region => (
                <SelectItem key={region} value={region}>
                  {region === "all" ? "All Regions" : region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={festivalFilter} onValueChange={setFestivalFilter}>
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue placeholder="All Festivals" />
            </SelectTrigger>
            <SelectContent>
              {festivals.map(festival => (
                <SelectItem key={festival} value={festival}>
                  {festival === "all" ? "All Festivals" : festival}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setRegionFilter("all")
                setFestivalFilter("all")
              }}
              className="h-9 px-2 text-xs"
            >
              Clear filters
              <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0">
                {activeFiltersCount}
              </Badge>
            </Button>
          )}

          <div className="ml-auto text-muted-foreground text-sm">
            {monthEvents.length} event{monthEvents.length !== 1 ? 's' : ''} this month
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 overflow-hidden p-4 md:flex-row md:gap-6 md:p-6">
        {/* Calendar grid */}
        <div className="flex-1 overflow-y-auto">
          <CalendarGrid
            currentDate={currentDate}
            events={filteredEvents}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </div>

        {/* Events list */}
        <div className="md:w-80 lg:w-96 overflow-y-auto">
          <EventsList 
            events={monthEvents} 
            selectedDate={selectedDate}
            onSelectEvent={setSelectedEvent} 
          />
        </div>
      </div>

      {/* Event drawer */}
      {selectedEvent && (
        <EventDrawer event={selectedEvent} open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)} />
      )}
    </div>
  )
}
