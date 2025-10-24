"use client"

import type React from "react"

import { useState } from "react"
import { X, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PosterUploadProps {
  file: File | null
  onFileChange: (file: File | null) => void
}

export function PosterUpload({ file, onFileChange }: PosterUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      onFileChange(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleRemove = () => {
    onFileChange(null)
    setPreview(null)
  }

  return (
    <div>
      {preview ? (
        <div className="relative">
          <img
            src={preview || "/placeholder.svg"}
            alt="Event poster preview"
            className="h-64 w-full rounded-lg object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove poster</span>
          </Button>
        </div>
      ) : (
        <label
          className={cn(
            "flex h-64 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors hover:border-primary hover:bg-muted/50",
          )}
        >
          <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
          <ImageIcon className="mb-2 h-12 w-12 text-muted-foreground" />
          <p className="font-medium text-sm">Click to upload poster</p>
          <p className="mt-1 text-muted-foreground text-xs">PNG, JPG up to 10MB</p>
        </label>
      )}
    </div>
  )
}
