"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Reminder } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

interface CreateReminderDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreate: (reminder: Omit<Reminder, "reminder_id">) => void
}

export function CreateReminderDialog({ open, onOpenChange, onCreate }: CreateReminderDialogProps) {
  const [eventId, setEventId] = useState("")
  const [notifyDate, setNotifyDate] = useState("")
  const [notifyTime, setNotifyTime] = useState("")
  const [channel, setChannel] = useState<"push" | "email" | "sms">("push")
  const { toast } = useToast()

  const handleCreate = () => {
    if (!eventId || !notifyDate || !notifyTime) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const notifyAtISO = new Date(`${notifyDate}T${notifyTime}`).toISOString()

    onCreate({
      event_id: eventId,
      user_id: "user_1",
      notify_atISO: notifyAtISO,
      channel,
      constraints_applied: ["quiet-hours-respected"],
    })

    toast({
      title: "Reminder created",
      description: "You'll be notified at the scheduled time",
    })

    // Reset form
    setEventId("")
    setNotifyDate("")
    setNotifyTime("")
    setChannel("push")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Reminder</DialogTitle>
          <DialogDescription>Set up a new reminder for an event</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="eventId">Event ID *</Label>
            <Input
              id="eventId"
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              placeholder="e.g., evt_123"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="notifyDate">Notify Date *</Label>
              <Input id="notifyDate" type="date" value={notifyDate} onChange={(e) => setNotifyDate(e.target.value)} />
            </div>

            <div>
              <Label htmlFor="notifyTime">Notify Time *</Label>
              <Input id="notifyTime" type="time" value={notifyTime} onChange={(e) => setNotifyTime(e.target.value)} />
            </div>
          </div>

          <div>
            <Label htmlFor="channel">Notification Channel *</Label>
            <Select value={channel} onValueChange={(value: any) => setChannel(value)}>
              <SelectTrigger id="channel">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="push">Push Notification</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button onClick={() => onOpenChange(false)} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleCreate} className="flex-1">
              Create Reminder
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
