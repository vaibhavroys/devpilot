const puppeteer = require('puppeteer');

async function runPuppeteerTask() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Open a webpage
    await page.goto('https://example.com');

    // Extract page title
    const title = await page.title();

    await browser.close();
    return `The title of the page is: "${title}"`;
}

module.exports = runPuppeteerTask;
