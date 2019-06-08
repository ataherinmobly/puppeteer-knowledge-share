import * as puppteer from 'puppeteer';
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
            console.log('hola');
            res();
        }, ms);
    })
}

export async function executeCommand(data, page: puppteer.Page) {

    switch (data.type) {
        case 'click':
            await clickCommand(data, page);
            break;
        case 'write':
            await writeCommand(data, page);
            break;
        case 'route':
            await routeCommand(data, page);
    }
    const waitFor = data.waitFor ? data.waitFor : 1500;
    await wait(waitFor);
}

async function clickCommand(data, page: puppteer.Page) {
    const el = await page.waitFor(data.selector as string, { timeout: 50000 });
    await el.click();
}
async function writeCommand(data, page: puppteer.Page) {
    const el = await page.waitFor(data.selector as string, { timeout: 50000 });
    await el.type(data.text);
}
async function routeCommand(data, page: puppteer.Page) {
    await page.goto(data.route);
}