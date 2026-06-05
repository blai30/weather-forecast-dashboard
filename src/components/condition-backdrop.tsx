import type { WeatherGroup } from '@/lib/weather-types'

type ConditionBackdropProperties = {
  group: WeatherGroup
  isDay: boolean
}

// Full-bleed condition texture served from public/backdrops/<key>.webp.
// It is a CSS background (not an <img>) so a missing file renders nothing.
// The root gradient shows through the scrim, rather than a broken-image icon.
const BACKDROP_DIRECTORY = '/backdrops'

// Scrim: a palette tint that blends the texture toward the condition colors,
// over a flat black layer that guarantees a contrast floor on bright textures
// (snow, clear day, fog) so the foreground text stays readable everywhere.
const SCRIM_BACKGROUND = [
  'linear-gradient(135deg,',
  'color-mix(in oklab, var(--background-from) 70%, transparent),',
  'color-mix(in oklab, var(--background-to) 58%, transparent)),',
  'linear-gradient(rgba(0, 0, 0, 0.24), rgba(0, 0, 0, 0.24))',
].join(' ')

function backdropKey(group: WeatherGroup, isDay: boolean): string {
  if (group === 'clear') {
    return isDay ? 'clear-day' : 'clear-night'
  }
  return group
}

export function ConditionBackdrop({ group, isDay }: ConditionBackdropProperties) {
  const source = `${BACKDROP_DIRECTORY}/${backdropKey(group, isDay)}.webp`
  return (
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${source})` }}
      />
      <div class="absolute inset-0" style={{ background: SCRIM_BACKGROUND }} />
    </div>
  )
}
