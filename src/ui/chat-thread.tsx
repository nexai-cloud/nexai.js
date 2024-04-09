import { formatDistanceToNow } from "date-fns"
import { type ChatThread } from "../chat-types"
import { NexaiChatMsg } from "./chat-msg"
import { observer } from "mobx-react-lite"
import { cn } from "~/lib/utils"

export const NexaiChatThread = observer(({
  thread
}: {
  thread: ChatThread
}) => {
  return (
    <div className={cn(
      `chat-thread text-left opacity-1 transition-opacity duration-300 p-1 pb-4 mt-4 relative font-medium subpixel-antialiased border rounded-lg rounded-bl-none shadow-lg`,
      thread.userUid === 'nexai' ? 'bg-gradient-to-bl from-sky-100 to-white border-t-sky-300' : ' bg-white border-t-green-300',
      thread.hide ? 'opacity-0' : '',
    )}
      style={{
        fontSize: 14
      }}
    >
      <p className="p-3 text-slate-400">
        {thread.name} {formatDistanceToNow(thread.date)}
      </p>
      {
        thread.messages.map((message, i) => (
          <NexaiChatMsg
            key={i}
            thread={thread}
            chatMessage={message}
          />
        ))
      }
      <div className="bottom-1 absolute"
        style={{ left: -80 }}
      >
        {thread.avatar}
      </div>
      <div className="tri-left border left-bottom"></div>
    </div>
  )
})