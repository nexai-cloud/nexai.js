"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatUser = void 0;
const getChatUser = (session) => {
    const { name, sessionId, avatarUrl, email } = session;
    return {
        name,
        userUid: sessionId,
        avatarUrl,
        email
    };
};
exports.getChatUser = getChatUser;
