"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatDashboard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const chat_input_1 = require("../../ui/chat-input");
const ChatDashboard = ({ projectMsgs, onSendSupportChatMsg }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold border-b p-2", children: "Dashboard" }), (0, jsx_runtime_1.jsx)("div", { className: 'flex flex-col flex-1 p-2 space-y-2 my-2 items-start align-top overflow-y-auto', children: projectMsgs.map((msg, index) => ((0, jsx_runtime_1.jsxs)("p", { className: 'flex gap-1 p-2 border rounded-xl', children: [(0, jsx_runtime_1.jsx)("span", { className: 'font-bold', children: msg.fromName }), (0, jsx_runtime_1.jsx)("span", { children: msg.message })] }, index))) }), (0, jsx_runtime_1.jsx)("div", { className: 'p-2 mt-auto', children: (0, jsx_runtime_1.jsx)(chat_input_1.ChatInput, { onSendChatMsg: onSendSupportChatMsg }) })] }));
};
exports.ChatDashboard = ChatDashboard;
