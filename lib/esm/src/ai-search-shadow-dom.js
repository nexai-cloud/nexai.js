"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { AISearch } from './ai-search';
import { ShadowDom } from './shadow-dom';
export const AISearchShadowDom = (props) => {
    return (_jsx(ShadowDom, { id: "nexai-shadow-ai-search", style: { width: '100%' }, children: _jsx(AISearch, Object.assign({}, props)) }));
};
