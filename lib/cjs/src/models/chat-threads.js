"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setChatThreads = exports.ChatThreads = void 0;
const mobx_1 = require("mobx");
exports.ChatThreads = (0, mobx_1.observable)([]);
exports.setChatThreads = (0, mobx_1.action)((threads) => {
    exports.ChatThreads.splice(0, exports.ChatThreads.length, ...threads);
});
