import { randomNameGenerator } from "./random-name";
export const getClientSession = () => {
    if (typeof window !== "undefined") {
        let session = fetchSession();
        if (!session) {
            session = createSession();
            setClientSession(session);
        }
        return session;
    }
    else {
        return createSession();
    }
};
export const createSession = () => {
    return {
        name: randomNameGenerator(),
        sessionId: Math.random().toString(36).substring(2),
        isShowChat: true
    };
};
export const fetchSession = () => {
    const session = window.localStorage.nexaiSession;
    if (session) {
        return JSON.parse(session);
    }
};
export const setClientSession = (session) => {
    const json = JSON.stringify(session);
    window.localStorage.setItem('nexaiSession', json);
};
