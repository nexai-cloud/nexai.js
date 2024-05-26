import { observable } from 'mobx';
import { ListModel } from './list';
import { ChatMessageModel } from './chat-message';
export class ChatMessagesModel extends ListModel {
    getModelType() {
        return ChatMessageModel;
    }
}
const model = ChatMessagesModel.create();
export const useChatMessagesModel = () => model;
// @deprecated
const chatMessages = observable([]);
export const useChatMessages = () => chatMessages;
