import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Badge } from "./badge"
import type { ReactNode } from "react"

interface MetricCardProps {
  title: string
  value: string
  icon: ReactNode
  subtitle?: string
  badge?: {
    text: string
    variant?: "default" | "secondary" | "outline"
  }
  change?: {
    value: string
    type: "positive" | "negative" | "neutral"
  }
}

export function MetricCard({ title, value, icon, subtitle, badge, change }: MetricCardProps) {
  const getChangeColor = (type: string) => {
    switch (type) {
      case "positive":
        return "text-green-600"
      case "negative":
        return "text-red-600"
      default:
        return "text-gray-500"
    }
  }

  return (
    <Card className="border border-gray-200/60">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className="text-gray-400">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold text-gray-900">{value}</div>
        <div className="flex items-center gap-2 text-xs mt-1">
          {badge && (
            <Badge variant={badge.variant || "secondary"} className="bg-gray-100 text-gray-600 border-0">
              {badge.text}
            </Badge>
          )}
          {subtitle && <span className="text-gray-500">{subtitle}</span>}
          {change && <span className={getChangeColor(change.type)}>{change.value}</span>}
        </div>
      </CardContent>
    </Card>
  )
}
