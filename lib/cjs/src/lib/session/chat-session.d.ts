export type NexaiSession = {
    name: string;
    sessionId: string;
    isShowChat: boolean;
    avatarUrl?: string;
    email?: string;
};
export declare const getClientSession: (apiKey: string) => NexaiSession;
export declare const createSession: () => NexaiSession;
export declare const fetchSession: (apiKey: string) => NexaiSession | undefined;
export declare const saveClientSession: (apiKey: string, session: NexaiSession) => void;
