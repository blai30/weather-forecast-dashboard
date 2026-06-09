import type { WeatherGroup } from '@/lib/weather-types'

type WeatherCodeInfo = {
  label: string
  group: WeatherGroup
}

/** WMO weather interpretation codes used by Open-Meteo. */
const WEATHER_CODES: Record<number, WeatherCodeInfo> = {
  0: { label: 'Clear sky', group: 'clear' },
  1: { label: 'Mainly clear', group: 'clear' },
  2: { label: 'Partly cloudy', group: 'cloudy' },
  3: { label: 'Overcast', group: 'cloudy' },
  45: { label: 'Fog', group: 'fog' },
  48: { label: 'Rime fog', group: 'fog' },
  51: { label: 'Light drizzle', group: 'rain' },
  53: { label: 'Drizzle', group: 'rain' },
  55: { label: 'Dense drizzle', group: 'rain' },
  56: { label: 'Freezing drizzle', group: 'rain' },
  57: { label: 'Freezing drizzle', group: 'rain' },
  61: { label: 'Light rain', group: 'rain' },
  63: { label: 'Rain', group: 'rain' },
  65: { label: 'Heavy rain', group: 'rain' },
  66: { label: 'Freezing rain', group: 'rain' },
  67: { label: 'Freezing rain', group: 'rain' },
  71: { label: 'Light snow', group: 'snow' },
  73: { label: 'Snow', group: 'snow' },
  75: { label: 'Heavy snow', group: 'snow' },
  77: { label: 'Snow grains', group: 'snow' },
  80: { label: 'Light showers', group: 'rain' },
  81: { label: 'Showers', group: 'rain' },
  82: { label: 'Violent showers', group: 'rain' },
  85: { label: 'Snow showers', group: 'snow' },
  86: { label: 'Snow showers', group: 'snow' },
  95: { label: 'Thunderstorm', group: 'thunder' },
  96: { label: 'Thunderstorm with hail', group: 'thunder' },
  99: { label: 'Severe thunderstorm', group: 'thunder' },
}

const FALLBACK: WeatherCodeInfo = { label: 'Unknown', group: 'cloudy' }

export function describeWeatherCode(code: number): WeatherCodeInfo {
  return WEATHER_CODES[code] ?? FALLBACK
}
