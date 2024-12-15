'use client'

import { motion } from 'framer-motion'

interface ProgressBarProps {
  progress: number
  total: number
}

export function ProgressBar({ progress, total }: ProgressBarProps) {
  const percentage = (progress / total) * 100

  return (
    <div className="progress-bar">
      <motion.div
        className="progress-bar__fill"
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  )
}
