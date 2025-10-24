"use client"

import { useState } from "react"
import { PromoCard } from "./promo-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Promo } from "@/lib/types"

export function PromotionsView() {
  const [language, setLanguage] = useState<string>("all")
  const [region, setRegion] = useState<string>("all")

  // Mock promotions data
  const mockPromos: Promo[] = [
    {
      promo_id: "1",
      event_id: "evt_1",
      title: "Diwali Grand Celebration",
      body: "Join us for the biggest Diwali celebration with traditional rituals, cultural performances, and festive activities. Experience the joy of lights!",
      media: {
        image: "/diwali-celebration-with-lights-and-decorations.jpg",
      },
      languages: ["en", "hi"],
      target_regions: ["All India"],
      tags: ["festival", "diwali", "celebration"],
    },
    {
      promo_id: "2",
      event_id: "evt_2",
      title: "Holi Color Festival",
      body: "Celebrate the festival of colors with music, dance, and traditional Holi celebrations. Bring your family and friends!",
      media: {
        image: "/holi-festival-with-colorful-powder.jpg",
        video_id: "dQw4w9WgXcQ",
      },
      languages: ["en", "hi"],
      target_regions: ["North India"],
      tags: ["festival", "holi", "colors"],
    },
    {
      promo_id: "3",
      event_id: "evt_3",
      title: "Navratri Garba Night",
      body: "Experience the vibrant Navratri celebrations with traditional Garba and Dandiya performances. Nine nights of devotion and dance!",
      media: {
        image: "/navratri-garba-dance-celebration.jpg",
      },
      languages: ["en", "hi", "gu"],
      target_regions: ["Gujarat", "Maharashtra"],
      tags: ["festival", "navratri", "garba"],
    },
  ]

  const filteredPromos = mockPromos.filter((promo) => {
    const languageMatch = language === "all" || promo.languages.includes(language)
    const regionMatch =
      region === "all" || promo.target_regions.some((r) => r.toLowerCase().includes(region.toLowerCase()))
    return languageMatch && regionMatch
  })

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b bg-card px-4 py-3 md:px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-semibold text-lg">Promotions</h1>
            <p className="text-muted-foreground text-sm">Discover featured events and celebrations</p>
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
                <SelectItem value="gu">Gujarati</SelectItem>
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
          {filteredPromos.length === 0 ? (
            <div className="flex h-64 items-center justify-center rounded-lg border border-dashed">
              <p className="text-muted-foreground">No promotions found for the selected filters</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPromos.map((promo) => (
                <PromoCard key={promo.promo_id} promo={promo} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
