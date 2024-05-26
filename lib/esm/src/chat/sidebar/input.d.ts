/// <reference types="react" />
type Props = {
    nexaiApiKey: string;
    inputPlaceholder?: string;
    onSpeechTranscript: (transcript: string) => void;
    onSendChatMsg: (message: string) => void;
    onChatInput: (message: string) => void;
    chatInput: string;
};
export declare const ChatInput: import("react").MemoExoticComponent<import("react").ForwardRefExoticComponent<Omit<Props & import("react").RefAttributes<HTMLInputElement>, "ref"> & import("react").RefAttributes<HTMLInputElement>>>;
export {};
