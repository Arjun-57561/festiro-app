"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Volume2 } from "lucide-react"
import type { LessonCard as LessonCardType } from "@/lib/types"
import { useState } from "react"

interface LessonCardProps {
  lesson: LessonCardType
  onOpen: () => void
}

export function LessonCard({ lesson, onOpen }: LessonCardProps) {
  const [isPlayingTTS, setIsPlayingTTS] = useState(false)

  const handlePlayTTS = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsPlayingTTS(true)
    // Mock TTS
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsPlayingTTS(false)
  }

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      <div className="flex-1 space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="secondary" className="text-xs">
            {lesson.language.toUpperCase()}
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={handlePlayTTS}
            disabled={isPlayingTTS}
          >
            <Volume2 className={`h-4 w-4 ${isPlayingTTS ? "animate-pulse" : ""}`} />
            <span className="sr-only">Play audio</span>
          </Button>
        </div>

        <div>
          <h3 className="font-semibold text-balance text-sm leading-tight">{lesson.title}</h3>
          <p className="mt-2 line-clamp-3 text-muted-foreground text-xs leading-relaxed">{lesson.summary}</p>
        </div>

        {lesson.tags && (
          <div className="flex flex-wrap gap-1">
            {lesson.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="border-t p-3">
        <Button onClick={onOpen} variant="ghost" className="w-full gap-2 text-sm">
          <BookOpen className="h-4 w-4" />
          Read Lesson
        </Button>
      </div>
    </Card>
  )
}
