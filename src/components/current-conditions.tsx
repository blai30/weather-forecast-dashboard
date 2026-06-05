import { ArrowDown, ArrowUp, Droplets, Thermometer } from 'lucide-preact'

import { WeatherIcon } from '@/components/weather-icon'
import { describeWeatherCode } from '@/lib/weather-codes'
import type { CurrentWeather, DailyExtremes } from '@/lib/weather-types'

type CurrentConditionsProperties = {
  current: CurrentWeather
  daily: DailyExtremes
  temperatureUnit: string
}

export function CurrentConditions({
  current,
  daily,
  temperatureUnit,
}: CurrentConditionsProperties) {
  const description = describeWeatherCode(current.weatherCode)

  return (
    <section class="flex flex-col justify-center gap-5">
      <div class="text-(--accent)">
        <WeatherIcon code={current.weatherCode} isDay={current.isDay} size={132} />
      </div>

      <div class="flex items-start text-(--text)">
        <span class="text-[10rem] leading-none font-bold tracking-tighter">
          {Math.round(current.temperature)}
        </span>
        <span class="mt-4 text-6xl font-light text-(--text-muted)">{temperatureUnit}</span>
      </div>

      <p class="text-4xl font-medium text-(--text)">{description.label}</p>

      <div class="flex flex-wrap items-center gap-x-8 gap-y-3 text-2xl text-(--text-muted)">
        <span class="inline-flex items-center gap-2">
          <Thermometer size={26} />
          Feels {Math.round(current.apparentTemperature)}°
        </span>
        <span class="inline-flex items-center gap-2">
          <ArrowUp size={26} />
          {Math.round(daily.temperatureMax)}°
          <ArrowDown size={26} class="ml-3" />
          {Math.round(daily.temperatureMin)}°
        </span>
        <span class="inline-flex items-center gap-2">
          <Droplets size={26} />
          {current.precipitation.toFixed(2)}"
        </span>
      </div>
    </section>
  )
}
