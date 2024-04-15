import { sendAiChat } from "~/server/query"
import { type NexaiSession, getClientSession } from "./session/chat-session"
import { getProjectSocket, getSessionSocket } from "./socket"
import { Socket } from "socket.io-client"

export class Nexai {

  nexaiApiKey: string
  session: NexaiSession
  nexaiApiUrl = 'https://nexai.site/api'

  constructor({
    nexaiApiKey,
    session
  }: {
    nexaiApiKey: string
    session?: NexaiSession
  }) {
    this.nexaiApiKey = nexaiApiKey
    if (!session) {
      session = getClientSession(nexaiApiKey, "")
    }
    this.session = session
  }

  async chat(message: string) {
    return await sendAiChat({
      ...this.session,
      nexaiApiUrl: this.nexaiApiUrl,
      projectId: this.nexaiApiKey,
      message
    })
  }

  getProjectSocket(): Socket {
    return getProjectSocket({
      projectId: this.nexaiApiKey
    })
  }

  getSessionSocket(): Socket {
    return getSessionSocket({
      sessionKey: this.session.sessionId
    })
  }

}