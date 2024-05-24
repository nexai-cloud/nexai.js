import { NexaiChatMessage } from "~/chat-types"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { cn } from "~/lib/utils"

type Props = {
  msg: NexaiChatMessage
}

export const ChatMessage = ({ msg }: Props) => {
  const isAi = msg.fromName === 'nexai'
  return (
    <div className="chat-message flex gap-2 m-2">
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
        {msg.message}
      </span>
    </div>
  )
}