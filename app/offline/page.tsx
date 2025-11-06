// app/offline/page.tsx
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WifiOff, RefreshCw } from "lucide-react"

export const metadata = {
  title: "Offline - FestiRo",
  description: "You are currently offline",
}

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-festival">
      <Card className="max-w-md w-full p-8 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center">
          <WifiOff className="h-10 w-10 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">You're Offline</h1>
          <p className="text-muted-foreground">
            No internet connection. Don't worry, FestiRo works offline too! 
            Saved content is still accessible.
          </p>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={() => window.location.reload()} 
            className="w-full gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>

          <Button 
            onClick={() => window.location.href = '/calendar'} 
            variant="outline"
            className="w-full"
          >
            View Cached Calendar
          </Button>
        </div>

        <div className="pt-4 border-t">
          <p className="text-xs text-muted-foreground">
            Once you're back online, all features will be available again.
          </p>
        </div>
      </Card>
    </div>
  )
}
