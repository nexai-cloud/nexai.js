import { action, computed, makeObservable, observable } from "mobx";
import { Model } from "./model";

export class FetchModel extends Model {

  constructor() {
    super()
    makeObservable(this, {
      error: observable,
      busy: observable,
      ok: observable,
      startDate: observable,
      endDate: observable,
      fetched: computed,
      fetch: action
    })
  }
  
  error: Error|undefined

  busy = false

  ok = false

  startDate:Date|undefined

  endDate:Date|undefined

  get fetched(): boolean {
    return this.busy || this.ok
  }

  async fetch(fetch: () => Promise<unknown>) {
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