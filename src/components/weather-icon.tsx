import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudMoon,
  CloudRain,
  CloudSnow,
  CloudSun,
  Cloudy,
  Moon,
  Sun,
} from 'lucide-preact'

type WeatherIcon = typeof Sun

type WeatherIconProperties = {
  code: number
  isDay: boolean
  size: number
  strokeWidth?: number
}

// WMO codes whose icon differs between day and night.
const dayNightIconsByCode: Readonly<Record<number, { day: WeatherIcon; night: WeatherIcon }>> = {
  0: { day: Sun, night: Moon }, // clear sky
  1: { day: Sun, night: Moon }, // mainly clear
  2: { day: CloudSun, night: CloudMoon }, // partly cloudy
}

// WMO codes with a single icon regardless of time of day.
const iconsByCode: Readonly<Record<number, WeatherIcon>> = {
  3: Cloudy, // overcast
  45: CloudFog, // fog
  48: CloudFog, // depositing rime fog
  51: CloudDrizzle, // drizzle: light
  53: CloudDrizzle, // drizzle: moderate
  55: CloudDrizzle, // drizzle: dense
  56: CloudDrizzle, // freezing drizzle: light
  57: CloudDrizzle, // freezing drizzle: dense
  61: CloudRain, // rain: slight
  63: CloudRain, // rain: moderate
  65: CloudRain, // rain: heavy
  66: CloudRain, // freezing rain: light
  67: CloudRain, // freezing rain: heavy
  80: CloudRain, // rain showers: slight
  81: CloudRain, // rain showers: moderate
  82: CloudRain, // rain showers: violent
  71: CloudSnow, // snow fall: slight
  73: CloudSnow, // snow fall: moderate
  75: CloudSnow, // snow fall: heavy
  77: CloudSnow, // snow grains
  85: CloudSnow, // snow showers: slight
  86: CloudSnow, // snow showers: heavy
  95: CloudLightning, // thunderstorm: slight or moderate
  96: CloudLightning, // thunderstorm with slight hail
  99: CloudLightning, // thunderstorm with heavy hail
}

// Map a WMO weather code to a lucide icon, choosing day/night variants where
// they exist.
export function getWeatherIcon(code: number, isDay: boolean): WeatherIcon {
  const dayNightIcon = dayNightIconsByCode[code]
  if (dayNightIcon) {
    return isDay ? dayNightIcon.day : dayNightIcon.night
  }
  return iconsByCode[code] ?? Cloud
}

export function WeatherIcon({ code, isDay, size, strokeWidth = 1.5 }: WeatherIconProperties) {
  const Icon = getWeatherIcon(code, isDay)
  return <Icon size={size} strokeWidth={strokeWidth} />
}
