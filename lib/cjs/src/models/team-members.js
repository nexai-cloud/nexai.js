"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTeamMembers = exports.TeamMembersModel = void 0;
const mobx_1 = require("mobx");
const list_1 = require("./list");
const team_member_1 = require("./team-member");
const fetch_model_1 = require("./fetch-model");
class TeamMembersModel extends list_1.ListModel {
    getModelType() {
        return team_member_1.TeamMemberModel;
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
            value: fetch_model_1.FetchModel.create()
        });
        (0, mobx_1.makeObservable)(this, {
            projectId: mobx_1.observable,
            nexaiApiUrl: mobx_1.observable,
            fetch: mobx_1.action,
            fetchState: mobx_1.observable
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
exports.TeamMembersModel = TeamMembersModel;
const map = new Map();
const useTeamMembers = ({ projectId, nexaiApiUrl }) => {
    let team = map.get(projectId);
    if (!team) {
        team = TeamMembersModel.create({ projectId, nexaiApiUrl });
        map.set(projectId, team);
    }
    return team;
};
exports.useTeamMembers = useTeamMembers;
