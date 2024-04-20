"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { addTwStyles } from './lib/twind/twind';
import { AISearch } from './ai-search';
export const AISearchShadowDom = (props) => {
    const shadowContainerRef = useRef(null);
    useEffect(() => {
        const shadowContainer = shadowContainerRef.current;
        if (shadowContainer && !shadowContainer.shadowRoot) {
            const shadowRoot = shadowContainer.attachShadow({ mode: 'open' });
            const container = document.createElement('div');
            shadowRoot.appendChild(container);
            addTwStyles(shadowRoot);
            // Render the AISearch component inside the shadow root
            const root = createRoot(container);
            root.render(_jsx(AISearch, Object.assign({}, props)));
            // Cleanup when the component unmounts
            // return () => {
            //   root.unmount();
            // };
        }
    }, [props]);
    return (_jsx("div", { ref: shadowContainerRef, id: "nexai-shadow-ai-search", style: { width: '100%' } }));
};
