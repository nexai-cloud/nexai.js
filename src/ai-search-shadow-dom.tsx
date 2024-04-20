"use client"

import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { addTwStyles } from './lib/twind/twind';
import { AISearch, AISearchProps } from './ai-search';

export const AISearchShadowDom = (props: AISearchProps) => {
  const shadowContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shadowContainer = shadowContainerRef.current;
  
    if (shadowContainer && !shadowContainer.shadowRoot) {
      const shadowRoot = shadowContainer.attachShadow({ mode: 'open' });
      const container = document.createElement('div');
      shadowRoot.appendChild(container);

      addTwStyles(shadowRoot)
  
      // Render the AISearch component inside the shadow root
      const root = createRoot(container)
      root.render(<AISearch {...props} />)
  
      // Cleanup when the component unmounts
      // return () => {
      //   root.unmount();
      // };
    }
  }, [props]);
  

  return (
    <div
      ref={shadowContainerRef}
      id="nexai-shadow-ai-search"
      style={{ width: '100%' }}
    ></div>
  );
};
