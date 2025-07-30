"use client"

import { ResponsiveContainer, Tooltip, XAxis, YAxis, Area, AreaChart } from "recharts"
import { fundingData } from "../../lib/data"
import { formatFunding } from "../../lib/formatters"

interface FundingChartProps {
  startupId: string
  detailed?: boolean
}

export function FundingChart({ startupId, detailed = false }: FundingChartProps) {
  const data = fundingData[startupId] || []

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
            tickFormatter={formatFunding}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value: number, name) => [formatFunding(value), "Funding"]}
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
              <span className="font-medium text-gray-900 text-sm">{formatFunding(round.amount)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
