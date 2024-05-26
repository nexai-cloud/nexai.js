import { ListModel } from './list';
import { TeamMemberModel } from './team-member';
import { FetchModel } from './fetch-model';
export declare class TeamMembersModel extends ListModel {
    getModelType(): typeof TeamMemberModel;
    constructor();
    projectId: string;
    nexaiApiUrl: string;
    fetchState: FetchModel;
    fetch(): Promise<void>;
}
export declare const useTeamMembers: ({ projectId, nexaiApiUrl }: {
    projectId: string;
    nexaiApiUrl: string;
}) => TeamMembersModel;
