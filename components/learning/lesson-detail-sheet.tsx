// components/learning/lesson-detail-sheet.tsx
"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Volume2, 
  MapPin, 
  Clock, 
  Award,
  Share2,
  Bookmark,
  TrendingUp,
  Sparkles,
  ChevronRight
} from "lucide-react"
import type { LessonCard } from "@/lib/types"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface LessonDetailSheetProps {
  lesson: LessonCard
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LessonDetailSheet({ lesson, open, onOpenChange }: LessonDetailSheetProps) {
  const [isPlayingTTS, setIsPlayingTTS] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const { toast } = useToast()

  const handlePlayTTS = async () => {
    if ('speechSynthesis' in window) {
      if (isPlayingTTS) {
        window.speechSynthesis.cancel()
        setIsPlayingTTS(false)
        return
      }

      setIsPlayingTTS(true)
      const utterance = new SpeechSynthesisUtterance(lesson.content)
      utterance.rate = 0.85
      utterance.pitch = 1
      utterance.volume = 1

      utterance.onend = () => setIsPlayingTTS(false)
      utterance.onerror = () => setIsPlayingTTS(false)

      window.speechSynthesis.speak(utterance)
    } else {
      toast({
        title: "Not supported",
        description: "Text-to-speech is not supported in your browser",
        variant: "destructive"
      })
    }
  }

  const handleShare = async () => {
    const shareData = {
      title: lesson.title,
      text: lesson.summary,
      url: window.location.href
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
        toast({
          title: "✅ Shared successfully",
          description: "Thanks for sharing this lesson!",
        })
      } else {
        await navigator.clipboard.writeText(`${lesson.title}\n\n${lesson.summary}`)
        toast({
          title: "📋 Copied to clipboard",
          description: "Share this lesson with others!",
        })
      }
    } catch (error) {
      console.error("Share failed:", error)
    }
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    // In production, save to backend
    localStorage.setItem(`bookmark_${lesson.id}`, (!isBookmarked).toString())
    
    toast({
      title: isBookmarked ? "Bookmark removed" : "✅ Bookmarked",
      description: isBookmarked ? "Removed from your saved lessons" : "Saved to your learning library",
    })
  }

  const getDifficultyColor = (diff?: string) => {
    switch (diff) {
      case "beginner": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      case "intermediate": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "advanced": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      default: return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl p-0 flex flex-col">
        {/* Header */}
        <SheetHeader className="px-6 pt-6 pb-4 border-b space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 space-y-2">
              <SheetTitle className="text-balance leading-tight text-xl">
                {lesson.title}
              </SheetTitle>
              <SheetDescription className="text-sm">
                {lesson.summary}
              </SheetDescription>
            </div>
          </div>

          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{lesson.language.toUpperCase()}</Badge>
            
            {lesson.difficulty && (
              <Badge className={cn("text-xs", getDifficultyColor(lesson.difficulty))}>
                <TrendingUp className="h-3 w-3 mr-1" />
                {lesson.difficulty.charAt(0).toUpperCase() + lesson.difficulty.slice(1)}
              </Badge>
            )}

            {lesson.readTime && (
              <Badge variant="outline" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {lesson.readTime} min read
              </Badge>
            )}

            {lesson.hasQuiz && (
              <Badge className="bg-purple-600 text-xs">
                <Award className="h-3 w-3 mr-1" />
                Quiz Available
              </Badge>
            )}

            {lesson.region && (
              <Badge variant="outline" className="text-xs">
                <MapPin className="h-3 w-3 mr-1" />
                {lesson.region}
              </Badge>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <Button 
              onClick={handlePlayTTS} 
              disabled={isPlayingTTS}
              className="flex-1 gap-2"
              variant={isPlayingTTS ? "secondary" : "default"}
            >
              <Volume2 className={isPlayingTTS ? "animate-pulse" : ""} />
              {isPlayingTTS ? "Playing..." : "Listen to Lesson"}
            </Button>
            
            <Button 
              onClick={handleShare} 
              variant="outline" 
              size="icon"
              className="shrink-0"
            >
              <Share2 className="h-4 w-4" />
            </Button>

            <Button 
              onClick={handleBookmark} 
              variant="outline" 
              size="icon"
              className={cn(
                "shrink-0",
                isBookmarked && "bg-primary text-primary-foreground"
              )}
            >
              <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
            </Button>
          </div>
        </SheetHeader>

        {/* Content */}
        <ScrollArea className="flex-1 px-6 py-4">
          <div className="space-y-6 pb-6">
            {/* Main content */}
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <div className="whitespace-pre-line text-sm leading-relaxed">
                {lesson.content}
              </div>
            </div>

            <Separator />

            {/* Tags */}
            {lesson.tags && lesson.tags.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Topics Covered
                </h3>
                <div className="flex flex-wrap gap-2">
                  {lesson.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Related lessons */}
            {lesson.relatedLessons && lesson.relatedLessons.length > 0 && (
              <>
                <Separator />
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm">Related Lessons</h3>
                  <div className="space-y-2">
                    {lesson.relatedLessons.slice(0, 3).map((relatedId) => (
                      <Button
                        key={relatedId}
                        variant="outline"
                        className="w-full justify-between text-left h-auto py-3 px-4"
                        onClick={() => {
                          // In production, load related lesson
                          toast({
                            title: "Loading related lesson",
                            description: `Opening lesson ID: ${relatedId}`,
                          })
                        }}
                      >
                        <span className="text-sm font-medium truncate flex-1">
                          Continue your learning journey
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 ml-2" />
                      </Button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Quiz prompt */}
            {lesson.hasQuiz && (
              <>
                <Separator />
                <div className="rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    <h3 className="font-semibold text-sm">Test Your Knowledge</h3>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Complete the quiz to earn points and track your learning progress!
                  </p>
                  <Button className="w-full gap-2" variant="default">
                    <Award className="h-4 w-4" />
                    Start Quiz
                  </Button>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
