"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Heart, Repeat, Quote, Activity, Users, TrendingUp, Award, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import ProfileSection from "@/components/profile-section"
import StatsCard from "@/components/stats-card"
import PerformanceIndicator from "@/components/performance-indicator"
import ParticleBackground from "@/components/particle-background"

declare global {
  interface Window {
    frameSDK?: {
      actions: {
        ready: () => void
      }
    }
  }
}

export default function ActivityAnalyzer() {
  const [loading, setLoading] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)
  const [userData, setUserData] = useState({
    username: "farcaster_user",
    fid: "12345",
    profilePicture: "/placeholder.svg?height=100&width=100",
    stats: {
      casts: 24,
      replies: 42,
      recasts: 18,
      quotes: 7,
      likesReceived: 156,
      likesGiven: 89,
    },
    performance: {
      activityLevel: 78,
      networkReach: 65,
      engagementScore: 82,
      influenceRate: 71,
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

    // Simulate API call to fetch user data
    setTimeout(() => {
      setLoading(false)
      setAnalyzed(true)
    }, 2000)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-purple-950 to-blue-900">
      <ParticleBackground />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-500">
            Farcaster Activity Analyzer
          </h1>
          <p className="text-gray-300 mt-2">Get insights into your daily Farcaster activity</p>
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
                <Card className="p-6 backdrop-blur-md bg-black/30 border-purple-500/20 shadow-lg shadow-purple-500/10">
                  <div className="text-center">
                    <h2 className="text-xl font-semibold text-white mb-4">Welcome to Activity Analyzer</h2>
                    <p className="text-gray-300 mb-6">
                      Click the button below to analyze your Farcaster activity and get personalized insights.
                    </p>
                    <Button
                      onClick={handleAnalyze}
                      className="w-full py-6 text-lg font-medium bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-700/30 transition-all duration-300 hover:shadow-purple-600/50 hover:scale-105 group"
                    >
                      {loading ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          <span className="mr-2">Analyze Now</span>
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
                fid={userData.fid}
                profilePicture={userData.profilePicture}
              />

              {/* Stats Section */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-cyan-400" />
                  Daily Activity Stats
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <StatsCard
                    title="Casts"
                    value={userData.stats.casts}
                    icon={<MessageSquare className="h-5 w-5" />}
                    color="from-blue-500 to-cyan-400"
                  />
                  <StatsCard
                    title="Replies"
                    value={userData.stats.replies}
                    icon={<MessageSquare className="h-5 w-5" />}
                    color="from-indigo-500 to-blue-400"
                  />
                  <StatsCard
                    title="Recasts"
                    value={userData.stats.recasts}
                    icon={<Repeat className="h-5 w-5" />}
                    color="from-green-500 to-emerald-400"
                  />
                  <StatsCard
                    title="Quotes"
                    value={userData.stats.quotes}
                    icon={<Quote className="h-5 w-5" />}
                    color="from-yellow-500 to-amber-400"
                  />
                  <StatsCard
                    title="Likes Received"
                    value={userData.stats.likesReceived}
                    icon={<Heart className="h-5 w-5" />}
                    color="from-red-500 to-pink-400"
                  />
                  <StatsCard
                    title="Likes Given"
                    value={userData.stats.likesGiven}
                    icon={<Heart className="h-5 w-5" />}
                    color="from-pink-500 to-purple-400"
                  />
                </div>
              </motion.div>

              {/* Performance Analysis Section */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-purple-400" />
                  Performance Analysis
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <PerformanceIndicator
                    title="Activity Level"
                    value={userData.performance.activityLevel}
                    icon={<Activity className="h-5 w-5" />}
                    description="How active you are compared to other users"
                  />
                  <PerformanceIndicator
                    title="Network Reach"
                    value={userData.performance.networkReach}
                    icon={<Users className="h-5 w-5" />}
                    description="How far your content spreads in the network"
                  />
                  <PerformanceIndicator
                    title="Engagement Score"
                    value={userData.performance.engagementScore}
                    icon={<MessageSquare className="h-5 w-5" />}
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

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center mt-8"
              >
                <Button
                  onClick={() => setAnalyzed(false)}
                  className="py-6 px-8 text-lg font-medium bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-700/30 transition-all duration-300 hover:shadow-purple-600/50 hover:scale-105"
                >
                  Analyze Again
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

