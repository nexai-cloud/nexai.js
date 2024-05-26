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
exports.useChatSessionModel = exports.ChatSessionModel = void 0;
const mobx_1 = require("mobx");
const fetch_model_1 = require("../models/fetch-model");
const model_1 = require("../models/model");
const chat_session_1 = require("../lib/session/chat-session");
// @todo use
class ChatSessionModel extends model_1.Model {
    constructor() {
        super();
        Object.defineProperty(this, "nexaiApiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "nexaiAssetsUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "sessionId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "isShowChat", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "avatarUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "email", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "fetchState", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: fetch_model_1.FetchModel.create()
        });
        Object.defineProperty(this, "saveState", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: fetch_model_1.FetchModel.create()
        });
        (0, mobx_1.makeObservable)(this, {
            nexaiApiKey: mobx_1.observable,
            nexaiAssetsUrl: mobx_1.observable,
            sessionId: mobx_1.observable,
            name: mobx_1.observable,
            isShowChat: mobx_1.observable,
            avatarUrl: mobx_1.observable,
            email: mobx_1.observable,
            fetchState: mobx_1.observable,
            saveState: mobx_1.observable,
            save: mobx_1.action
        });
    }
    fetch() {
        return __awaiter(this, void 0, void 0, function* () {
            this.fetchState.fetch(() => __awaiter(this, void 0, void 0, function* () {
                const session = (0, chat_session_1.getClientSession)(this.nexaiApiKey, this.nexaiAssetsUrl);
                this.setProps(session);
            }));
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            this.saveState.fetch(() => __awaiter(this, void 0, void 0, function* () {
                (0, chat_session_1.saveClientSession)(this.nexaiApiKey, {
                    sessionId: this.sessionId,
                    name: this.name,
                    isShowChat: this.isShowChat,
                    avatarUrl: this.avatarUrl,
                    email: this.email
                });
            }));
        });
    }
}
exports.ChatSessionModel = ChatSessionModel;
const map = new Map();
const useChatSessionModel = ({ nexaiApiKey, nexaiAssetsUrl }) => {
    if (!map.has(nexaiApiKey)) {
        console.log('create new session', nexaiApiKey);
        const chatSession = ChatSessionModel.create({ nexaiApiKey });
        const props = (0, chat_session_1.getClientSession)(nexaiApiKey, nexaiAssetsUrl);
        chatSession.setProps(props);
        map.set(nexaiApiKey, chatSession);
    }
    return map.get(nexaiApiKey);
};
exports.useChatSessionModel = useChatSessionModel;
