import { ChatAvatar } from "~/ui/chat-avatar"
import { NexaiSession } from "./chat-session"

export const getChatUser = (session: NexaiSession, nexaiAssetsUrl = '') => {
  const { name, sessionId, avatarUrl } = session
  return {
    name,
    userUid: sessionId,
    avatar: (
      <ChatAvatar
        src={`${nexaiAssetsUrl}${avatarUrl}`}
        name={name}
      />
    ),
  }
}