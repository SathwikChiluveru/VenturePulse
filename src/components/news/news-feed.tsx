import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Clock } from "lucide-react"
import { newsData } from "@/lib/data"
import { formatTimeAgo } from "@/lib/formatters"
import type { NewsArticle } from "@/types/startup"

interface NewsFeedProps {
  startupId: string
  limit?: number
}

export function NewsFeed({ startupId, limit }: NewsFeedProps) {
  const articles = newsData[startupId] || []
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
        <NewsArticleCard key={article.id} article={article} getSentimentColor={getSentimentColor} />
      ))}

      {limit && articles.length > limit && (
        <div className="text-center pt-4">
          <Button variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-50 bg-transparent">
            View All {articles.length} Articles
          </Button>
        </div>
      )}
    </div>
  )
}

interface NewsArticleCardProps {
  article: NewsArticle
  getSentimentColor: (sentiment: string) => string
}

function NewsArticleCard({ article, getSentimentColor }: NewsArticleCardProps) {
  return (
    <Card className="border border-gray-200/60 hover:shadow-sm transition-shadow">
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
  )
}
