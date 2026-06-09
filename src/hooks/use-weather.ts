import { useEffect, useState } from 'preact/hooks'

import { fetchWeather } from '@/lib/weather-api'
import type { WeatherData } from '@/lib/weather-types'

/**
 * The page is loaded once by the headless capturer and then screenshotted every
 * 10 minutes without reloading, so the SPA must refresh its own data on this
 * interval. Without it every frame after the first would be identical.
 */
const REFRESH_INTERVAL_MS = 10 * 60 * 1000

export type WeatherStatus = 'loading' | 'ready' | 'error'

export type WeatherState = {
  data: WeatherData | null
  status: WeatherStatus
  updatedAt: Date | null
}

export function useWeather(): WeatherState {
  const [state, setState] = useState<WeatherState>({
    data: null,
    status: 'loading',
    updatedAt: null,
  })

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const data = await fetchWeather()
        if (cancelled) return
        setState({ data, status: 'ready', updatedAt: new Date() })
      } catch {
        if (cancelled) return
        // Keep showing the last good frame on a refresh failure; only surface an
        // error when nothing has loaded yet.
        setState((previous) => ({
          data: previous.data,
          status: previous.data ? 'ready' : 'error',
          updatedAt: previous.updatedAt,
        }))
      }
    }

    load()
    const intervalId = setInterval(load, REFRESH_INTERVAL_MS)
    return () => {
      cancelled = true
      clearInterval(intervalId)
    }
  }, [])

  return state
}
