import { ChatInput } from "./input";
import { Messages } from "./messages"
import { NexaiChatMessage } from "~/chat-types";

type Props = {
  msgs: NexaiChatMessage[];
  onSendChatMsg: (msg: string) => void;
}

export const ChatSidebar = ({ msgs, onSendChatMsg }: Props) => {
  
  
  return (
    <>
      <Messages msgs={msgs} />
      <div className='mt-auto p-2'>
        <ChatInput
            
        />
      </div>
    </>
  )
}