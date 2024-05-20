import { NexaiChatMessage } from "~/chat-types"
import { ScrollArea } from "~/components/ui/scroll-area"
import { ChatMessage } from "./message"

type Props = {
  msgs: NexaiChatMessage[]
}

export const Messages = ({ msgs }: Props) => {
  return (
    <ScrollArea className='flex flex-col flex-1 m-2 space-y-4 items-start align-top'>
      {
        msgs.map((msg, index) => (
          <ChatMessage key={index} msg={msg} />
        ))
      }
    </ScrollArea>
  )
}