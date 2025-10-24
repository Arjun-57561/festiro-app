"use client"

import { useState } from "react"
import { RemindersList } from "./reminders-list"
import { CreateReminderDialog } from "./create-reminder-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import type { Reminder } from "@/lib/types"

export function NotificationsView() {
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  // Mock reminders data
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      reminder_id: "1",
      event_id: "evt_1",
      user_id: "user_1",
      notify_atISO: "2025-10-19T10:00:00Z",
      channel: "push",
      constraints_applied: ["quiet-hours-respected"],
    },
    {
      reminder_id: "2",
      event_id: "evt_2",
      user_id: "user_1",
      notify_atISO: "2025-03-13T08:00:00Z",
      channel: "email",
      constraints_applied: [],
    },
    {
      reminder_id: "3",
      event_id: "evt_3",
      user_id: "user_1",
      notify_atISO: "2025-12-25T06:00:00Z",
      channel: "push",
      constraints_applied: ["quiet-hours-respected"],
    },
  ])

  const handleToggleReminder = (reminderId: string, enabled: boolean) => {
    console.log(`Reminder ${reminderId} ${enabled ? "enabled" : "disabled"}`)
  }

  const handleDeleteReminder = (reminderId: string) => {
    setReminders((prev) => prev.filter((r) => r.reminder_id !== reminderId))
  }

  const handleEditReminder = (reminderId: string) => {
    console.log(`Edit reminder ${reminderId}`)
  }

  const handleCreateReminder = (reminder: Omit<Reminder, "reminder_id">) => {
    const newReminder: Reminder = {
      ...reminder,
      reminder_id: `reminder_${Date.now()}`,
    }
    setReminders((prev) => [...prev, newReminder])
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b bg-card px-4 py-3 md:px-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-lg">Notifications & Reminders</h1>
            <p className="text-muted-foreground text-sm">Manage your event reminders and notifications</p>
          </div>

          <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Reminder</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="mx-auto max-w-4xl">
          <RemindersList
            reminders={reminders}
            onToggle={handleToggleReminder}
            onDelete={handleDeleteReminder}
            onEdit={handleEditReminder}
          />
        </div>
      </div>

      {/* Create Dialog */}
      <CreateReminderDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onCreate={handleCreateReminder}
      />
    </div>
  )
}
