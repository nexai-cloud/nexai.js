import "./chat-bubble.css";
import "./index.css";
import "./ui/busy-indicator/busy-indicator.css";
import './ui/wave-form/wave-form.css';
export type NexaiChatBubbleProps = {
    width?: number;
    nexaiApiKey: string;
    nexaiIoUrl?: string;
    nexaiAssetsUrl?: string;
    aiName?: string;
    aiAvatarUrl?: string;
    chatSuggests?: string[];
    projectName?: string;
    inputPlaceholder?: string;
};
export declare const NexaiChatBubble: (({ width, nexaiApiKey, nexaiIoUrl, nexaiAssetsUrl, aiName, aiAvatarUrl, chatSuggests, projectName, inputPlaceholder }: NexaiChatBubbleProps) => import("react/jsx-runtime").JSX.Element) & {
    displayName: string;
};
export type ChatRenderProps = NexaiChatBubbleProps & {
    bottom?: number;
    right?: number;
};
