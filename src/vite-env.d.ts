/// <reference types="vite/client" />

type ImportMetaEnv = {
  readonly VITE_WEATHER_LAT?: string
  readonly VITE_WEATHER_LON?: string
  readonly VITE_WEATHER_NAME?: string
  readonly VITE_TIMEZONE?: string
}

type ImportMeta = {
  readonly env: ImportMetaEnv
}
