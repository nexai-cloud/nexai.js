import { NexaiChatMessage } from "../../chat-types";
type Props = {
    msg: NexaiChatMessage;
    isLatest: boolean;
};
export declare const ChatMessage: (({ msg, isLatest }: Props) => import("react/jsx-runtime").JSX.Element) & {
    displayName: string;
};
export {};
