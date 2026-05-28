import { useEffect, useState } from 'preact/hooks'

import { getWeatherData } from '@/lib/weather-api'
import type { WeatherData } from '@/lib/weather-types'

const POLL_INTERVAL_MS = 10 * 60 * 1000 // 10 minutes

export function useWeather() {
  const [data, setData] = useState<WeatherData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function fetchWeather() {
      try {
        const result = await getWeatherData()
        if (!cancelled) {
          setData(result)
          setError(null)
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to fetch weather')
          setLoading(false)
        }
      }
    }

    fetchWeather()
    const interval = setInterval(fetchWeather, POLL_INTERVAL_MS)

    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  return { data, error, loading }
}
