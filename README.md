# weather-dash

A live weather dashboard

## Development

### Prerequisites

- Node.js 24+
- pnpm
- Docker & Docker Compose

### Local Development (Without Docker)

```bash
# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

This runs the Preact dashboard in development mode at `http://localhost:5173`.

### Raspberry Pi Deployment

The Docker image is built for `linux/arm64` (Raspberry Pi 4/5).

## Weather Data

Powered by [Open-Meteo](https://open-meteo.com/) — free, no API key required. Data refreshes every 10 minutes.
