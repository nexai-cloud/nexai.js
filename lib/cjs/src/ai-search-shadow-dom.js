"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AISearchShadowDom = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const client_1 = require("react-dom/client");
const twind_1 = require("./lib/twind/twind");
const ai_search_1 = require("./ai-search");
const AISearchShadowDom = (props) => {
    const shadowContainerRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const shadowContainer = shadowContainerRef.current;
        if (shadowContainer && !shadowContainer.shadowRoot) {
            const shadowRoot = shadowContainer.attachShadow({ mode: 'open' });
            const container = document.createElement('div');
            shadowRoot.appendChild(container);
            (0, twind_1.addTwStyles)(shadowRoot);
            // Render the AISearch component inside the shadow root
            const root = (0, client_1.createRoot)(container);
            root.render((0, jsx_runtime_1.jsx)(ai_search_1.AISearch, Object.assign({}, props)));
            // Cleanup when the component unmounts
            // return () => {
            //   root.unmount();
            // };
        }
    }, [props]);
    return ((0, jsx_runtime_1.jsx)("div", { ref: shadowContainerRef, id: "nexai-shadow-ai-search", style: { width: '100%' } }));
};
exports.AISearchShadowDom = AISearchShadowDom;
