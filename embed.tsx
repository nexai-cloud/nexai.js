import React from 'react';
import { type NexaiChatBubbleProps } from './src/chat-bubble';
import { NexaiChatBubbleShadowDom as NexaiChatBubble } from './src/chat-bubble-shadow-dom'
import { createRoot } from 'react-dom/client';
import './src/index.css'
import './src/chat-bubble.css'

export type ChatRenderProps = NexaiChatBubbleProps & {
  bottom?: number;
  right?: number;
}

// @ts-expect-error no render prop
NexaiChatBubble.render = async (props: ChatRenderProps) => {
  const el = document.createElement('div')
  el.setAttribute('id', '#nexai-chat-bubble')
  el.style.position = 'absolute'
  el.style.bottom = (props.bottom || 30) + 'px'
  el.style.right = (props.right || 30) + 'px'
  document.body.appendChild(el)
  document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot(el)
    const component = React.createElement(NexaiChatBubble, props)
    root.render(component)
  })
}

// @ts-expect-error global
window.NexaiChatBubble = NexaiChatBubble