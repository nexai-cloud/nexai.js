"use client"

import { NexaiChatBubble, type NexaiChatBubbleProps } from './chat-bubble';
import { styles } from './lib/twind/styles';
import { ShadowDom } from './shadow-dom';

export const NexaiChatBubbleShadowDom = (props: NexaiChatBubbleProps) => {

  return (
    <ShadowDom
      id="nexai-shadow"
      styles={styles}
    >
      <NexaiChatBubble {...props} />
    </ShadowDom>
  );
};
