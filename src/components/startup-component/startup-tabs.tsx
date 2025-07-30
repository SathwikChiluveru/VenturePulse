import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Newspaper, Users, DollarSign } from "lucide-react"
import { FundingChart } from "@/components/charts/funding-chart"
import { TwitterActivityChart } from "@/components/charts/twitter-activity-chart"
import { NewsFeed } from "@/components/news/news-feed"
import type { Startup } from "@/types/startup"

interface StartupTabsProps {
  startup: Startup
}

export function StartupTabs({ startup }: StartupTabsProps) {
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="bg-gray-100 border-0">
        <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
          Overview
        </TabsTrigger>
        <TabsTrigger value="news" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
          News
        </TabsTrigger>
        <TabsTrigger value="funding" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
          Funding
        </TabsTrigger>
        <TabsTrigger value="social" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
          Social
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border border-gray-200/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="h-4 w-4 text-gray-600" />
                Funding History
              </CardTitle>
              <CardDescription>Funding rounds over time</CardDescription>
            </CardHeader>
            <CardContent>
              <FundingChart startupId={startup.id} />
            </CardContent>
          </Card>

          <Card className="border border-gray-200/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="h-4 w-4 text-gray-600" />
                Social Activity
              </CardTitle>
              <CardDescription>Engagement metrics (last 30 days)</CardDescription>
            </CardHeader>
            <CardContent>
              <TwitterActivityChart startupId={startup.id} />
            </CardContent>
          </Card>
        </div>

        <Card className="border border-gray-200/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Newspaper className="h-4 w-4 text-gray-600" />
              Recent News
            </CardTitle>
            <CardDescription>Latest mentions and coverage</CardDescription>
          </CardHeader>
          <CardContent>
            <NewsFeed startupId={startup.id} limit={5} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="news">
        <Card className="border border-gray-200/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Newspaper className="h-4 w-4 text-gray-600" />
              All News
            </CardTitle>
            <CardDescription>Complete news feed for {startup.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <NewsFeed startupId={startup.id} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="funding">
        <Card className="border border-gray-200/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <DollarSign className="h-4 w-4 text-gray-600" />
              Funding Timeline
            </CardTitle>
            <CardDescription>Complete funding history</CardDescription>
          </CardHeader>
          <CardContent>
            <FundingChart startupId={startup.id} detailed />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="social">
        <Card className="border border-gray-200/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-4 w-4 text-gray-600" />
              Social Analytics
            </CardTitle>
            <CardDescription>Twitter engagement and growth metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <TwitterActivityChart startupId={startup.id} detailed />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
