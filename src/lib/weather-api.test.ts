import { describe, expect, it } from 'vitest'

import { normalizeForecast } from './weather-api'
import type { OpenMeteoResponse } from './weather-types'

/**
 * Builds a full-day raw response with predictable, index-derived values so the
 * alignment logic is easy to assert: temperature is 50 + hour, precipitation
 * probability and weather code are the hour itself, and is_day follows a
 * 6am-7pm window. `currentTime` selects which hour the transform aligns to.
 */
function makeRaw(currentTime: string): OpenMeteoResponse {
  const hours = Array.from({ length: 24 }, (_, hour) => hour)
  return {
    current: {
      time: currentTime,
      temperature_2m: 75,
      apparent_temperature: 73,
      weather_code: 3,
      is_day: 1,
      precipitation: 0.1,
    },
    hourly: {
      time: hours.map((hour) => `2026-06-05T${String(hour).padStart(2, '0')}:00`),
      temperature_2m: hours.map((hour) => 50 + hour),
      weather_code: hours.map((hour) => hour),
      precipitation_probability: hours.map((hour) => hour),
      is_day: hours.map((hour) => (hour >= 6 && hour < 19 ? 1 : 0)),
    },
    daily: {
      temperature_2m_max: [80],
      temperature_2m_min: [60],
    },
  }
}

describe('normalizeForecast', () => {
  describe('hour alignment', () => {
    it('slices the five hours following the current hour', () => {
      const result = normalizeForecast(makeRaw('2026-06-05T16:00'))

      expect(result.hourly.map((entry) => entry.time)).toEqual([
        '2026-06-05T17:00',
        '2026-06-05T18:00',
        '2026-06-05T19:00',
        '2026-06-05T20:00',
        '2026-06-05T21:00',
      ])
      expect(result.hourly.map((entry) => entry.temperature)).toEqual([67, 68, 69, 70, 71])
      expect(result.hourly.map((entry) => entry.weatherCode)).toEqual([17, 18, 19, 20, 21])
      expect(result.hourly.map((entry) => entry.precipitationProbability)).toEqual([
        17, 18, 19, 20, 21,
      ])
    })

    it('starts at the first hour when the current hour is absent from the series', () => {
      const result = normalizeForecast(makeRaw('2026-06-05T99:00'))

      // Unmatched current hour falls back to index 0, so the forecast starts at index 1.
      expect(result.hourly[0].time).toBe('2026-06-05T01:00')
      expect(result.hourly).toHaveLength(5)
    })
  })

  describe('per-hour day and night', () => {
    it('maps each hourly is_day flag straight through, across the day/night boundary', () => {
      const result = normalizeForecast(makeRaw('2026-06-05T16:00'))

      // Hours 17 and 18 are day; 19, 20, 21 are night under the 6am-7pm window.
      expect(result.hourly.map((entry) => entry.isDay)).toEqual([true, true, false, false, false])
    })
  })

  describe('current conditions and daily extremes', () => {
    it('maps the current block, converting the is_day integer to a boolean', () => {
      const result = normalizeForecast(makeRaw('2026-06-05T16:00'))

      expect(result.current).toEqual({
        temperature: 75,
        apparentTemperature: 73,
        weatherCode: 3,
        isDay: true,
        precipitation: 0.1,
      })
    })

    it('reads daily max and min from the first daily entry', () => {
      const result = normalizeForecast(makeRaw('2026-06-05T16:00'))

      expect(result.daily).toEqual({ temperatureMax: 80, temperatureMin: 60 })
      expect(result.temperatureUnit).toBe('°F')
    })
  })
})
