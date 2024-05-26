"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatSidePanelShadowDom = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const chat_side_panel_1 = require("./chat-side-panel");
const chat_side_panel_styles_1 = require("./lib/twind/chat-side-panel-styles");
const shadow_dom_1 = require("./shadow-dom");
const ChatSidePanelShadowDom = (props) => {
    return ((0, jsx_runtime_1.jsx)(shadow_dom_1.ShadowDom, { id: "nexai-shadow-chat-side-panel", styles: chat_side_panel_styles_1.chatSidePanelStyles, children: (0, jsx_runtime_1.jsx)(chat_side_panel_1.ChatSidePanel, Object.assign({}, props)) }));
};
exports.ChatSidePanelShadowDom = ChatSidePanelShadowDom;
