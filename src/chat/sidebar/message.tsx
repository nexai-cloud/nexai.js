import { NexaiChatMessage } from "~/chat-types"
import { Avatar, AvatarFallback } from "~/components/ui/avatar"
import { cn } from "~/lib/utils"

type Props = {
  msg: NexaiChatMessage
}

export const ChatMessage = ({ msg }: Props) => {
  const isAi = msg.fromName === 'Nexai'
  return (
    <div className="flex gap-1 m-2">
      {
        isAi ? (
          <Avatar className="mt-auto">
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        ) : null
      }
      <div className={cn(
        "p-2 border border-slate-300 text-slate-900 bg-slate-100 rounded-lg",
        !isAi && "ml-auto bg-slate-900 text-slate-300"
      )}>
        {msg.message}
      </div>
    </div>
  )
}