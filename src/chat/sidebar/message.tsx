import { NexaiChatMessage } from "~/chat-types"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { cn } from "~/lib/utils"
import { MessageMarkdown } from "./markdown"
import { observer } from "mobx-react-lite"
import { MessageLike } from "./message-like"
import { MessageCopy } from "./message-copy"

type Props = {
  msg: NexaiChatMessage;
  isLatest: boolean;
}

export const ChatMessage = observer(({ msg, isLatest }: Props) => {
  const isAi = msg.fromName?.toLowerCase() === 'nexai' 
    || msg.fromType === 'ai'
    || msg.userUid === 'nexai'
  return (
    <div className="chat-message group relative flex gap-2 m-2">
      {
        isAi ? (
          <Avatar className="mt-auto">
            <AvatarImage src="/nexai-logo/nexai-logo-circle-dark.svg" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        ) : null
      }
      <span className={cn(
        "p-2 border border-slate-300 text-slate-900 bg-slate-100 rounded-lg",
        !isAi && "ml-auto bg-slate-900 text-slate-300 text-right max-w-[95%]"
      )}>
        <MessageMarkdown chatMessage={msg} />
        {
          isAi && (
            <div className={cn(
              "flex w-full",
            )}>
              <div className={cn(
                "flex",
                !isLatest && 'border shadow bg-slate-100 rounded-lg -mb-8 mr-2 z-20',
                !isLatest && 'absolute bottom-0 right-0 opacity-0 group-hover:opacity-100'
              )}>
                <MessageLike
                  chatMessage={msg}
                />
                <MessageCopy
                  chatMessage={msg}
                />
              </div>
            </div>
          )
        }
      </span>
    </div>
  )
})