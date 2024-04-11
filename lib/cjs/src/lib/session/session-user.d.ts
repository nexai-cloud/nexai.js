import { NexaiSession } from "./chat-session";
export declare const getChatUser: (session: NexaiSession) => {
    name: string;
    userUid: string;
    avatarUrl: string | undefined;
    email: string | undefined;
};
