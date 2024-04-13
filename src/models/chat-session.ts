import { action, makeObservable, observable } from "mobx";
import { FetchModel } from "~/models/fetch-model";
import { Model, type ModelProps } from "~/models/model";
import { NexaiSession, getClientSession, saveClientSession } from "../lib/session/chat-session";

// @todo use
export class ChatSessionModel 
extends Model 
implements NexaiSession {

  constructor() {
    super()
    makeObservable(this, {
      nexaiApiKey: observable,
      nexaiAssetsUrl: observable,
      sessionId: observable,
      name: observable,
      isShowChat: observable,
      avatarUrl: observable,
      email: observable,
      fetchState: observable,
      saveState: observable,
      save: action
    })
  }

  nexaiApiKey = ''

  nexaiAssetsUrl = ''

  sessionId = ''

  name = ''

  isShowChat = false

  avatarUrl = ''

  email = ''

  fetchState = FetchModel.create()

  async fetch() {
    this.fetchState.fetch(async () => {
      const session = getClientSession(this.nexaiApiKey, this.nexaiAssetsUrl)
      this.setProps(session as ModelProps<this>)
    })
  }

  saveState = FetchModel.create()

  async save() {
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
export const useChatSessionModel = ({ nexaiApiKey, nexaiAssetsUrl }: {
  nexaiApiKey: string;
  nexaiAssetsUrl: string;
}): ChatSessionModel => {
  if (!map.has(nexaiApiKey)) {
    console.log('create new session', nexaiApiKey)
    const chatSession = ChatSessionModel.create({ nexaiApiKey })
    const props = getClientSession(nexaiApiKey, nexaiAssetsUrl)
    chatSession.setProps(props)
    map.set(nexaiApiKey, chatSession)
  }
  return map.get(nexaiApiKey) as ChatSessionModel
}

