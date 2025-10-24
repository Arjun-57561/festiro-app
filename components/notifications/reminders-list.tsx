"use client"

import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Bell, Mail, MessageSquare, Trash2, Edit, Clock } from "lucide-react"
import type { Reminder } from "@/lib/types"
import { useState } from "react"

interface RemindersListProps {
  reminders: Reminder[]
  onToggle: (reminderId: string, enabled: boolean) => void
  onDelete: (reminderId: string) => void
  onEdit: (reminderId: string) => void
}

const channelIcons = {
  push: Bell,
  email: Mail,
  sms: MessageSquare,
}

export function RemindersList({ reminders, onToggle, onDelete, onEdit }: RemindersListProps) {
  const [enabledReminders, setEnabledReminders] = useState<Set<string>>(new Set(reminders.map((r) => r.reminder_id)))

  const handleToggle = (reminderId: string, enabled: boolean) => {
    setEnabledReminders((prev) => {
      const next = new Set(prev)
      if (enabled) {
        next.add(reminderId)
      } else {
        next.delete(reminderId)
      }
      return next
    })
    onToggle(reminderId, enabled)
  }

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const sortedReminders = [...reminders].sort(
    (a, b) => new Date(a.notify_atISO).getTime() - new Date(b.notify_atISO).getTime(),
  )

  if (reminders.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Bell className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="mb-2 font-medium">No reminders yet</h3>
        <p className="text-muted-foreground text-sm">
          Create your first reminder to get notified about upcoming events
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {sortedReminders.map((reminder) => {
        const Icon = channelIcons[reminder.channel]
        const isEnabled = enabledReminders.has(reminder.reminder_id)
        const hasQuietHours = reminder.constraints_applied.includes("quiet-hours-respected")

        return (
          <Card key={reminder.reminder_id} className="p-4">
            <div className="flex items-start gap-4">
              {/* Channel icon */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">Event Reminder</p>
                      {hasQuietHours && (
                        <Badge variant="secondary" className="text-xs">
                          <Clock className="mr-1 h-3 w-3" />
                          Quiet Hours
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 text-muted-foreground text-sm">{formatDateTime(reminder.notify_atISO)}</p>
                  </div>

                  <Switch
                    checked={isEnabled}
                    onCheckedChange={(checked) => handleToggle(reminder.reminder_id, checked)}
                  />
                </div>

                {/* Channel badge */}
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {reminder.channel.toUpperCase()}
                  </Badge>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(reminder.reminder_id)} className="h-8 gap-2">
                    <Edit className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(reminder.reminder_id)}
                    className="h-8 gap-2 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
