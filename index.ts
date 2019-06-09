import * as puppeteer from 'puppeteer';
import { FindAndClick, FindAndWrite, Command, executeCommand } from './command'
import * as fs from 'fs';
const commandsArray = JSON.parse(fs.readFileSync('./register.test.json') as any);
(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    for (let i = 0; i < commandsArray.length; i++) {
        console.log('executing command: ', commandsArray[i]);
        await executeCommand(commandsArray[i], page);
        console.log('done executing a command');
    }
})();