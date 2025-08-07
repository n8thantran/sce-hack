"use client"

import { useState, useEffect } from "react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date("2025-08-28T00:00:00").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex justify-center space-x-4 flex-wrap gap-4">
      <div className="hackathon-card p-4 text-center border min-w-[80px]">
        <div className="text-3xl font-bold text-blue-400">{timeLeft.days}</div>
        <div className="text-sm hackathon-muted">Days</div>
      </div>
      <div className="hackathon-card p-4 text-center border min-w-[80px]">
        <div className="text-3xl font-bold text-blue-400">{timeLeft.hours}</div>
        <div className="text-sm hackathon-muted">Hours</div>
      </div>
      <div className="hackathon-card p-4 text-center border min-w-[80px]">
        <div className="text-3xl font-bold text-blue-400">{timeLeft.minutes}</div>
        <div className="text-sm hackathon-muted">Minutes</div>
      </div>
      <div className="hackathon-card p-4 text-center border min-w-[80px]">
        <div className="text-3xl font-bold text-blue-400">{timeLeft.seconds}</div>
        <div className="text-sm hackathon-muted">Seconds</div>
      </div>
    </div>
  )
}