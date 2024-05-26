/// <reference types="react" />
import { ChatMessageModel } from "../../models/chat-message";
type Props = {
    msgs: ChatMessageModel[];
};
export declare const Messages: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<Omit<Props & import("react").RefAttributes<HTMLDivElement>, "ref"> & import("react").RefAttributes<HTMLDivElement>>>;
export {};
