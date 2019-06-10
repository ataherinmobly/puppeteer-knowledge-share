"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var command_1 = require("./command");
var fs = require("fs");
var TestFactory = /** @class */ (function () {
    function TestFactory(page) {
        this.page = page;
        this.tests = {};
        this.logMessages = [];
    }
    TestFactory.prototype.appendTest = function (testName, testPath) {
        this.tests[testName] = testPath;
    };
    TestFactory.prototype.executeTests = function () {
    };
    TestFactory.prototype.executeTest = function (testName, logFileName) {
        return __awaiter(this, void 0, void 0, function () {
            var commandsArray, failed, i, executionResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        commandsArray = JSON.parse(fs.readFileSync(this.tests[testName]));
                        this.logMessages.push('start time at: ' + getTime().toString());
                        failed = false;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < commandsArray.length)) return [3 /*break*/, 4];
                        console.log('executing : ', JSON.stringify(commandsArray[i]));
                        this.logMessages.push('executing command ' + JSON.stringify(commandsArray[i]));
                        return [4 /*yield*/, command_1.executeCommand(commandsArray[i], this.page)];
                    case 2:
                        executionResult = _a.sent();
                        if (executionResult.error) {
                            this.logMessages.push('failed at command ' + getTime().toString());
                            failed = true;
                            return [3 /*break*/, 4];
                        }
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        (!failed) ? this.logMessages.push('test ' + testName + ' was successful at : ' + getTime().toString()) : '';
                        console.log(process.cwd());
                        fs.appendFileSync(process.cwd() + '/testResults/' + logFileName, this.logMessages.join('\n \n'));
                        return [2 /*return*/];
                }
            });
        });
    };
    return TestFactory;
}());
exports.TestFactory = TestFactory;
var getTime = function () {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return time;
};
