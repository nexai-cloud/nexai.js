"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setClientSession = exports.fetchSession = exports.createSession = exports.getClientSession = void 0;
const random_name_1 = require("./random-name");
const getClientSession = () => {
    if (typeof window !== "undefined") {
        let session = (0, exports.fetchSession)();
        if (!session) {
            session = (0, exports.createSession)();
            (0, exports.setClientSession)(session);
        }
        return session;
    }
    else {
        return (0, exports.createSession)();
    }
};
exports.getClientSession = getClientSession;
const createSession = () => {
    return {
        name: (0, random_name_1.randomNameGenerator)(),
        sessionId: Math.random().toString(36).substring(2),
        isShowChat: true
    };
};
exports.createSession = createSession;
const fetchSession = () => {
    const session = window.localStorage.nexaiSession;
    if (session) {
        return JSON.parse(session);
    }
};
exports.fetchSession = fetchSession;
const setClientSession = (session) => {
    const json = JSON.stringify(session);
    window.localStorage.setItem('nexaiSession', json);
};
exports.setClientSession = setClientSession;
