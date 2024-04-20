export const getIsShowChat = () => {
    var _a;
    return (_a = globalThis.localStorage) === null || _a === void 0 ? void 0 : _a.getItem('isShowChat');
};
export const hasIsShowChat = () => {
    return getIsShowChat() !== null;
};
