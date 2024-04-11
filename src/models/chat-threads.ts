import { action, observable } from 'mobx'
import { type ChatThread } from '../chat-types'

export const ChatThreads: ChatThread[] = observable([])

export const setChatThreads = action((threads: ChatThread[]) => {
  ChatThreads.splice(0, ChatThreads.length, ...threads)
})

