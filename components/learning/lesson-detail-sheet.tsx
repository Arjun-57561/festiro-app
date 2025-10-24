"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Volume2, MapPin } from "lucide-react"
import type { LessonCard } from "@/lib/types"
import { useState } from "react"

interface LessonDetailSheetProps {
  lesson: LessonCard
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LessonDetailSheet({ lesson, open, onOpenChange }: LessonDetailSheetProps) {
  const [isPlayingTTS, setIsPlayingTTS] = useState(false)

  const handlePlayTTS = async () => {
    setIsPlayingTTS(true)
    // Mock TTS
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsPlayingTTS(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-balance leading-tight">{lesson.title}</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{lesson.language.toUpperCase()}</Badge>
            {lesson.region && (
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <MapPin className="h-3.5 w-3.5" />
                <span>{lesson.region}</span>
              </div>
            )}
          </div>

          {/* Summary */}
          <div>
            <p className="text-sm leading-relaxed">{lesson.summary}</p>
          </div>

          {/* Content */}
          <div className="rounded-lg border bg-muted/50 p-4">
            <p className="text-sm leading-relaxed">{lesson.content}</p>
          </div>

          {/* Tags */}
          {lesson.tags && (
            <div className="space-y-2">
              <h3 className="font-medium text-sm">Topics</h3>
              <div className="flex flex-wrap gap-2">
                {lesson.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* TTS Button */}
          <Button onClick={handlePlayTTS} disabled={isPlayingTTS} className="w-full gap-2">
            <Volume2 className={isPlayingTTS ? "animate-pulse" : ""} />
            {isPlayingTTS ? "Playing..." : "Listen to Lesson"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
