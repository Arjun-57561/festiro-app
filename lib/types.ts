// Core data types for FestiRo

export interface Event {
  id: string
  title: string
  description: string
  languages: string[]
  festival: string
  region: string
  startISO: string
  endISO: string
  tz: string
  venue: {
    lat: number
    lng: number
    address: string
  }
  online_links: string[]
  muhurat?: {
    startISO: string
    endISO: string
    rule: string
  }
  tags: string[]
  organizer_id: string
}

export interface Reminder {
  reminder_id: string
  event_id: string
  user_id: string
  notify_atISO: string
  channel: "push" | "email" | "sms"
  constraints_applied: string[]
}

export interface Promo {
  promo_id: string
  event_id?: string
  title: string
  body: string
  media?: {
    image?: string
    video_id?: string
  }
  languages: string[]
  target_regions: string[]
  tags: string[]
  sponsor_meta?: Record<string, any>
}

export interface AssistResponse {
  intent: string
  confidence: number
  reply: string
  slots?: Record<string, any>
  dateISO?: string
  reminder_id?: string
  rag_hits?: Array<{
    id: string
    title: string
    snippet: string
    score: number
    source: string
  }>
}

export interface LessonCard {
  id: string
  title: string
  summary: string
  language: string
  content: string
  tags: string[]
  region?: string
}
