import { formatDistanceToNow } from "date-fns"
import { type ChatThread } from "../chat-types"
import { NexaiChatMsg } from "./chat-msg"

export const NexaiChatThread = ({
  thread
}: {
  thread: ChatThread
}) => {
  return (
    <div className={`chat-thread ${thread.userUid === 'bot' ? 'bg-gradient-to-bl from-sky-100 to-white border-t-sky-300' : ' bg-white border-t-green-300'} ${thread.hide ? 'opacity-0' : ''} opacity-1 transition-opacity duration-300 pb-4 mt-4 relative font-medium subpixel-antialiased border rounded-lg rounded-bl-none shadow-lg p-1 `}
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
}