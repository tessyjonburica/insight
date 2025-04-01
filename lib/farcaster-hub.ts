import type { UserData, FarcasterUser, UserActivity } from "@/types/farcaster"
import { calculateEngagementScore, calculateInfluenceRate, calculateNetworkReach } from "@/lib/analytics"

// Farcaster Hub API endpoint
const HUB_URL = process.env.FARCASTER_HUB_URL || "https://hub.farcaster.xyz:2281"

/**
 * Fetch user profile data from Farcaster Hub
 */
export async function fetchUserProfile(fid: string): Promise<FarcasterUser | null> {
  try {
    const response = await fetch(`${HUB_URL}/v1/userDataByFid?fid=${fid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.status}`)
    }

    const data = await response.json()

    // Extract user data from the response
    return {
      fid: data.data.fid.toString(),
      username: data.data.username,
      displayName: data.data.displayName || data.data.username,
      pfp: data.data.pfp || "/placeholder.svg?height=100&width=100",
      followerCount: data.data.followerCount || 0,
      followingCount: data.data.followingCount || 0,
      verifications: data.data.verifications || [],
    }
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return null
  }
}

/**
 * Fetch user activity data from Farcaster Hub
 */
export async function fetchUserActivity(fid: string): Promise<UserActivity | null> {
  try {
    // Fetch casts by the user
    const castsResponse = await fetch(`${HUB_URL}/v1/castsByFid?fid=${fid}&limit=100`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!castsResponse.ok) {
      throw new Error(`Failed to fetch casts: ${castsResponse.status}`)
    }

    const castsData = await castsResponse.json()

    // Count different types of casts
    let casts = 0
    let replies = 0
    let recasts = 0
    let quotes = 0
    let likesReceived = 0

    castsData.messages.forEach((cast: any) => {
      if (cast.data.castAddBody.parentCastId) {
        if (cast.data.castAddBody.text) {
          replies++
        } else {
          recasts++
        }
      } else if (cast.data.castAddBody.embedsDeprecated?.castId) {
        quotes++
      } else {
        casts++
      }

      // We'll need to fetch reactions separately
    })

    // Fetch reactions to the user's casts
    const reactionsResponse = await fetch(`${HUB_URL}/v1/reactionsByFid?fid=${fid}&reactionType=1&limit=100`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!reactionsResponse.ok) {
      throw new Error(`Failed to fetch reactions: ${reactionsResponse.status}`)
    }

    const reactionsData = await reactionsResponse.json()

    // Count likes received
    likesReceived = reactionsData.messages.length

    // Fetch likes given by the user
    const likesGivenResponse = await fetch(
      `${HUB_URL}/v1/reactionsByFid?fid=${fid}&reactionType=1&limit=100&isLiked=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )

    if (!likesGivenResponse.ok) {
      throw new Error(`Failed to fetch likes given: ${likesGivenResponse.status}`)
    }

    const likesGivenData = await likesGivenResponse.json()
    const likesGiven = likesGivenData.messages.length

    // Calculate performance metrics
    const totalActivity = casts + replies + recasts + quotes + likesGiven
    const activityLevel = Math.min(100, Math.round((totalActivity / 200) * 100))

    const networkReach = calculateNetworkReach(casts, recasts, quotes)
    const engagementScore = calculateEngagementScore(likesReceived, replies, recasts, quotes)
    const influenceRate = calculateInfluenceRate(likesReceived, recasts, quotes, casts)

    return {
      stats: {
        casts,
        replies,
        recasts,
        quotes,
        likesReceived,
        likesGiven,
      },
      performance: {
        activityLevel,
        networkReach,
        engagementScore,
        influenceRate,
      },
    }
  } catch (error) {
    console.error("Error fetching user activity:", error)
    return null
  }
}

/**
 * Fetch complete user data (profile + activity)
 */
export async function fetchUserData(fid: string): Promise<UserData | null> {
  try {
    const [profile, activity] = await Promise.all([fetchUserProfile(fid), fetchUserActivity(fid)])

    if (!profile || !activity) {
      return null
    }

    return {
      ...profile,
      ...activity,
    }
  } catch (error) {
    console.error("Error fetching user data:", error)
    return null
  }
}

