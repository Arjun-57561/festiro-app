// components/promotions/promo-card.tsx
"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Play, X, Calendar, MapPin, Sparkles } from "lucide-react"
import type { Promo } from "@/lib/types"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface PromoCardProps {
  promo: Promo
  onEventClick?: (eventId: string) => void
}

export function PromoCard({ promo, onEventClick }: PromoCardProps) {
  const [showVideo, setShowVideo] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleCTA = () => {
    if (onEventClick) {
      onEventClick(promo.event_id)
    } else {
      // Fallback navigation
      window.location.href = `/events/${promo.event_id}`
    }
  }

  // Check if event is happening soon (within 7 days)
  const isUpcoming = () => {
    if (!promo.event_date) return false
    const eventDate = new Date(promo.event_date)
    const today = new Date()
    const diffTime = eventDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays >= 0 && diffDays <= 7
  }

  // Check if event is featured/major
  const isFeatured = promo.tags?.includes("major-festival") || promo.tags?.includes("featured")

  // Format event date
  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric",
      year: "numeric"
    })
  }

  return (
    <Card className={cn(
      "group overflow-hidden transition-all duration-300",
      "hover:shadow-xl hover:scale-[1.02]",
      isFeatured && "ring-2 ring-primary/50"
    )}>
      {/* Featured badge */}
      {isFeatured && (
        <div className="absolute top-3 left-3 z-10">
          <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 border-0 shadow-lg gap-1">
            <Sparkles className="h-3 w-3" />
            Featured
          </Badge>
        </div>
      )}

      {/* Upcoming badge */}
      {isUpcoming() && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-green-600 hover:bg-green-700 border-0 shadow-lg">
            📅 Coming Soon
          </Badge>
        </div>
      )}

      {/* Media */}
      <div className="relative aspect-video bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
        {showVideo && promo.media?.video_id ? (
          <div className="relative h-full w-full">
            <iframe
              src={`https://www.youtube.com/embed/${promo.media.video_id}?autoplay=1`}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={promo.title}
            />
            {/* Close button */}
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-2 right-2 z-20 bg-black/70 hover:bg-black/90 text-white rounded-full p-1.5 transition-colors"
              aria-label="Close video"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <>
            {!imageError && promo.media?.image ? (
              <img
                src={promo.media.image}
                alt={promo.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={() => setImageError(true)}
                loading="lazy"
              />
            ) : (
              // Fallback gradient background with icon
              <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950/30 dark:to-pink-950/30">
                <Calendar className="h-16 w-16 text-muted-foreground/30" />
              </div>
            )}

            {/* Play button overlay */}
            {promo.media?.video_id && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setShowVideo(true)
                }}
                className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px] transition-all duration-300 hover:bg-black/40 group-hover:backdrop-blur-sm"
                aria-label={`Play ${promo.title} video`}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-2xl transition-transform duration-300 group-hover:scale-110">
                  <Play className="h-8 w-8 text-primary ml-1" fill="currentColor" />
                </div>
              </button>
            )}

            {/* Gradient overlay at bottom for better text readability */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </>
        )}
      </div>

      {/* Content */}
      <div className="space-y-4 p-4">
        {/* Title & Date */}
        <div>
          <h3 className="font-bold text-lg leading-tight text-balance mb-2 group-hover:text-primary transition-colors">
            {promo.title}
          </h3>
          
          {promo.event_date && (
            <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-2">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formatDate(promo.event_date)}</span>
            </div>
          )}

          <p className="line-clamp-3 text-muted-foreground text-sm leading-relaxed">
            {promo.body}
          </p>
        </div>

        {/* Region */}
        {promo.target_regions && promo.target_regions.length > 0 && (
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <MapPin className="h-3.5 w-3.5" />
            <span className="truncate">{promo.target_regions[0]}</span>
            {promo.target_regions.length > 1 && (
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                +{promo.target_regions.length - 1}
              </Badge>
            )}
          </div>
        )}

        {/* Languages & Tags */}
        <div className="flex flex-wrap gap-2">
          {promo.languages.slice(0, 4).map((lang) => (
            <Badge key={lang} variant="secondary" className="text-xs">
              {lang.toUpperCase()}
            </Badge>
          ))}
          {promo.languages.length > 4 && (
            <Badge variant="secondary" className="text-xs">
              +{promo.languages.length - 4}
            </Badge>
          )}
        </div>

        {/* CTA */}
        <Button 
          onClick={handleCTA} 
          className="w-full gap-2 shadow-md hover:shadow-lg transition-all"
          size="lg"
        >
          View Event Details
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
