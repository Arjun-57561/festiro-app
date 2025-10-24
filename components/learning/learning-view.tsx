"use client"

import { useState } from "react"
import { LessonCard } from "./lesson-card"
import { LessonDetailSheet } from "./lesson-detail-sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { LessonCard as LessonCardType } from "@/lib/types"

export function LearningView() {
  const [language, setLanguage] = useState<string>("all")
  const [region, setRegion] = useState<string>("all")
  const [selectedLesson, setSelectedLesson] = useState<LessonCardType | null>(null)

  // Mock lessons data
  const mockLessons: LessonCardType[] = [
    {
      id: "1",
      title: "Understanding Diwali: The Festival of Lights",
      summary:
        "Learn about the significance of Diwali, its origins, and how it's celebrated across India. Discover the stories behind the festival and traditional practices.",
      language: "en",
      content:
        "Diwali, also known as Deepavali, is one of the most important festivals in Hinduism. It symbolizes the victory of light over darkness and good over evil. The festival is celebrated over five days, with each day having its own significance and rituals. The main day of Diwali is marked by lighting oil lamps (diyas), bursting firecrackers, exchanging gifts, and preparing special sweets.",
      tags: ["diwali", "festival", "hindu"],
      region: "All India",
    },
    {
      id: "2",
      title: "Holi: The Festival of Colors",
      summary:
        "Explore the vibrant traditions of Holi, from the legend of Holika to the joyous celebration of colors that brings communities together.",
      language: "en",
      content:
        "Holi is a spring festival celebrated with colors and water. It commemorates the victory of good over evil, particularly the burning of Holika. The festival is celebrated with great enthusiasm, where people throw colored powder and water at each other, dance to traditional music, and enjoy festive foods like gujiya and thandai.",
      tags: ["holi", "festival", "colors"],
      region: "North India",
    },
    {
      id: "3",
      title: "Navratri: Nine Nights of Devotion",
      summary:
        "Discover the spiritual significance of Navratri and the various forms of Goddess Durga worshipped during this nine-night festival.",
      language: "en",
      content:
        "Navratri is a Hindu festival that spans nine nights and is dedicated to the worship of Goddess Durga. Each night is associated with a different form of the goddess. The festival is celebrated with fasting, prayers, and traditional dances like Garba and Dandiya, particularly in Gujarat and other western states of India.",
      tags: ["navratri", "festival", "durga"],
      region: "Gujarat",
    },
    {
      id: "4",
      title: "Pongal: Harvest Festival of Tamil Nadu",
      summary:
        "Learn about Pongal, the four-day harvest festival celebrated in Tamil Nadu, and its connection to agriculture and gratitude.",
      language: "en",
      content:
        "Pongal is a harvest festival celebrated in Tamil Nadu to thank the Sun God for a bountiful harvest. The festival lasts four days, with each day having its own significance. The main day involves cooking a special dish called Pongal (sweet rice) in new pots, which is then offered to the Sun God. The festival also includes decorating homes with kolam (rangoli) and celebrating with family.",
      tags: ["pongal", "harvest", "tamil"],
      region: "Tamil Nadu",
    },
  ]

  const filteredLessons = mockLessons.filter((lesson) => {
    const languageMatch = language === "all" || lesson.language === language
    const regionMatch = region === "all" || lesson.region?.toLowerCase().includes(region.toLowerCase())
    return languageMatch && regionMatch
  })

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b bg-card px-4 py-3 md:px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-semibold text-lg">Learning Hub</h1>
            <p className="text-muted-foreground text-sm">Explore cultural knowledge and festival traditions</p>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="te">Telugu</SelectItem>
                <SelectItem value="ta">Tamil</SelectItem>
              </SelectContent>
            </Select>

            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="north">North India</SelectItem>
                <SelectItem value="south">South India</SelectItem>
                <SelectItem value="east">East India</SelectItem>
                <SelectItem value="west">West India</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="mx-auto max-w-6xl">
          {filteredLessons.length === 0 ? (
            <div className="flex h-64 items-center justify-center rounded-lg border border-dashed">
              <p className="text-muted-foreground">No lessons found for the selected filters</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredLessons.map((lesson) => (
                <LessonCard key={lesson.id} lesson={lesson} onOpen={() => setSelectedLesson(lesson)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lesson Detail Sheet */}
      {selectedLesson && (
        <LessonDetailSheet
          lesson={selectedLesson}
          open={!!selectedLesson}
          onOpenChange={() => setSelectedLesson(null)}
        />
      )}
    </div>
  )
}
