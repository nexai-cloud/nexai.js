import { type TeamMemberModel } from "../../models/team-member";
export type ChatSidebarProps = {
    nexaiApiKey: string;
    onClickBack: () => void;
    nexaiApiUrl?: string;
    nexaiAssetsUrl?: string;
    nexaiIoUrl?: string;
    teamMembers?: TeamMemberModel[];
    onChatInput?: (input: string) => void;
};
export declare const ChatSidebar: (({ nexaiApiKey, onClickBack, nexaiApiUrl, nexaiAssetsUrl, nexaiIoUrl, onChatInput }: ChatSidebarProps) => import("react/jsx-runtime").JSX.Element) & {
    displayName: string;
};
