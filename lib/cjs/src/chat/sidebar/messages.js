"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messages = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const scroll_area_1 = require("../../components/ui/scroll-area");
const message_1 = require("./message");
const utils_1 = require("../../lib/utils");
const mobx_react_lite_1 = require("mobx-react-lite");
const react_1 = require("react");
exports.Messages = (0, mobx_react_lite_1.observer)((0, react_1.forwardRef)(({ msgs }, ref) => {
    return ((0, jsx_runtime_1.jsxs)(scroll_area_1.ScrollArea, { ref: ref, className: (0, utils_1.cn)('flex flex-col flex-1 m-2 items-start align-top', 'pr-2'), children: [msgs.map((msg, index) => ((0, jsx_runtime_1.jsx)(message_1.ChatMessage, { msg: msg, isLatest: index === msgs.length - 1 }, index))), (0, jsx_runtime_1.jsx)(scroll_area_1.ScrollBar, { className: "bg-muted text-black rounded-full" })] }));
}));
