import { getWeatherIcon } from '@/components/weather-icon'
import { useWeather } from '@/hooks/use-weather'

function windDirection(degrees: number): string {
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ]
  return directions[Math.round(degrees / 22.5) % 16]
}

const CONDITION_LABELS: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Rime fog',
  51: 'Light drizzle',
  53: 'Drizzle',
  55: 'Dense drizzle',
  56: 'Freezing drizzle',
  57: 'Heavy freezing drizzle',
  61: 'Light rain',
  63: 'Rain',
  65: 'Heavy rain',
  66: 'Freezing rain',
  67: 'Heavy freezing rain',
  71: 'Light snow',
  73: 'Snow',
  75: 'Heavy snow',
  77: 'Snow grains',
  80: 'Light showers',
  81: 'Showers',
  82: 'Violent showers',
  85: 'Light snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with hail',
  99: 'Severe thunderstorm',
}

export function Dashboard() {
  const { data, error, loading } = useWeather()

  if (loading) {
    return (
      <div class="flex h-full items-center justify-center">
        <div class="text-zinc-400">Loading weather data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div class="flex h-full items-center justify-center">
        <div class="text-red-400">{error}</div>
      </div>
    )
  }

  if (!data) return null

  const Icon = getWeatherIcon(data.current.weatherCode)
  const updatedAt = data.updatedAt.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  })

  return (
    <>
      <style>
        {`
          @keyframes bg-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .dashboard-bg {
            background: linear-gradient(135deg, #0f172a, #1e1b4b, #0f172a, #172554);
            background-size: 400% 400%;
            animation: bg-shift 30s ease infinite;
          }
        `}
      </style>
      <div class="dashboard-bg flex h-full items-center justify-center p-8">
        <div class="flex w-full max-w-2xl flex-col gap-8 rounded-3xl bg-white/5 p-10 shadow-2xl ring-1 ring-white/10 backdrop-blur-md">
          {/* Location + time */}
          <div class="flex items-center justify-between">
            <div class="text-base font-medium tracking-wide text-zinc-200">{data.locationName}</div>
            <div class="text-sm text-zinc-500">{updatedAt}</div>
          </div>

          {/* Temperature + condition */}
          <div class="flex items-center gap-8">
            <div class="flex flex-1 items-baseline gap-2">
              <span class="text-8xl font-extralight tracking-tight text-white">
                {Math.round(data.current.temperature)}
              </span>
              <span class="text-3xl font-light text-zinc-400">°F</span>
            </div>
            <div class="flex flex-1 items-center gap-5">
              <div class="flex h-20 w-20 items-center justify-center">
                <Icon size={80} strokeWidth={1.5} class="text-zinc-100" />
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-lg font-medium text-zinc-100">
                  {CONDITION_LABELS[data.current.weatherCode] ?? 'Unknown'}
                </span>
                <span class="text-sm text-zinc-400">
                  Feels like {Math.round(data.current.apparentTemperature)}°
                </span>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div class="grid grid-cols-4 gap-6 rounded-2xl bg-white/5 p-6">
            <div class="flex flex-col gap-1">
              <div class="text-xs tracking-wider text-zinc-500 uppercase">Humidity</div>
              <div class="text-lg font-medium text-zinc-200">{data.current.humidity}%</div>
            </div>
            <div class="flex flex-col gap-1">
              <div class="text-xs tracking-wider text-zinc-500 uppercase">Wind</div>
              <div class="text-lg font-medium text-zinc-200">
                {Math.round(data.current.windSpeed)}{' '}
                <span class="text-sm font-normal text-zinc-400">
                  km/h {windDirection(data.current.windDirection)}
                </span>
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <div class="text-xs tracking-wider text-zinc-500 uppercase">UV Index</div>
              <div class="text-lg font-medium text-zinc-200">{data.current.uvIndex}</div>
            </div>
            <div class="flex flex-col gap-1">
              <div class="text-xs tracking-wider text-zinc-500 uppercase">Pressure</div>
              <div class="text-lg font-medium text-zinc-200">
                {Math.round(data.current.pressure)} hPa
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
