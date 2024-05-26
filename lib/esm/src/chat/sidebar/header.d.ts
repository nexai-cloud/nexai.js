import { TeamMemberModel } from "~/models/team-member";
type Props = {
    teamMembers: TeamMemberModel[];
    onClickBack: () => void;
};
export declare const ChatHeader: ({ teamMembers, onClickBack }: Props) => import("react/jsx-runtime").JSX.Element;
export {};
