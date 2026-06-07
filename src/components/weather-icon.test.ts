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
import { describe, expect, it } from 'vitest'

import { getWeatherIcon } from './weather-icon'

describe('pickIcon', () => {
  describe('codes with day and night variants', () => {
    it('returns Sun by day and Moon by night for clear sky (0) and mainly clear (1)', () => {
      expect(getWeatherIcon(0, true)).toBe(Sun)
      expect(getWeatherIcon(0, false)).toBe(Moon)
      expect(getWeatherIcon(1, true)).toBe(Sun)
      expect(getWeatherIcon(1, false)).toBe(Moon)
    })

    it('returns CloudSun by day and CloudMoon by night for partly cloudy (2)', () => {
      expect(getWeatherIcon(2, true)).toBe(CloudSun)
      expect(getWeatherIcon(2, false)).toBe(CloudMoon)
    })
  })

  describe('codes with a single icon regardless of time of day', () => {
    const dayAgnosticCases: ReadonlyArray<[label: string, code: number, expected: typeof Sun]> = [
      ['overcast', 3, Cloudy],
      ['fog', 45, CloudFog],
      ['depositing rime fog', 48, CloudFog],
      ['drizzle: light', 51, CloudDrizzle],
      ['drizzle: dense', 55, CloudDrizzle],
      ['freezing drizzle: dense', 57, CloudDrizzle],
      ['rain: slight', 61, CloudRain],
      ['rain: heavy', 65, CloudRain],
      ['rain showers: violent', 82, CloudRain],
      ['snow fall: slight', 71, CloudSnow],
      ['snow grains', 77, CloudSnow],
      ['snow showers: heavy', 86, CloudSnow],
      ['thunderstorm: slight or moderate', 95, CloudLightning],
      ['thunderstorm with heavy hail', 99, CloudLightning],
    ]

    it.each(dayAgnosticCases)('maps %s (code %i) to its icon', (_label, code, expected) => {
      expect(getWeatherIcon(code, true)).toBe(expected)
      expect(getWeatherIcon(code, false)).toBe(expected)
    })
  })

  describe('unknown codes', () => {
    it('falls back to Cloud for codes outside the WMO tables', () => {
      expect(getWeatherIcon(-1, true)).toBe(Cloud)
      expect(getWeatherIcon(42, true)).toBe(Cloud)
      expect(getWeatherIcon(1000, false)).toBe(Cloud)
    })
  })
})
