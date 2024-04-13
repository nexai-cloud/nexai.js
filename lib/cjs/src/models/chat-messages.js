"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChatMessages = void 0;
const mobx_1 = require("mobx");
const chatMessages = (0, mobx_1.observable)([]);
const useChatMessages = () => chatMessages;
exports.useChatMessages = useChatMessages;
