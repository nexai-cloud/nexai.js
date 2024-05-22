import { useEffect, useRef } from 'react'
import { getProjectSocket, getSessionSocket } from './lib/socket'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react-lite'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './components/ui/resizable'
import { getClientSession } from './lib/session/chat-session'
import logger from 'debug'
import { NexaiChatBubble } from '../chat-bubble'
import { NavItem } from './ai-search'
import { AISearchShadowDom } from './ai-search-shadow-dom'
import { mockMsgs } from './data/mock-msgs'
import { ChatDashboard } from './chat/dashboard/dashboard'
import { type NexaiChatMessage } from './chat-types'
import { ChatSidebar } from './chat/sidebar/sidebar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { ScrollArea } from './components/ui/scroll-area'

const debug = logger('nexai:app')

const msgs = observable<NexaiChatMessage>([])
const projectMsgs = observable<NexaiChatMessage>([])

const addMsg = action((msg: NexaiChatMessage) => {
  msgs.push(msg)
})

const addProjectMsg = action((msg: NexaiChatMessage) => {
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

  const onChat = (msg: NexaiChatMessage, ...args: string[]) => {
    debug('session chat msg', { msg, args })
    addMsg(msg)
  }

  const onProjectChat = (msg: NexaiChatMessage, ...args: string[]) => {
    debug('project chat msg', { msg, args })
    addProjectMsg(msg)
  } 

  useEffect(() => {
    if (loaded.current) return
    debug('loaded session...')
    sessionIo.on('chat', onChat)
    projectIo.on('chat', onProjectChat)
    // load mocks
    msgs.push(...mockMsgs as NexaiChatMessage[])
    projectMsgs.push(...mockMsgs as NexaiChatMessage[])
    msgs.push(...mockMsgs as NexaiChatMessage[])
    projectMsgs.push(...mockMsgs as NexaiChatMessage[])
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
    <div className='h-screen w-screen flex-col align-middle items-center'>
    <ResizablePanelGroup direction="horizontal" className='relative gap-1'>
      <ResizablePanel className='flex flex-col space-y-2 space-x-2'>
        <ChatSidebar
          msgs={msgs}
          onSendChatMsg={onSendSessionChatMsg}
        />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className='flex flex-col'>
        <Tabs defaultValue='screenshot' className='relative gap-1'>
          <TabsList>
            <TabsTrigger value='screenshot'>Screenshot</TabsTrigger>
            <TabsTrigger value='dashboard'>Dashboard</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard">
            <ChatDashboard
              projectMsgs={projectMsgs}
              onSendSupportChatMsg={onSendSupportChatMsg}
            />
          </TabsContent>
          <TabsContent value="screenshot">
            <ScrollArea className='h-screen'>
              <img className='h-screen' src='/screenshots/hai-semantic-chat.png' />
              <img className='h-screen' src='/screenshots/hai-sidebar.jpeg' />
              <img className='h-screen' src='/screenshots/hai-prompts.jpeg' />
              <img className='h-screen' src='/screenshots/hai-create-bot.jpeg' />
              <img className='h-screen' src='/screenshots/hai-toolkit.jpeg' />
              <img className='h-screen' src='/screenshots/hai-sidebar2.jpeg' />
            </ScrollArea>
          </TabsContent>
        </Tabs>
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
