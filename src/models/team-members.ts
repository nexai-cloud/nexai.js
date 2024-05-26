import { action, makeObservable, observable } from 'mobx'
import { ListModel } from './list'
import { TeamMemberModel } from './team-member'
import { FetchModel } from './fetch-model'

export class TeamMembersModel extends ListModel {

  getModelType(): typeof TeamMemberModel {
    return TeamMemberModel
  }

  constructor() {
    super()
    makeObservable(this, {
      projectId: observable,
      nexaiApiUrl: observable,
      fetch: action,
      fetchState: observable
    })
  }

  projectId = ''

  nexaiApiUrl = ''

  fetchState = FetchModel.create()

  async fetch() {
    this.fetchState.fetch(async () => {
      const res = await fetch(
        this.nexaiApiUrl + '/nexai/team/?projectId=' + this.projectId, 
        { mode: 'cors' }
      )
      const json = await res.json()
      if (json.data) {
        const members = json.data.teamMembers
        this.addItems(members)
      }
    })
  }

}

const map = new Map<string, TeamMembersModel>()

export const useTeamMembers = ({ projectId, nexaiApiUrl }: { projectId: string, nexaiApiUrl: string }) => {
  let team = map.get(projectId)
  if (!team) {
    team = TeamMembersModel.create({ projectId, nexaiApiUrl })
    map.set(projectId, team)
  }
  return team

}