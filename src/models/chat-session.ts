import { action, observable } from "mobx";
import { FetchModel } from "~/models/fetch-model";
import { Model, type ModelProps } from "~/models/model";
import { getClientSession, setClientSession } from "../lib/session/chat-session";

// @todo use
export class ChatSessionModel extends Model {

  @observable nexaiApiKey = ''

  @observable sessionId = ''

  @observable name = ''

  @observable isShowChat = false

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
      setClientSession(this.nexaiApiKey, {
        sessionId: this.sessionId,
        name: this.name,
        isShowChat:this.isShowChat
      })
    })
  }

}

const chatSessionModel = ChatSessionModel.create()
export const useChatSessionModel = () => {
  return chatSessionModel
}