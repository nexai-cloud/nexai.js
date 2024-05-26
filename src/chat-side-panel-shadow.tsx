"use client"

import { ChatSidePanel, type ChatSidePanelProps } from './chat-side-panel';
import { chatSidePanelStyles } from './lib/twind/chat-side-panel-styles';
import { ShadowDom } from './shadow-dom';

export const ChatSidePanelShadowDom = (props: ChatSidePanelProps) => {

  return (
    <ShadowDom
      id="nexai-shadow-chat-side-panel"
      styles={chatSidePanelStyles}
    >
      <ChatSidePanel {...props} />
    </ShadowDom>
  );
};
