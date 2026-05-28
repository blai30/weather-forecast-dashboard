import type { DailyEntry } from '@/lib/weather-types'
import { WeatherIcon, formatDay, formatTemperature } from '@/lib/weather-utils'

interface Props {
  daily: DailyEntry[]
}

export function WeeklyForecast({ daily }: Props) {
  // Show 7 days (skip today if it's already shown in current weather)
  const forecastDays = daily.slice(0, 7)

  return (
    <div class="w-full">
      <p class="mb-4 text-xl font-light tracking-wider text-gray-400 uppercase">7-Day Forecast</p>

      <div class="grid grid-cols-7 gap-4">
        {forecastDays.map((day, index) => (
          <div
            key={day.date}
            class={`flex flex-col items-center gap-3 rounded-2xl p-4 ${
              index === 0 ? 'bg-white/10' : 'bg-white/5'
            }`}
          >
            <p class={`text-sm font-medium ${index === 0 ? 'text-blue-400' : 'text-gray-400'}`}>
              {formatDay(day.date)}
            </p>

            <WeatherIcon weatherCode={day.weatherCode} size={40} />

            {day.precipitationProbabilityMax > 20 && (
              <p class="text-xs text-blue-400">{day.precipitationProbabilityMax}%</p>
            )}

            <div class="flex gap-3 text-sm">
              <span class="font-light text-white">{formatTemperature(day.temperatureMax)}</span>
              <span class="font-light text-gray-500">{formatTemperature(day.temperatureMin)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
