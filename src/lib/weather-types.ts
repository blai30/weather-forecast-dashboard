// Weather condition buckets used to drive the condition-reactive palette.
export type WeatherGroup = 'clear' | 'cloudy' | 'fog' | 'rain' | 'snow' | 'thunder'

// Shape of the raw Open-Meteo Forecast API response (only the fields we request).
export type OpenMeteoResponse = {
  current: {
    time: string
    temperature_2m: number
    apparent_temperature: number
    weather_code: number
    is_day: number
    precipitation: number
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
    weather_code: number[]
    precipitation_probability: number[]
  }
  daily: {
    temperature_2m_max: number[]
    temperature_2m_min: number[]
  }
}

export type CurrentWeather = {
  temperature: number
  apparentTemperature: number
  weatherCode: number
  isDay: boolean
  precipitation: number
}

export type HourlyForecast = {
  // Location-local ISO time, e.g. "2026-06-05T15:00" (no offset, timezone=auto).
  time: string
  temperature: number
  weatherCode: number
  precipitationProbability: number
}

export type DailyExtremes = {
  temperatureMax: number
  temperatureMin: number
}

// Normalized data the UI consumes.
export type WeatherData = {
  locationName: string
  temperatureUnit: string
  current: CurrentWeather
  hourly: HourlyForecast[]
  daily: DailyExtremes
}
