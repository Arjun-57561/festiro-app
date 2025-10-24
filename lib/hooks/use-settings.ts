"use client"

import { useState, useEffect } from "react"

interface Settings {
  language: string
  region: string
  quietHoursEnabled: boolean
  quietHoursStart: string
  quietHoursEnd: string
  voiceCloningConsent: boolean
  timezone: string
  darkMode: boolean
  ttsVoice: string
  highContrast: boolean
}

const defaultSettings: Settings = {
  language: "en",
  region: "all-india",
  quietHoursEnabled: true,
  quietHoursStart: "22:00",
  quietHoursEnd: "08:00",
  voiceCloningConsent: false,
  timezone: "Asia/Kolkata",
  darkMode: false,
  ttsVoice: "default",
  highContrast: false,
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(defaultSettings)

  useEffect(() => {
    const saved = localStorage.getItem("festiro-settings")
    if (saved) {
      setSettings(JSON.parse(saved))
    }
  }, [])

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings }
      localStorage.setItem("festiro-settings", JSON.stringify(updated))
      return updated
    })
  }

  return { settings, updateSettings }
}
