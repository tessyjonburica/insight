"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface PerformanceIndicatorProps {
  title: string
  value: number
  icon: React.ReactNode
  description: string
}

export default function PerformanceIndicator({ title, value, icon, description }: PerformanceIndicatorProps) {
  const [hovered, setHovered] = useState(false)

  // Determine color based on value
  const getColorClass = () => {
    if (value >= 70) return "bg-teal-500"
    if (value >= 40) return "bg-amber-500"
    return "bg-rose-500"
  }

  // Determine status icon
  const getStatusIcon = () => {
    if (value >= 70) return "✅"
    if (value >= 40) return "⚠️"
    return "❌"
  }

  return (
    <TooltipProvider>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <Card className="p-5 backdrop-blur-md bg-black/30 border-teal-500/20 shadow-lg rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <motion.div
                    animate={{
                      rotate: hovered ? [0, -10, 10, -10, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className="mr-2 text-teal-400"
                  >
                    {icon}
                  </motion.div>
                  <h3 className="text-sm font-medium text-gray-300">{title}</h3>
                </div>
                <span className="text-sm">{getStatusIcon()}</span>
              </div>

              <div className="mb-3">
                <Progress
                  value={value}
                  className="h-2.5 bg-gray-700/50 rounded-full"
                  indicatorClassName={`${getColorClass()} rounded-full`}
                />
              </div>

              <div className="flex justify-between items-center">
                <motion.span
                  className="text-xl font-bold text-white"
                  animate={{
                    scale: hovered ? 1.1 : 1,
                  }}
                >
                  {value}%
                </motion.span>
                <span className="text-xs text-gray-400 italic">
                  {value >= 70 ? "Excellent" : value >= 40 ? "Good" : "Needs Improvement"}
                </span>
              </div>
            </Card>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="bg-black/80 border-teal-500/30 text-white">
            <p>{description}</p>
          </TooltipContent>
        </Tooltip>
      </motion.div>
    </TooltipProvider>
  )
}

