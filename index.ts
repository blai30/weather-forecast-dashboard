import { spawn } from 'child_process'
import { mkdirSync, writeFileSync } from 'fs'

import puppeteer from 'puppeteer'

const APP_URL = 'http://vite-app:5173'
const RTSP_URL = 'rtsp://mediamtx:8554/weather'
const FRAME_DIR = '/tmp/frames'
const CAPTURE_INTERVAL_MS = 10_000

async function main() {
  mkdirSync(FRAME_DIR, { recursive: true })

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 720 })

  // Wait for Vite dev server to be ready
  let retries = 0
  while (retries < 30) {
    try {
      await fetch(APP_URL)
      break
    } catch {
      retries++
      console.log(`Waiting for Vite server... attempt ${retries}/30`)
      await new Promise((r) => setTimeout(r, 2000))
    }
  }

  await page.goto(APP_URL, { waitUntil: 'networkidle2' })

  let frame = 1_000_000
  const pad = (n: number) => String(n).padStart(6, '0')

  // Take initial frame so FFmpeg has something to read immediately
  const initialBuffer = await page.screenshot({ type: 'png' })
  writeFileSync(`${FRAME_DIR}/${pad(frame)}.png`, initialBuffer)
  frame++

  // oxfmt-ignore
  const ffmpeg = spawn('ffmpeg', [
    '-re',
    '-framerate', '1',
    '-start_number', '1000000',
    '-i', `${FRAME_DIR}/%06d.png`,
    '-c:v', 'libx264',
    '-preset', 'veryslow',
    '-g', '1',
    '-pix_fmt', 'yuv420p',
    '-f', 'rtsp',
    RTSP_URL,
  ])
  ffmpeg.stderr.on('data', (data) => console.log(`[FFmpeg] ${data.toString()}`))

  console.log(`FFmpeg started, polling for frames in ${FRAME_DIR}/`)

  // Capture a new frame at the configured interval
  setInterval(async () => {
    await page.reload({ waitUntil: 'networkidle2' })
    const buffer = await page.screenshot({ type: 'png' })
    writeFileSync(`${FRAME_DIR}/${pad(frame)}.png`, buffer)
    console.log(`Frame ${frame} saved`)
    frame++
  }, CAPTURE_INTERVAL_MS).unref()
}

main().catch(console.error)
