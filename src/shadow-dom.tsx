"use client"

import { CSSProperties, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { addTwStyles } from './lib/twind/twind';

export type ShadowDomProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  styles?: string;
}

export const ShadowDom = ({
  id,
  children,
  className = '',
  style = {},
  styles = ''
}: ShadowDomProps) => {
  const shadowContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shadowContainer = shadowContainerRef.current;
  
    if (shadowContainer && !shadowContainer.shadowRoot) {
      const shadowRoot = shadowContainer.attachShadow({ mode: 'open' });
      const container = document.createElement('div');
      shadowRoot.appendChild(container);

      addTwStyles(shadowRoot, styles)
  
      // Render the AISearch component inside the shadow root
      const root = createRoot(container)
      root.render(children)
  
      // Cleanup when the component unmounts
      // return () => {
      //   root.unmount();
      // };
    }
  });
  

  return (
    <div
      ref={shadowContainerRef}
      id={id}
      className={className}
      style={style}
    ></div>
  );
};
