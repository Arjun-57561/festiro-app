"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Send, Mic, Calendar, Sparkles, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
}

const quickChips = [
  { icon: Calendar, label: "Find festival", prompt: "What festivals are coming up this month?" },
  { icon: Clock, label: "Show muhurat", prompt: "What is the auspicious time for Diwali puja?" },
  { icon: Sparkles, label: "Set reminder", prompt: "Remind me about upcoming Holi celebrations" },
]

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim())
      setMessage("")
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleQuickChip = (prompt: string) => {
    if (!isLoading) {
      onSendMessage(prompt)
    }
  }

  const handleMicClick = async () => {
    setIsRecording(!isRecording)
    // Mock recording - replace with actual speech-to-text
    if (!isRecording) {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setIsRecording(false)
      setMessage("What festivals are happening this week?")
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    // Auto-resize textarea
    e.target.style.height = "auto"
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  return (
    <div className="border-t bg-card p-4 md:p-6">
      {/* Quick action chips */}
      <div className="mb-3 flex flex-wrap gap-2">
        {quickChips.map((chip) => {
          const Icon = chip.icon
          return (
            <Button
              key={chip.label}
              variant="outline"
              size="sm"
              className="h-8 gap-2 bg-transparent"
              onClick={() => handleQuickChip(chip.prompt)}
              disabled={isLoading}
            >
              <Icon className="h-3.5 w-3.5" />
              {chip.label}
            </Button>
          )
        })}
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="relative flex-1">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask about festivals, set reminders, or find auspicious times..."
            className="min-h-[44px] max-h-32 resize-none pr-12"
            disabled={isLoading}
            rows={1}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn("absolute right-2 top-2 h-8 w-8", isRecording && "text-destructive animate-pulse")}
            onClick={handleMicClick}
            disabled={isLoading}
          >
            <Mic className="h-4 w-4" />
            <span className="sr-only">{isRecording ? "Stop recording" : "Start voice input"}</span>
          </Button>
        </div>

        <Button type="submit" size="icon" className="h-11 w-11 shrink-0" disabled={!message.trim() || isLoading}>
          <Send className="h-5 w-5" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  )
}
