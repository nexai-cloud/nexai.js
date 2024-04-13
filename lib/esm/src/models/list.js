import { action, makeObservable, observable } from "mobx";
import { Model } from "./model";
export class ListModel extends Model {
    constructor() {
        super();
        Object.defineProperty(this, "items", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        makeObservable(this, {
            items: observable,
            replaceItem: action,
            addItem: action,
            addItems: action,
            setItems: action,
        });
    }
    getModelType() {
        return Model;
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
