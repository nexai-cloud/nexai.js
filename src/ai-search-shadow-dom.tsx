"use client"

import { AISearch, type AISearchProps } from './ai-search';
import { ShadowDom } from './shadow-dom';

export const AISearchShadowDom = (props: AISearchProps) => {

  return (
    <ShadowDom
      id="nexai-shadow-ai-search"
      style={{ width: '100%' }}
    >
      <AISearch {...props} />
    </ShadowDom>
  );
};
