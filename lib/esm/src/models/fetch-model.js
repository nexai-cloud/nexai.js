var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { action, computed, observable } from "mobx";
import { Model } from "./model";
let FetchModel = (() => {
    var _a;
    let _classSuper = Model;
    let _instanceExtraInitializers = [];
    let _error_decorators;
    let _error_initializers = [];
    let _error_extraInitializers = [];
    let _busy_decorators;
    let _busy_initializers = [];
    let _busy_extraInitializers = [];
    let _ok_decorators;
    let _ok_initializers = [];
    let _ok_extraInitializers = [];
    let _startDate_decorators;
    let _startDate_initializers = [];
    let _startDate_extraInitializers = [];
    let _endDate_decorators;
    let _endDate_initializers = [];
    let _endDate_extraInitializers = [];
    let _get_fetched_decorators;
    let _fetch_decorators;
    return _a = class FetchModel extends _classSuper {
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
            constructor() {
                super(...arguments);
                Object.defineProperty(this, "error", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _error_initializers, void 0))
                });
                Object.defineProperty(this, "busy", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: (__runInitializers(this, _error_extraInitializers), __runInitializers(this, _busy_initializers, false))
                });
                Object.defineProperty(this, "ok", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: (__runInitializers(this, _busy_extraInitializers), __runInitializers(this, _ok_initializers, false))
                });
                Object.defineProperty(this, "startDate", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: (__runInitializers(this, _ok_extraInitializers), __runInitializers(this, _startDate_initializers, void 0))
                });
                Object.defineProperty(this, "endDate", {
                    enumerable: true,
                    configurable: true,
                    writable: true,
                    value: (__runInitializers(this, _startDate_extraInitializers), __runInitializers(this, _endDate_initializers, void 0))
                });
                __runInitializers(this, _endDate_extraInitializers);
            }
        },
        (() => {
            var _b;
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _error_decorators = [observable];
            _busy_decorators = [observable];
            _ok_decorators = [observable];
            _startDate_decorators = [observable];
            _endDate_decorators = [observable];
            _get_fetched_decorators = [computed];
            _fetch_decorators = [action];
            __esDecorate(_a, null, _get_fetched_decorators, { kind: "getter", name: "fetched", static: false, private: false, access: { has: obj => "fetched" in obj, get: obj => obj.fetched }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _fetch_decorators, { kind: "method", name: "fetch", static: false, private: false, access: { has: obj => "fetch" in obj, get: obj => obj.fetch }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _error_decorators, { kind: "field", name: "error", static: false, private: false, access: { has: obj => "error" in obj, get: obj => obj.error, set: (obj, value) => { obj.error = value; } }, metadata: _metadata }, _error_initializers, _error_extraInitializers);
            __esDecorate(null, null, _busy_decorators, { kind: "field", name: "busy", static: false, private: false, access: { has: obj => "busy" in obj, get: obj => obj.busy, set: (obj, value) => { obj.busy = value; } }, metadata: _metadata }, _busy_initializers, _busy_extraInitializers);
            __esDecorate(null, null, _ok_decorators, { kind: "field", name: "ok", static: false, private: false, access: { has: obj => "ok" in obj, get: obj => obj.ok, set: (obj, value) => { obj.ok = value; } }, metadata: _metadata }, _ok_initializers, _ok_extraInitializers);
            __esDecorate(null, null, _startDate_decorators, { kind: "field", name: "startDate", static: false, private: false, access: { has: obj => "startDate" in obj, get: obj => obj.startDate, set: (obj, value) => { obj.startDate = value; } }, metadata: _metadata }, _startDate_initializers, _startDate_extraInitializers);
            __esDecorate(null, null, _endDate_decorators, { kind: "field", name: "endDate", static: false, private: false, access: { has: obj => "endDate" in obj, get: obj => obj.endDate, set: (obj, value) => { obj.endDate = value; } }, metadata: _metadata }, _endDate_initializers, _endDate_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
export { FetchModel };
