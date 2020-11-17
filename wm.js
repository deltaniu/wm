// ==UserScript==
// @name         万门大学课程视频批量下载
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  只能批量下载免费的或者已经购买的课程
// @author       cildhdi
// @match        https://www.wanmen.org/courses/*
// @grant        none
// ==/UserScript==
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var getCptEles = function () {
    return document.querySelector("#root > div.course__course-page--3J8Sy > div.course__video-row--20SaE > div.course__playlist-container--17tSE > div.components__container--1fgQp > div > div:nth-child(1) > ul");
};
var addTask = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1, cptEles, name, chapters, cptEle, cptIdx, subCptTitle, subCpts, waitTime, _loop_1, subCptEle, subCptIdx, cptA, addResponse, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fetch("http://localhost:5678/status", {
                        method: "get",
                        mode: "cors",
                    })];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                alert("客户端未启动，请启动客户端之后再开始");
                return [2 /*return*/];
            case 3:
                cptEles = getCptEles();
                name = "";
                do {
                    name = prompt("请输入课程名称");
                } while (!name);
                chapters = [];
                cptEle = cptEles.firstElementChild, cptIdx = 1;
                _a.label = 4;
            case 4:
                if (!(cptEle != undefined)) return [3 /*break*/, 9];
                subCptTitle = cptEle.querySelector("div");
                if (subCptTitle &&
                    subCptTitle.getAttribute("class").indexOf("presentation") < 0) {
                    subCptTitle.click();
                }
                else {
                    return [3 /*break*/, 8];
                }
                subCpts = undefined, waitTime = 0;
                _loop_1 = function () {
                    var wait;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                wait = 0.05;
                                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, wait); })];
                            case 1:
                                _a.sent();
                                waitTime += wait;
                                if (waitTime >= 2) {
                                    subCptTitle.click();
                                    waitTime = 0;
                                }
                                return [2 /*return*/];
                        }
                    });
                };
                _a.label = 5;
            case 5:
                if (!!(subCpts = cptEle.querySelector("ul"))) return [3 /*break*/, 7];
                return [5 /*yield**/, _loop_1()];
            case 6:
                _a.sent();
                return [3 /*break*/, 5];
            case 7:
                for (subCptEle = subCpts.firstElementChild, subCptIdx = 1; subCptEle != undefined; subCptEle = subCptEle.nextElementSibling, subCptIdx++) {
                    cptA = subCptEle.querySelector("a");
                    chapters.push({
                        Link: "https://www.wanmen.org" + cptA.getAttribute("href"),
                        Name: cptA.innerText.split("\n")[0],
                    });
                }
                subCptTitle.click();
                _a.label = 8;
            case 8:
                cptEle = cptEle.nextElementSibling, cptIdx++;
                return [3 /*break*/, 4];
            case 9:
                _a.trys.push([9, 11, , 12]);
                return [4 /*yield*/, fetch("http://localhost:5678/add", {
                        method: "post",
                        mode: "cors",
                        body: JSON.stringify({
                            Name: name,
                            chapters: chapters,
                        }),
                    })];
            case 10:
                addResponse = _a.sent();
                if (!addResponse.ok) {
                    throw new Error(addResponse.statusText);
                }
                return [3 /*break*/, 12];
            case 11:
                error_2 = _a.sent();
                alert("已将任务发送到客户端，处理中...");
                return [3 /*break*/, 12];
            case 12: return [2 /*return*/];
        }
    });
}); };
var getSource = function () { return __awaiter(void 0, void 0, void 0, function () {
    var src, m3u8;
    return __generator(this, function (_a) {
        src = document.querySelector("#root > div.course__course-page--3J8Sy > div.course__video-row--20SaE > div:nth-child(1) > div.course__player-container--1S_cH > div > div.VideoWrapper__video-wrapper--3FBpC > video > source");
        if (src) {
            m3u8 = src.getAttribute("src");
            if (m3u8) {
                return [2 /*return*/, m3u8];
            }
        }
        return [2 /*return*/];
    });
}); };
var finishTask = function () { return __awaiter(void 0, void 0, void 0, function () {
    var source, m3u8Response, m3u8Content, saveResponse, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getSource()];
            case 1:
                if (!!(_a.sent())) return [3 /*break*/, 3];
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
            case 2:
                _a.sent();
                return [3 /*break*/, 0];
            case 3: return [4 /*yield*/, getSource()];
            case 4:
                source = _a.sent();
                _a.label = 5;
            case 5:
                _a.trys.push([5, 9, , 10]);
                return [4 /*yield*/, fetch(source, {
                        method: "get",
                    })];
            case 6:
                m3u8Response = _a.sent();
                return [4 /*yield*/, m3u8Response.text()];
            case 7:
                m3u8Content = _a.sent();
                return [4 /*yield*/, fetch("http://localhost:5678/finish", {
                        method: "post",
                        mode: "cors",
                        body: JSON.stringify({
                            Link: document.location.href,
                            Content: m3u8Content,
                        }),
                    })];
            case 8:
                saveResponse = _a.sent();
                if (!saveResponse.ok) {
                    throw Error(saveResponse.statusText);
                }
                return [3 /*break*/, 10];
            case 9:
                error_3 = _a.sent();
                console.log(error_3);
                return [2 /*return*/];
            case 10: return [2 /*return*/];
        }
    });
}); };
var getTask = function () { return __awaiter(void 0, void 0, void 0, function () {
    var taskResponse, link, cptEles, cptEle, cptIdx, subCptTitle, subCpts, waitTime, _loop_2, subCptEle, subCptIdx, cptA, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!true) return [3 /*break*/, 19];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 16, , 17]);
                return [4 /*yield*/, fetch("http://localhost:5678/get", {
                        method: "get",
                        mode: "cors",
                    })];
            case 2:
                taskResponse = _a.sent();
                if (!!taskResponse.ok) return [3 /*break*/, 3];
                throw Error(taskResponse.statusText);
            case 3: return [4 /*yield*/, taskResponse.text()];
            case 4:
                link = _a.sent();
                if (!link) return [3 /*break*/, 15];
                cptEles = getCptEles();
                cptEle = cptEles.firstElementChild, cptIdx = 1;
                _a.label = 5;
            case 5:
                if (!(cptEle != undefined)) return [3 /*break*/, 15];
                subCptTitle = cptEle.querySelector("div");
                if (subCptTitle &&
                    subCptTitle.getAttribute("class").indexOf("presentation") < 0) {
                    subCptTitle.click();
                }
                else {
                    return [3 /*break*/, 14];
                }
                subCpts = undefined, waitTime = 0;
                _loop_2 = function () {
                    var wait;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                wait = 10;
                                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, wait); })];
                            case 1:
                                _a.sent();
                                waitTime += wait;
                                if (waitTime >= 100) {
                                    subCptTitle.click();
                                    waitTime = 0;
                                }
                                return [2 /*return*/];
                        }
                    });
                };
                _a.label = 6;
            case 6:
                if (!!(subCpts = cptEle.querySelector("ul"))) return [3 /*break*/, 8];
                return [5 /*yield**/, _loop_2()];
            case 7:
                _a.sent();
                return [3 /*break*/, 6];
            case 8:
                subCptEle = subCpts.firstElementChild, subCptIdx = 1;
                _a.label = 9;
            case 9:
                if (!(subCptEle != undefined)) return [3 /*break*/, 13];
                cptA = subCptEle.querySelector("a");
                if (!(cptA && link.indexOf(cptA.getAttribute("href")) >= 0)) return [3 /*break*/, 12];
                cptA.click();
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 2000); })];
            case 10:
                _a.sent();
                return [4 /*yield*/, finishTask()];
            case 11:
                _a.sent();
                _a.label = 12;
            case 12:
                subCptEle = subCptEle.nextElementSibling, subCptIdx++;
                return [3 /*break*/, 9];
            case 13:
                subCptTitle.click();
                _a.label = 14;
            case 14:
                cptEle = cptEle.nextElementSibling, cptIdx++;
                return [3 /*break*/, 5];
            case 15: return [3 /*break*/, 17];
            case 16:
                error_4 = _a.sent();
                console.log("未获取到任务：" + error_4);
                return [3 /*break*/, 17];
            case 17: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 5000); })];
            case 18:
                _a.sent();
                return [3 /*break*/, 0];
            case 19: return [2 /*return*/];
        }
    });
}); };
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var startBtn;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                startBtn = document.createElement("button");
                startBtn.onclick = addTask;
                startBtn.innerText = "添加任务";
                startBtn.style.position = "fixed";
                startBtn.style.top = "50%";
                startBtn.style.left = "0";
                document.body.appendChild(startBtn);
                return [4 /*yield*/, finishTask()];
            case 1:
                _a.sent();
                getTask();
                return [2 /*return*/];
        }
    });
}); };
main();
