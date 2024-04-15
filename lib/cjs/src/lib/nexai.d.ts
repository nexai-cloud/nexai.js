import { type NexaiSession } from "./session/chat-session";
import { Socket } from "socket.io-client";
export declare class Nexai {
    nexaiApiKey: string;
    session: NexaiSession;
    nexaiApiUrl: string;
    ioUrl: string;
    constructor({ nexaiApiKey, session, nexaiApiUrl, ioUrl }: {
        nexaiApiKey: string;
        session?: NexaiSession;
        nexaiApiUrl?: string;
        ioUrl?: string;
    });
    chat(message: string): Promise<any>;
    getProjectSocket(): Socket;
    getSessionSocket(): Socket;
}
