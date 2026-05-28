import {
  Sun,
  Cloud,
  CloudSun,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Wind,
  CloudFog,
  Moon,
} from 'lucide-react'

import type { WeatherCode } from '@/lib/weather-types'

export function getWeatherIcon(weatherCode: WeatherCode, isNight = false): string {
  // WMO weather interpretation codes
  if (weatherCode === 0) return isNight ? 'clear-night' : 'clear'
  if (weatherCode <= 3) return isNight ? 'cloudy-night' : 'cloudy'
  if (weatherCode <= 48) return 'fog'
  if (weatherCode <= 57) return 'rain'
  if (weatherCode <= 67) return 'rain'
  if (weatherCode <= 77) return 'snow'
  if (weatherCode <= 82) return 'rain'
  if (weatherCode <= 86) return 'snow'
  if (weatherCode <= 99) return 'thunder'
  return 'clear'
}

const ICON_MAP: Record<string, { component: typeof Sun; color: string }> = {
  clear: {
    component: Sun,
    color: 'text-amber-400',
  },
  'clear-night': {
    component: Moon,
    color: 'text-indigo-300',
  },
  cloudy: {
    component: Cloud,
    color: 'text-gray-400',
  },
  'cloudy-night': {
    component: Cloud,
    color: 'text-gray-500',
  },
  'partly-cloudy': {
    component: CloudSun,
    color: 'text-yellow-300',
  },
  fog: {
    component: CloudFog,
    color: 'text-gray-500',
  },
  rain: {
    component: CloudRain,
    color: 'text-blue-400',
  },
  snow: {
    component: CloudSnow,
    color: 'text-blue-200',
  },
  thunder: {
    component: CloudLightning,
    color: 'text-yellow-500',
  },
}

export function WeatherIcon({
  weatherCode,
  isNight = false,
  size = 48,
}: {
  weatherCode: WeatherCode
  isNight?: boolean
  size?: number
}) {
  const iconKey = getWeatherIcon(weatherCode, isNight)
  const icon = ICON_MAP[iconKey] ?? ICON_MAP['clear']
  const IconComponent = icon.component

  return <IconComponent size={size} class={icon.color} />
}

export function getWeatherDescription(weatherCode: WeatherCode): string {
  const descriptions: Record<number, string> = {
    0: 'Clear Sky',
    1: 'Mainly Clear',
    2: 'Partly Cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Rime Fog',
    51: 'Light Drizzle',
    53: 'Moderate Drizzle',
    55: 'Dense Drizzle',
    56: 'Freezing Drizzle',
    57: 'Dense Freezing Drizzle',
    61: 'Slight Rain',
    63: 'Moderate Rain',
    65: 'Heavy Rain',
    66: 'Freezing Rain',
    67: 'Heavy Freezing Rain',
    71: 'Slight Snow',
    73: 'Moderate Snow',
    75: 'Heavy Snow',
    77: 'Snow Grains',
    80: 'Slight Showers',
    81: 'Moderate Showers',
    82: 'Violent Showers',
    85: 'Slight Snow Showers',
    86: 'Heavy Snow Showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with Hail',
    99: 'Thunderstorm with Heavy Hail',
  }
  return descriptions[weatherCode] ?? 'Unknown'
}

export function formatWindDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  const index = Math.round(degrees / 45) % 8
  return directions[index]
}

export function formatTime(timeString: string): string {
  const date = new Date(timeString)
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export function formatDay(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00')
  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  if (date.toDateString() === today.toDateString()) return 'Today'
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow'

  return date.toLocaleDateString('en-US', { weekday: 'short' })
}

export function formatTemperature(celsius: number): string {
  const fahrenheit = (celsius * 9) / 5 + 32
  return `${Math.round(fahrenheit)}°F`
}
