import { action, observable } from "mobx";
import { FetchModel } from "~/models/fetch-model";
import { Model, type ModelProps } from "~/models/model";
import { NexaiSession, getClientSession, saveClientSession } from "../lib/session/chat-session";

// @todo use
export class ChatSessionModel 
extends Model 
implements NexaiSession {

  @observable nexaiApiKey = ''

  @observable sessionId = ''

  @observable name = ''

  @observable isShowChat = false

  @observable avatarUrl = ''

  @observable email = ''

  @observable fetchState = FetchModel.create()

  @action async fetch() {
    this.fetchState.fetch(async () => {
      const session = getClientSession(this.nexaiApiKey)
      this.setProps(session as ModelProps<this>)
    })
  }

  @observable saveState = FetchModel.create()

  @action async save() {
    this.saveState.fetch(async () => {
      saveClientSession(this.nexaiApiKey, {
        sessionId: this.sessionId,
        name: this.name,
        isShowChat: this.isShowChat,
        avatarUrl: this.avatarUrl,
        email: this.email
      })
    })
  }

}

const map = new Map<string, ChatSessionModel>()
export const useChatSessionModel = ({ nexaiApiKey }: {
  nexaiApiKey: string;
}): ChatSessionModel => {
  if (!map.has(nexaiApiKey)) {
    console.log('create new session', nexaiApiKey)
    const chatSession = ChatSessionModel.create({ nexaiApiKey })
    const props = getClientSession(nexaiApiKey)
    chatSession.setProps(props)
    map.set(nexaiApiKey, chatSession)
  }
  return map.get(nexaiApiKey) as ChatSessionModel
}

