import * as puppteer from 'puppeteer';
import * as faker from 'faker';
interface ICommand {
    selector: string,
    execute(): Promise<any>,
}
export class FindAndClick implements ICommand {
    selector: string;
    page: puppteer.Page;
    constructor(selector, page: puppteer.Page) {
        this.selector = selector;
        this.page = page;
    }
    execute = async () => {
        console.log('executing the following', this.selector);
        const elem = await this.page.waitFor(this.selector, { timeout: 50000 });
        await elem.click();
        console.log('done executing');
    }
}
export class FindAndWrite implements ICommand {
    selector: string;
    page: puppteer.Page;
    text: string;
    constructor(selector, page: puppteer.Page, text?) {
        this.selector = selector;
        this.page = page;
        if (text) {
            this.text = text;
        } else {
            this.text = '';
        }
    }
    execute = async () => {
        const elem = await this.page.waitFor(this.selector);
        await elem.type(this.text);
    }
}
export class Command {
    queue: ICommand[];
    constructor() {
        this.queue = [];
    }
    async execute() {
        for (let i = 0; i < this.queue.length; i++) {
            await this.queue[i].execute();
            await wait(2000);
        }
    }
    appenCommand(command: ICommand) {
        this.queue.push(command);
    }
}

function wait(ms) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res();
        }, ms);
    })
}

export function executeCommand(data, page: puppteer.Page) {
    return new Promise(async (res, rej) => {
        try {
            switch (data.type) {
                case 'click':
                    await clickCommand(data, page);
                    break;
                case 'write':
                    await writeCommand(data, page);
                    break;
                case 'route':
                    await routeCommand(data, page);
                    break;
                case 'screenshot':
                    await screenshot(data, page);
                    break;
            }
        } catch (error) {
            res({
                error: error,
                command: data
            });
        }
        const waitFor = data.waitFor ? data.waitFor : 1500;
        await wait(waitFor);
        res({
            error: false
        });
    })

}

async function clickCommand(data, page: puppteer.Page) {
            const el = (data.toFind) ? await queryElement(data.queryParams, data.selector, page) :
                await page.waitFor(data.selector as string);
            await el.click();
}
async function writeCommand(data, page: puppteer.Page) {
    if (data.isFake === true) {
        data.text = faker[data.faker.object][data.faker.function]();
    }
    const el = (data.toFind) ? await queryElement(data.queryParams, data.selector, page) :
        await page.waitFor(data.selector as string, { timeout: 50000 });
    await el.type(data.text);
}
async function routeCommand(data, page: puppteer.Page) {
    await page.goto(data.url, { timeout: 50000 });
}
async function screenshot(data, page: puppteer.Page) {
    await page.screenshot({ path: data.path });
}
async function queryElement(queryParams, selector, page: puppteer.Page) {
    const { queryValue, propertyName, queryMethod } = queryParams;
    const elms = await page.$$(selector);
    for (let i = 0; i < elms.length; i++) {
        const json = await (await elms[i].getProperty(propertyName)).jsonValue();
        if (json.includes(queryValue)) {
            return elms[i];
        }
    }
}
