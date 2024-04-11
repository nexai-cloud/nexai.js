var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { observable } from 'mobx';
export const ChatSuggests = observable({
    items: [],
    currentIndex: 0
});
export const fetchSuggests = (projectName) => __awaiter(void 0, void 0, void 0, function* () {
    setSuggests([
        `Hi! I'm fine.|What is ${projectName}.`,
        `Cool!|How do I use ${projectName}?`,
        `${projectName} API?|${projectName} Apps?`,
        `Use with NodeJS?|Use with React?`,
        `${projectName} pricing?|Free option?`,
        `I am satisfied.|I am not happy.`,
        `Thanks, bye.`
    ]);
});
export const setSuggests = (suggests) => __awaiter(void 0, void 0, void 0, function* () {
    ChatSuggests.items.splice(0, ChatSuggests.items.length, ...suggests);
});
export const getSuggests = () => {
    const { items, currentIndex } = ChatSuggests;
    console.log('current', ChatSuggests);
    const suggests = items[currentIndex];
    return (suggests === null || suggests === void 0 ? void 0 : suggests.split('|')) || [];
};
export const nextSuggests = () => {
    ChatSuggests.currentIndex++;
    console.log('next', ChatSuggests);
    return getSuggests();
};
