import { useState, useEffect } from 'react'
import { useSessionUser } from '@/store/authStore'

const TokenCountdown = () => {
  const expiresIn = useSessionUser((state) => state.expiresIn)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)

  useEffect(() => {
    if (expiresIn) {
      const expirationTime = new Date().getTime() + expiresIn * 1000

      const updateTimer = () => {
        const remaining = expirationTime - new Date().getTime()
        setTimeLeft(remaining > 0 ? Math.floor(remaining / 1000) : 0)
      }

      const interval = setInterval(updateTimer, 1000)
      updateTimer()

      return () => clearInterval(interval)
    }
  }, [expiresIn])

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <span className="font-semibold">
      Tiempo restante de la sesión:{' '}
      <span className="text-green-500">{timeLeft !== null ? formatTime(timeLeft) : ''}</span>
    </span>
  )
}

export default TokenCountdown
