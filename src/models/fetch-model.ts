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
      fetch: action,
      setBusy: action,
      setOk: action,
      setStartDate: action,
      setEndDate: action
    })
  }
  
  error: Error|undefined

  busy = false

  ok = false

  startDate:Date|undefined

  endDate:Date|undefined

  setError(error: Error | undefined) {
    this.error = error;
  }

  setBusy(busy: boolean) {
    this.busy = busy;
  }

  setOk(ok: boolean) {
    this.ok = ok;
  }

  setStartDate(startDate: Date | undefined) {
    this.startDate = startDate;
  }

  setEndDate(endDate: Date | undefined) {
    this.endDate = endDate;
  }

  get fetched(): boolean {
    return this.busy || this.ok
  }

  async fetch(fetch: () => Promise<unknown>) {
    try {
      this.setBusy(true)
      this.setStartDate(new Date())
      const res = await fetch()
      this.setOk(true) // @todo use res
      return res
    } catch(error) {
      this.setError(error as Error)
    } finally {
      this.setBusy(false)
      this.setEndDate(new Date())
    }
  }
}