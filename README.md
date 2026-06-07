# forecast-onvif

A weather dashboard built with Preact, Vite, and Tailwind CSS. It fetches the current conditions and forecast from [Open-Meteo](https://open-meteo.com/) and renders a condition-reactive 16:9 dashboard.

## Dashboard

The dashboard is condition-reactive: the backdrop texture, color palette, and accent shift with the current weather and time of day (powered by the Open-Meteo WMO weather code and `is_day`).

|                                               |                                                   |
| --------------------------------------------- | ------------------------------------------------- |
| ![Clear day](docs/screenshots/clear-day.webp) | ![Clear night](docs/screenshots/clear-night.webp) |
| ![Rain](docs/screenshots/rain.webp)           | ![Thunderstorm](docs/screenshots/thunder.webp)    |

## Development

### Prerequisites

- Node.js 24+
- pnpm

### Commands

```bash
# Install dependencies
pnpm install

# Start the dev server (http://localhost:5173)
pnpm dev

# Type-check + production build to dist/
pnpm build

# Preview the production build locally
pnpm preview

# Lint / format
pnpm lint
pnpm fmt
```

A dev-only condition gallery is available at `http://localhost:5173/preview`. It is stripped from production builds.

## Configuration

Copy `.env.example` to `.env` and set your location. The `VITE_*` values are **baked into the build**, so changing them later requires a rebuild.

| Variable            | Description                                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------------------- |
| `APP_PORT`          | Port for the dev/preview server (default `5173`).                                                              |
| `VITE_WEATHER_LAT`  | Latitude for weather lookup.                                                                                   |
| `VITE_WEATHER_LON`  | Longitude for weather lookup.                                                                                  |
| `VITE_WEATHER_NAME` | Location name shown in the UI.                                                                                 |
| `VITE_TIMEZONE`     | IANA timezone for formatting times (e.g. `America/New_York`). If empty, the browser's locale/timezone is used. |

## Weather Data

Powered by [Open-Meteo](https://open-meteo.com/). Free, no API key required. Data refreshes every 10 minutes.
