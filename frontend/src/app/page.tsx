import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { TrendingUp, BarChart3, Bell, Users, ArrowRight, Star } from "lucide-react"
import Link from "next/link"
import React from "react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200/60 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900 text-lg">Venture Pulse</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gray-900 hover:bg-gray-800 text-white">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 bg-gray-50 text-gray-700 border-gray-200">
            🚀 Track the next unicorns
          </Badge>
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Intelligence Dashboard
            <br />
            <span className="text-gray-600">for Startups</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Monitor funding rounds, social media buzz, and news sentiment for the startups that matter to you. Make
            informed investment decisions with real-time intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white">
                Start Tracking
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to track startups</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get comprehensive insights into startup performance, funding activity, and market sentiment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="border border-gray-200/60 hover:shadow-sm transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Funding Tracking</h3>
                <p className="text-sm text-gray-600">
                  Monitor funding rounds, valuations, and investor activity in real-time.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200/60 hover:shadow-sm transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Social Analytics</h3>
                <p className="text-sm text-gray-600">
                  Track Twitter engagement, follower growth, and social media buzz.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200/60 hover:shadow-sm transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Bell className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">News Monitoring</h3>
                <p className="text-sm text-gray-600">Stay updated with news mentions and sentiment analysis.</p>
              </CardContent>
            </Card>

            <Card className="border border-gray-200/60 hover:shadow-sm transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Team Insights</h3>
                <p className="text-sm text-gray-600">Analyze team growth, key hires, and leadership changes.</p>
              </CardContent>
            </Card>
          </div>

          {/* Dashboard Preview */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50/50 to-transparent z-10 pointer-events-none"></div>
            <Card className="border border-gray-200/60 overflow-hidden">
              <div className="bg-gray-900 p-4 flex items-center gap-2">
                <div className="w- 3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-gray-400 text-sm ml-4">startup-intelligence.com/dashboard</span>
              </div>
              <div className="p-8 bg-gray-50/30">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white p-4 rounded-lg border border-gray-200/60">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Latest Funding</span>
                      <BarChart3 className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="text-2xl font-semibold text-gray-900">$6.5B</div>
                    <div className="text-xs text-gray-500">Series I • 2023-03-14</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200/60">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Followers</span>
                      <Users className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="text-2xl font-semibold text-gray-900">180K</div>
                    <div className="text-xs text-green-600">+2.1% from last week</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200/60">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">News Mentions</span>
                      <Bell className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="text-2xl font-semibold text-gray-900">12</div>
                    <div className="text-xs text-gray-500">Last 7 days</div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-gray-200/60">
                  <div className="h-32 bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Interactive Charts & Analytics</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-gray-600">
          © 2025 Venture Pulse. All rights reserved.
        </div>
      </footer>

    </div>
  )
}
