export interface FarcasterUser {
  fid: string
  username: string
  displayName: string
  pfp: string
  followerCount: number
  followingCount: number
  verifications: string[]
}

export interface UserStats {
  casts: number
  replies: number
  recasts: number
  quotes: number
  likesReceived: number
  likesGiven: number
}

export interface PerformanceMetrics {
  activityLevel: number
  networkReach: number
  engagementScore: number
  influenceRate: number
}

export interface UserActivity {
  stats: UserStats
  performance: PerformanceMetrics
}

export interface UserData extends FarcasterUser {
  stats: UserStats
  performance: PerformanceMetrics
}

