"use client"

import { useState } from "react"
import { Copy, Volume2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Message } from "./chat-interface"
import { CitationsSheet } from "./citations-sheet"
import { useToast } from "@/hooks/use-toast"

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps): JSX.Element {
  const [showCitations, setShowCitations] = useState(false)
  const [isPlayingTTS, setIsPlayingTTS] = useState(false)
  const { toast } = useToast()

  const handleCopy = (): void => {
    navigator.clipboard.writeText(message.content)
    toast({
      title: "Copied to clipboard",
      description: "Message copied successfully",
    })
  }

  const handlePlayTTS = async (): Promise<void> => {
  setIsPlayingTTS(true);

  if ("speechSynthesis" in window) {
    const utter = new window.SpeechSynthesisUtterance(message.content);
    utter.onend = () => setIsPlayingTTS(false);
    window.speechSynthesis.speak(utter);
  } else {
    // Fallback if not supported
    setIsPlayingTTS(false);
    toast({
      title: "Speech not supported",
      description: "Your browser does not support text-to-speech.",
      variant: "error",
    });
  }
};


  const isAssistant = message.role === "assistant"
  const hasCitations = message.response?.rag_hits && message.response.rag_hits.length > 0

  return (
    <div className={cn("flex gap-3", isAssistant ? "justify-start" : "justify-end")}>
      <div
        className={cn(
          "max-w-[85%] space-y-2 rounded-2xl px-4 py-3 md:max-w-[70%]",
          isAssistant ? "bg-muted" : "bg-primary text-primary-foreground",
        )}
      >
        <div className="whitespace-pre-wrap break-words text-sm leading-relaxed">{message.content}</div>

        {isAssistant && (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={handleCopy}
              aria-label="Copy message"
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={handlePlayTTS}
              disabled={isPlayingTTS}
              aria-label="Play text-to-speech"
            >
              <Volume2 className={cn("h-3.5 w-3.5", isPlayingTTS && "animate-pulse")} />
            </Button>

            {hasCitations && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => setShowCitations(true)}
                aria-label="Show sources"
              >
                <FileText className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        )}
      </div>

      {showCitations && message.response?.rag_hits && (
        <CitationsSheet
          citations={message.response.rag_hits}
          open={showCitations}
          onOpenChange={setShowCitations}
        />
      )}
    </div>
  )
}
