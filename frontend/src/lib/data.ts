import type { Startup, NewsArticle, FundingRound, TwitterMetrics } from "../types/startup"

export const mockStartups: Startup[] = [
  {
    id: "1",
    name: "Stripe",
    website: "stripe.com",
    twitter_handle: "@stripe",
    logo: "/placeholder.svg?height=40&width=40",
    added_at: "2024-01-15",
    latest_funding: { amount: 6500000000, round: "Series I", date: "2023-03-14" },
    twitter_followers: 180000,
    recent_news_count: 12,
    status: "active",
  },
  {
    id: "2",
    name: "OpenAI",
    website: "openai.com",
    twitter_handle: "@openai",
    logo: "/placeholder.svg?height=40&width=40",
    added_at: "2024-01-10",
    latest_funding: { amount: 10000000000, round: "Series C", date: "2023-01-23" },
    twitter_followers: 2100000,
    recent_news_count: 45,
    status: "trending",
  },
  {
    id: "3",
    name: "Anthropic",
    website: "anthropic.com",
    twitter_handle: "@anthropicai",
    logo: "/placeholder.svg?height=40&width=40",
    added_at: "2024-01-08",
    latest_funding: { amount: 4000000000, round: "Series C", date: "2023-09-25" },
    twitter_followers: 125000,
    recent_news_count: 28,
    status: "active",
  },
]

export const fundingData: Record<string, FundingRound[]> = {
  "1": [
    { date: "2010-05", amount: 2000000, round: "Seed" },
    { date: "2011-02", amount: 18000000, round: "Series A" },
    { date: "2012-07", amount: 20000000, round: "Series B" },
    { date: "2014-12", amount: 70000000, round: "Series C" },
    { date: "2016-11", amount: 150000000, round: "Series D" },
    { date: "2019-09", amount: 250000000, round: "Series G" },
    { date: "2023-03", amount: 6500000000, round: "Series I" },
  ],
  "2": [
    { date: "2019-07", amount: 1000000000, round: "Series A" },
    { date: "2021-10", amount: 100000000, round: "Series B" },
    { date: "2023-01", amount: 10000000000, round: "Series C" },
  ],
  "3": [
    { date: "2021-05", amount: 124000000, round: "Series A" },
    { date: "2022-04", amount: 580000000, round: "Series B" },
    { date: "2023-09", amount: 4000000000, round: "Series C" },
  ],
}

export const twitterData: Record<string, TwitterMetrics[]> = {
  "1": [
    { date: "2024-01-01", tweets: 12, likes: 2400, retweets: 180, followers: 178000 },
    { date: "2024-01-02", tweets: 8, likes: 1800, retweets: 120, followers: 178100 },
    { date: "2024-01-03", tweets: 15, likes: 3200, retweets: 240, followers: 178300 },
    { date: "2024-01-04", tweets: 6, likes: 1200, retweets: 80, followers: 178400 },
    { date: "2024-01-05", tweets: 20, likes: 4500, retweets: 350, followers: 178800 },
    { date: "2024-01-06", tweets: 10, likes: 2100, retweets: 160, followers: 179000 },
    { date: "2024-01-07", tweets: 14, likes: 2800, retweets: 200, followers: 179200 },
  ],
  "2": [
    { date: "2024-01-01", tweets: 25, likes: 15000, retweets: 2500, followers: 2098000 },
    { date: "2024-01-02", tweets: 18, likes: 12000, retweets: 1800, followers: 2099000 },
    { date: "2024-01-03", tweets: 30, likes: 22000, retweets: 3200, followers: 2101000 },
    { date: "2024-01-04", tweets: 12, likes: 8500, retweets: 1200, followers: 2101500 },
    { date: "2024-01-05", tweets: 35, likes: 28000, retweets: 4100, followers: 2103000 },
    { date: "2024-01-06", tweets: 22, likes: 16000, retweets: 2400, followers: 2104000 },
    { date: "2024-01-07", tweets: 28, likes: 19000, retweets: 2800, followers: 2105000 },
  ],
  "3": [
    { date: "2024-01-01", tweets: 8, likes: 1200, retweets: 180, followers: 124000 },
    { date: "2024-01-02", tweets: 5, likes: 800, retweets: 120, followers: 124100 },
    { date: "2024-01-03", tweets: 12, likes: 1800, retweets: 280, followers: 124300 },
    { date: "2024-01-04", tweets: 3, likes: 450, retweets: 60, followers: 124400 },
    { date: "2024-01-05", tweets: 15, likes: 2200, retweets: 350, followers: 124800 },
    { date: "2024-01-06", tweets: 7, likes: 1100, retweets: 160, followers: 125000 },
    { date: "2024-01-07", tweets: 10, likes: 1500, retweets: 220, followers: 125200 },
  ],
}

export const newsData: Record<string, NewsArticle[]> = {
  "1": [
    {
      id: "1",
      title: "Stripe launches new payment infrastructure for emerging markets",
      summary:
        "The payment giant announces expanded support for local payment methods across Southeast Asia and Latin America.",
      source: "TechCrunch",
      published_at: "2024-01-07T10:30:00Z",
      url: "https://techcrunch.com/stripe-emerging-markets",
      sentiment: "positive",
    },
    {
      id: "2",
      title: "Stripe's revenue growth accelerates in Q4 2023",
      summary: "Internal documents suggest the company processed over $1 trillion in payments last year.",
      source: "The Information",
      published_at: "2024-01-06T14:15:00Z",
      url: "https://theinformation.com/stripe-revenue",
      sentiment: "positive",
    },
    {
      id: "3",
      title: "Regulatory challenges mount for payment processors",
      summary: "New EU regulations could impact how companies like Stripe operate in European markets.",
      source: "Financial Times",
      published_at: "2024-01-05T09:45:00Z",
      url: "https://ft.com/payment-regulations",
      sentiment: "neutral",
    },
  ],
  "2": [
    {
      id: "4",
      title: "OpenAI announces GPT-5 development milestone",
      summary:
        "The company reveals significant progress on its next-generation language model with improved reasoning capabilities.",
      source: "Wired",
      published_at: "2024-01-07T16:20:00Z",
      url: "https://wired.com/openai-gpt5",
      sentiment: "positive",
    },
    {
      id: "5",
      title: "ChatGPT usage surpasses 100 million weekly active users",
      summary: "OpenAI reports record engagement as enterprise adoption continues to grow rapidly.",
      source: "Reuters",
      published_at: "2024-01-06T11:30:00Z",
      url: "https://reuters.com/chatgpt-users",
      sentiment: "positive",
    },
    {
      id: "6",
      title: "AI safety concerns raised by researchers",
      summary:
        "New study highlights potential risks in large language model deployment and calls for stronger safeguards.",
      source: "Nature",
      published_at: "2024-01-05T13:15:00Z",
      url: "https://nature.com/ai-safety",
      sentiment: "neutral",
    },
  ],
  "3": [
    {
      id: "7",
      title: "Anthropic's Claude 3 shows breakthrough in reasoning tasks",
      summary:
        "Latest benchmarks demonstrate significant improvements in mathematical and logical reasoning capabilities.",
      source: "MIT Technology Review",
      published_at: "2024-01-07T12:45:00Z",
      url: "https://technologyreview.com/claude-3",
      sentiment: "positive",
    },
    {
      id: "8",
      title: "Constitutional AI approach gains industry attention",
      summary: "Anthropic's safety-focused training methodology is being adopted by other AI research labs.",
      source: "VentureBeat",
      published_at: "2024-01-06T15:20:00Z",
      url: "https://venturebeat.com/constitutional-ai",
      sentiment: "positive",
    },
  ],
}
