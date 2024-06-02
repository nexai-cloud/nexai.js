"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const avatar_1 = require("../../components/ui/avatar");
const utils_1 = require("../../lib/utils");
const markdown_1 = require("./markdown");
const mobx_react_lite_1 = require("mobx-react-lite");
const message_like_1 = require("./message-like");
const message_copy_1 = require("./message-copy");
exports.ChatMessage = (0, mobx_react_lite_1.observer)(({ msg, isLatest }) => {
    var _a;
    const isAi = ((_a = msg.fromName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'nexai'
        || msg.fromType === 'ai'
        || msg.userUid === 'nexai';
    return ((0, jsx_runtime_1.jsxs)("div", { className: "chat-message group relative flex gap-2 m-2", children: [isAi ? ((0, jsx_runtime_1.jsxs)(avatar_1.Avatar, { className: "mt-auto", children: [(0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, { src: "/nexai-logo/nexai-logo-circle-dark.svg" }), (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, { children: "AI" })] })) : null, (0, jsx_runtime_1.jsxs)("span", { className: (0, utils_1.cn)("p-2 border border-slate-300 text-slate-900 bg-slate-100 rounded-lg", !isAi && "ml-auto bg-slate-900 text-slate-300 text-right max-w-[95%]"), children: [(0, jsx_runtime_1.jsx)(markdown_1.MessageMarkdown, { chatMessage: msg }), isAi && ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)("flex w-full"), children: (0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)("flex", !isLatest && 'border shadow bg-slate-100 rounded-lg -mb-8 mr-2 z-20', !isLatest && 'absolute bottom-0 right-0 opacity-0 group-hover:opacity-100'), children: [(0, jsx_runtime_1.jsx)(message_like_1.MessageLike, { chatMessage: msg }), (0, jsx_runtime_1.jsx)(message_copy_1.MessageCopy, { chatMessage: msg })] }) }))] })] }));
});
