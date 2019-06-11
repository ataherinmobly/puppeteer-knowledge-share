import * as puppeteer from 'puppeteer';
(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.google.com', { timeout: 100000 });

    // get input to type search
    const input = await page.waitFor('.gLFyf');
    await input.type('Inmobly website');


    await page.keyboard.press(String.fromCharCode(13));

    await page.waitFor(2000);

    const bunchOfLinks = await page.$$('a');
    for (let i = 0; i < bunchOfLinks.length; i++) {
        const anchorText = await (await bunchOfLinks[i].getProperty('textContent')).jsonValue();
        console.log(anchorText);
        if (anchorText.includes('inmobly')) {
            await bunchOfLinks[i].click();
            break;
        }
    }
})();