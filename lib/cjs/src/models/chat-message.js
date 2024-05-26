"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessageModel = void 0;
const mobx_1 = require("mobx");
const model_1 = require("./model");
class ChatMessageModel extends model_1.Model {
    constructor() {
        super();
        Object.defineProperty(this, "userUid", {
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
        Object.defineProperty(this, "fromName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "toName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "message", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "projectId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "appId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "createdAt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "updatedAt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "avatarUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "fromType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "sources", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "aiMuted", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        (0, mobx_1.makeObservable)(this, {
            userUid: mobx_1.observable,
            sessionId: mobx_1.observable,
            fromName: mobx_1.observable,
            toName: mobx_1.observable,
            message: mobx_1.observable,
            projectId: mobx_1.observable,
            appId: mobx_1.observable,
            createdAt: mobx_1.observable,
            updatedAt: mobx_1.observable,
            avatarUrl: mobx_1.observable,
            fromType: mobx_1.observable,
            sources: mobx_1.observable,
            aiMuted: mobx_1.observable,
        });
    }
}
exports.ChatMessageModel = ChatMessageModel;
