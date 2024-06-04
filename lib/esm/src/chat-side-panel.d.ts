import { ChatSidebarProps } from './chat/sidebar/sidebar';
export type ChatSidePanelProps = {
    defaultSize?: number;
} & Omit<ChatSidebarProps, 'onClickBack'>;
export declare const ChatSidePanel: ({ defaultSize, ...chatSidebarProps }: ChatSidePanelProps) => import("react/jsx-runtime").JSX.Element;
