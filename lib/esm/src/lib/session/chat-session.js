import { randomAvatarGenerator } from "../avatars/random-avatar";
import { randomNameGenerator } from "./random-name";
export const getClientSession = (apiKey, nexaiAssetsUrl) => {
    if (typeof window !== "undefined") {
        let session = fetchSession(apiKey);
        if (!session) {
            session = createSession(nexaiAssetsUrl);
            saveClientSession(apiKey, session);
        }
        return session;
    }
    else {
        return createSession(nexaiAssetsUrl);
    }
};
export const createSession = (nexaiAssetsUrl) => {
    const avatar = randomAvatarGenerator(nexaiAssetsUrl);
    return {
        name: randomNameGenerator({
            object: avatar.name,
            sep: ' '
        }),
        avatarUrl: avatar.path,
        sessionId: Math.random().toString(36).substring(2),
        isShowChat: true
    };
};
export const fetchSession = (apiKey) => {
    const session = window.localStorage.getItem('nexai-session-' + apiKey);
    if (session) {
        return JSON.parse(session);
    }
};
export const saveClientSession = (apiKey, session) => {
    const json = JSON.stringify(session);
    window.localStorage.setItem('nexai-session-' + apiKey, json);
};
