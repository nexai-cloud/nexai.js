import { type NexaiChatMessage } from '../chat-types';
import { ListModel } from './list';
import { ChatMessageModel } from './chat-message';
export declare class ChatMessagesModel extends ListModel {
    getModelType(): typeof ChatMessageModel;
}
export declare const useChatMessagesModel: () => ChatMessagesModel;
export declare const useChatMessages: () => NexaiChatMessage[];
