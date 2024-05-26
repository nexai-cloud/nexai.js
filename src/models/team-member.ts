import { makeObservable, observable } from "mobx";
import { Model } from "./model";

export class TeamMemberModel extends Model {

  constructor() {
    super()
    makeObservable(this, {
      name: observable,
      email: observable,
      avatarUrl: observable
    })
  }

  name = ''

  email = ''

  avatarUrl = ''
  
}