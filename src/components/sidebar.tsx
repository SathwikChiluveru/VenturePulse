"use client"

import { TrendingUp, Plus } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatFunding } from "@/lib/formatters"
import type { Startup } from "@/types/startup"

interface AppSidebarProps {
  startups: Startup[]
  selectedStartup: Startup
  onSelectStartup: (startup: Startup) => void
  onAddStartup: () => void
}

export function AppSidebar({ startups, selectedStartup, onSelectStartup, onAddStartup }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-gray-200/60 bg-white">
      <SidebarHeader className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          <span className="font-medium text-gray-900">Startup Tracker</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarGroup>
          <div className="flex items-center justify-between mb-3">
            <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Startups
            </SidebarGroupLabel>
            <Button variant="ghost" size="sm" onClick={onAddStartup} className="h-6 w-6 p-0 hover:bg-gray-100">
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {startups.map((startup) => (
                <SidebarMenuItem key={startup.id}>
                  <SidebarMenuButton
                    onClick={() => onSelectStartup(startup)}
                    isActive={selectedStartup.id === startup.id}
                    className={`flex flex-col items-start gap-2 p-3 h-auto rounded-lg transition-all duration-200 ${
                      selectedStartup.id === startup.id ? "bg-gray-100 border border-gray-200" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <img src={startup.logo || "/placeholder.svg"} alt={startup.name} className="h-5 w-5 rounded" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-gray-900 text-sm">{startup.name}</span>
                        <div className="text-xs text-gray-500 truncate">{startup.website}</div>
                      </div>
                      {startup.status === "trending" && <div className="w-2 h-2 bg-orange-400 rounded-full"></div>}
                    </div>
                    <div className="flex items-center gap-2 text-xs w-full">
                      <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-0 text-xs">
                        {formatFunding(startup.latest_funding.amount)}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`border-0 text-xs ${
                          startup.recent_news_count > 30 ? "bg-orange-50 text-orange-600" : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {startup.recent_news_count}
                      </Badge>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
