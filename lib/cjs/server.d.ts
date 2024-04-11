export type IoChatMsg = {
    userUid: string;
    projectId: string;
    sessionKey: string;
    message: string;
    fromName: string;
    toName: string;
    sources?: string[];
    aiMuted?: boolean;
    avatarUrl?: string;
    email?: string;
};
