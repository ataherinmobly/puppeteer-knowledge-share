import * as puppeteer from 'puppeteer';
import { TestFactory } from './testFactory';
(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const testFactory = new TestFactory(page);
    testFactory.appendTest('useraddition', './testFiles/user-addition.test.json');
    testFactory.appendTest('registeration', './testFiles/register.test.json')
    testFactory.executeTest('registeration', 'registeration.txt');
})();