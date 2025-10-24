"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

interface Citation {
  id: string
  title: string
  snippet: string
  score: number
  source: string
}

interface CitationsSheetProps {
  citations: Citation[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CitationsSheet({ citations, open, onOpenChange }: CitationsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sources & Citations</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {citations.map((citation) => (
            <div key={citation.id} className="space-y-2 rounded-lg border p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-medium text-sm leading-tight">{citation.title}</h3>
                <Badge variant="secondary" className="shrink-0 text-xs">
                  {Math.round(citation.score * 100)}%
                </Badge>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed">{citation.snippet}</p>

              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <ExternalLink className="h-3 w-3" />
                <span>{citation.source}</span>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
