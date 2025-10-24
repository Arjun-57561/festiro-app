"use client"

import { useEffect, useRef, useState } from "react"
import { ChatMessage } from "./chat-message"
import type { Message } from "./chat-interface"
import { Loader2, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatThreadProps {
  messages: Message[]
  isLoading: boolean
}

export function ChatThread({ messages, isLoading }: ChatThreadProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [userHasScrolled, setUserHasScrolled] = useState(false)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (!userHasScrolled && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }, [messages, isLoading, userHasScrolled])

  // Detect if user has scrolled up
  const handleScroll = () => {
    if (!scrollRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight
    
    // Show button if user scrolled up more than 100px from bottom
    const isScrolledUp = distanceFromBottom > 100
    setShowScrollButton(isScrolledUp)
    setUserHasScrolled(isScrolledUp)
  }

  // Scroll to bottom when button clicked
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
    setUserHasScrolled(false)
    setShowScrollButton(false)
  }

  return (
    <div className="relative flex flex-1 flex-col">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 space-y-4 overflow-y-auto p-4 md:p-6 scroll-smooth"
      >
        {/* Empty state */}
        {messages.length === 0 && !isLoading && (
          <div className="flex h-full items-center justify-center text-center">
            <div className="max-w-md space-y-3">
              <h3 className="text-lg font-semibold">Welcome to Festival Chat</h3>
              <p className="text-sm text-muted-foreground">
                Start a conversation to discover festivals and cultural celebrations around the world
              </p>
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((message, index) => (
          <ChatMessage 
            key={message.id} 
            message={message}
            isLatest={index === messages.length - 1}
          />
        ))}

        {/* Loading indicator with animated dots */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl bg-muted px-4 py-3">
              <div className="flex items-center gap-1" role="status" aria-label="Loading">
                <span className="sr-only">AI is thinking...</span>
                <div 
                  className="h-2 w-2 animate-bounce rounded-full bg-primary/60"
                  style={{ animationDelay: "0ms", animationDuration: "1s" }}
                />
                <div 
                  className="h-2 w-2 animate-bounce rounded-full bg-primary/60"
                  style={{ animationDelay: "150ms", animationDuration: "1s" }}
                />
                <div 
                  className="h-2 w-2 animate-bounce rounded-full bg-primary/60"
                  style={{ animationDelay: "300ms", animationDuration: "1s" }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Invisible element for scrolling to bottom */}
        <div ref={bottomRef} className="h-px" aria-hidden="true" />
      </div>

      {/* Scroll to bottom button */}
      {showScrollButton && (
        <Button
          onClick={scrollToBottom}
          size="icon"
          variant="secondary"
          className="absolute bottom-6 right-6 rounded-full shadow-lg transition-all hover:scale-105"
          aria-label="Scroll to bottom"
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
