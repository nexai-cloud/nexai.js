var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { action, computed, makeObservable, observable } from "mobx";
import { Model } from "./model";
export class FetchModel extends Model {
    constructor() {
        super();
        Object.defineProperty(this, "error", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "busy", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "ok", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "startDate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "endDate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
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
        });
    }
    setError(error) {
        this.error = error;
    }
    setBusy(busy) {
        this.busy = busy;
    }
    setOk(ok) {
        this.ok = ok;
    }
    setStartDate(startDate) {
        this.startDate = startDate;
    }
    setEndDate(endDate) {
        this.endDate = endDate;
    }
    get fetched() {
        return this.busy || this.ok;
    }
    fetch(fetch) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.setBusy(true);
                this.setStartDate(new Date());
                const res = yield fetch();
                this.setOk(true); // @todo use res
                return res;
            }
            catch (error) {
                this.setError(error);
            }
            finally {
                this.setBusy(false);
                this.setEndDate(new Date());
            }
        });
    }
}
