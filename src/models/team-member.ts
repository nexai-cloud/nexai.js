import { makeObservable, observable } from "mobx";
import { Model } from "./model";

export class TeamMemberModel extends Model {

  constructor() {
    super()
    makeObservable(this, {
      name: observable,
      email: observable,
      picture: observable
    })
  }

  name = ''

  email = ''

  picture = ''
  
}