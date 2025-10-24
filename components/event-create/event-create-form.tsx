"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Sparkles, Clock } from "lucide-react"
import { GenerateFromPromptDialog } from "./generate-from-prompt-dialog"
import { MuhuratBlock } from "./muhurat-block"
import { PosterUpload } from "./poster-upload"
import { useToast } from "@/hooks/use-toast"
import type { Event } from "@/lib/types"

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  festival: z.string().min(1, "Festival name is required"),
  region: z.string().min(1, "Region is required"),
  startDate: z.string().min(1, "Start date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endDate: z.string().min(1, "End date is required"),
  endTime: z.string().min(1, "End time is required"),
  timezone: z.string().min(1, "Timezone is required"),
  languages: z.string().min(1, "At least one language is required"),
  venueAddress: z.string(),
  venueLat: z.string(),
  venueLng: z.string(),
  onlineLinks: z.string(),
  tags: z.string(),
})

type EventFormData = z.infer<typeof eventSchema>

export function EventCreateForm() {
  const [showGenerateDialog, setShowGenerateDialog] = useState(false)
  const [posterFile, setPosterFile] = useState<File | null>(null)
  const [muhurat, setMuhurat] = useState<Event["muhurat"] | null>(null)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      timezone: "Asia/Kolkata",
    },
  })

  const onSubmit = async (data: EventFormData) => {
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Event created successfully",
        description: `${data.title} has been added to the calendar`,
      })
    } catch (error) {
      toast({
        title: "Error creating event",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  const handleGeneratedEvent = (event: Partial<EventFormData>) => {
    Object.entries(event).forEach(([key, value]) => {
      setValue(key as keyof EventFormData, value as string)
    })
  }

  const handleFetchMuhurat = async () => {
    // Mock muhurat fetch
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setMuhurat({
      startISO: "2025-10-20T06:00:00Z",
      endISO: "2025-10-20T08:00:00Z",
      rule: "Auspicious time for Lakshmi Puja during Pradosh Kaal",
    })
    toast({
      title: "Muhurat fetched",
      description: "Auspicious time has been calculated",
    })
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b bg-card px-4 py-3 md:px-6">
        <h1 className="font-semibold text-lg">Create Event</h1>
        <p className="text-muted-foreground text-sm">Add a new festival or cultural event</p>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Generate from prompt button */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-medium text-sm">Quick Create with AI</h2>
                <p className="text-muted-foreground text-xs">Generate event details from a description</p>
              </div>
              <Button onClick={() => setShowGenerateDialog(true)} variant="outline" className="gap-2">
                <Sparkles className="h-4 w-4" />
                Generate
              </Button>
            </div>
          </Card>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <Card className="p-6">
              <h2 className="mb-4 font-semibold text-base">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Event Title *</Label>
                  <Input id="title" {...register("title")} placeholder="e.g., Diwali Celebration 2025" />
                  {errors.title && <p className="mt-1 text-destructive text-xs">{errors.title.message}</p>}
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    {...register("description")}
                    placeholder="Describe the event..."
                    rows={4}
                  />
                  {errors.description && <p className="mt-1 text-destructive text-xs">{errors.description.message}</p>}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="festival">Festival Name *</Label>
                    <Input id="festival" {...register("festival")} placeholder="e.g., Diwali" />
                    {errors.festival && <p className="mt-1 text-destructive text-xs">{errors.festival.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="region">Region *</Label>
                    <Input id="region" {...register("region")} placeholder="e.g., All India" />
                    {errors.region && <p className="mt-1 text-destructive text-xs">{errors.region.message}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="languages">Languages * (comma-separated)</Label>
                  <Input id="languages" {...register("languages")} placeholder="e.g., en, hi, te" />
                  {errors.languages && <p className="mt-1 text-destructive text-xs">{errors.languages.message}</p>}
                </div>
              </div>
            </Card>

            {/* Date & Time */}
            <Card className="p-6">
              <h2 className="mb-4 font-semibold text-base">Date & Time</h2>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input id="startDate" type="date" {...register("startDate")} />
                    {errors.startDate && <p className="mt-1 text-destructive text-xs">{errors.startDate.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="startTime">Start Time *</Label>
                    <Input id="startTime" type="time" {...register("startTime")} />
                    {errors.startTime && <p className="mt-1 text-destructive text-xs">{errors.startTime.message}</p>}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input id="endDate" type="date" {...register("endDate")} />
                    {errors.endDate && <p className="mt-1 text-destructive text-xs">{errors.endDate.message}</p>}
                  </div>

                  <div>
                    <Label htmlFor="endTime">End Time *</Label>
                    <Input id="endTime" type="time" {...register("endTime")} />
                    {errors.endTime && <p className="mt-1 text-destructive text-xs">{errors.endTime.message}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="timezone">Timezone *</Label>
                  <Input id="timezone" {...register("timezone")} />
                  {errors.timezone && <p className="mt-1 text-destructive text-xs">{errors.timezone.message}</p>}
                </div>
              </div>
            </Card>

            {/* Venue */}
            <Card className="p-6">
              <h2 className="mb-4 font-semibold text-base">Venue</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="venueAddress">Address</Label>
                  <Input id="venueAddress" {...register("venueAddress")} placeholder="Event venue address" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="venueLat">Latitude</Label>
                    <Input id="venueLat" {...register("venueLat")} placeholder="e.g., 28.6139" />
                  </div>

                  <div>
                    <Label htmlFor="venueLng">Longitude</Label>
                    <Input id="venueLng" {...register("venueLng")} placeholder="e.g., 77.2090" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="onlineLinks">Online Links (comma-separated)</Label>
                  <Input
                    id="onlineLinks"
                    {...register("onlineLinks")}
                    placeholder="e.g., https://zoom.us/j/123, https://youtube.com/live/abc"
                  />
                </div>
              </div>
            </Card>

            {/* Poster Upload */}
            <Card className="p-6">
              <h2 className="mb-4 font-semibold text-base">Event Poster</h2>
              <PosterUpload file={posterFile} onFileChange={setPosterFile} />
            </Card>

            {/* Muhurat */}
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-base">Auspicious Time (Muhurat)</h2>
                <Button
                  type="button"
                  onClick={handleFetchMuhurat}
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-transparent"
                >
                  <Clock className="h-4 w-4" />
                  Get Muhurat
                </Button>
              </div>
              <MuhuratBlock muhurat={muhurat} />
            </Card>

            {/* Tags */}
            <Card className="p-6">
              <h2 className="mb-4 font-semibold text-base">Tags</h2>
              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input id="tags" {...register("tags")} placeholder="e.g., festival, celebration, cultural" />
              </div>
            </Card>

            {/* Submit */}
            <div className="flex gap-3">
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Creating..." : "Create Event"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Generate Dialog */}
      <GenerateFromPromptDialog
        open={showGenerateDialog}
        onOpenChange={setShowGenerateDialog}
        onGenerate={handleGeneratedEvent}
      />
    </div>
  )
}
