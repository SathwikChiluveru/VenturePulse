import { StartupHeader } from "./startup-component/startup-header"
import { StartupMetrics } from "./startup-component/startup-metrics"
import { StartupTabs } from "./startup-component/startup-tabs"
import type { Startup } from "../types/startup"

interface DashboardContentProps {
  startup: Startup
}

export function DashboardContent({ startup }: DashboardContentProps) {
  return (
    <div className="space-y-8">
      <StartupHeader startup={startup} />
      <StartupMetrics startup={startup} />
      <StartupTabs startup={startup} />
    </div>
  )
}
