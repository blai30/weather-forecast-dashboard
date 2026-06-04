import puppeteer, { type Browser, type Page } from 'puppeteer'

const URL_READINESS_RETRIES = 30
const URL_READINESS_DELAY_MS = 2000

const CHROMIUM_LAUNCH_ARGS = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-dev-shm-usage',
  '--disable-gpu',
  '--disable-software-rasterizer',
  '--disable-default-apps',
  '--no-first-run',
  '--disable-extensions',
  '--disable-sync',
]

export type CapturerOptions = {
  url: string
  viewport: { width: number; height: number }
}

export function createCapturer(options: CapturerOptions) {
  let browser: Browser | null = null
  let page: Page | null = null

  async function start() {
    console.log('[Capture] Launching browser')
    browser = await puppeteer.launch({
      headless: true,
      args: CHROMIUM_LAUNCH_ARGS,
    })
    console.log('[Capture] Browser launched, opening page')

    page = await browser.newPage()
    await page.setViewport(options.viewport)
    await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }])

    console.log(`[Capture] Waiting for ${options.url}`)
    await waitForUrl(options.url)
    console.log(`[Capture] URL ready, navigating`)
    await page.goto(options.url, { waitUntil: 'networkidle2' })
    console.log('[Capture] Page loaded')
  }

  async function captureFrame() {
    if (!page) throw new Error('page renderer not started')
    return await page.screenshot({ type: 'png' })
  }

  const asyncDispose = async () => {
    if (browser) await browser.close()
  }

  return { start, captureFrame, [Symbol.asyncDispose]: asyncDispose }
}

async function waitForUrl(url: string) {
  for (let attempt = 1; attempt <= URL_READINESS_RETRIES; attempt++) {
    try {
      await fetch(url)
      return
    } catch {
      console.log(`Waiting for ${url}... attempt ${attempt}/${URL_READINESS_RETRIES}`)
      await new Promise((resolve) => setTimeout(resolve, URL_READINESS_DELAY_MS))
    }
  }
  throw new Error(`URL did not become ready after ${URL_READINESS_RETRIES} attempts: ${url}`)
}
