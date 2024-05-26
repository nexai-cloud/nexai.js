"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AISearchShadowDom = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ai_search_1 = require("./ai-search");
const shadow_dom_1 = require("./shadow-dom");
const AISearchShadowDom = (props) => {
    return ((0, jsx_runtime_1.jsx)(shadow_dom_1.ShadowDom, { id: "nexai-shadow-ai-search", style: { width: '100%' }, children: (0, jsx_runtime_1.jsx)(ai_search_1.AISearch, Object.assign({}, props)) }));
};
exports.AISearchShadowDom = AISearchShadowDom;
