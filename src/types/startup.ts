export interface Startup {
    id: string
    name: string
    website: string
    twitter_handle: string
    logo: string
    added_at: string
    latest_funding: {
      amount: number
      round: string
      date: string
    }
    twitter_followers: number
    recent_news_count: number
    status: string
  }
  
  export interface NewsArticle {
    id: string
    title: string
    summary: string
    source: string
    published_at: string
    url: string
    sentiment: "positive" | "negative" | "neutral"
  }
  
  export interface FundingRound {
    date: string
    amount: number
    round: string
  }
  
  export interface TwitterMetrics {
    date: string
    tweets: number
    likes: number
    retweets: number
    followers: number
  }
  