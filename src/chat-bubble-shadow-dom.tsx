"use client"

import { useEffect, useRef } from 'react';
import { NexaiChatBubble, NexaiChatBubbleProps } from './chat-bubble';
import { createRoot } from 'react-dom/client';
import { addTwStyles } from './lib/twind/twind';

export const NexaiChatBubbleShadowDom = (props: NexaiChatBubbleProps) => {
  const shadowContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shadowContainer = shadowContainerRef.current;
  
    if (shadowContainer && !shadowContainer.shadowRoot) {
      const shadowRoot = shadowContainer.attachShadow({ mode: 'open' });
      const container = document.createElement('div');
      shadowRoot.appendChild(container);

      addTwStyles(shadowRoot)
  
      // Render the NexaiChatBubble component inside the shadow root
      const root = createRoot(container)
      root.render(<NexaiChatBubble {...props} />)
  
      // Cleanup when the component unmounts
      // return () => {
      //   root.unmount();
      // };
    }
  }, [props]);
  

  return (
    <div
      ref={shadowContainerRef}
      id="nexai-shadow"
    ></div>
  );
};
