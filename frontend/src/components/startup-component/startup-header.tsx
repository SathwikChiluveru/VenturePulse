import { Button } from "../ui/button"
import { ExternalLink, MessageSquare } from "lucide-react"
import type { Startup } from "../../types/startup"

interface StartupHeaderProps {
  startup: Startup
}

export function StartupHeader({ startup }: StartupHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
          <img src={startup.logo || "/placeholder.svg"} alt={startup.name} className="h-8 w-8 rounded-lg" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{startup.name}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <span>{startup.website}</span>
            <span>•</span>
            <span>{startup.twitter_handle}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="text-gray-600 border-gray-200 bg-transparent" asChild>
          <a href={`https://${startup.website}`} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-2" />
            Website
          </a>
        </Button>
        <Button variant="outline" size="sm" className="text-gray-600 border-gray-200 bg-transparent" asChild>
          <a
            href={`https://twitter.com/${startup.twitter_handle.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Twitter
          </a>
        </Button>
      </div>
    </div>
  )
}
