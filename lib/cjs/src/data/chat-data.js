"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAiThreads = exports.getAiUser = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const chat_avatar_1 = require("../ui/chat-avatar");
const choose_avatar_1 = require("./choose-avatar");
const getAiUser = ({ aiName, aiAvatarUrl }) => {
    console.log('aiAvatarUrl', aiAvatarUrl);
    return {
        userUid: 'nexai',
        name: aiName,
        avatar: aiAvatarUrl ? (0, jsx_runtime_1.jsx)(chat_avatar_1.ChatAvatar, { src: aiAvatarUrl, name: aiName }) : (0, jsx_runtime_1.jsx)(chat_avatar_1.BotAvatar, {}),
    };
};
exports.getAiUser = getAiUser;
const getAiThreads = (chatSession, { aiName, aiAvatarUrl, nexaiAssetsUrl }) => [
    Object.assign(Object.assign({}, (0, exports.getAiUser)({ aiName, aiAvatarUrl })), { hide: false, date: new Date(), messages: [
            {
                message: 'Hi there. I hope you are having a great day.'
            },
            {
                message: 'How may I help you?'
            },
            {
                message: ((0, jsx_runtime_1.jsx)(choose_avatar_1.ChooseAvatar, { nexaiAssetsUrl: nexaiAssetsUrl, chatSession: chatSession }))
            }
        ] })
];
exports.getAiThreads = getAiThreads;
