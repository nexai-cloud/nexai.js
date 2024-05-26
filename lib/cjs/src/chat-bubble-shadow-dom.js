"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NexaiChatBubbleShadowDom = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const chat_bubble_1 = require("./chat-bubble");
const styles_1 = require("./lib/twind/styles");
const shadow_dom_1 = require("./shadow-dom");
const NexaiChatBubbleShadowDom = (props) => {
    return ((0, jsx_runtime_1.jsx)(shadow_dom_1.ShadowDom, { id: "nexai-shadow", styles: styles_1.styles, children: (0, jsx_runtime_1.jsx)(chat_bubble_1.NexaiChatBubble, Object.assign({}, props)) }));
};
exports.NexaiChatBubbleShadowDom = NexaiChatBubbleShadowDom;
