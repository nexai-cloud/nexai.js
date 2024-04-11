"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatBusyIndicator = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ChatBusyIndicator = ({ text = 'Typing' }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "typing-busy-indicator", children: [(0, jsx_runtime_1.jsx)("span", { className: "typing-text", children: text }), (0, jsx_runtime_1.jsx)("span", { className: "dot-1", children: "." }), (0, jsx_runtime_1.jsx)("span", { className: "dot-2", children: "." }), (0, jsx_runtime_1.jsx)("span", { className: "dot-3", children: "." })] }));
};
exports.ChatBusyIndicator = ChatBusyIndicator;
