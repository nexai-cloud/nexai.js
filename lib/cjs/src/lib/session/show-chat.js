"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasIsShowChat = exports.getIsShowChat = void 0;
const getIsShowChat = () => {
    var _a;
    return (_a = globalThis.localStorage) === null || _a === void 0 ? void 0 : _a.getItem('isShowChat');
};
exports.getIsShowChat = getIsShowChat;
const hasIsShowChat = () => {
    return (0, exports.getIsShowChat)() !== null;
};
exports.hasIsShowChat = hasIsShowChat;
