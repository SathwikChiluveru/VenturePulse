"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { twitterData } from "@/lib/data"
import { formatNumber } from "@/lib/formatters"

interface TwitterActivityChartProps {
  startupId: string
  detailed?: boolean
}

export function TwitterActivityChart({ startupId, detailed = false }: TwitterActivityChartProps) {
  const data = twitterData[startupId] || []

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
