"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import CountUp from "react-countup"

interface StatsCardProps {
  title: string
  value: number
  icon: React.ReactNode
  color: string
}

export default function StatsCard({ title, value, icon, color }: StatsCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Card className="p-4 h-full backdrop-blur-md bg-gradient-to-br bg-black/30 border-teal-500/20 shadow-lg overflow-hidden relative rounded-xl">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10`}
          animate={{
            opacity: hovered ? 0.2 : 0.1,
          }}
        />

        <div className="flex flex-col items-center justify-center h-full relative z-10">
          <motion.div
            animate={{
              y: hovered ? -5 : 0,
              scale: hovered ? 1.1 : 1,
            }}
            className={`text-gradient bg-gradient-to-r ${color} p-2 rounded-full mb-2`}
          >
            {icon}
          </motion.div>

          <h3 className="text-sm font-medium text-gray-300 mb-1">{title}</h3>

          <motion.div
            className="text-xl font-bold text-white"
            animate={{
              scale: hovered ? 1.1 : 1,
            }}
          >
            <CountUp end={value} duration={2} separator="," />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}

