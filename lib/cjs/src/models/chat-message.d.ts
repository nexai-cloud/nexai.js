import { Model } from "./model";
export declare class ChatMessageModel extends Model {
    constructor();
    userUid: string;
    sessionId: string;
    fromName: string;
    toName: string;
    message: string;
    projectId: string;
    appId: string;
    createdAt: string;
    updatedAt: string;
    avatarUrl: string;
    fromType: string;
    sources: never[];
    aiMuted: boolean;
}
