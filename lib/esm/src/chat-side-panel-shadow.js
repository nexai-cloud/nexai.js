"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { ChatSidePanel } from './chat-side-panel';
import { chatSidePanelStyles } from './lib/twind/chat-side-panel-styles';
import { ShadowDom } from './shadow-dom';
export const ChatSidePanelShadowDom = (props) => {
    return (_jsx(ShadowDom, { id: "nexai-shadow-chat-side-panel", styles: chatSidePanelStyles, children: _jsx(ChatSidePanel, Object.assign({}, props)) }));
};
