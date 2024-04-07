import { observable } from 'mobx'
import { type NexaiChatMessage } from '../chat-types'

const chatMessages: NexaiChatMessage[] = observable([])

export const useChatMessages = () => chatMessages