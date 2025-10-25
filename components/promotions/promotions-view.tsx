// components/promotions/promotions-view.tsx
"use client"

import { useState, useMemo } from "react"
import { PromoCard } from "./promo-card"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Sparkles, Filter, X } from "lucide-react"
import type { Promo } from "@/lib/types"

export function PromotionsView() {
  const [language, setLanguage] = useState<string>("all")
  const [region, setRegion] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<string>("date") // date, featured, name

  // Real November-December 2025 festivals promotions
  const allPromos: Promo[] = [
    {
      promo_id: "1",
      event_id: "evt_diwali_2025",
      title: "Diwali 2025 - Festival of Lights",
      body: "Join us for the grandest Diwali celebration! Experience traditional Lakshmi Puja, spectacular fireworks, cultural performances, and authentic Indian sweets. The festival of lights brings communities together in a dazzling display of diyas, rangoli, and joy. Special muhurat timing for puja from 6:15 PM to 8:00 PM.",
      media: {
        image: "https://images.unsplash.com/photo-1605648916319-cf082f7524a1?w=800&q=80",
        video_id: "8Zl6znm_cds"
      },
      languages: ["en", "hi", "gu", "mr", "te"],
      target_regions: ["All India"],
      tags: ["major-festival", "lights", "lakshmi", "fireworks", "featured"],
      event_date: "2025-10-20"
    },
    {
      promo_id: "2",
      event_id: "evt_chhath_2025",
      title: "Chhath Puja 2025 - Sun God Worship",
      body: "Celebrate the ancient Chhath Puja festival with devotion and grandeur. A 4-day festival dedicated to Surya Dev and Chhathi Maiya. Witness the beautiful ritual of offering arghya to the rising and setting sun at river ghats. Includes traditional prasad preparation, holy dips, and community celebrations.",
      media: {
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80"
      },
      languages: ["en", "hi"],
      target_regions: ["Bihar", "Jharkhand", "Eastern UP", "West Bengal"],
      tags: ["religious", "sun-worship", "river", "community"],
      event_date: "2025-10-27"
    },
    {
      promo_id: "3",
      event_id: "evt_guru_nanak_2025",
      title: "Guru Nanak Jayanti 2025",
      body: "Celebrate the 556th birth anniversary of Guru Nanak Dev Ji, the founder of Sikhism. The celebrations include Prabhat Pheris (early morning processions), Akhand Path (48-hour continuous reading of Guru Granth Sahib), Kirtan, and community Langar. Visit Golden Temple for the grand celebration.",
      media: {
        image: "https://images.unsplash.com/photo-1570554520964-9ba88ea67f84?w=800&q=80",
        video_id: "kBV5P0pIZuE"
      },
      languages: ["en", "pa", "hi"],
      target_regions: ["Punjab", "Haryana", "Delhi", "North India"],
      tags: ["major-festival", "sikh", "langar", "procession", "featured"],
      event_date: "2025-11-05"
    },
    {
      promo_id: "4",
      event_id: "evt_kartik_purnima_2025",
      title: "Kartik Purnima - Dev Deepawali",
      body: "Experience the divine Dev Deepawali at Varanasi ghats! Kartik Purnima is celebrated with thousands of oil lamps lighting up the Ganges. This auspicious day marks Guru Nanak's birthday, Lord Vishnu's Matsya Avatar, and Tripura Purnima. Witness the spectacular Ganga Aarti and boat ceremonies.",
      media: {
        image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80"
      },
      languages: ["en", "hi", "or"],
      target_regions: ["Varanasi", "Odisha", "Telangana"],
      tags: ["religious", "lamps", "ganga", "pilgrimage"],
      event_date: "2025-11-05"
    },
    {
      promo_id: "5",
      event_id: "evt_haryana_day_2025",
      title: "Haryana Day 2025",
      body: "Celebrate Haryana Foundation Day marking the formation of Haryana state on November 1, 1966. The day is celebrated with cultural programs showcasing traditional dance forms like Ghoomar, folk music, sports competitions, and exhibitions highlighting the state's rich heritage and progress.",
      media: {
        image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80"
      },
      languages: ["en", "hi"],
      target_regions: ["Haryana"],
      tags: ["state-day", "cultural", "heritage"],
      event_date: "2025-11-01"
    },
    {
      promo_id: "6",
      event_id: "evt_karnataka_rajyotsava_2025",
      title: "Karnataka Rajyotsava 2025",
      body: "Celebrate Kannada Rajyothsava - Karnataka's Formation Day! The state celebrates its linguistic and cultural identity with flag hoisting, cultural programs, Kannada literary events, and the prestigious Rajyotsava Awards. Schools and government offices display the red and yellow state flag.",
      media: {
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80"
      },
      languages: ["en", "kn"],
      target_regions: ["Karnataka"],
      tags: ["state-day", "cultural", "kannada"],
      event_date: "2025-11-01"
    },
    {
      promo_id: "7",
      event_id: "evt_wangala_2025",
      title: "Wangala Festival 2025 - Meghalaya",
      body: "Experience the vibrant 100 Drums Wangala Festival! This post-harvest festival of the Garo tribe celebrates Saljong, the Sun God. Witness spectacular performances featuring 100 drummers, traditional dances, indigenous games, and authentic Garo cuisine. A unique tribal cultural extravaganza.",
      media: {
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
        video_id: "QqX8KeveRpo"
      },
      languages: ["en"],
      target_regions: ["Meghalaya"],
      tags: ["tribal", "harvest", "drums", "cultural"],
      event_date: "2025-11-07"
    },
    {
      promo_id: "8",
      event_id: "evt_childrens_day_2025",
      title: "Children's Day 2025 - Bal Diwas",
      body: "Celebrate Children's Day honoring Pandit Jawaharlal Nehru's birthday! Special programs in schools include cultural performances, competitions, fun activities, and gift distributions. A day dedicated to promoting children's rights, education, and well-being across India.",
      media: {
        image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80"
      },
      languages: ["en", "hi"],
      target_regions: ["All India"],
      tags: ["national", "children", "education"],
      event_date: "2025-11-14"
    },
    {
      promo_id: "9",
      event_id: "evt_hornbill_2025",
      title: "Hornbill Festival 2025 - Nagaland",
      body: "Experience India's 'Festival of Festivals' - the Hornbill Festival! This 10-day celebration showcases Nagaland's 16 tribes with traditional dances, warrior performances, indigenous games, handicraft exhibitions, rock concerts, and authentic Naga cuisine. A spectacular display of Northeast India's cultural diversity.",
      media: {
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
        video_id: "1V9k7aTKMYg"
      },
      languages: ["en"],
      target_regions: ["Nagaland"],
      tags: ["major-festival", "tribal", "cultural", "northeast", "featured"],
      event_date: "2025-12-01"
    },
    {
      promo_id: "10",
      event_id: "evt_geeta_jayanti_2025",
      title: "Geeta Jayanti 2025",
      body: "Celebrate the sacred day when Lord Krishna delivered the Bhagavad Gita to Arjuna on the battlefield of Kurukshetra. Special programs include Gita recitation, discourse sessions, spiritual talks by scholars, and community celebrations. Kurukshetra in Haryana hosts the grand Gita Mahotsav.",
      media: {
        image: "https://images.unsplash.com/photo-1604608672516-f1b9b1a30d11?w=800&q=80"
      },
      languages: ["en", "hi"],
      target_regions: ["Haryana", "All India"],
      tags: ["religious", "spiritual", "scripture"],
      event_date: "2025-12-01"
    },
    {
      promo_id: "11",
      event_id: "evt_rann_utsav_2025",
      title: "Rann Utsav 2025 - Kutch, Gujarat",
      body: "Experience the magical White Rann of Kutch! This 4-month celebration showcases Gujarat's rich culture with folk dances, music performances, camel safaris, adventure sports, traditional handicrafts, and authentic Gujarati cuisine. Stay in luxury tent cities under starry skies on the pristine white salt desert.",
      media: {
        image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80",
        video_id: "6RrfKxrwcdE"
      },
      languages: ["en", "hi", "gu"],
      target_regions: ["Gujarat"],
      tags: ["major-festival", "cultural", "desert", "featured"],
      event_date: "2024-11-11" // Multi-month event, ongoing
    },
    {
      promo_id: "12",
      event_id: "evt_christmas_2025",
      title: "Christmas 2025 - Festival of Joy",
      body: "Celebrate Christmas with grand festivities! Attend midnight mass at historic churches, witness beautiful nativity scenes, enjoy carol singing, decorate Christmas trees, exchange gifts, and feast with family. Special celebrations in Goa, Kerala, Shillong, and major Indian cities.",
      media: {
        image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&q=80",
        video_id: "nrAcU-_Lm6Y"
      },
      languages: ["en", "hi", "ml", "ko"],
      target_regions: ["Goa", "Kerala", "Meghalaya", "All India"],
      tags: ["major-festival", "christian", "caroling", "featured"],
      event_date: "2025-12-25"
    },
    {
      promo_id: "13",
      event_id: "evt_dhanu_sankranti_2025",
      title: "Dhanu Sankranti 2025 - Odisha",
      body: "Celebrate Dhanu Sankranti marking the sun's entry into Capricorn (Makara Rashi). Special rituals include holy dips in rivers, traditional Poda Pitha preparation, kite flying, and community feasts. Odisha celebrates with great enthusiasm, especially at river ghats and temples.",
      media: {
        image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"
      },
      languages: ["en", "or", "hi"],
      target_regions: ["Odisha", "West Bengal"],
      tags: ["regional", "harvest", "sun-transit"],
      event_date: "2025-12-16"
    },
    {
      promo_id: "14",
      event_id: "evt_guru_gobind_jayanti_2025",
      title: "Guru Gobind Singh Jayanti 2025",
      body: "Honor the birth anniversary of Guru Gobind Singh Ji, the 10th Sikh Guru and founder of the Khalsa Panth. Celebrations include Akhand Path, Nagar Kirtan processions, Gatka performances, Langar, and special prayers at Gurudwaras. Major celebrations at Patna Sahib and Golden Temple.",
      media: {
        image: "https://images.unsplash.com/photo-1569008593571-a98b326533e0?w=800&q=80"
      },
      languages: ["en", "pa", "hi"],
      target_regions: ["Punjab", "Haryana", "Delhi"],
      tags: ["sikh", "religious", "procession"],
      event_date: "2025-12-22"
    }
  ]

  // Filter and sort logic
  const filteredPromos = useMemo(() => {
    let filtered = allPromos.filter((promo) => {
      const languageMatch = language === "all" || promo.languages.includes(language)
      const regionMatch = region === "all" || 
        promo.target_regions.some((r) => r.toLowerCase().includes(region.toLowerCase())) ||
        promo.target_regions.includes("All India")
      
      const searchMatch = searchQuery.trim() === "" || 
        promo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        promo.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
        promo.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      return languageMatch && regionMatch && searchMatch
    })

    // Sort
    if (sortBy === "date") {
      filtered.sort((a, b) => {
        const dateA = new Date(a.event_date || "2099-12-31")
        const dateB = new Date(b.event_date || "2099-12-31")
        return dateA.getTime() - dateB.getTime()
      })
    } else if (sortBy === "featured") {
      filtered.sort((a, b) => {
        const aFeatured = a.tags?.includes("featured") || a.tags?.includes("major-festival") ? 1 : 0
        const bFeatured = b.tags?.includes("featured") || b.tags?.includes("major-festival") ? 1 : 0
        return bFeatured - aFeatured
      })
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    }

    return filtered
  }, [language, region, searchQuery, sortBy])

  // Count featured
  const featuredCount = filteredPromos.filter(p => 
    p.tags?.includes("featured") || p.tags?.includes("major-festival")
  ).length

  // Clear all filters
  const clearFilters = () => {
    setLanguage("all")
    setRegion("all")
    setSearchQuery("")
  }

  const activeFiltersCount = 
    (language !== "all" ? 1 : 0) + 
    (region !== "all" ? 1 : 0) + 
    (searchQuery.trim() !== "" ? 1 : 0)

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="border-b bg-card px-4 py-4 md:px-6 shadow-sm">
        <div className="flex flex-col gap-4">
          {/* Title row */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="font-bold text-xl md:text-2xl flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary" />
                Featured Festivals
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Discover upcoming celebrations • November - December 2025
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="px-3 py-1">
                {filteredPromos.length} Events
              </Badge>
              {featuredCount > 0 && (
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1">
                  ⭐ {featuredCount} Featured
                </Badge>
              )}
            </div>
          </div>

          {/* Filters row */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search festivals, regions, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10"
              />
            </div>

            {/* Filter dropdowns */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filters:</span>
              </div>

              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[140px] h-10">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="te">Telugu</SelectItem>
                  <SelectItem value="ta">Tamil</SelectItem>
                  <SelectItem value="gu">Gujarati</SelectItem>
                  <SelectItem value="pa">Punjabi</SelectItem>
                  <SelectItem value="kn">Kannada</SelectItem>
                  <SelectItem value="ml">Malayalam</SelectItem>
                  <SelectItem value="or">Odia</SelectItem>
                </SelectContent>
              </Select>

              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="w-[140px] h-10">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="all india">All India</SelectItem>
                  <SelectItem value="north">North India</SelectItem>
                  <SelectItem value="south">South India</SelectItem>
                  <SelectItem value="east">East India</SelectItem>
                  <SelectItem value="west">West India</SelectItem>
                  <SelectItem value="northeast">Northeast</SelectItem>
                  <SelectItem value="punjab">Punjab</SelectItem>
                  <SelectItem value="gujarat">Gujarat</SelectItem>
                  <SelectItem value="maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="karnataka">Karnataka</SelectItem>
                  <SelectItem value="kerala">Kerala</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px] h-10">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">By Date</SelectItem>
                  <SelectItem value="featured">Featured First</SelectItem>
                  <SelectItem value="name">By Name</SelectItem>
                </SelectContent>
              </Select>

              {/* Clear filters button */}
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-10 px-3 gap-1"
                >
                  <X className="h-4 w-4" />
                  Clear
                  <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                    {activeFiltersCount}
                  </Badge>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          {filteredPromos.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 rounded-lg border border-dashed bg-card">
              <Sparkles className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <p className="font-medium mb-1">No promotions found</p>
              <p className="text-muted-foreground text-sm mb-4">
                {searchQuery ? "Try different search terms" : "Try adjusting your filters"}
              </p>
              {activeFiltersCount > 0 && (
                <Button onClick={clearFilters} variant="outline" size="sm">
                  Clear all filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPromos.map((promo) => (
                <PromoCard 
                  key={promo.promo_id} 
                  promo={promo}
                  onEventClick={(eventId) => {
                    console.log(`Navigate to event: ${eventId}`)
                    // Add your navigation logic here
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
