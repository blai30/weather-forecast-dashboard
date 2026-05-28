import { Droplets, Gauge, Thermometer, Wind } from 'lucide-react'

import type { CurrentWeather } from '@/lib/weather-types'
import {
  WeatherIcon,
  formatTemperature,
  formatWindDirection,
  getWeatherDescription,
} from '@/lib/weather-utils'

interface Props {
  weather: CurrentWeather
  locationName: string
}

export function CurrentWeather({ weather, locationName }: Props) {
  const now = new Date()
  const timeString = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
  const dateString = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div class="flex flex-col items-center justify-center gap-6">
      {/* Location and time */}
      <div class="text-center">
        <p class="text-3xl font-light tracking-wide text-gray-300">{locationName}</p>
        <p class="mt-1 text-lg text-gray-500">
          {dateString} · {timeString}
        </p>
      </div>

      {/* Main temperature display */}
      <div class="flex items-center gap-8">
        <WeatherIcon weatherCode={weather.weatherCode} size={120} />
        <div class="text-left">
          <p class="text-[10rem] leading-none font-extralight tracking-tighter">
            {Math.round((weather.temperature * 9) / 5 + 32)}
            <span class="align-top text-6xl">°F</span>
          </p>
          <p class="text-2xl font-light text-gray-400">
            {getWeatherDescription(weather.weatherCode)}
          </p>
        </div>
      </div>

      {/* Details grid */}
      <div class="mt-4 grid grid-cols-4 gap-8">
        <div class="flex flex-col items-center gap-2">
          <div class="flex items-center gap-2 text-gray-500">
            <Thermometer size={20} />
            <span class="text-sm tracking-wider uppercase">Feels Like</span>
          </div>
          <p class="text-2xl font-light">{formatTemperature(weather.apparentTemperature)}</p>
        </div>

        <div class="flex flex-col items-center gap-2">
          <div class="flex items-center gap-2 text-gray-500">
            <Droplets size={20} />
            <span class="text-sm tracking-wider uppercase">Humidity</span>
          </div>
          <p class="text-2xl font-light">{weather.humidity}%</p>
        </div>

        <div class="flex flex-col items-center gap-2">
          <div class="flex items-center gap-2 text-gray-500">
            <Wind size={20} />
            <span class="text-sm tracking-wider uppercase">Wind</span>
          </div>
          <p class="text-2xl font-light">
            {Math.round(weather.windSpeed)} km/h {formatWindDirection(weather.windDirection)}
          </p>
        </div>

        <div class="flex flex-col items-center gap-2">
          <div class="flex items-center gap-2 text-gray-500">
            <Gauge size={20} />
            <span class="text-sm tracking-wider uppercase">Pressure</span>
          </div>
          <p class="text-2xl font-light">{Math.round(weather.pressure)} hPa</p>
        </div>
      </div>
    </div>
  )
}
