import { action, computed, observable } from "mobx";
import { Model } from "./model";

export class FetchModel extends Model {
  
  @observable error?: Error

  @observable busy = false

  @observable ok = false

  @observable startDate?:Date

  @observable endDate?:Date

  @computed get fetched(): boolean {
    return this.busy || this.ok
  }

  @action async fetch(fetch: () => Promise<unknown>) {
    try {
      this.busy = true
      this.startDate = new Date()
      const res = await fetch()
      console.log('fetched', res)
      this.ok = true // @todo use res
      return res
    } catch(error) {
      this.error = error as Error
    } finally {
      this.busy = false
      this.endDate = new Date()
    }
  }
}