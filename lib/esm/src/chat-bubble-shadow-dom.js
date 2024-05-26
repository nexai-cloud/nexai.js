"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { NexaiChatBubble } from './chat-bubble';
import { styles } from './lib/twind/styles';
import { ShadowDom } from './shadow-dom';
export const NexaiChatBubbleShadowDom = (props) => {
    return (_jsx(ShadowDom, { id: "nexai-shadow", styles: styles, children: _jsx(NexaiChatBubble, Object.assign({}, props)) }));
};
