"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Bell, Globe, Tag } from "lucide-react"
import type { Event } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

interface EventDrawerProps {
  event: Event
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EventDrawer({ event, open, onOpenChange }: EventDrawerProps) {
  const { toast } = useToast()

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleSetReminder = () => {
    toast({
      title: "Reminder set",
      description: `You'll be notified about ${event.title}`,
    })
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-balance leading-tight">{event.title}</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Description */}
          <div>
            <p className="text-sm leading-relaxed">{event.description}</p>
          </div>

          {/* Date & Time */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div className="flex-1 space-y-1">
                <p className="font-medium text-sm">Start</p>
                <p className="text-muted-foreground text-sm">{formatDateTime(event.startISO)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div className="flex-1 space-y-1">
                <p className="font-medium text-sm">End</p>
                <p className="text-muted-foreground text-sm">{formatDateTime(event.endISO)}</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
            <div className="flex-1 space-y-1">
              <p className="font-medium text-sm">Region</p>
              <p className="text-muted-foreground text-sm">{event.region}</p>
            </div>
          </div>

          {/* Languages */}
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

          {/* Tags */}
          {event.tags.length > 0 && (
            <div className="flex items-start gap-3">
              <Tag className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div className="flex-1 space-y-2">
                <p className="font-medium text-sm">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Muhurat (if available) */}
          {event.muhurat && (
            <div className="rounded-lg border bg-muted/50 p-4">
              <h3 className="mb-2 font-medium text-sm">Auspicious Time (Muhurat)</h3>
              <p className="text-muted-foreground text-sm">
                {formatDateTime(event.muhurat.startISO)} - {formatDateTime(event.muhurat.endISO)}
              </p>
              <p className="mt-2 text-muted-foreground text-xs">{event.muhurat.rule}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Button onClick={handleSetReminder} className="flex-1 gap-2">
              <Bell className="h-4 w-4" />
              Set Reminder
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
