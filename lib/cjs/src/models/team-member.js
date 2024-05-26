"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMemberModel = void 0;
const mobx_1 = require("mobx");
const model_1 = require("./model");
class TeamMemberModel extends model_1.Model {
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
        (0, mobx_1.makeObservable)(this, {
            name: mobx_1.observable,
            email: mobx_1.observable,
            picture: mobx_1.observable
        });
    }
}
exports.TeamMemberModel = TeamMemberModel;
