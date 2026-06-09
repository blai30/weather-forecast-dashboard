import type { HourlyForecast, OpenMeteoResponse, WeatherData } from '@/lib/weather-types'

const FORECAST_ENDPOINT = 'https://api.open-meteo.com/v1/forecast'
const FORECAST_HOURS = 5

function buildRequestUrl(): string {
  const parameters = new URLSearchParams({
    latitude: import.meta.env.VITE_WEATHER_LAT ?? '40.7128',
    longitude: import.meta.env.VITE_WEATHER_LON ?? '-74.0060',
    current: 'temperature_2m,apparent_temperature,weather_code,is_day,precipitation',
    hourly: 'temperature_2m,weather_code,precipitation_probability,is_day',
    daily: 'temperature_2m_max,temperature_2m_min',
    temperature_unit: 'fahrenheit',
    precipitation_unit: 'inch',
    timezone: 'auto',
    forecast_days: '2',
  })
  return `${FORECAST_ENDPOINT}?${parameters.toString()}`
}

/**
 * The hourly arrays start at midnight of the current local day. Find the entry
 * matching the current hour so we can slice the hours that follow it.
 */
function findCurrentHourIndex(times: string[], currentTime: string): number {
  const currentHourPrefix = currentTime.slice(0, 13)
  const index = times.findIndex((time) => time.slice(0, 13) === currentHourPrefix)
  return index === -1 ? 0 : index
}

/**
 * Pure transform from the raw Open-Meteo response to the normalized shape the UI
 * consumes. Exported so the hour-alignment logic can be exercised directly rather
 * than through the network.
 */
export function normalizeForecast(raw: OpenMeteoResponse): WeatherData {
  const startIndex = findCurrentHourIndex(raw.hourly.time, raw.current.time) + 1
  const hourly: HourlyForecast[] = []
  for (let offset = 0; offset < FORECAST_HOURS; offset++) {
    const index = startIndex + offset
    hourly.push({
      time: raw.hourly.time[index],
      temperature: raw.hourly.temperature_2m[index],
      weatherCode: raw.hourly.weather_code[index],
      precipitationProbability: raw.hourly.precipitation_probability[index],
      isDay: raw.hourly.is_day[index] === 1,
    })
  }

  return {
    locationName: import.meta.env.VITE_WEATHER_NAME ?? 'Unknown location',
    temperatureUnit: '°F',
    current: {
      temperature: raw.current.temperature_2m,
      apparentTemperature: raw.current.apparent_temperature,
      weatherCode: raw.current.weather_code,
      isDay: raw.current.is_day === 1,
      precipitation: raw.current.precipitation,
    },
    hourly,
    daily: {
      temperatureMax: raw.daily.temperature_2m_max[0],
      temperatureMin: raw.daily.temperature_2m_min[0],
    },
  }
}

export async function fetchWeather(): Promise<WeatherData> {
  const response = await fetch(buildRequestUrl())
  if (!response.ok) {
    throw new Error(`Open-Meteo request failed with status ${response.status}`)
  }
  const raw = (await response.json()) as OpenMeteoResponse
  return normalizeForecast(raw)
}
