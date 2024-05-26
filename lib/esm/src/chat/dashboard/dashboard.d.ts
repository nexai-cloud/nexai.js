import { NexaiChatMessage } from "~/chat-types";
type Props = {
    projectMsgs: NexaiChatMessage[];
    onSendSupportChatMsg: (msg: string) => void;
};
export declare const ChatDashboard: ({ projectMsgs, onSendSupportChatMsg }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
