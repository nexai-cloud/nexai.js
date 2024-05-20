import { useEffect, useRef } from 'react'
import { getProjectSocket, getSessionSocket } from './lib/socket'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react-lite'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './components/ui/resizable'
import { getClientSession } from './lib/session/chat-session'
import { ChatInput } from './ui/chat-input'
import logger from 'debug'
import { NexaiChatBubble } from '../chat-bubble'
import { NavItem } from './ai-search'
import { AISearchShadowDom } from './ai-search-shadow-dom'
import { mockMsgs } from './data/mock-msgs'
import { ScrollArea } from './components/ui/scroll-area'

const debug = logger('nexai:app')

type ChatMsg = {
  projectId: string;
  sessionKey: string;
  message: string;
  fromName: string;
  toName: string;
}
const msgs = observable<ChatMsg>([])
const projectMsgs = observable<ChatMsg>([])

const addMsg = action((msg: ChatMsg) => {
  msgs.push(msg)
})

const addProjectMsg = action((msg: ChatMsg) => {
  projectMsgs.push(msg)
})

const nexaiApiKey = 'clu8h3eg60000haaadp65lyeb' // 'clu8hm40800004vzfocfds9xa'
const nexaiAssetsUrl = 'https://nexai.site/ai/assets'

export const App = observer(() => {

  const loaded = useRef(false)
  const clientSession = getClientSession(nexaiApiKey, nexaiAssetsUrl)
  const sessionIo = getSessionSocket({
    sessionKey: clientSession.sessionId
  })
  const projectIo = getProjectSocket({
    projectId: nexaiApiKey
  })

  const sendSessionChatMsg = (message: string) => {
    const chatMsg = {
      message,
      projectId: nexaiApiKey,
      sessionKey: clientSession.sessionId,
      fromName: clientSession.name,
      toName: 'support'
    }
    sessionIo.emit('chat', chatMsg)
  }

  const sendSupportChatMsg = (message: string) => {
    const chatMsg = {
      message,
      projectId: nexaiApiKey,
      sessionKey: clientSession.sessionId,
      fromName: 'support',
      toName: clientSession.name
    }
    projectIo.emit('chat', chatMsg)
  }

  const onSendSessionChatMsg = (msg: string) => {
    sendSessionChatMsg(msg)
  }

  const onSendSupportChatMsg = (msg: string) => {
    sendSupportChatMsg(msg)
  }

  const onChat = (msg: ChatMsg, ...args: string[]) => {
    debug('session chat msg', { msg, args })
    addMsg(msg)
  }

  const onProjectChat = (msg: ChatMsg, ...args: string[]) => {
    debug('project chat msg', { msg, args })
    addProjectMsg(msg)
  } 

  useEffect(() => {
    if (loaded.current) return
    debug('loaded session...')
    sessionIo.on('chat', onChat)
    projectIo.on('chat', onProjectChat)
    // load mocks
    msgs.push(...mockMsgs as ChatMsg[])
    projectMsgs.push(...mockMsgs as ChatMsg[])
    msgs.push(...mockMsgs as ChatMsg[])
    projectMsgs.push(...mockMsgs as ChatMsg[])
    loaded.current = true
    // setTimeout(() => {
    //   sendSessionChatMsg('hello from client')
    // }, 100)
  })

  const onMenuItemReadMore = (menuItem: NavItem, group: NavItem) => {
    console.log('onMenuItemReadMore', { menuItem, group })
    if (typeof window !== 'undefined') {
      window.location.href = String(group.href)
    }
  }

  return (
    <div className='h-screen w-screen flex-col align-middle items-center bg-slate-50'>
    <ResizablePanelGroup direction="horizontal" className='relative gap-1'>
      <ResizablePanel className='flex flex-col space-y-2 space-x-2'>
        <h2 className="text-2xl font-bold border-b p-2">
          Chat
        </h2>
        <div className='flex p-1'>
          <AISearchShadowDom
            nexaiApiKey={nexaiApiKey}
            onMenuItemReadMore={onMenuItemReadMore}
            className='h-10'
            placeholder='Search Nexai documents...'
          />
        </div>
        <ScrollArea className='flex flex-col flex-1 m-2 space-y-2 items-start align-top'>
          {
            msgs.map((msg, index) => (
              <p key={index} className='flex gap-1 p-2 m-2 border rounded-xl'>
                <span className='font-bold'>{msg.fromName}</span>
                <span>{msg.message}</span>
              </p>
            ))
          }
        </ScrollArea>
        <div className='mt-auto p-2'>
          <ChatInput
            onSendChatMsg={onSendSessionChatMsg}
          />
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className='flex flex-col'>
        <h2 className="text-2xl font-bold border-b p-2">
          Dashboard
        </h2>
        <div className='flex flex-col flex-1 p-2 space-y-2 my-2 items-start align-top overflow-y-auto'>
          {
            projectMsgs.map((msg, index) => (
              <p key={index} className='flex gap-1 p-2 border rounded-xl'>
                <span className='font-bold'>{msg.fromName}</span>
                <span>{msg.message}</span>
              </p>
            ))
          }
        </div>
        <div className='p-2 mt-auto'>
          <ChatInput
            onSendChatMsg={onSendSupportChatMsg}
          />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>

      <div className="fixed bottom-0 right-0 sm:right-10 sm:bottom-10 z-50">
        <NexaiChatBubble
          width={400}
          nexaiApiKey={nexaiApiKey}
          aiName='AI'
          aiAvatarUrl='https://nexai.site/ai/assets/avatars/alien-3-eyes.png'
          projectName='Nexai'
          chatSuggests={[
            'Hi! I\'m fine.|What is this?',
            'Cool!|How do I use it?',
            'API?|Apps?',
            'NodeJS|React|Typescript|JS',
            'Pricing?|Free option?',
            'I am satisfied.|I am not happy.',
            'Thanks, bye.'
          ]}
        />
      </div>
    </div>
  )
})
