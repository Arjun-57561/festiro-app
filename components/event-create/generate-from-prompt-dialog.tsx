"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

interface GenerateFromPromptDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onGenerate: (event: any) => void
}

export function GenerateFromPromptDialog({ open, onOpenChange, onGenerate }: GenerateFromPromptDialogProps) {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockEvent = {
        title: "Diwali Celebration 2025",
        description:
          "Join us for a grand Diwali celebration with traditional rituals, cultural performances, and festive activities.",
        festival: "Diwali",
        region: "Mumbai, Maharashtra",
        startDate: "2025-10-20",
        startTime: "18:00",
        endDate: "2025-10-20",
        endTime: "22:00",
        languages: "en, hi, mr",
        tags: "festival, diwali, celebration, lights",
      }

      onGenerate(mockEvent)
      onOpenChange(false)
      setPrompt("")
    } catch (error) {
      console.error("Failed to generate event:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Event from Prompt</DialogTitle>
          <DialogDescription>
            Describe the event you want to create, and AI will generate the details for you.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Create a Diwali celebration event in Mumbai on October 20th, 2025, from 6 PM to 10 PM with traditional rituals and cultural performances..."
            rows={6}
            disabled={isGenerating}
          />

          <div className="flex gap-2">
            <Button onClick={() => onOpenChange(false)} variant="outline" className="flex-1" disabled={isGenerating}>
              Cancel
            </Button>
            <Button onClick={handleGenerate} className="flex-1 gap-2" disabled={!prompt.trim() || isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
