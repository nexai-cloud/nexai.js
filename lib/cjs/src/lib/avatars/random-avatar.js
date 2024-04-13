"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomAvatarGenerator = void 0;
const avatars_list_1 = require("./avatars-list");
const randomAvatarGenerator = (nexaiAssetsUrl) => {
    const avatarsList = (0, avatars_list_1.getAvatarsList)(nexaiAssetsUrl);
    return avatarsList[Math.floor(Math.random() * avatarsList.length)];
};
exports.randomAvatarGenerator = randomAvatarGenerator;
