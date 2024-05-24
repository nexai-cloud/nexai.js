import { observable } from 'mobx'
import { type NexaiChatMessage } from '../chat-types'
import { ListModel } from './list'
import { ChatMessageModel } from './chat-message'

const chatMessages: NexaiChatMessage[] = observable([])

export class ChatMessagesModel extends ListModel {

  getModelType(): typeof ChatMessageModel {
      return ChatMessageModel
  }

}

export const useChatMessages = () => chatMessages