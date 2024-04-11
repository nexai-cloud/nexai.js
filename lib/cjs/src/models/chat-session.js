"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
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
const fetch_model_1 = require("~/models/fetch-model");
const model_1 = require("~/models/model");
const chat_session_1 = require("../lib/session/chat-session");
// @todo use
let ChatSessionModel = (() => {
    var _a;
    let _classSuper = model_1.Model;
    let _instanceExtraInitializers = [];
    let _nexaiApiKey_decorators;
    let _nexaiApiKey_initializers = [];
    let _nexaiApiKey_extraInitializers = [];
    let _sessionId_decorators;
    let _sessionId_initializers = [];
    let _sessionId_extraInitializers = [];
    let _name_decorators;
    let _name_initializers = [];
    let _name_extraInitializers = [];
    let _isShowChat_decorators;
    let _isShowChat_initializers = [];
    let _isShowChat_extraInitializers = [];
    let _avatarUrl_decorators;
    let _avatarUrl_initializers = [];
    let _avatarUrl_extraInitializers = [];
    let _email_decorators;
    let _email_initializers = [];
    let _email_extraInitializers = [];
    let _fetchState_decorators;
    let _fetchState_initializers = [];
    let _fetchState_extraInitializers = [];
    let _fetch_decorators;
    let _saveState_decorators;
    let _saveState_initializers = [];
    let _saveState_extraInitializers = [];
    let _save_decorators;
    return _a = class ChatSessionModel extends _classSuper {
            fetch() {
                return __awaiter(this, void 0, void 0, function* () {
                    this.fetchState.fetch(() => __awaiter(this, void 0, void 0, function* () {
                        const session = (0, chat_session_1.getClientSession)(this.nexaiApiKey);
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
            constructor() {
                super(...arguments);
                Object.defineProperty(this, "nexaiApiKey", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _nexaiApiKey_initializers, ''))
                });
                Object.defineProperty(this, "sessionId", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: (__runInitializers(this, _nexaiApiKey_extraInitializers), __runInitializers(this, _sessionId_initializers, ''))
                });
                Object.defineProperty(this, "name", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: (__runInitializers(this, _sessionId_extraInitializers), __runInitializers(this, _name_initializers, ''))
                });
                Object.defineProperty(this, "isShowChat", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _isShowChat_initializers, false))
                });
                Object.defineProperty(this, "avatarUrl", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: (__runInitializers(this, _isShowChat_extraInitializers), __runInitializers(this, _avatarUrl_initializers, ''))
                });
                Object.defineProperty(this, "email", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: (__runInitializers(this, _avatarUrl_extraInitializers), __runInitializers(this, _email_initializers, ''))
                });
                Object.defineProperty(this, "fetchState", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _fetchState_initializers, fetch_model_1.FetchModel.create()))
                });
                Object.defineProperty(this, "saveState", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: (__runInitializers(this, _fetchState_extraInitializers), __runInitializers(this, _saveState_initializers, fetch_model_1.FetchModel.create()))
                });
                __runInitializers(this, _saveState_extraInitializers);
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _nexaiApiKey_decorators = [mobx_1.observable];
            _sessionId_decorators = [mobx_1.observable];
            _name_decorators = [mobx_1.observable];
            _isShowChat_decorators = [mobx_1.observable];
            _avatarUrl_decorators = [mobx_1.observable];
            _email_decorators = [mobx_1.observable];
            _fetchState_decorators = [mobx_1.observable];
            _fetch_decorators = [mobx_1.action];
            _saveState_decorators = [mobx_1.observable];
            _save_decorators = [mobx_1.action];
            __esDecorate(_a, null, _fetch_decorators, { kind: "method", name: "fetch", static: false, private: false, access: { has: obj => "fetch" in obj, get: obj => obj.fetch }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _save_decorators, { kind: "method", name: "save", static: false, private: false, access: { has: obj => "save" in obj, get: obj => obj.save }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _nexaiApiKey_decorators, { kind: "field", name: "nexaiApiKey", static: false, private: false, access: { has: obj => "nexaiApiKey" in obj, get: obj => obj.nexaiApiKey, set: (obj, value) => { obj.nexaiApiKey = value; } }, metadata: _metadata }, _nexaiApiKey_initializers, _nexaiApiKey_extraInitializers);
            __esDecorate(null, null, _sessionId_decorators, { kind: "field", name: "sessionId", static: false, private: false, access: { has: obj => "sessionId" in obj, get: obj => obj.sessionId, set: (obj, value) => { obj.sessionId = value; } }, metadata: _metadata }, _sessionId_initializers, _sessionId_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: obj => "name" in obj, get: obj => obj.name, set: (obj, value) => { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _isShowChat_decorators, { kind: "field", name: "isShowChat", static: false, private: false, access: { has: obj => "isShowChat" in obj, get: obj => obj.isShowChat, set: (obj, value) => { obj.isShowChat = value; } }, metadata: _metadata }, _isShowChat_initializers, _isShowChat_extraInitializers);
            __esDecorate(null, null, _avatarUrl_decorators, { kind: "field", name: "avatarUrl", static: false, private: false, access: { has: obj => "avatarUrl" in obj, get: obj => obj.avatarUrl, set: (obj, value) => { obj.avatarUrl = value; } }, metadata: _metadata }, _avatarUrl_initializers, _avatarUrl_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: obj => "email" in obj, get: obj => obj.email, set: (obj, value) => { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _fetchState_decorators, { kind: "field", name: "fetchState", static: false, private: false, access: { has: obj => "fetchState" in obj, get: obj => obj.fetchState, set: (obj, value) => { obj.fetchState = value; } }, metadata: _metadata }, _fetchState_initializers, _fetchState_extraInitializers);
            __esDecorate(null, null, _saveState_decorators, { kind: "field", name: "saveState", static: false, private: false, access: { has: obj => "saveState" in obj, get: obj => obj.saveState, set: (obj, value) => { obj.saveState = value; } }, metadata: _metadata }, _saveState_initializers, _saveState_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
exports.ChatSessionModel = ChatSessionModel;
const map = new Map();
const useChatSessionModel = ({ nexaiApiKey }) => {
    if (!map.has(nexaiApiKey)) {
        console.log('create new session', nexaiApiKey);
        const chatSession = ChatSessionModel.create({ nexaiApiKey });
        const props = (0, chat_session_1.getClientSession)(nexaiApiKey);
        chatSession.setProps(props);
        map.set(nexaiApiKey, chatSession);
    }
    return map.get(nexaiApiKey);
};
exports.useChatSessionModel = useChatSessionModel;
