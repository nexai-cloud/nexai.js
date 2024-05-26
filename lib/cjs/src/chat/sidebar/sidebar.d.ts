import { type TeamMemberModel } from "../../models/team-member";
type Props = {
    nexaiApiKey: string;
    onClickBack: () => void;
    nexaiApiUrl?: string;
    nexaiAssetsUrl?: string;
    nexaiIoUrl?: string;
    teamMembers?: TeamMemberModel[];
    onChatInput?: (input: string) => void;
};
export declare const ChatSidebar: (({ nexaiApiKey, onClickBack, nexaiApiUrl, nexaiAssetsUrl, nexaiIoUrl, onChatInput }: Props) => import("react/jsx-runtime").JSX.Element) & {
    displayName: string;
};
export {};
