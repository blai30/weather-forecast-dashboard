import { Droplet } from 'lucide-preact'

import { ForecastChart } from '@/components/forecast-chart'
import { WeatherIcon } from '@/components/weather-icon'
import type { HourlyForecast } from '@/lib/weather-types'

type ForecastPanelProperties = {
  hourly: HourlyForecast[]
}

const CHART_WIDTH = 460
const CHART_HEIGHT = 150

// Open-Meteo returns location-local times with no offset,
// so the hour is read straight from the string, no timezone conversion needed.
function readHour(isoTime: string): number {
  return Number(isoTime.slice(11, 13))
}

function formatHour(isoTime: string): string {
  const hour24 = readHour(isoTime)
  const period = hour24 >= 12 ? 'PM' : 'AM'
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12
  return `${hour12} ${period}`
}

export function ForecastPanel({ hourly }: ForecastPanelProperties) {
  return (
    <section class="flex flex-col gap-6 rounded-3xl border border-(--surface-border) bg-(--surface) p-8">
      <h2 class="text-2xl font-semibold tracking-widest text-(--text-muted) uppercase">
        Next 5 hours
      </h2>

      <div
        class="grid gap-2"
        style={{ width: `${CHART_WIDTH}px`, gridTemplateColumns: `repeat(${hourly.length}, 1fr)` }}
      >
        {hourly.map((entry) => (
          <div key={entry.time} class="flex flex-col items-center gap-2 text-(--text)">
            <span class="text-xl font-medium text-(--text-muted)">{formatHour(entry.time)}</span>
            <div class="text-(--accent)">
              <WeatherIcon
                code={entry.weatherCode}
                isDay={readHour(entry.time) >= 6 && readHour(entry.time) < 19}
                size={42}
              />
            </div>
            <span class="text-3xl font-bold">{Math.round(entry.temperature)}°</span>
            <span class="inline-flex items-center gap-1 text-base text-(--text-muted)">
              <Droplet size={16} />
              {entry.precipitationProbability}%
            </span>
          </div>
        ))}
      </div>

      <ForecastChart hourly={hourly} width={CHART_WIDTH} height={CHART_HEIGHT} />
    </section>
  )
}
