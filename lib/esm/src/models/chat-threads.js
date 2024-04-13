import { action, observable } from 'mobx';
export const ChatThreads = observable([]);
export const setChatThreads = action((threads) => {
    ChatThreads.splice(0, ChatThreads.length, ...threads);
});
