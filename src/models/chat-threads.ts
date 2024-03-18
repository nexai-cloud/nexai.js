import { observable } from 'mobx'
import { type ChatThread } from '../chat-types'

export const ChatThreads: ChatThread[] = observable([])