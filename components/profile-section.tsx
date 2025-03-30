"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { AtSign, Users } from "lucide-react"

interface ProfileSectionProps {
  username: string
  displayName: string
  fid: string
  profilePicture: string
  followerCount: number
  followingCount: number
}

export default function ProfileSection({
  username,
  displayName,
  fid,
  profilePicture,
  followerCount,
  followingCount,
}: ProfileSectionProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="p-6 backdrop-blur-md bg-black/30 border-teal-500/20 shadow-lg shadow-teal-500/10 rounded-xl">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 blur-md opacity-70 animate-pulse" />
            <div className="relative h-24 w-24 rounded-full overflow-hidden border-2 border-white/20">
              <Image src={profilePicture || "/placeholder.svg"} alt={displayName} fill className="object-cover" />
            </div>
          </motion.div>

          <div className="text-center sm:text-left">
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-2 mb-2"
            >
              <h2 className="text-2xl font-bold text-white">{displayName}</h2>
              <Badge variant="outline" className="bg-teal-500/10 text-teal-400 border-teal-500/30">
                Verified
              </Badge>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 flex items-center gap-1 mb-2"
            >
              <AtSign className="h-4 w-4 text-teal-400/70" />@{username} · FID: {fid}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center sm:justify-start gap-4 text-sm text-gray-400"
            >
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-teal-400/70" />
                <span className="font-medium text-white">{followerCount}</span> followers
              </div>
              <div>
                <span className="font-medium text-white">{followingCount}</span> following
              </div>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

