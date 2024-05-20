import { NexaiChatMessage } from "~/chat-types"
import { ScrollArea } from "~/components/ui/scroll-area"

type Props = {
  msgs: NexaiChatMessage[]
}

export const Messages = ({ msgs }: Props) => {
  return (
    <ScrollArea className='flex flex-col flex-1 m-2 space-y-2 items-start align-top'>
      {
        msgs.map((msg, index) => (
          <p key={index} className='flex gap-1 p-2 m-2 border rounded-xl'>
            <span className='font-bold'>{msg.fromName}</span>
            <span>{msg.message}</span>
          </p>
        ))
      }
    </ScrollArea>
  )
}