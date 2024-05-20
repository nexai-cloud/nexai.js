import { NexaiChatMessage } from "~/chat-types"
import { ChatInput } from "~/ui/chat-input"

type Props = {
  projectMsgs: NexaiChatMessage[];
  onSendSupportChatMsg: (msg: string) => void;
}

export const ChatDashboard = ({ projectMsgs, onSendSupportChatMsg }: Props) => {
  return (
    <div>
      <h2 className="text-2xl font-bold border-b p-2">
          Dashboard
        </h2>
        <div className='flex flex-col flex-1 p-2 space-y-2 my-2 items-start align-top overflow-y-auto'>
          {
            projectMsgs.map((msg, index) => (
              <p key={index} className='flex gap-1 p-2 border rounded-xl'>
                <span className='font-bold'>{msg.fromName}</span>
                <span>{msg.message}</span>
              </p>
            ))
          }
        </div>
        <div className='p-2 mt-auto'>
          <ChatInput
            onSendChatMsg={onSendSupportChatMsg}
          />
        </div>
    </div>
  )
}