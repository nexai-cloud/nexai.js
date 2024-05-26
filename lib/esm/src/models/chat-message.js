import { makeObservable, observable } from "mobx";
import { Model } from "./model";
export class ChatMessageModel extends Model {
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
        makeObservable(this, {
            userUid: observable,
            sessionId: observable,
            fromName: observable,
            toName: observable,
            message: observable,
            projectId: observable,
            appId: observable,
            createdAt: observable,
            updatedAt: observable,
            avatarUrl: observable,
            fromType: observable,
            sources: observable,
            aiMuted: observable,
        });
    }
}
