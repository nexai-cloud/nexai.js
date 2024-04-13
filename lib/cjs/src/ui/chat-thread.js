"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NexaiChatThread = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const date_fns_1 = require("date-fns");
const chat_msg_1 = require("./chat-msg");
const mobx_react_lite_1 = require("mobx-react-lite");
const utils_1 = require("../lib/utils");
exports.NexaiChatThread = (0, mobx_react_lite_1.observer)(({ thread }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)(`chat-thread text-left opacity-1 transition-opacity duration-300 p-1 pb-4 mt-4 relative font-medium subpixel-antialiased border rounded-lg rounded-bl-none shadow-lg`, thread.userUid === 'nexai' ? 'bg-gradient-to-bl from-sky-100 to-white border-t-sky-300' : ' bg-white border-t-green-300', thread.hide ? 'opacity-0' : ''), style: {
            fontSize: 14
        }, children: [(0, jsx_runtime_1.jsxs)("p", { className: "p-3 text-slate-400", children: [thread.name, " ", (0, date_fns_1.formatDistanceToNow)(thread.date)] }), thread.messages.map((message, i) => ((0, jsx_runtime_1.jsx)(chat_msg_1.NexaiChatMsg, { thread: thread, chatMessage: message }, i))), (0, jsx_runtime_1.jsx)("div", { className: "bottom-1 absolute", style: { left: -80 }, children: thread.avatar }), (0, jsx_runtime_1.jsx)("div", { className: "tri-left border left-bottom" })] }));
});
