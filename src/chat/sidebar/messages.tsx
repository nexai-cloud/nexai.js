import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area"
import { ChatMessage } from "./message"
import { cn } from "~/lib/utils"
import { observer } from "mobx-react-lite"
import { ChatMessageModel } from "~/models/chat-message"
import { forwardRef } from "react"

type Props = {
  msgs: ChatMessageModel[]
}

export const Messages = observer(forwardRef(({ msgs }: Props) => {
  return (
    <ScrollArea
      className={cn(
        'flex flex-col flex-1 m-2 space-y-4 items-start align-top',
        'pr-2'
      )}
    >
      {
        msgs.map((msg, index) => (
          <ChatMessage key={index} msg={msg} />
        ))
      }
      <ScrollBar className="bg-muted text-black rounded-full" />
    </ScrollArea>
  )
}))