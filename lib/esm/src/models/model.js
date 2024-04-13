import { action, makeObservable, observable } from "mobx";
export class Model {
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
        makeObservable(this, {
            id: observable,
            setProps: action,
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
