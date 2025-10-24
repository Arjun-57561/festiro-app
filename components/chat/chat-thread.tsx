"use client"

import { useEffect, useRef } from "react"
import { ChatMessage } from "./chat-message"
import type { Message } from "./chat-interface"
import { Loader2 } from "lucide-react"

interface ChatThreadProps {
  messages: Message[]
  isLoading: boolean
}

export function ChatThread({ messages, isLoading }: ChatThreadProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isLoading])

  return (
    <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4 md:p-6">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}

      {isLoading && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Thinking...</span>
        </div>
      )}

      {messages.length === 0 && (
        <div className="flex h-full items-center justify-center text-center">
          <div className="max-w-md space-y-2">
            <p className="text-muted-foreground">
              Start a conversation to discover festivals and cultural celebrations
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
