import { makeObservable, observable } from "mobx";
import { Model } from "./model";
export class TeamMemberModel extends Model {
    constructor() {
        super();
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "email", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "picture", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        makeObservable(this, {
            name: observable,
            email: observable,
            picture: observable
        });
    }
}
