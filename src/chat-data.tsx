import { type ChatThread } from "./chat-types";
import { BotAvatar } from "./ui/chat-avatar";

export const aiUser = {
  userUid: 'bot',
  name: 'Nexai',
  avatar: <BotAvatar />,
}

export const aiThreads = [
  {
    ...aiUser,
    hide: false,
    date: new Date(),
    messages: [
      {
        message: 'Hi there. I hope you are having a great day.'
      },
      {
        message: 'How may I help you?'
      }
    ]
  } as ChatThread
]