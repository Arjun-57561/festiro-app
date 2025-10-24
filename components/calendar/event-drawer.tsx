// components/calendar/event-drawer.tsx
"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Bell, 
  Globe, 
  Tag, 
  Share2, 
  Download,
  Sparkles,
  Sun,
  Moon
} from "lucide-react"
import type { Event } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

interface EventDrawerProps {
  event: Event
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EventDrawer({ event, open, onOpenChange }: EventDrawerProps) {
  const { toast } = useToast()
  const [isReminderSet, setIsReminderSet] = useState(false)

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleSetReminder = () => {
    // Check if browser supports notifications
    if ("Notification" in window) {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          setIsReminderSet(true)
          toast({
            title: "✅ Reminder set",
            description: `You'll be notified about ${event.title} one day before`,
          })
          
          // In production, this would save to backend
          localStorage.setItem(`reminder_${event.id}`, "true")
        } else {
          toast({
            title: "⚠️ Permission denied",
            description: "Please enable notifications in your browser settings",
            variant: "destructive"
          })
        }
      })
    } else {
      toast({
        title: "Reminder saved",
        description: `We'll remind you about ${event.title}`,
      })
      setIsReminderSet(true)
    }
    
    // Don't close drawer immediately
  }

  const handleShare = async () => {
    const shareData = {
      title: event.title,
      text: `${event.title} - ${event.description}\n\nDate: ${formatDateTime(event.startISO)}`,
      url: window.location.href
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        toast({
          title: "✅ Shared successfully",
          description: "Thanks for sharing this festival!",
        })
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(
          `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`
        )
        toast({
          title: "📋 Copied to clipboard",
          description: "Share link copied! Paste it anywhere.",
        })
      }
    } catch (error) {
      console.error("Share failed:", error)
    }
  }

  const handleAddToCalendar = () => {
    // Generate Google Calendar URL
    const startDate = new Date(event.startISO).toISOString().replace(/-|:|\.\d\d\d/g, "")
    const endDate = new Date(event.endISO).toISOString().replace(/-|:|\.\d\d\d/g, "")
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.region)}`
    
    window.open(calendarUrl, "_blank", "noopener,noreferrer")
    
    toast({
      title: "📅 Opening Google Calendar",
      description: "Add this festival to your calendar",
    })
  }

  const majorFestivals = ["Diwali", "Holi", "Dussehra", "Eid ul-Fitr", "Christmas", "Ganesh Chaturthi"]
  const isMajorFestival = majorFestivals.includes(event.festival)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <SheetTitle className="text-balance leading-tight text-xl pr-2">
                {event.title}
              </SheetTitle>
              {isMajorFestival && (
                <div className="flex items-center gap-1.5 mt-2">
                  <Sparkles className="h-4 w-4 text-yellow-500" />
                  <span className="text-yellow-600 dark:text-yellow-500 text-sm font-semibold">
                    Major Festival
                  </span>
                </div>
              )}
            </div>
            <Badge variant="secondary" className="shrink-0 text-sm px-3 py-1">
              {event.festival}
            </Badge>
          </div>
          <SheetDescription className="text-base leading-relaxed">
            {event.description}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-2">
            <Button 
              onClick={handleSetReminder} 
              variant={isReminderSet ? "secondary" : "default"}
              className="gap-2"
              disabled={isReminderSet}
            >
              <Bell className="h-4 w-4" />
              {isReminderSet ? "Reminder Set" : "Set Reminder"}
            </Button>
            <Button onClick={handleShare} variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>

          <Button onClick={handleAddToCalendar} variant="outline" className="w-full gap-2">
            <Download className="h-4 w-4" />
            Add to Google Calendar
          </Button>

          <Separator />

          {/* Date & Time Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              Date & Time
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Calendar className="mt-0.5 h-5 w-5 text-primary" />
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-sm">Event Date</p>
                  <p className="text-sm">{formatDateTime(event.startISO)}</p>
                  <p className="text-muted-foreground text-xs">
                    {formatTime(event.startISO)} - {formatTime(event.endISO)}
                  </p>
                </div>
              </div>

              {/* Muhurat section */}
              {event.muhurat && (
                <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Sun className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold text-sm">Auspicious Time (Muhurat)</h4>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="font-medium">
                        {formatTime(event.muhurat.startISO)} - {formatTime(event.muhurat.endISO)}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs pl-6 italic">
                      {event.muhurat.rule}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Location & Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
              Location & Details
            </h3>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-sm">Region</p>
                  <p className="text-muted-foreground text-sm">{event.region}</p>
                  {event.venue.address && event.venue.address !== "Pan-India" && (
                    <p className="text-muted-foreground text-xs">{event.venue.address}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div className="flex-1 space-y-1">
                  <p className="font-medium text-sm">Timezone</p>
                  <p className="text-muted-foreground text-sm">{event.tz}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div className="flex-1 space-y-2">
                  <p className="font-medium text-sm">Languages</p>
                  <div className="flex flex-wrap gap-2">
                    {event.languages.map((lang) => (
                      <Badge key={lang} variant="secondary">
                        {lang.toUpperCase()}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Tags */}
          {event.tags.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Cultural significance (placeholder for future enhancement) */}
          <div className="rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <h4 className="font-semibold text-sm">Did you know?</h4>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed">
              {event.festival} is celebrated with great enthusiasm across India. Each region has its unique way of observing this special occasion, making it a vibrant part of Indian cultural heritage.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
