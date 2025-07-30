import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Clock } from "lucide-react"

// Mock news data
const newsData = {
  "1": [
    // Stripe
    {
      id: "1",
      title: "Stripe launches new payment infrastructure for emerging markets",
      summary:
        "The payment giant announces expanded support for local payment methods across Southeast Asia and Latin America.",
      source: "TechCrunch",
      published_at: "2024-01-07T10:30:00Z",
      url: "https://techcrunch.com/stripe-emerging-markets",
      sentiment: "positive",
    },
    {
      id: "2",
      title: "Stripe's revenue growth accelerates in Q4 2023",
      summary: "Internal documents suggest the company processed over $1 trillion in payments last year.",
      source: "The Information",
      published_at: "2024-01-06T14:15:00Z",
      url: "https://theinformation.com/stripe-revenue",
      sentiment: "positive",
    },
    {
      id: "3",
      title: "Regulatory challenges mount for payment processors",
      summary: "New EU regulations could impact how companies like Stripe operate in European markets.",
      source: "Financial Times",
      published_at: "2024-01-05T09:45:00Z",
      url: "https://ft.com/payment-regulations",
      sentiment: "neutral",
    },
  ],
  "2": [
    // OpenAI
    {
      id: "4",
      title: "OpenAI announces GPT-5 development milestone",
      summary:
        "The company reveals significant progress on its next-generation language model with improved reasoning capabilities.",
      source: "Wired",
      published_at: "2024-01-07T16:20:00Z",
      url: "https://wired.com/openai-gpt5",
      sentiment: "positive",
    },
    {
      id: "5",
      title: "ChatGPT usage surpasses 100 million weekly active users",
      summary: "OpenAI reports record engagement as enterprise adoption continues to grow rapidly.",
      source: "Reuters",
      published_at: "2024-01-06T11:30:00Z",
      url: "https://reuters.com/chatgpt-users",
      sentiment: "positive",
    },
    {
      id: "6",
      title: "AI safety concerns raised by researchers",
      summary:
        "New study highlights potential risks in large language model deployment and calls for stronger safeguards.",
      source: "Nature",
      published_at: "2024-01-05T13:15:00Z",
      url: "https://nature.com/ai-safety",
      sentiment: "neutral",
    },
  ],
  "3": [
    // Anthropic
    {
      id: "7",
      title: "Anthropic's Claude 3 shows breakthrough in reasoning tasks",
      summary:
        "Latest benchmarks demonstrate significant improvements in mathematical and logical reasoning capabilities.",
      source: "MIT Technology Review",
      published_at: "2024-01-07T12:45:00Z",
      url: "https://technologyreview.com/claude-3",
      sentiment: "positive",
    },
    {
      id: "8",
      title: "Constitutional AI approach gains industry attention",
      summary: "Anthropic's safety-focused training methodology is being adopted by other AI research labs.",
      source: "VentureBeat",
      published_at: "2024-01-06T15:20:00Z",
      url: "https://venturebeat.com/constitutional-ai",
      sentiment: "positive",
    },
  ],
}

interface NewsFeedProps {
  startupId: string
  limit?: number
}

export function NewsFeed({ startupId, limit }: NewsFeedProps) {
  const articles = newsData[startupId as keyof typeof newsData] || []
  const displayArticles = limit ? articles.slice(0, limit) : articles

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-50 text-green-700 border-green-200"
      case "negative":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  if (displayArticles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No recent news articles found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {displayArticles.map((article) => (
        <Card key={article.id} className="border border-gray-200/60 hover:shadow-sm transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200">
                    {article.source}
                  </Badge>
                  <Badge variant="outline" className={`text-xs ${getSentimentColor(article.sentiment)}`}>
                    {article.sentiment}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {formatTimeAgo(article.published_at)}
                  </div>
                </div>

                <h3 className="font-medium leading-tight text-gray-900">{article.title}</h3>

                <p className="text-sm text-gray-600 line-clamp-2">{article.summary}</p>
              </div>

              <Button variant="ghost" size="sm" asChild className="shrink-0 hover:bg-gray-100">
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {limit && articles.length > limit && (
        <div className="text-center pt-4">
          <Button variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-50">
            View All {articles.length} Articles
          </Button>
        </div>
      )}
    </div>
  )
}
