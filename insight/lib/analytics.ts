/**
 * Calculate network reach based on content distribution metrics
 * Network reach represents how far a user's content spreads in the network
 */
export function calculateNetworkReach(casts: number, recasts: number, quotes: number): number {
  // Base formula: weighted sum of content creation and distribution
  // Recasts and quotes have higher weight as they represent content spreading
  const baseScore = casts * 1 + recasts * 2.5 + quotes * 3

  // Normalize to a 0-100 scale
  // These values are calibrated based on average Farcaster activity
  const normalizedScore = Math.min(100, Math.round((baseScore / 200) * 100))

  return normalizedScore
}

/**
 * Calculate engagement score based on interaction metrics
 * Engagement score represents how much interaction a user's content receives
 */
export function calculateEngagementScore(
  likesReceived: number,
  replies: number,
  recasts: number,
  quotes: number,
): number {
  // Base formula: weighted sum of different engagement types
  // Likes have lowest weight, quotes have highest as they require more effort
  const baseScore = likesReceived * 1 + replies * 2 + recasts * 2.5 + quotes * 3

  // Normalize to a 0-100 scale
  const normalizedScore = Math.min(100, Math.round((baseScore / 300) * 100))

  return normalizedScore
}

/**
 * Calculate influence rate based on content impact metrics
 * Influence rate represents a user's impact on the Farcaster community
 */
export function calculateInfluenceRate(likesReceived: number, recasts: number, quotes: number, casts: number): number {
  // Base formula: ratio of engagement to content creation, weighted
  if (casts === 0) return 0

  const engagementSum = likesReceived + recasts * 3 + quotes * 4
  const ratio = engagementSum / casts

  // Normalize to a 0-100 scale with diminishing returns
  const normalizedScore = Math.min(100, Math.round((Math.sqrt(ratio) / 2) * 100))

  return normalizedScore
}

