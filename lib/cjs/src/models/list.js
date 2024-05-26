"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListModel = void 0;
const mobx_1 = require("mobx");
const model_1 = require("./model");
class ListModel extends model_1.Model {
    constructor() {
        super();
        Object.defineProperty(this, "items", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        (0, mobx_1.makeObservable)(this, {
            items: mobx_1.observable,
            replaceItem: mobx_1.action,
            addItem: mobx_1.action,
            addItems: mobx_1.action,
            setItems: mobx_1.action,
        });
    }
    getModelType() {
        return model_1.Model;
    }
    getItems() {
        return this.items;
    }
    getItemById(id) {
        return this.getItems()
            .find(item => item.id === id);
    }
    getItemByUid(uid) {
        return this.getItems()
            .find(item => item.uid === uid);
    }
    replaceItem(props, nextProps) {
        const item = this.getItemByUid(props.uid);
        this.items.splice(this.items.indexOf(item), 1, this.getModelType().create(nextProps));
    }
    addItem(props) {
        this.items.push(this.getModelType().create(props));
    }
    addItems(items) {
        this.items.push(...items.map(props => this.getModelType().create(props)));
    }
    setItems(items) {
        this.items.splice(0, this.items.length, ...items.map(props => this.getModelType().create(props)));
    }
}
exports.ListModel = ListModel;
