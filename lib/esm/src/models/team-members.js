var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { action, makeObservable, observable } from 'mobx';
import { ListModel } from './list';
import { TeamMemberModel } from './team-member';
import { FetchModel } from './fetch-model';
export class TeamMembersModel extends ListModel {
    getModelType() {
        return TeamMemberModel;
    }
    constructor() {
        super();
        Object.defineProperty(this, "projectId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "nexaiApiUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "fetchState", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: FetchModel.create()
        });
        makeObservable(this, {
            projectId: observable,
            nexaiApiUrl: observable,
            fetch: action,
            fetchState: observable
        });
    }
    fetch() {
        return __awaiter(this, void 0, void 0, function* () {
            this.fetchState.fetch(() => __awaiter(this, void 0, void 0, function* () {
                const res = yield fetch(this.nexaiApiUrl + '/nexai/team/?projectId=' + this.projectId, { mode: 'cors' });
                const json = yield res.json();
                if (json.data) {
                    const members = json.data.teamMembers;
                    this.setItems(members);
                }
            }));
        });
    }
}
const map = new Map();
export const useTeamMembers = ({ projectId, nexaiApiUrl }) => {
    let team = map.get(projectId);
    if (!team) {
        team = TeamMembersModel.create({ projectId, nexaiApiUrl });
        map.set(projectId, team);
    }
    return team;
};
