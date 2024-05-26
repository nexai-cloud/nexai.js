"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const mobx_1 = require("mobx");
class Model {
    constructor() {
        Object.defineProperty(this, "uid", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: String(Math.random()).substring(2)
        });
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        (0, mobx_1.makeObservable)(this, {
            id: mobx_1.observable,
            setProps: mobx_1.action,
        });
    }
    setProps(props) {
        Object.assign(this, props);
    }
    static create(props) {
        const model = new this();
        if (props)
            model.setProps(props);
        return model;
    }
}
exports.Model = Model;
