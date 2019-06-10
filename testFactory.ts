import { executeCommand } from "./command";
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
export class TestFactory {
    tests =  {};
    logMessages: string[];
    constructor(private page: puppeteer.Page) {
        this.logMessages = [];
    }
    appendTest(testName, testPath) {
        this.tests[testName] = testPath;
    }
    executeTests() {

    }   
    async executeTest(testName: string , logFileName: string) {
        const commandsArray = JSON.parse(fs.readFileSync(this.tests[testName]) as any);
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        this.logMessages.push('start time at: ' + time.toString());
        let failed = false;
        for (let i =0; i<commandsArray.length; i++) {
            this.logMessages.push('executing command ' + JSON.stringify(commandsArray[i]));
            const executionResult: any = await executeCommand(commandsArray[i] , this.page);
            if (executionResult.error) {
                this.logMessages.push('failed at command ' + JSON.stringify(commandsArray[i]) + ' ' + 'at time : ' + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds());
                failed = true;
                break;
            }
        }
        (!failed) ? this.logMessages.push('test ' + testName + ' was successful') : '';
        fs.writeFileSync(logFileName , this.logMessages.join('\n \n'));
    } 
}