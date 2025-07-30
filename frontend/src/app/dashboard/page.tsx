"use client"

import React from "react"
import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar"
import { AppSidebar } from "../../components/sidebar"
import { DashboardContent } from "../../components/dashboard-content"
import { AddStartupDialog } from "../../components/add-startup"
import { mockStartups } from "../../lib/data"

export default function Dashboard() {
  const [selectedStartup, setSelectedStartup] = useState(mockStartups[0])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50/30">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar
            startups={mockStartups}
            selectedStartup={selectedStartup}
            onSelectStartup={setSelectedStartup}
            onAddStartup={() => setIsAddDialogOpen(true)}
          />
          <main className="flex-1 overflow-hidden">
            <div className="flex h-full flex-col">
              <header className="flex h-16 items-center gap-4 border-b border-gray-200/60 bg-white/80 backdrop-blur-sm px-6">
                <SidebarTrigger />
                <h1 className="text-lg font-medium text-gray-900">Venture Pulse</h1>
              </header>
              <div className="flex-1 overflow-auto p-6">
                <DashboardContent startup={selectedStartup} />
              </div>
            </div>
          </main>
        </div>
        <AddStartupDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
      </SidebarProvider>
    </div>
  )
}
