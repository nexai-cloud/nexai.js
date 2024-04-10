import { NexaiSession } from "./chat-session"

export const getChatUser = (session: NexaiSession) => {
  const { name, sessionId, avatarUrl } = session
  return {
    name,
    userUid: sessionId,
    avatarUrl
  }
}