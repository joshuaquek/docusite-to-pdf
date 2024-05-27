const fs = require('fs-extra')
const path = require('path')

// Directory with HTML files
const offlineHtmlDirectory = path.join(__dirname, '../outputs/html')
const offlinePdfDirectory = path.join(__dirname, '../outputs/pdf')
const offlineMergedPdfDirectory = path.join(__dirname, '../outputs/merged_pdf')

/**
 * Deletes all generated HTML and PDF files.
 * @async
 * @function cleanUpAll
 * @returns {Promise<void>}
 */
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

/**
 * Deletes all generated HTML files.
 * @async
 * @function cleanUpHtml
 * @returns {Promise<void>}
 */
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

/**
 * Deletes all generated PDF files.
 * @async
 * @function cleanUpPdf
 * @returns {Promise<void>}
 */
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

exports.cleanUpMergedPdfDirectory = async function () {
  try {
    console.log('Deleting Merged PDF output...')
    const directory = offlineMergedPdfDirectory

    fs.readdir(directory, (err, files) => {
      if (err) throw err

      for (const file of files) {
        fs.unlink(path.join(directory, file), err => {
          if (err) throw err
        })
      }
    })

    console.log('Cleanup completed.')
  } catch (error) {
    console.error('Error during cleanup:', error.message)
  }
}
