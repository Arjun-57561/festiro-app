"use client"

import { useState, useEffect, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Globe, 
  Moon, 
  Clock, 
  Volume2, 
  Shield, 
  Accessibility,
  Check,
  Sparkles
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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

const DEFAULT_SETTINGS: Settings = {
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

export function SettingsView() {
  const { toast } = useToast()
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Load settings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("festiro-settings")
    if (saved) {
      try {
        const parsedSettings = JSON.parse(saved)
        setSettings(parsedSettings)
        const timestamp = localStorage.getItem("festiro-settings-timestamp")
        if (timestamp) {
          setLastSaved(new Date(timestamp))
        }
        
        // Apply dark mode if enabled
        if (parsedSettings.darkMode) {
          document.documentElement.classList.add("dark")
        }
      } catch (error) {
        console.error("Failed to load settings:", error)
      }
    }
  }, [])

  // Auto-save with debounce
  const autoSave = useCallback(
    async (newSettings: Settings) => {
      setIsSaving(true)
      
      // Simulate save delay for smooth UX
      await new Promise((resolve) => setTimeout(resolve, 500))
      
      localStorage.setItem("festiro-settings", JSON.stringify(newSettings))
      const timestamp = new Date()
      localStorage.setItem("festiro-settings-timestamp", timestamp.toISOString())
      
      setLastSaved(timestamp)
      setIsSaving(false)
      setHasUnsavedChanges(false)
      
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated.",
      })
    },
    [toast]
  )

  // Debounced auto-save effect
  useEffect(() => {
    if (!hasUnsavedChanges) return

    const timeoutId = setTimeout(() => {
      autoSave(settings)
    }, 1500)

    return () => clearTimeout(timeoutId)
  }, [settings, hasUnsavedChanges, autoSave])

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    setHasUnsavedChanges(true)
    
    // Apply dark mode immediately
    if (key === "darkMode") {
      if (value) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }

  const handleTestTTS = async () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(
        "Namaste! This is a test of your FestiRo voice settings. How do I sound?"
      )
      utterance.voice = speechSynthesis.getVoices().find(
        (v) => v.name.includes(settings.ttsVoice) || v.default
      ) || speechSynthesis.getVoices()[0]
      
      window.speechSynthesis.speak(utterance)
      
      toast({
        title: "Testing voice",
        description: "Playing sample audio...",
      })
    } else {
      toast({
        title: "Not supported",
        description: "Text-to-speech is not available in your browser.",
        variant: "destructive",
      })
    }
  }

  const getTimeSinceLastSave = () => {
    if (!lastSaved) return null
    const seconds = Math.floor((Date.now() - lastSaved.getTime()) / 1000)
    if (seconds < 60) return "just now"
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    return `${Math.floor(seconds / 3600)}h ago`
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header with Save Status */}
      <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-4 py-4 md:px-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Customize your FestiRo experience
              </p>
            </div>
            
            {/* Auto-save indicator */}
            <div className="flex items-center gap-2">
              {isSaving ? (
                <Badge variant="secondary" className="gap-1.5 animate-pulse">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  Saving...
                </Badge>
              ) : hasUnsavedChanges ? (
                <Badge variant="outline" className="gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  Unsaved changes
                </Badge>
              ) : lastSaved ? (
                <Badge variant="secondary" className="gap-1.5">
                  <Check className="h-3 w-3 text-green-600" />
                  Saved {getTimeSinceLastSave()}
                </Badge>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-4xl space-y-8 p-4 pb-20 md:p-6">
          
          {/* Language & Region */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
                <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Language & Region</h2>
                <p className="text-sm text-muted-foreground">
                  Customize your location and language preferences
                </p>
              </div>
            </div>

            <Card className="overflow-hidden transition-all hover:shadow-md">
              <div className="divide-y">
                <div className="group p-4 transition-colors hover:bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 space-y-1">
                      <Label htmlFor="language" className="text-sm font-medium">
                        Preferred Language
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Choose your preferred interface language
                      </p>
                    </div>
                    <Select 
                      value={settings.language} 
                      onValueChange={(value) => updateSetting("language", value)}
                    >
                      <SelectTrigger id="language" className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">🇬🇧 English</SelectItem>
                        <SelectItem value="hi">🇮🇳 हिन्दी</SelectItem>
                        <SelectItem value="te">🇮🇳 తెలుగు</SelectItem>
                        <SelectItem value="ta">🇮🇳 தமிழ்</SelectItem>
                        <SelectItem value="bn">🇮🇳 বাংলা</SelectItem>
                        <SelectItem value="gu">🇮🇳 ગુજરાતી</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="group p-4 transition-colors hover:bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 space-y-1">
                      <Label htmlFor="region" className="text-sm font-medium">
                        Region
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Set your region for localized festivals
                      </p>
                    </div>
                    <Select 
                      value={settings.region} 
                      onValueChange={(value) => updateSetting("region", value)}
                    >
                      <SelectTrigger id="region" className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-india">All India</SelectItem>
                        <SelectItem value="north">North India</SelectItem>
                        <SelectItem value="south">South India</SelectItem>
                        <SelectItem value="east">East India</SelectItem>
                        <SelectItem value="west">West India</SelectItem>
                        <SelectItem value="central">Central India</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="group p-4 transition-colors hover:bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 space-y-1">
                      <Label htmlFor="timezone" className="text-sm font-medium">
                        Timezone
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Your current timezone for accurate reminders
                      </p>
                    </div>
                    <Select 
                      value={settings.timezone} 
                      onValueChange={(value) => updateSetting("timezone", value)}
                    >
                      <SelectTrigger id="timezone" className="w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                        <SelectItem value="Asia/Dubai">Asia/Dubai (GST)</SelectItem>
                        <SelectItem value="America/New_York">America/New York (EST)</SelectItem>
                        <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Quiet Hours - Continue with rest of sections... */}
          {/* I'll provide the rest in the next message to keep it manageable */}

          {/* Appearance & Accessibility */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-500/10">
                <Moon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Appearance & Accessibility</h2>
                <p className="text-sm text-muted-foreground">
                  Personalize the look and feel of FestiRo
                </p>
              </div>
            </div>

            <Card className="overflow-hidden transition-all hover:shadow-md">
              <div className="divide-y">
                <div className="group p-4 transition-colors hover:bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 space-y-1">
                      <Label htmlFor="darkMode" className="text-sm font-medium">
                        Dark Mode
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        Use dark theme across the app
                      </p>
                    </div>
                    <Switch
                      id="darkMode"
                      checked={settings.darkMode}
                      onCheckedChange={(checked) => updateSetting("darkMode", checked)}
                    />
                  </div>
                </div>

                <div className="group p-4 transition-colors hover:bg-muted/50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <Accessibility className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="highContrast" className="text-sm font-medium">
                          High Contrast Mode
                        </Label>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Increase contrast for better visibility
                      </p>
                    </div>
                    <Switch
                      id="highContrast"
                      checked={settings.highContrast}
                      onCheckedChange={(checked) => updateSetting("highContrast", checked)}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </section>

        </div>
      </div>
    </div>
  )
}
