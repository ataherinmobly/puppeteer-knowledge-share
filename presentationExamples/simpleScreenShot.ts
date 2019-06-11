import * as puppeteer from 'puppeteer';
(async () => {
    const browser = await puppeteer.launch({ headless: false, executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe' });
    const page = await browser.newPage();
    await page.goto('http://www.inmobly.com/', { timeout: 100000 });
    await page.screenshot({ path: 'inmobly.png' });
    // await page.pdf({ path: 'inmoblypdf.pdf', format: 'A4', printBackground: true });
    await browser.close();
})();