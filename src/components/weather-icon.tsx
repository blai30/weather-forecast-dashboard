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

type WeatherIconProperties = {
  code: number
  isDay: boolean
  size: number
  strokeWidth?: number
}

// Map a WMO weather code to a lucide icon, choosing day/night variants where
// they exist.
function pickIcon(code: number, isDay: boolean): typeof Sun {
  switch (code) {
    case 0:
    case 1:
      return isDay ? Sun : Moon
    case 2:
      return isDay ? CloudSun : CloudMoon
    case 3:
      return Cloudy
    case 45:
    case 48:
      return CloudFog
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return CloudDrizzle
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return CloudRain
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return CloudSnow
    case 95:
    case 96:
    case 99:
      return CloudLightning
    default:
      return Cloud
  }
}

export function WeatherIcon({ code, isDay, size, strokeWidth = 1.5 }: WeatherIconProperties) {
  const Icon = pickIcon(code, isDay)
  return <Icon size={size} strokeWidth={strokeWidth} />
}
