"use client"

import { ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart } from "recharts"

// Mock funding data
const fundingData = {
  "1": [
    // Stripe
    { date: "2010-05", amount: 2000000, round: "Seed" },
    { date: "2011-02", amount: 18000000, round: "Series A" },
    { date: "2012-07", amount: 20000000, round: "Series B" },
    { date: "2014-12", amount: 70000000, round: "Series C" },
    { date: "2016-11", amount: 150000000, round: "Series D" },
    { date: "2019-09", amount: 250000000, round: "Series G" },
    { date: "2023-03", amount: 6500000000, round: "Series I" },
  ],
  "2": [
    // OpenAI
    { date: "2019-07", amount: 1000000000, round: "Series A" },
    { date: "2021-10", amount: 100000000, round: "Series B" },
    { date: "2023-01", amount: 10000000000, round: "Series C" },
  ],
  "3": [
    // Anthropic
    { date: "2021-05", amount: 124000000, round: "Series A" },
    { date: "2022-04", amount: 580000000, round: "Series B" },
    { date: "2023-09", amount: 4000000000, round: "Series C" },
  ],
}

interface FundingChartProps {
  startupId: string
  detailed?: boolean
}

export function FundingChart({ startupId, detailed = false }: FundingChartProps) {
  const data = fundingData[startupId as keyof typeof fundingData] || []

  const formatAmount = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`
    }
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(0)}M`
    }
    return `$${(amount / 1000).toFixed(0)}K`
  }

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="fundingGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#374151" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#374151" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            tickFormatter={(value) => new Date(value).getFullYear().toString()}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            tickFormatter={formatAmount}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value: number, name) => [formatAmount(value), "Funding"]}
            labelFormatter={(label) => `${label}`}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#374151"
            strokeWidth={2}
            fill="url(#fundingGradient)"
            dot={{ fill: "#374151", strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, fill: "#374151", stroke: "#fff", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {detailed && (
        <div className="mt-6 space-y-3">
          <h4 className="font-medium text-gray-900 text-sm">Funding Rounds</h4>
          {data.map((round, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full" />
                <span className="font-medium text-gray-900 text-sm">{round.round}</span>
              </div>
              <span className="text-gray-500 text-sm">{round.date}</span>
              <span className="font-medium text-gray-900 text-sm">{formatAmount(round.amount)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
