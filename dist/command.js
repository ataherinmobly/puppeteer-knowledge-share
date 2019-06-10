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
var faker = require("faker");
var FindAndClick = /** @class */ (function () {
    function FindAndClick(selector, page) {
        var _this = this;
        this.execute = function () { return __awaiter(_this, void 0, void 0, function () {
            var elem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('executing the following', this.selector);
                        return [4 /*yield*/, this.page.waitFor(this.selector, { timeout: 50000 })];
                    case 1:
                        elem = _a.sent();
                        return [4 /*yield*/, elem.click()];
                    case 2:
                        _a.sent();
                        console.log('done executing');
                        return [2 /*return*/];
                }
            });
        }); };
        this.selector = selector;
        this.page = page;
    }
    return FindAndClick;
}());
exports.FindAndClick = FindAndClick;
var FindAndWrite = /** @class */ (function () {
    function FindAndWrite(selector, page, text) {
        var _this = this;
        this.execute = function () { return __awaiter(_this, void 0, void 0, function () {
            var elem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.page.waitFor(this.selector)];
                    case 1:
                        elem = _a.sent();
                        return [4 /*yield*/, elem.type(this.text)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        this.selector = selector;
        this.page = page;
        if (text) {
            this.text = text;
        }
        else {
            this.text = '';
        }
    }
    return FindAndWrite;
}());
exports.FindAndWrite = FindAndWrite;
var Command = /** @class */ (function () {
    function Command() {
        this.queue = [];
    }
    Command.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.queue.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.queue[i].execute()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, wait(2000)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Command.prototype.appenCommand = function (command) {
        this.queue.push(command);
    };
    return Command;
}());
exports.Command = Command;
function wait(ms) {
    return new Promise(function (res, rej) {
        setTimeout(function () {
            res();
        }, ms);
    });
}
function executeCommand(data, page) {
    var _this = this;
    return new Promise(function (res, rej) { return __awaiter(_this, void 0, void 0, function () {
        var _a, error_1, waitFor;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 10, , 11]);
                    _a = data.type;
                    switch (_a) {
                        case 'click': return [3 /*break*/, 1];
                        case 'write': return [3 /*break*/, 3];
                        case 'route': return [3 /*break*/, 5];
                        case 'screenshot': return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 9];
                case 1: return [4 /*yield*/, clickCommand(data, page)];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 3: return [4 /*yield*/, writeCommand(data, page)];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 5: return [4 /*yield*/, routeCommand(data, page)];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 7: return [4 /*yield*/, screenshot(data, page)];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 9: return [3 /*break*/, 11];
                case 10:
                    error_1 = _b.sent();
                    res({
                        error: error_1,
                        command: data
                    });
                    return [3 /*break*/, 11];
                case 11:
                    waitFor = data.waitFor ? data.waitFor : 1500;
                    return [4 /*yield*/, wait(waitFor)];
                case 12:
                    _b.sent();
                    res({
                        error: false
                    });
                    return [2 /*return*/];
            }
        });
    }); });
}
exports.executeCommand = executeCommand;
function clickCommand(data, page) {
    return __awaiter(this, void 0, void 0, function () {
        var el, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(data.toFind)) return [3 /*break*/, 2];
                    return [4 /*yield*/, queryElement(data.queryParams, data.selector, page)];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, page.waitFor(data.selector)];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4:
                    el = _a;
                    return [4 /*yield*/, el.click()];
                case 5:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function writeCommand(data, page) {
    return __awaiter(this, void 0, void 0, function () {
        var el, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (data.isFake === true) {
                        data.text = faker[data.faker.object][data.faker["function"]]();
                    }
                    if (!(data.toFind)) return [3 /*break*/, 2];
                    return [4 /*yield*/, queryElement(data.queryParams, data.selector, page)];
                case 1:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, page.waitFor(data.selector, { timeout: 50000 })];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4:
                    el = _a;
                    return [4 /*yield*/, el.type(data.text)];
                case 5:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function routeCommand(data, page) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.setViewport(data.viewPort ? data.viewPort : { width: 1280, height: 720 })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, page.goto(data.url, { timeout: 50000 })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function screenshot(data, page) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.screenshot({ path: process.cwd() + '/testResults/' + data.path })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function queryElement(queryParams, selector, page) {
    return __awaiter(this, void 0, void 0, function () {
        var queryValue, propertyName, queryMethod, elms, i, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queryValue = queryParams.queryValue, propertyName = queryParams.propertyName, queryMethod = queryParams.queryMethod;
                    return [4 /*yield*/, page.$$(selector)];
                case 1:
                    elms = _a.sent();
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < elms.length)) return [3 /*break*/, 6];
                    return [4 /*yield*/, elms[i].getProperty(propertyName)];
                case 3: return [4 /*yield*/, (_a.sent()).jsonValue()];
                case 4:
                    json = _a.sent();
                    if (json.includes(queryValue)) {
                        return [2 /*return*/, elms[i]];
                    }
                    _a.label = 5;
                case 5:
                    i++;
                    return [3 /*break*/, 2];
                case 6: return [2 /*return*/];
            }
        });
    });
}
