import { FetchModel } from "~/models/fetch-model";
import { Model } from "~/models/model";
import { NexaiSession } from "../lib/session/chat-session";
export declare class ChatSessionModel extends Model implements NexaiSession {
    nexaiApiKey: string;
    sessionId: string;
    name: string;
    isShowChat: boolean;
    avatarUrl: string;
    email: string;
    fetchState: FetchModel;
    fetch(): Promise<void>;
    saveState: FetchModel;
    save(): Promise<void>;
}
export declare const useChatSessionModel: ({ nexaiApiKey }: {
    nexaiApiKey: string;
}) => ChatSessionModel;
