import { curveMonotoneX } from '@visx/curve'
import { Group } from '@visx/group'
import { scaleLinear } from '@visx/scale'
import { LinePath } from '@visx/shape'

import type { HourlyEntry } from '@/lib/weather-types'
import { WeatherIcon, formatTime, formatTemperature } from '@/lib/weather-utils'

interface Props {
  hourly: HourlyEntry[]
}

export function HourlyForecast({ hourly }: Props) {
  // Take the next 12 hours
  const now = new Date()
  const currentHour = now.getHours()

  // Find the index of the current hour in the hourly data
  let startIndex = 0
  for (let i = 0; i < hourly.length; i++) {
    const hourTime = new Date(hourly[i].time)
    if (hourTime >= now) {
      startIndex = i
      break
    }
  }

  const next12 = hourly.slice(startIndex, startIndex + 12)
  if (next12.length === 0) return <div />

  // Chart dimensions
  const width = 1400
  const height = 120
  const margin = { top: 10, right: 0, bottom: 10, left: 0 }
  const chartWidth = width - margin.left - margin.right
  const chartHeight = height - margin.top - margin.bottom

  const temps = next12.map((h) => h.temperature)
  const minTemp = Math.min(...temps) - 2
  const maxTemp = Math.max(...temps) + 2

  const xScale = scaleLinear({
    domain: [0, next12.length - 1],
    range: [0, chartWidth],
  })

  const yScale = scaleLinear({
    domain: [minTemp, maxTemp],
    range: [chartHeight, 0],
  })

  return (
    <div class="w-full">
      <p class="mb-4 text-xl font-light tracking-wider text-gray-400 uppercase">Next 12 Hours</p>

      <div class="flex gap-6">
        {/* Time labels and icons */}
        <div class="grid flex-1 grid-cols-12 gap-0">
          {next12.map((hour, i) => (
            <div class="flex flex-col items-center gap-2">
              <p class="text-sm text-gray-500">{i === 0 ? 'Now' : formatTime(hour.time)}</p>
              <WeatherIcon weatherCode={hour.weatherCode} size={28} />
              <p class="text-lg font-light">{formatTemperature(hour.temperature)}</p>
              {hour.precipitationProbability > 0 && (
                <p class="text-xs text-blue-400">{hour.precipitationProbability}%</p>
              )}
            </div>
          ))}
        </div>

        {/* Temperature trend chart */}
        <svg width={width} height={height} class="overflow-visible">
          <Group left={margin.left} top={margin.top}>
            {/* Line */}
            <LinePath
              data={next12.map((h, i) => ({
                x: xScale(i),
                y: yScale(h.temperature),
              }))}
              x={(d) => d.x}
              y={(d) => d.y}
              stroke="#60a5fa"
              strokeWidth={3}
              strokeDasharray="6 3"
              opacity={0.6}
              curve={curveMonotoneX}
            />

            {/* Dots */}
            {next12.map((hour, i) => (
              <circle
                key={i}
                cx={xScale(i)}
                cy={yScale(hour.temperature)}
                r={i === 0 ? 6 : 4}
                fill={i === 0 ? '#60a5fa' : '#3b82f6'}
                opacity={i === 0 ? 1 : 0.7}
              />
            ))}
          </Group>
        </svg>
      </div>
    </div>
  )
}
