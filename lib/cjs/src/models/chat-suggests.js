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
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextSuggests = exports.getSuggests = exports.setSuggests = exports.fetchSuggests = exports.ChatSuggests = void 0;
const mobx_1 = require("mobx");
exports.ChatSuggests = (0, mobx_1.observable)({
    items: [],
    currentIndex: 0
});
const fetchSuggests = (projectName) => __awaiter(void 0, void 0, void 0, function* () {
    (0, exports.setSuggests)([
        `Hi! I'm fine.|What is ${projectName}.`,
        `Cool!|How do I use ${projectName}?`,
        `${projectName} API?|${projectName} Apps?`,
        `Use with NodeJS?|Use with React?`,
        `${projectName} pricing?|Free option?`,
        `I am satisfied.|I am not happy.`,
        `Thanks, bye.`
    ]);
});
exports.fetchSuggests = fetchSuggests;
const setSuggests = (suggests) => __awaiter(void 0, void 0, void 0, function* () {
    exports.ChatSuggests.items.splice(0, exports.ChatSuggests.items.length, ...suggests);
});
exports.setSuggests = setSuggests;
const getSuggests = () => {
    const { items, currentIndex } = exports.ChatSuggests;
    console.log('current', exports.ChatSuggests);
    const suggests = items[currentIndex];
    return (suggests === null || suggests === void 0 ? void 0 : suggests.split('|')) || [];
};
exports.getSuggests = getSuggests;
const nextSuggests = () => {
    exports.ChatSuggests.currentIndex++;
    console.log('next', exports.ChatSuggests);
    return (0, exports.getSuggests)();
};
exports.nextSuggests = nextSuggests;
