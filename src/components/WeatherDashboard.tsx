import { CurrentWeather } from '@/components/CurrentWeather'
import { HourlyForecast } from '@/components/HourlyForecast'
import { WeeklyForecast } from '@/components/WeeklyForecast'
import { useWeather } from '@/hooks/use-weather'

export function WeatherDashboard() {
  const { data, error, loading } = useWeather()

  if (loading) {
    return (
      <div class="flex h-full items-center justify-center">
        <div class="flex flex-col items-center gap-4">
          <div class="h-12 w-12 animate-spin rounded-full border-4 border-blue-400 border-t-transparent" />
          <p class="text-lg text-gray-400">Loading weather data...</p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div class="flex h-full items-center justify-center">
        <div class="text-center">
          <p class="text-xl text-red-400">Unable to load weather data</p>
          <p class="mt-2 text-gray-500">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div class="flex h-full flex-col gap-8 px-12 py-8">
      {/* Current weather - takes up top portion */}
      <CurrentWeather weather={data.current} locationName={data.locationName} />

      {/* Divider */}
      <div class="h-px w-full bg-linear-to-r from-transparent via-gray-700 to-transparent" />

      {/* Hourly forecast */}
      <HourlyForecast hourly={data.hourly} />

      {/* Divider */}
      <div class="h-px w-full bg-linear-to-r from-transparent via-gray-700 to-transparent" />

      {/* Weekly forecast */}
      <WeeklyForecast daily={data.daily} />

      {/* Footer */}
      <div class="mt-auto flex items-center justify-between text-xs text-gray-600">
        <span>Powered by Open-Meteo</span>
        <span>
          Updated{' '}
          {data.updatedAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
        </span>
      </div>
    </div>
  )
}
