'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

interface TimerProps {
  timeRemaining: number
  onTimeUp: () => void
}

export function Timer({ timeRemaining, onTimeUp }: TimerProps) {
  useEffect(() => {
    if (timeRemaining === 0) {
      onTimeUp()
    }
  }, [timeRemaining, onTimeUp])

  return (
    <div className="timer-container">
      <motion.div
        className="timer-border"
        initial={{ pathLength: 1 }}
        animate={{ pathLength: timeRemaining / 10 }}
        transition={{ duration: 1 }}
      />
      <div className="timer-text">{timeRemaining}</div>
    </div>
  )
}
