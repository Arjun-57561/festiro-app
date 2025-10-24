"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Play } from "lucide-react"
import type { Promo } from "@/lib/types"
import { useState } from "react"

interface PromoCardProps {
  promo: Promo
}

export function PromoCard({ promo }: PromoCardProps) {
  const [showVideo, setShowVideo] = useState(false)

  const handleCTA = () => {
    console.log(`Navigate to event ${promo.event_id}`)
  }

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      {/* Media */}
      <div className="relative aspect-video bg-muted">
        {showVideo && promo.media?.video_id ? (
          <iframe
            src={`https://www.youtube.com/embed/${promo.media.video_id}`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={promo.media?.image || "/placeholder.svg"}
              alt={promo.title}
              className="h-full w-full object-cover"
            />
            {promo.media?.video_id && (
              <button
                onClick={() => setShowVideo(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/40"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90">
                  <Play className="h-8 w-8 text-primary" />
                </div>
              </button>
            )}
          </>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3 p-4">
        <div>
          <h3 className="font-semibold text-balance leading-tight">{promo.title}</h3>
          <p className="mt-2 line-clamp-3 text-muted-foreground text-sm leading-relaxed">{promo.body}</p>
        </div>

        {/* Languages */}
        <div className="flex flex-wrap gap-2">
          {promo.languages.map((lang) => (
            <Badge key={lang} variant="secondary" className="text-xs">
              {lang.toUpperCase()}
            </Badge>
          ))}
        </div>

        {/* CTA */}
        <Button onClick={handleCTA} className="w-full gap-2">
          View Event
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}
