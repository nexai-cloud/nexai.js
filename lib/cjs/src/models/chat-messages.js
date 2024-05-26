"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChatMessages = exports.useChatMessagesModel = exports.ChatMessagesModel = void 0;
const mobx_1 = require("mobx");
const list_1 = require("./list");
const chat_message_1 = require("./chat-message");
class ChatMessagesModel extends list_1.ListModel {
    getModelType() {
        return chat_message_1.ChatMessageModel;
    }
}
exports.ChatMessagesModel = ChatMessagesModel;
const model = ChatMessagesModel.create();
const useChatMessagesModel = () => model;
exports.useChatMessagesModel = useChatMessagesModel;
// @deprecated
const chatMessages = (0, mobx_1.observable)([]);
const useChatMessages = () => chatMessages;
exports.useChatMessages = useChatMessages;
