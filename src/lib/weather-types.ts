export type WeatherCode = number

export interface CurrentWeather {
  temperature: number
  apparentTemperature: number
  weatherCode: WeatherCode
  humidity: number
  windSpeed: number
  windDirection: number
  pressure: number
  visibility: number
  uvIndex: number
}

export interface HourlyEntry {
  time: string
  temperature: number
  weatherCode: WeatherCode
  precipitationProbability: number
}

export interface DailyEntry {
  date: string
  temperatureMax: number
  temperatureMin: number
  weatherCode: WeatherCode
  precipitationProbabilityMax: number
  sunrise: string
  sunset: string
}

export interface WeatherData {
  current: CurrentWeather
  hourly: HourlyEntry[]
  daily: DailyEntry[]
  locationName: string
  updatedAt: Date
}

export interface LocationConfig {
  latitude: number
  longitude: number
  name: string
}

export const DEFAULT_LOCATION: LocationConfig = {
  latitude: 40.7128,
  longitude: -74.006,
  name: 'New York',
}
