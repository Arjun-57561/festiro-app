"use client"

import { useState } from "react"
import { ChatThread } from "./chat-thread"
import { ChatInput } from "./chat-input"
import type { AssistResponse } from "@/lib/types"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  response?: AssistResponse
}

// Final 2-model setup (reliable and working)
// Update LLM_LIST to include Groq
const LLM_LIST = [
  { value: "groq", label: "Groq (Llama 3.3 - Ultra Fast)" },
  { value: "gemini", label: "Google Gemini 2.0" },
]


export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Namaste! I'm your FestiRo assistant. I can help you explore festivals, find auspicious times (muhurat), and learn about cultural celebrations. Which model would you like to use?",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLLM, setSelectedLLM] = useState(LLM_LIST[0].value)

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch("/api/assist_v2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          context: { model: selectedLLM },
        }),
      })

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply || "No response received.",
        timestamp: new Date(),
        response: data,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Failed to send message:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "There was an error connecting to the model. Please check your setup.",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b bg-card px-4 py-3 md:px-6">
        <h1 className="font-semibold text-lg">Chat Assistant</h1>
        <p className="text-muted-foreground text-sm">
          Ask me anything about festivals, muhurats, or celebrations.
        </p>
      </div>

      {/* Model selection dropdown */}
      <div className="mb-2 flex items-center gap-2 p-4 bg-muted">
        <span className="font-medium">Choose Model:</span>
        <select
          value={selectedLLM}
          onChange={(e) => setSelectedLLM(e.target.value)}
          className="p-1 border rounded"
        >
          {LLM_LIST.map((llm) => (
            <option key={llm.value} value={llm.value}>
              {llm.label}
            </option>
          ))}
        </select>
      </div>

      {/* Chat area */}
      <ChatThread messages={messages} isLoading={isLoading} />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  )
}
