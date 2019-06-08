import * as puppeteer from 'puppeteer';
import { FindAndClick, FindAndWrite, Command, executeCommand } from './command'
import * as fs from 'fs';
const commandsArray = JSON.parse(fs.readFileSync('./commands.json') as any);
(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.tdmascr.com/', { timeout: 60000 });

    await page.waitFor(5000);
    for (let i = 0; i < commandsArray.length; i++) {
        console.log('executing command: ', commandsArray[i]);
        await executeCommand(commandsArray[i], page);
        console.log('done executing a command');
    }

    console.log('execution completed');
    // const commandController = new Command();
    // commandController.appenCommand(new FindAndClick('a.btn.up', page));
    // commandController.appenCommand(new FindAndClick('a.user-choose-login-inner-client-button', page));
    // commandController.appenCommand(new FindAndWrite('input[type=email]', page, 'a@a.com'));
    // commandController.appenCommand(new FindAndWrite('input[type=password]', page, 'a'));
    // commandController.appenCommand(new FindAndClick('.user-outer-login-submit', page));
    // commandController.appenCommand(new FindAndClick('.user-outer-login-submit', page));
    // await commandController.execute();
    // const goToRegister = await page.waitFor('a.btn.up', { timeout: 50000 });
    // await goToRegister.click();


    // const goToLogin = await page.waitFor('a.user-choose-login-inner-client-button');
    // console.log(goToLogin);
    // await goToLogin.click();
    // await browser.close();
})();