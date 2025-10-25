// components/learning/lesson-card.tsx
"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  BookOpen, 
  Volume2, 
  Clock, 
  Award,
  Sparkles,
  TrendingUp
} from "lucide-react"
import type { LessonCard as LessonCardType } from "@/lib/types"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface LessonCardProps {
  lesson: LessonCardType
  onOpen: () => void
}

export function LessonCard({ lesson, onOpen }: LessonCardProps) {
  const [isPlayingTTS, setIsPlayingTTS] = useState(false)

  const handlePlayTTS = async (e: React.MouseEvent) => {
    e.stopPropagation()
    
    if ('speechSynthesis' in window) {
      if (isPlayingTTS) {
        window.speechSynthesis.cancel()
        setIsPlayingTTS(false)
        return
      }

      setIsPlayingTTS(true)
      const utterance = new SpeechSynthesisUtterance(lesson.summary)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 1

      utterance.onend = () => setIsPlayingTTS(false)
      utterance.onerror = () => setIsPlayingTTS(false)

      window.speechSynthesis.speak(utterance)
    }
  }

  const getDifficultyColor = (diff?: string) => {
    switch (diff) {
      case "beginner": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      case "intermediate": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "advanced": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  const getCategoryIcon = (cat?: string) => {
    switch (cat) {
      case "lesser-known": return "🔍"
      case "astrology-muhurat": return "🌙"
      case "tribal-regional": return "🪘"
      case "harvest-seasonal": return "🌾"
      case "spiritual-mystical": return "🕉️"
      default: return "🎊"
    }
  }

  const isRare = lesson.category === "lesser-known" || lesson.difficulty === "advanced"

  return (
    <Card className={cn(
      "group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
      isRare && "ring-2 ring-purple-500/30"
    )}>
      {/* Header */}
      <div className="relative bg-gradient-to-br from-primary/5 to-purple-500/5 p-4 border-b">
        {isRare && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-purple-600 gap-1">
              <Sparkles className="h-3 w-3" />
              Rare
            </Badge>
          </div>
        )}

        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getCategoryIcon(lesson.category)}</span>
            <Badge variant="secondary" className="text-xs">
              {lesson.language.toUpperCase()}
            </Badge>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0 hover:bg-primary/10"
            onClick={handlePlayTTS}
            aria-label={isPlayingTTS ? "Stop audio" : "Play audio"}
          >
            <Volume2 className={cn(
              "h-4 w-4 transition-colors",
              isPlayingTTS && "text-primary animate-pulse"
            )} />
          </Button>
        </div>

        <h3 className="font-bold text-base leading-tight text-balance group-hover:text-primary transition-colors">
          {lesson.title}
        </h3>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-3 p-4">
        <p className="line-clamp-3 text-muted-foreground text-sm leading-relaxed">
          {lesson.summary}
        </p>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {lesson.difficulty && (
            <Badge className={cn("text-xs", getDifficultyColor(lesson.difficulty))}>
              <TrendingUp className="h-3 w-3 mr-1" />
              {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
            </Badge>
          )}

          {lesson.readTime && (
            <Badge variant="outline" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              {lesson.readTime} min
            </Badge>
          )}

          {lesson.hasQuiz && (
            <Badge variant="outline" className="text-xs">
              <Award className="h-3 w-3 mr-1" />
              Quiz
            </Badge>
          )}
        </div>

        {/* Tags */}
        {lesson.tags && (
          <div className="flex flex-wrap gap-1.5">
            {lesson.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0 h-5">
                #{tag}
              </Badge>
            ))}
            {lesson.tags.length > 3 && (
              <Badge variant="secondary" className="text-[10px] px-2 py-0 h-5">
                +{lesson.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t p-3 bg-muted/30">
        <Button 
          onClick={onOpen} 
          variant="ghost" 
          className="w-full gap-2 text-sm font-semibold hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <BookOpen className="h-4 w-4" />
          Read Full Lesson
        </Button>
      </div>
    </Card>
  )
}
