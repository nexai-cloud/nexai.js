"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveClientSession = exports.fetchSession = exports.createSession = exports.getClientSession = void 0;
const random_avatar_1 = require("../avatars/random-avatar");
const random_name_1 = require("./random-name");
const getClientSession = (apiKey) => {
    if (typeof window !== "undefined") {
        let session = (0, exports.fetchSession)(apiKey);
        if (!session) {
            session = (0, exports.createSession)();
            (0, exports.saveClientSession)(apiKey, session);
        }
        return session;
    }
    else {
        return (0, exports.createSession)();
    }
};
exports.getClientSession = getClientSession;
const createSession = () => {
    const avatar = (0, random_avatar_1.randomAvatarGenerator)();
    return {
        name: (0, random_name_1.randomNameGenerator)({
            object: avatar.name,
            sep: ' '
        }),
        avatarUrl: avatar.path,
        sessionId: Math.random().toString(36).substring(2),
        isShowChat: true
    };
};
exports.createSession = createSession;
const fetchSession = (apiKey) => {
    const session = window.localStorage.getItem('nexai-session-' + apiKey);
    if (session) {
        return JSON.parse(session);
    }
};
exports.fetchSession = fetchSession;
const saveClientSession = (apiKey, session) => {
    const json = JSON.stringify(session);
    window.localStorage.setItem('nexai-session-' + apiKey, json);
};
exports.saveClientSession = saveClientSession;
