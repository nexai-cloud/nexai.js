import { type ChatThread } from "../chat-types";
import { BotAvatar, ChatAvatar } from "../ui/chat-avatar";
import { ChooseAvatar } from "./choose-avatar";
import { type ChatSessionModel } from "~/models/chat-session";

export const getAiUser = ({ aiName, aiAvatarUrl }: { aiName: string, aiAvatarUrl: string }) => {
  console.log('aiAvatarUrl', aiAvatarUrl)
  return {
    userUid: 'nexai',
    name: aiName,
    avatar: aiAvatarUrl ? <ChatAvatar src={aiAvatarUrl} name={aiName} /> : <BotAvatar />,
  }
}

export const getAiThreads = (chatSession: ChatSessionModel, { aiName, aiAvatarUrl, nexaiAssetsUrl }: { aiName: string, aiAvatarUrl: string, nexaiAssetsUrl: string }) => [
  {
    ...getAiUser({ aiName, aiAvatarUrl }),
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
        message: (
          <ChooseAvatar
            nexaiAssetsUrl={nexaiAssetsUrl}
            chatSession={chatSession}
          />
        )
      }
    ]
  } as ChatThread
]