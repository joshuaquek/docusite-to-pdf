const fs = require('fs-extra')
const path = require('path')

// Directory with HTML files
const offlineHtmlDirectory = path.join(__dirname, '../outputs/html')
const offlinePdfDirectory = path.join(__dirname, '../outputs/pdf')

exports.cleanUpAll = async function () {
  try {
    console.log('Deleting generated HTML files...')
    const htmlFiles = await fs.readdir(offlineHtmlDirectory)
    for (const file of htmlFiles) {
      if (file.endsWith('.html')) {
        await fs.remove(path.join(offlineHtmlDirectory, file))
      }
    }

    console.log('Deleting PDF output...')
    const pdfFiles = await fs.readdir(offlinePdfDirectory)
    for (const file of pdfFiles) {
      if (file.endsWith('.pdf')) {
        await fs.remove(path.join(offlinePdfDirectory, file))
      }
    }

    console.log('Cleanup completed.')
  } catch (error) {
    console.error('Error during cleanup:', error.message)
  }
}

exports.cleanUpHtml = async function () {
  try {
    console.log('Deleting generated HTML files...')
    const htmlFiles = await fs.readdir(offlineHtmlDirectory)
    for (const file of htmlFiles) {
      if (file.endsWith('.html')) {
        await fs.remove(path.join(offlineHtmlDirectory, file))
      }
    }

    console.log('Cleanup completed.')
  } catch (error) {
    console.error('Error during cleanup:', error.message)
  }
}

exports.cleanUpPdf = async function () {
  try {
    console.log('Deleting PDF output...')
    const pdfFiles = await fs.readdir(offlinePdfDirectory)
    for (const file of pdfFiles) {
      if (file.endsWith('.pdf')) {
        await fs.remove(path.join(offlinePdfDirectory, file))
      }
    }

    console.log('Cleanup completed.')
  } catch (error) {
    console.error('Error during cleanup:', error.message)
  }
}
