"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const avatar_1 = require("../../components/ui/avatar");
const utils_1 = require("../../lib/utils");
const markdown_1 = require("./markdown");
const ChatMessage = ({ msg }) => {
    var _a;
    const isAi = ((_a = msg.fromName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'nexai'
        || msg.fromType === 'ai'
        || msg.userUid === 'nexai';
    return ((0, jsx_runtime_1.jsxs)("div", { className: "chat-message flex gap-2 m-2", children: [isAi ? ((0, jsx_runtime_1.jsxs)(avatar_1.Avatar, { className: "mt-auto", children: [(0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, { src: "/nexai-logo/nexai-logo-circle-dark.svg" }), (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, { children: "AI" })] })) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, utils_1.cn)("p-2 border border-slate-300 text-slate-900 bg-slate-100 rounded-lg", !isAi && "ml-auto bg-slate-900 text-slate-300 text-right max-w-[95%]"), children: (0, jsx_runtime_1.jsx)(markdown_1.MessageMarkdown, { chatMessage: msg }) })] }));
};
exports.ChatMessage = ChatMessage;
