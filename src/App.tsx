import { useEffect, useRef } from 'react'
import { getProjectSocket, getSessionSocket } from './lib/socket'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react-lite'
import { getClientSession } from './lib/session/chat-session'
import logger from 'debug'
import { mockMsgs } from './data/mock-msgs'
import { ChatDashboard } from './chat/dashboard/dashboard'
import { type NexaiChatMessage } from './chat-types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { ScrollArea } from './components/ui/scroll-area'
import { ChatSidePanel } from './chat-side-panel'


const debug = logger('nexai:app')

const msgs = observable<NexaiChatMessage>([])
const projectMsgs = observable<NexaiChatMessage>([])

const addMsg = action((msg: NexaiChatMessage) => {
  msgs.push(msg)
})

const addProjectMsg = action((msg: NexaiChatMessage) => {
  projectMsgs.push(msg)
})

const nexaiApiKey = 'clu8hm40800004vzfocfds9xa'

// 'clttxpx0w000whlerwrt9toge' // Local - Nexai Development
// 'clu8h3eg60000haaadp65lyeb' // Nexai Team
// 'clu8hm40800004vzfocfds9xa' // Nexai Dev
const nexaiAssetsUrl = 'https://nexai.site/ai/assets'
const nexaiApiUrl = 'https://nexai.site/api'
//'https://nexai.site/api' // 'http://localhost:3001/api'

export const App = observer(() => {

  const loaded = useRef(false)
  const clientSession = getClientSession(nexaiApiKey, nexaiAssetsUrl)
  const sessionIo = getSessionSocket({
    sessionKey: clientSession.sessionId
  })
  const projectIo = getProjectSocket({
    projectId: nexaiApiKey
  })

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

  return (
    <div className='flex-col align-middle items-center'>
    
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
              <img className='h-[90vh]' src='/screenshots/hai-semantic-chat.png' />
              <img className='h-screen' src='/screenshots/hai-sidebar.jpeg' />
              <img className='h-screen' src='/screenshots/hai-prompts.jpeg' />
              <img className='h-screen' src='/screenshots/hai-create-bot.jpeg' />
              <img className='h-screen' src='/screenshots/hai-toolkit.jpeg' />
              <img className='h-screen' src='/screenshots/hai-sidebar2.jpeg' />
            </ScrollArea>
          </TabsContent>
        </Tabs>
    
      <ChatSidePanel
        nexaiApiKey={nexaiApiKey}
        nexaiApiUrl={nexaiApiUrl}
      />
    
    </div>
  )
})
