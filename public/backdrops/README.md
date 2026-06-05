# Condition backdrops

Full-bleed abstract textures rendered behind the dashboard, one per weather
condition. Loaded by `src/components/condition-backdrop.tsx` as a CSS background
at `/backdrops/<key>.webp`. A missing file degrades gracefully to the palette
gradient (no broken frame), so you can add them incrementally.

## Files

| File                | Condition          | Texture                             |
| ------------------- | ------------------ | ----------------------------------- |
| `clear-day.webp`    | Clear sky, daytime | Warm light rays / sunbeams          |
| `clear-night.webp`  | Clear sky, night   | Scattered stars / starfield         |
| `cloudy.webp`       | Cloudy / overcast  | Soft layered clouds                 |
| `fog.webp`          | Fog / mist         | Hazy, low-contrast fog gradient     |
| `rain.webp`         | Rain / drizzle     | Water droplets on glass, wet sheen  |
| `snow.webp`         | Snow               | Falling snow / frosted texture      |
| `thunder.webp`      | Thunderstorm       | Stormy clouds with a lightning glow |

## Specs

- **Format:** WebP. To regenerate from source images, drop PNG/JPG in and run:
  `ffmpeg -i <key>.png -c:v libwebp -quality 82 <key>.webp`
- **Dimensions:** anything 16:9-ish ≥1280×720; the backdrop uses `bg-cover` so
  off-ratio images crop to fill 1280×720.
- **Style:** Abstract, not photographic. A dark palette-tinted scrim is layered
  on top for legibility; brighter textures rely on the dark smoked-glass cards
  to keep their text readable.
