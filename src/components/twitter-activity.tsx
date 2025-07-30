"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock Twitter activity data
const twitterData = {
  "1": [
    // Stripe
    { date: "2024-01-01", tweets: 12, likes: 2400, retweets: 180, followers: 178000 },
    { date: "2024-01-02", tweets: 8, likes: 1800, retweets: 120, followers: 178100 },
    { date: "2024-01-03", tweets: 15, likes: 3200, retweets: 240, followers: 178300 },
    { date: "2024-01-04", tweets: 6, likes: 1200, retweets: 80, followers: 178400 },
    { date: "2024-01-05", tweets: 20, likes: 4500, retweets: 350, followers: 178800 },
    { date: "2024-01-06", tweets: 10, likes: 2100, retweets: 160, followers: 179000 },
    { date: "2024-01-07", tweets: 14, likes: 2800, retweets: 200, followers: 179200 },
  ],
  "2": [
    // OpenAI
    { date: "2024-01-01", tweets: 25, likes: 15000, retweets: 2500, followers: 2098000 },
    { date: "2024-01-02", tweets: 18, likes: 12000, retweets: 1800, followers: 2099000 },
    { date: "2024-01-03", tweets: 30, likes: 22000, retweets: 3200, followers: 2101000 },
    { date: "2024-01-04", tweets: 12, likes: 8500, retweets: 1200, followers: 2101500 },
    { date: "2024-01-05", tweets: 35, likes: 28000, retweets: 4100, followers: 2103000 },
    { date: "2024-01-06", tweets: 22, likes: 16000, retweets: 2400, followers: 2104000 },
    { date: "2024-01-07", tweets: 28, likes: 19000, retweets: 2800, followers: 2105000 },
  ],
  "3": [
    // Anthropic
    { date: "2024-01-01", tweets: 8, likes: 1200, retweets: 180, followers: 124000 },
    { date: "2024-01-02", tweets: 5, likes: 800, retweets: 120, followers: 124100 },
    { date: "2024-01-03", tweets: 12, likes: 1800, retweets: 280, followers: 124300 },
    { date: "2024-01-04", tweets: 3, likes: 450, retweets: 60, followers: 124400 },
    { date: "2024-01-05", tweets: 15, likes: 2200, retweets: 350, followers: 124800 },
    { date: "2024-01-06", tweets: 7, likes: 1100, retweets: 160, followers: 125000 },
    { date: "2024-01-07", tweets: 10, likes: 1500, retweets: 220, followers: 125200 },
  ],
}

interface TwitterActivityChartProps {
  startupId: string
  detailed?: boolean
}

export function TwitterActivityChart({ startupId, detailed = false }: TwitterActivityChartProps) {
  const data = twitterData[startupId as keyof typeof twitterData] || []

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num.toString()
  }

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="likesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6b7280" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#6b7280" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="retweetsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9ca3af" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#9ca3af" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            tickFormatter={formatNumber}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value: number, name) => [formatNumber(value), name]}
            labelFormatter={(label) => `${new Date(label).toLocaleDateString()}`}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Area
            type="monotone"
            dataKey="likes"
            stackId="1"
            stroke="#6b7280"
            strokeWidth={2}
            fill="url(#likesGradient)"
          />
          <Area
            type="monotone"
            dataKey="retweets"
            stackId="1"
            stroke="#9ca3af"
            strokeWidth={2}
            fill="url(#retweetsGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>

      {detailed && (
        <div className="mt-6 grid grid-cols-2 gap-6 text-sm">
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
            <h4 className="font-medium mb-3 text-gray-900">Engagement</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Tweets:</span>
                <span className="font-medium text-gray-900">{data.reduce((sum, day) => sum + day.tweets, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Likes:</span>
                <span className="font-medium text-gray-900">
                  {formatNumber(data.reduce((sum, day) => sum + day.likes, 0))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Retweets:</span>
                <span className="font-medium text-gray-900">
                  {formatNumber(data.reduce((sum, day) => sum + day.retweets, 0))}
                </span>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
            <h4 className="font-medium mb-3 text-gray-900">Growth</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Follower Growth:</span>
                <span className="font-medium text-gray-900">
                  +{formatNumber(data[data.length - 1]?.followers - data[0]?.followers || 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg. Daily Tweets:</span>
                <span className="font-medium text-gray-900">
                  {Math.round(data.reduce((sum, day) => sum + day.tweets, 0) / data.length)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Engagement Rate:</span>
                <span className="font-medium text-gray-900">4.2%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
