import { type ChatThread } from "../chat-types";
import { BotAvatar } from "../ui/chat-avatar";
import { ChooseAvatar } from "./choose-avatar";
import { type ChatSessionModel } from "~/models/chat-session";

export const aiUser = {
  userUid: 'nexai',
  name: 'Nexai',
  avatar: <BotAvatar />,
}

export const getAiThreads = (chatSession: ChatSessionModel) => [
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
      },
      {
        message: <ChooseAvatar chatSession={chatSession} />
      }
    ]
  } as ChatThread
]