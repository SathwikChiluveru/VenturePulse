import { DollarSign, Users, TrendingUp, Calendar } from "lucide-react"
import { MetricCard } from "@/components/ui/metric-card"
import { formatFunding, formatFollowers, calculateDaysSince } from "@/lib/formatters"
import type { Startup } from "@/types/startup"

interface StartupMetricsProps {
  startup: Startup
}

export function StartupMetrics({ startup }: StartupMetricsProps) {
  const daysSince = calculateDaysSince(startup.added_at)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <MetricCard
        title="Latest Funding"
        value={formatFunding(startup.latest_funding.amount)}
        icon={<DollarSign className="h-4 w-4" />}
        badge={{
          text: startup.latest_funding.round,
        }}
        subtitle={startup.latest_funding.date}
      />

      <MetricCard
        title="Followers"
        value={formatFollowers(startup.twitter_followers)}
        icon={<Users className="h-4 w-4" />}
        change={{
          value: "+2.1% from last week",
          type: "positive",
        }}
      />

      <MetricCard
        title="News Mentions"
        value={startup.recent_news_count.toString()}
        icon={<TrendingUp className="h-4 w-4" />}
        subtitle="Last 7 days"
        change={
          startup.recent_news_count > 30
            ? {
                value: "• Trending",
                type: "positive",
              }
            : undefined
        }
      />

      <MetricCard
        title="Tracking"
        value={`${daysSince}d`}
        icon={<Calendar className="h-4 w-4" />}
        subtitle={`Since ${new Date(startup.added_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
      />
    </div>
  )
}
