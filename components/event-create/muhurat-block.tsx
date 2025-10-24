"use client"

import { Clock, Info } from "lucide-react"
import type { Event } from "@/lib/types"

interface MuhuratBlockProps {
  muhurat: Event["muhurat"] | null
}

export function MuhuratBlock({ muhurat }: MuhuratBlockProps) {
  if (!muhurat) {
    return (
      <div className="rounded-lg border border-dashed p-6 text-center">
        <Clock className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
        <p className="text-muted-foreground text-sm">No muhurat calculated yet</p>
        <p className="mt-1 text-muted-foreground text-xs">Click "Get Muhurat" to fetch auspicious time</p>
      </div>
    )
  }

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-3 rounded-lg border bg-muted/50 p-4">
      <div className="flex items-start gap-2">
        <Info className="mt-0.5 h-4 w-4 text-muted-foreground" />
        <div className="flex-1">
          <p className="font-medium text-sm">Auspicious Time Period</p>
          <p className="mt-1 text-sm">
            {formatDateTime(muhurat.startISO)} - {formatDateTime(muhurat.endISO)}
          </p>
        </div>
      </div>

      <div className="rounded-md bg-background p-3">
        <p className="text-muted-foreground text-xs leading-relaxed">{muhurat.rule}</p>
      </div>
    </div>
  )
}
