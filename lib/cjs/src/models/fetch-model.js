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
exports.FetchModel = void 0;
const mobx_1 = require("mobx");
const model_1 = require("./model");
class FetchModel extends model_1.Model {
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
        (0, mobx_1.makeObservable)(this, {
            error: mobx_1.observable,
            busy: mobx_1.observable,
            ok: mobx_1.observable,
            startDate: mobx_1.observable,
            endDate: mobx_1.observable,
            fetched: mobx_1.computed,
            fetch: mobx_1.action
        });
    }
    get fetched() {
        return this.busy || this.ok;
    }
    fetch(fetch) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.busy = true;
                this.startDate = new Date();
                const res = yield fetch();
                console.log('fetched', res);
                this.ok = true; // @todo use res
                return res;
            }
            catch (error) {
                this.error = error;
            }
            finally {
                this.busy = false;
                this.endDate = new Date();
            }
        });
    }
}
exports.FetchModel = FetchModel;
