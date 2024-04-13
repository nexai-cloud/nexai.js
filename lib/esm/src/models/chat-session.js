var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { action, makeObservable, observable } from "mobx";
import { FetchModel } from "../models/fetch-model";
import { Model } from "../models/model";
import { getClientSession, saveClientSession } from "../lib/session/chat-session";
// @todo use
export class ChatSessionModel extends Model {
    constructor() {
        super();
        Object.defineProperty(this, "nexaiApiKey", {
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
            value: FetchModel.create()
        });
        Object.defineProperty(this, "saveState", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: FetchModel.create()
        });
        makeObservable(this, {
            nexaiApiKey: observable,
            sessionId: observable,
            name: observable,
            isShowChat: observable,
            avatarUrl: observable,
            email: observable,
            fetchState: observable,
            saveState: observable,
            save: action
        });
    }
    fetch() {
        return __awaiter(this, void 0, void 0, function* () {
            this.fetchState.fetch(() => __awaiter(this, void 0, void 0, function* () {
                const session = getClientSession(this.nexaiApiKey);
                this.setProps(session);
            }));
        });
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            this.saveState.fetch(() => __awaiter(this, void 0, void 0, function* () {
                saveClientSession(this.nexaiApiKey, {
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
const map = new Map();
export const useChatSessionModel = ({ nexaiApiKey }) => {
    if (!map.has(nexaiApiKey)) {
        console.log('create new session', nexaiApiKey);
        const chatSession = ChatSessionModel.create({ nexaiApiKey });
        const props = getClientSession(nexaiApiKey);
        chatSession.setProps(props);
        map.set(nexaiApiKey, chatSession);
    }
    return map.get(nexaiApiKey);
};
