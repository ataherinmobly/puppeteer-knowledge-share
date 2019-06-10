import { executeCommand } from "./command";
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
export class TestFactory {
    tests = {};
    logMessages: string[];
    constructor(private page: puppeteer.Page) {
        this.logMessages = [];
    }
    appendTest(testName, testPath) {
        this.tests[testName] = testPath;
    }
    executeTests() {

    }
    async executeTest(testName: string, logFileName: string) {
        const commandsArray = JSON.parse(fs.readFileSync(this.tests[testName]) as any);

        this.logMessages.push('start time at: ' + getTime().toString());
        let failed = false;
        for (let i = 0; i < commandsArray.length; i++) {
            console.log('executing : ', JSON.stringify(commandsArray[i]));
            this.logMessages.push('executing command ' + JSON.stringify(commandsArray[i]));
            const executionResult: any = await executeCommand(commandsArray[i], this.page);
            if (executionResult.error) {
                this.logMessages.push('failed at command ' + getTime().toString());
                failed = true;
                break;
            }
        }
        (!failed) ? this.logMessages.push('test ' + testName + ' was successful at : ' + getTime().toString()) : '';
        console.log(process.cwd());
        fs.appendFileSync(process.cwd() + '/testResults/' + logFileName, this.logMessages.join('\n \n'));
        // fs.openSync('../testResults/' + logFileName, 'w');
        // fs.writeFileSync(`../testResults/${logFileName}`, this.logMessages.join('\n \n'));
    }
}

const getTime = () => {
    const today = new Date();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return time;
}