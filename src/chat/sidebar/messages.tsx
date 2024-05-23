import { NexaiChatMessage } from "~/chat-types"
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area"
import { ChatMessage } from "./message"
import { cn } from "~/lib/utils"

type Props = {
  msgs: NexaiChatMessage[]
}

export const Messages = ({ msgs }: Props) => {
  return (
    <ScrollArea className={cn(
      'flex flex-col flex-1 m-2 space-y-4 items-start align-top',
      'pr-2'
    )}>
      {
        msgs.map((msg, index) => (
          <ChatMessage key={index} msg={msg} />
        ))
      }
      <ScrollBar className="bg-muted text-black rounded-full" />
    </ScrollArea>
  )
}