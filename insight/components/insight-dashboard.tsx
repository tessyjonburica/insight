"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MessageSquare,
  Heart,
  Repeat,
  Quote,
  BarChart3,
  Users,
  TrendingUp,
  Award,
  Loader2,
  Sparkles,
  Zap,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ProfileSection from "@/components/profile-section"
import StatsCard from "@/components/stats-card"
import PerformanceIndicator from "@/components/performance-indicator"
import GradientBackground from "@/components/gradient-background"
import type { UserData } from "@/types/farcaster"

declare global {
  interface Window {
    frameSDK?: {
      actions: {
        ready: () => void
      }
    }
  }
}

export default function InsightDashboard() {
  const [loading, setLoading] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)
  const [userData, setUserData] = useState<UserData>({
    fid: "12345",
    username: "farcaster_user",
    displayName: "Farcaster User",
    pfp: "/placeholder.svg?height=100&width=100",
    followerCount: 0,
    followingCount: 0,
    verifications: [],
    stats: {
      casts: 0,
      replies: 0,
      recasts: 0,
      quotes: 0,
      likesReceived: 0,
      likesGiven: 0,
    },
    performance: {
      activityLevel: 0,
      networkReach: 0,
      engagementScore: 0,
      influenceRate: 0,
    },
  })

  useEffect(() => {
    // Hide splash screen when component is fully loaded
    if (typeof window !== "undefined" && window.frameSDK) {
      window.frameSDK.actions.ready()
    }
  }, [])

  const handleAnalyze = () => {
    setLoading(true)

    // In a real implementation, this would be handled by the frame protocol
    // For preview purposes, we'll simulate the API call
    setTimeout(() => {
      // This data would come from the Farcaster Hub in production
      const mockUserData: UserData = {
        fid: "12345",
        username: "farcaster_user",
        displayName: "Farcaster User",
        pfp: "/placeholder.svg?height=100&width=100",
        followerCount: 542,
        followingCount: 231,
        verifications: ["example.com"],
        stats: {
          casts: Math.floor(Math.random() * 40) + 10,
          replies: Math.floor(Math.random() * 60) + 20,
          recasts: Math.floor(Math.random() * 30) + 5,
          quotes: Math.floor(Math.random() * 15) + 2,
          likesReceived: Math.floor(Math.random() * 200) + 50,
          likesGiven: Math.floor(Math.random() * 100) + 30,
        },
        performance: {
          activityLevel: 0, // Will be calculated
          networkReach: 0, // Will be calculated
          engagementScore: 0, // Will be calculated
          influenceRate: 0, // Will be calculated
        },
      }

      // Calculate performance metrics
      const { stats } = mockUserData
      const totalActivity = stats.casts + stats.replies + stats.recasts + stats.quotes + stats.likesGiven

      mockUserData.performance = {
        activityLevel: Math.min(100, Math.round((totalActivity / 200) * 100)),
        networkReach: calculateNetworkReach(stats.casts, stats.recasts, stats.quotes),
        engagementScore: calculateEngagementScore(stats.likesReceived, stats.replies, stats.recasts, stats.quotes),
        influenceRate: calculateInfluenceRate(stats.likesReceived, stats.recasts, stats.quotes, stats.casts),
      }

      setUserData(mockUserData)
      setLoading(false)
      setAnalyzed(true)
    }, 2000)
  }

  // Helper functions for calculating metrics
  function calculateNetworkReach(casts: number, recasts: number, quotes: number): number {
    const baseScore = casts * 1 + recasts * 2.5 + quotes * 3
    return Math.min(100, Math.round((baseScore / 200) * 100))
  }

  function calculateEngagementScore(likesReceived: number, replies: number, recasts: number, quotes: number): number {
    const baseScore = likesReceived * 1 + replies * 2 + recasts * 2.5 + quotes * 3
    return Math.min(100, Math.round((baseScore / 300) * 100))
  }

  function calculateInfluenceRate(likesReceived: number, recasts: number, quotes: number, casts: number): number {
    if (casts === 0) return 0
    const engagementSum = likesReceived + recasts * 3 + quotes * 4
    const ratio = engagementSum / casts
    return Math.min(100, Math.round((Math.sqrt(ratio) / 2) * 100))
  }

  const handleShare = () => {
    // In a real implementation, this would trigger the frame's share functionality
    // For preview purposes, we'll just show an alert
    alert("In the actual frame, this would share your stats as a cast!")
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0a1f]">
      <GradientBackground />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-teal-400" />
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400">
              Insight
            </h1>
          </div>
          <p className="text-gray-300 mt-2">Powerful analytics for your Farcaster activity</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!analyzed ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                className="w-full max-w-md"
              >
                <Card className="p-8 backdrop-blur-md bg-black/30 border-teal-500/20 shadow-lg shadow-teal-500/10 rounded-xl">
                  <div className="text-center">
                    <div className="mb-6 flex justify-center">
                      <div className="p-3 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full">
                        <Zap className="h-8 w-8 text-teal-400" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-semibold text-white mb-4">Welcome to Insight</h2>
                    <p className="text-gray-300 mb-8">
                      Discover your Farcaster influence and engagement with our advanced analytics.
                    </p>
                    <Button
                      onClick={handleAnalyze}
                      className="w-full py-6 text-lg font-medium bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 shadow-lg shadow-teal-700/30 transition-all duration-300 hover:shadow-teal-600/50 hover:scale-105 group rounded-xl"
                    >
                      {loading ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          <span className="mr-2">Analyze My Activity</span>
                          <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                              repeat: Number.POSITIVE_INFINITY,
                              duration: 1.5,
                              repeatType: "reverse",
                            }}
                          >
                            →
                          </motion.span>
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              {/* Profile Section */}
              <ProfileSection
                username={userData.username}
                displayName={userData.displayName}
                fid={userData.fid}
                profilePicture={userData.pfp}
                followerCount={userData.followerCount}
                followingCount={userData.followingCount}
              />

              {/* Stats Section */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-teal-400" />
                  Activity Metrics
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <StatsCard
                    title="Casts"
                    value={userData.stats.casts}
                    icon={<MessageSquare className="h-5 w-5" />}
                    color="from-teal-500 to-emerald-400"
                  />
                  <StatsCard
                    title="Replies"
                    value={userData.stats.replies}
                    icon={<MessageSquare className="h-5 w-5" />}
                    color="from-cyan-500 to-teal-400"
                  />
                  <StatsCard
                    title="Recasts"
                    value={userData.stats.recasts}
                    icon={<Repeat className="h-5 w-5" />}
                    color="from-emerald-500 to-green-400"
                  />
                  <StatsCard
                    title="Quotes"
                    value={userData.stats.quotes}
                    icon={<Quote className="h-5 w-5" />}
                    color="from-amber-500 to-yellow-400"
                  />
                  <StatsCard
                    title="Likes Received"
                    value={userData.stats.likesReceived}
                    icon={<Heart className="h-5 w-5" />}
                    color="from-rose-500 to-pink-400"
                  />
                  <StatsCard
                    title="Likes Given"
                    value={userData.stats.likesGiven}
                    icon={<Heart className="h-5 w-5" />}
                    color="from-fuchsia-500 to-purple-400"
                  />
                </div>
              </motion.div>

              {/* Performance Analysis Section */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-teal-400" />
                  Performance Analysis
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <PerformanceIndicator
                    title="Activity Level"
                    value={userData.performance.activityLevel}
                    icon={<Zap className="h-5 w-5" />}
                    description="How active you are compared to other users"
                  />
                  <PerformanceIndicator
                    title="Network Reach"
                    value={userData.performance.networkReach}
                    icon={<Share2 className="h-5 w-5" />}
                    description="How far your content spreads in the network"
                  />
                  <PerformanceIndicator
                    title="Engagement Score"
                    value={userData.performance.engagementScore}
                    icon={<Users className="h-5 w-5" />}
                    description="How much engagement your content receives"
                  />
                  <PerformanceIndicator
                    title="Influence Rate"
                    value={userData.performance.influenceRate}
                    icon={<Award className="h-5 w-5" />}
                    description="Your impact on the Farcaster community"
                  />
                </div>
              </motion.div>

              {/* Share Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row justify-center gap-4 mt-8"
              >
                <Button
                  onClick={() => setAnalyzed(false)}
                  className="py-6 px-8 text-lg font-medium bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 shadow-lg shadow-teal-700/30 transition-all duration-300 hover:shadow-teal-600/50 hover:scale-105 rounded-xl"
                >
                  Analyze Again
                </Button>
                <Button
                  onClick={handleShare}
                  className="py-6 px-8 text-lg font-medium bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-700/30 transition-all duration-300 hover:shadow-emerald-600/50 hover:scale-105 rounded-xl flex items-center gap-2"
                >
                  <Share2 className="h-5 w-5" />
                  Share as Cast
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

