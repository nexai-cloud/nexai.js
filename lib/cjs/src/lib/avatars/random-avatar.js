"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomAvatarGenerator = void 0;
const avatars_list_1 = require("./avatars-list");
const randomAvatarGenerator = () => {
    return avatars_list_1.avatarsList[Math.floor(Math.random() * avatars_list_1.avatarsList.length)];
};
exports.randomAvatarGenerator = randomAvatarGenerator;
