/**
 * Crawls a website and generates PDFs of each page.
 */

const puppeteer = require('puppeteer')
const fs = require('fs-extra')
const path = require('path')
const urlModule = require('url')
const config = require('../config.json')
const { cleanUpAll, cleanUpHtml, cleanUpPdf } = require('./clean')

let pageCount = 0

/**
 * Gets the path from a URL.
 * @param {string} url - The URL to get the path from.
 * @returns {string} The path from the URL.
 */
function getPathFromUrl (url) {
  const parsedUrl = urlModule.parse(url)
  const cleanPath = parsedUrl.pathname.replace(/^\//, '').replace(/\/$/, '').replace(/\//g, '_')
  return cleanPath || 'index'
}

/**
 * Scrapes a page and its links.
 * @param {Object} browser - The Puppeteer browser instance.
 * @param {string} url - The URL of the page to scrape.
 * @param {Object} baseDomain - The parsed URL of the base domain.
 * @param {Set} visitedPaths - The set of visited paths.
 */
async function scrapePage (browser, url, baseDomain, visitedPaths = new Set()) {
  const urlPath = getPathFromUrl(url)
  if (visitedPaths.has(urlPath)) return
  visitedPaths.add(urlPath)
  pageCount++
  console.log(`Scraping ${url}... (Total pages scraped: ${pageCount})`)

  const page = await browser.newPage()
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 })

  // Add the CSS rule to make the element with ID `onetrust-consent-sdk` hidden
  await page.addStyleTag({
    content: '#onetrust-consent-sdk { visibility: hidden; }'
  })

  const content = await page.content()
  const offlinePath = path.join(__dirname, '../outputs/html', `${pageCount}-${urlPath}.html`)
  await fs.outputFile(offlinePath, content)

  const links = await page.$$eval('a[href]', links => {
    return links.map(link => link.href)
  })
  await page.close()

  for (const link of links) {
    const linkUrl = urlModule.parse(link)
    if (linkUrl.host === baseDomain.host && linkUrl.pathname.startsWith(baseDomain.pathname)) {
      await scrapePage(browser, link, baseDomain, visitedPaths)
    }
  }
}

/**
 * Scrapes a website to HTML.
 */
async function scrapeToHTML () {
  const targetURL = config.url
  const baseDomain = urlModule.parse(targetURL)

  console.log('Starting the scraping process...')
  const browser = await puppeteer.launch({ headless: 'new' })
  await scrapePage(browser, targetURL, baseDomain)
  await browser.close()
  console.log('Scraping process completed.')
}

/**
 * Generates PDFs from HTML files.
 */
async function generatePDF () {
  console.log('Starting PDF conversion...')

  const browserForPDF = await puppeteer.launch({ headless: 'new' })
  const files = await fs.readdir(path.join(__dirname, '../outputs/html'))

  for (const file of files) {
    if (file.endsWith('.html')) {
      console.log(`Generating PDF for ${file}...`)

      const page = await browserForPDF.newPage()
      const filePath = path.join(__dirname, '../outputs/html', file)
      await page.goto('file://' + filePath, { waitUntil: 'networkidle2', timeout: 60000 })

      // Expand all details elements to show hidden content
      await page.evaluate(() => {
        document.querySelectorAll('details').forEach(detail => {
          detail.open = true
        })
      })

      const pdfBuffer = await page.pdf({ format: 'A2', printBackground: true })

      // Save each HTML page as an individual PDF based on the HTML file name.
      const pdfFileName = file.replace('.html', '.pdf')
      fs.writeFileSync(path.join(__dirname, '../outputs/pdf', pdfFileName), pdfBuffer)

      await page.close()
    }
  }
  await browserForPDF.close()

  console.log('PDF conversion completed. Each HTML page has been saved as an individual PDF.')
}

(async () => {
  const command = process.argv[2]
  switch (command) {
    case 'html':
      await cleanUpHtml()
      await scrapeToHTML()
      break
    case 'html2pdf':
      await cleanUpPdf()
      await generatePDF()
      break
    default:
      await cleanUpAll()
      await scrapeToHTML()
      await generatePDF()
      break
  }
})().catch(error => {
  console.error('Error:', error.message)
  process.exit() // exits the process immediately
})
