import { observable } from 'mobx';
const chatMessages = observable([]);
export const useChatMessages = () => chatMessages;
