// Type-safe API client for FestiRo

import type { Event, Reminder, Promo, AssistResponse, LessonCard } from "./types"

const API_BASE = "/api"

export const apiClient = {
  // Chat Assistant
  async sendMessage(message: string, context?: Record<string, any>): Promise<AssistResponse> {
    const res = await fetch(`${API_BASE}/assist_v2`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, context }), // context can include { model: selectedLLM }
    })
    if (!res.ok) throw new Error("Failed to send message")
    return res.json()
  },

  // Events
  async getEvents(query?: string): Promise<Event[]> {
    const url = query ? `${API_BASE}/events?query=${encodeURIComponent(query)}` : `${API_BASE}/events`
    const res = await fetch(url)
    if (!res.ok) throw new Error("Failed to fetch events")
    return res.json()
  },

  async generateEvent(prompt: string): Promise<{ event: Event; id: string }> {
    const res = await fetch(`${API_BASE}/events/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    })
    if (!res.ok) throw new Error("Failed to generate event")
    return res.json()
  },

  // Reminders
  async createReminder(data: Omit<Reminder, "reminder_id">): Promise<{ reminder_id: string }> {
    const res = await fetch(`${API_BASE}/reminders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Failed to create reminder")
    return res.json()
  },

  async getReminders(): Promise<Reminder[]> {
    const res = await fetch(`${API_BASE}/reminders`)
    if (!res.ok) throw new Error("Failed to fetch reminders")
    return res.json()
  },

  // Promotions
  async getPromotions(filters?: { language?: string; region?: string }): Promise<Promo[]> {
    const params = new URLSearchParams()
    if (filters?.language) params.set("language", filters.language)
    if (filters?.region) params.set("region", filters.region)

    const url = `${API_BASE}/promos/match${params.toString() ? `?${params}` : ""}`
    const res = await fetch(url)
    if (!res.ok) throw new Error("Failed to fetch promotions")
    return res.json()
  },

  // Speech
  async speechToText(audioBlob: Blob): Promise<{ text: string; lang?: string }> {
    const formData = new FormData()
    formData.append("audio", audioBlob)

    const res = await fetch(`${API_BASE}/speech-to-text`, {
      method: "POST",
      body: formData,
    })
    if (!res.ok) throw new Error("Failed to convert speech to text")
    return res.json()
  },

  async textToSpeech(text: string, lang?: string): Promise<{ audio_url: string }> {
    const res = await fetch(`${API_BASE}/text-to-speech`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, lang }),
    })
    if (!res.ok) throw new Error("Failed to convert text to speech")
    return res.json()
  },

  // Panchang
  async getMuhurat(
    festival: string,
    region: string,
    date: string,
  ): Promise<{
    startISO: string
    endISO: string
    rule: string
  }> {
    const params = new URLSearchParams({ festival, region, date })
    const res = await fetch(`${API_BASE}/panchang/muhurat?${params}`)
    if (!res.ok) throw new Error("Failed to fetch muhurat")
    return res.json()
  },

  // Learning
  async getLessons(filters?: { language?: string; region?: string }): Promise<LessonCard[]> {
    const params = new URLSearchParams()
    if (filters?.language) params.set("language", filters.language)
    if (filters?.region) params.set("region", filters.region)

    const url = `${API_BASE}/lessons${params.toString() ? `?${params}` : ""}`
    const res = await fetch(url)
    if (!res.ok) throw new Error("Failed to fetch lessons")
    return res.json()
  },
}
