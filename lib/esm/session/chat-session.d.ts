type NexaiSession = {
    name: string;
    sessionId: string;
    isShowChat: boolean;
};
export declare const getClientSession: () => NexaiSession;
export declare const createSession: () => NexaiSession;
export declare const fetchSession: () => NexaiSession | undefined;
export declare const setClientSession: (session: NexaiSession) => void;
export {};
