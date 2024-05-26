export type NexaiSession = {
    name: string;
    sessionId: string;
    isShowChat: boolean;
    avatarUrl?: string;
    email?: string;
};
export declare const getClientSession: (apiKey: string, nexaiAssetsUrl: string) => NexaiSession;
export declare const createSession: (nexaiAssetsUrl: string) => NexaiSession;
export declare const fetchSession: (apiKey: string) => NexaiSession | undefined;
export declare const saveClientSession: (apiKey: string, session: NexaiSession) => void;
