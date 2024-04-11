import { type ChatThread } from "../chat-types";
import { type ChatSessionModel } from "~/models/chat-session";
export declare const getAiUser: ({ aiName, aiAvatarUrl, nexaiAssetsUrl }: {
    aiName: string;
    aiAvatarUrl: string;
    nexaiAssetsUrl: string;
}) => {
    userUid: string;
    name: string;
    avatar: import("react/jsx-runtime").JSX.Element;
};
export declare const getAiThreads: (chatSession: ChatSessionModel, { aiName, aiAvatarUrl, nexaiAssetsUrl }: {
    aiName: string;
    aiAvatarUrl: string;
    nexaiAssetsUrl: string;
}) => ChatThread[];
