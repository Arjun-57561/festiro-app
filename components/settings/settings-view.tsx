"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Globe, Moon, Clock, Volume2, Shield, Accessibility } from "lucide-react"
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

export function SettingsView() {
  const { toast } = useToast()
  const [settings, setSettings] = useState<Settings>({
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
  })

  // Load settings from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("festiro-settings")
    if (saved) {
      setSettings(JSON.parse(saved))
    }
  }, [])

  // Save settings to localStorage
  const saveSettings = () => {
    localStorage.setItem("festiro-settings", JSON.stringify(settings))
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated",
    })
  }

  const updateSetting = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const handleTestTTS = async () => {
    toast({
      title: "Testing voice",
      description: "Playing sample audio...",
    })
    // Mock TTS test
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b bg-card px-4 py-3 md:px-6">
        <h1 className="font-semibold text-lg">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your preferences and account settings</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Language & Region */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-semibold text-base">Language & Region</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="language">Preferred Language</Label>
                <Select value={settings.language} onValueChange={(value) => updateSetting("language", value)}>
                  <SelectTrigger id="language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिन्दी (Hindi)</SelectItem>
                    <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
                    <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                    <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                    <SelectItem value="gu">ગુજરાતી (Gujarati)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="region">Region</Label>
                <Select value={settings.region} onValueChange={(value) => updateSetting("region", value)}>
                  <SelectTrigger id="region">
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

              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={settings.timezone} onValueChange={(value) => updateSetting("timezone", value)}>
                  <SelectTrigger id="timezone">
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
          </Card>

          {/* Notifications */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-semibold text-base">Quiet Hours</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="quietHours">Enable Quiet Hours</Label>
                  <p className="text-muted-foreground text-xs">Pause notifications during specified hours</p>
                </div>
                <Switch
                  id="quietHours"
                  checked={settings.quietHoursEnabled}
                  onCheckedChange={(checked) => updateSetting("quietHoursEnabled", checked)}
                />
              </div>

              {settings.quietHoursEnabled && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="quietStart">Start Time</Label>
                    <Input
                      id="quietStart"
                      type="time"
                      value={settings.quietHoursStart}
                      onChange={(e) => updateSetting("quietHoursStart", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="quietEnd">End Time</Label>
                    <Input
                      id="quietEnd"
                      type="time"
                      value={settings.quietHoursEnd}
                      onChange={(e) => updateSetting("quietHoursEnd", e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Voice & Audio */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Volume2 className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-semibold text-base">Voice & Audio</h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="ttsVoice">Text-to-Speech Voice</Label>
                <Select value={settings.ttsVoice} onValueChange={(value) => updateSetting("ttsVoice", value)}>
                  <SelectTrigger id="ttsVoice">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Voice</SelectItem>
                    <SelectItem value="female-1">Female Voice 1</SelectItem>
                    <SelectItem value="female-2">Female Voice 2</SelectItem>
                    <SelectItem value="male-1">Male Voice 1</SelectItem>
                    <SelectItem value="male-2">Male Voice 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleTestTTS} variant="outline" className="w-full gap-2 bg-transparent">
                <Volume2 className="h-4 w-4" />
                Test Voice
              </Button>
            </div>
          </Card>

          {/* Privacy */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-semibold text-base">Privacy & Consent</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <Label htmlFor="voiceCloning">Voice Cloning Consent</Label>
                  <p className="text-muted-foreground text-xs">
                    Allow FestiRo to use your voice recordings to improve TTS personalization
                  </p>
                </div>
                <Switch
                  id="voiceCloning"
                  checked={settings.voiceCloningConsent}
                  onCheckedChange={(checked) => updateSetting("voiceCloningConsent", checked)}
                />
              </div>
            </div>
          </Card>

          {/* Appearance */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Moon className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-semibold text-base">Appearance</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <p className="text-muted-foreground text-xs">Use dark theme across the app</p>
                </div>
                <Switch
                  id="darkMode"
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => updateSetting("darkMode", checked)}
                />
              </div>
            </div>
          </Card>

          {/* Accessibility */}
          <Card className="p-6">
            <div className="mb-4 flex items-center gap-2">
              <Accessibility className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-semibold text-base">Accessibility</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Label htmlFor="highContrast">High Contrast Mode</Label>
                  <p className="text-muted-foreground text-xs">Increase contrast for better visibility</p>
                </div>
                <Switch
                  id="highContrast"
                  checked={settings.highContrast}
                  onCheckedChange={(checked) => updateSetting("highContrast", checked)}
                />
              </div>
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex gap-3">
            <Button onClick={saveSettings} className="flex-1">
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
