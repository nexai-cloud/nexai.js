import { observable } from 'mobx'
import { type NexaiChatMessage } from '../chat-types'
import { ListModel } from './list'
import { ChatMessageModel } from './chat-message'

export class ChatMessagesModel extends ListModel {

  getModelType(): typeof ChatMessageModel {
      return ChatMessageModel
  }

}

const model = ChatMessagesModel.create()
export const useChatMessagesModel = () => model

// @deprecated
const chatMessages: NexaiChatMessage[] = observable([])

export const useChatMessages = () => chatMessages