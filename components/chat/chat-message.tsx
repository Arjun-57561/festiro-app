"use client"

import { useState } from "react"
import { Copy, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Message } from "./chat-interface"
import { useToast } from "@/hooks/use-toast"

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [isPlayingTTS, setIsPlayingTTS] = useState(false)
  const { toast } = useToast()

  const handleCopy = (): void => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(message.content)
        .then(() => {
          toast({
            title: "Copied to clipboard",
            description: "Message copied successfully",
          })
        })
        .catch(() => {
          toast({
            title: "Copy failed",
            description: "Could not copy message to clipboard",
            variant: "destructive",
          })
        })
    } else {
      toast({
        title: "Clipboard not supported",
        description: "Your browser does not support clipboard copying",
        variant: "destructive",
      })
    }
  }

  const handlePlayTTS = async (): Promise<void> => {
    setIsPlayingTTS(true)

    if ("speechSynthesis" in window) {
      const utter = new window.SpeechSynthesisUtterance(message.content)
      utter.onend = () => setIsPlayingTTS(false)
      window.speechSynthesis.speak(utter)
    } else {
      setIsPlayingTTS(false)
      toast({
        title: "Speech not supported",
        description: "Your browser does not support text-to-speech.",
        variant: "destructive",
      })
    }
  }

  const isAssistant = message.role === "assistant"

  // Format timestamp
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(date))
  }

  return (
    <div className={cn("flex gap-3", isAssistant ? "justify-start" : "justify-end")}>
      <div
        className={cn(
          "max-w-[85%] space-y-2 rounded-2xl px-4 py-3 md:max-w-[70%]",
          isAssistant ? "bg-muted" : "bg-primary text-primary-foreground"
        )}
      >
        <div className="whitespace-pre-wrap break-words text-sm leading-relaxed">
          {message.content}
        </div>

        <div className="flex items-center justify-between gap-2">
          {/* Timestamp */}
          <span className={cn(
            "text-xs opacity-60",
            isAssistant ? "text-muted-foreground" : "text-primary-foreground"
          )}>
            {formatTime(message.timestamp)}
          </span>

          {/* Action buttons for assistant messages */}
          {isAssistant && (
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopy}>
                <Copy className="h-3.5 w-3.5" />
                <span className="sr-only">Copy message</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={handlePlayTTS}
                disabled={isPlayingTTS}
              >
                <Volume2 className={cn("h-3.5 w-3.5", isPlayingTTS && "animate-pulse")} />
                <span className="sr-only">Play text-to-speech</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
