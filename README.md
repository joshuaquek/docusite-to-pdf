# 📝 Docusite to PDF
Provide a URL and this will generate multiple PDF documents of the whole site within the bounds of the URL path. This code repo is for educational purposes only.

## Pre-requisites
NodeJS v20.0.0 or higher

## Setup
Clone this repo.

Then install the dependencies by running:
```
npm install
```

## Usage

Create a `config.json` file in the root of the project with the following structure:
```json
{
    "url": "https://urlYouWannaCrawl.com/docu/latest"
}
```

Then run the following command:

```bash
npm start
```

This will commence the crawling and generate a whole folder of static HTML pages of the site, based on the URL you provided. The html pages will be generated inside the `./outputs/html` folder.

Next, it will generate a PDF for each of the HTML pages. The PDF files will be generated inside the `./outputs/pdf` folder.

## Other Commands

Generate only the HTML pages:
```bash
npm run html
```

Generate the PDFs, assuming that you have already generated the HTML pages inside the `outputs/html` folder:
```bash
npm run html2pdf
```