import { useEffect, useRef } from 'react'
import './App.css'
import { getProjectSocket, getSessionSocket } from './lib/socket'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react-lite'
import { NexaiChatBubble } from './chat-bubble'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './components/ui/resizable'
import { getClientSession } from './lib/session/chat-session'
import { ChatInput } from './app/chat-input'
import { config } from './lib/config'

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

const nexaiApiUrl = config.nexaiLocalApiUrl
const nexaiApiKey = 'clu8hm40800004vzfocfds9xa'

export const App = observer(() => {

  const loaded = useRef(false)
  const clientSession = getClientSession(nexaiApiKey)
  const session = getSessionSocket(clientSession.sessionId)
  const project = getProjectSocket(nexaiApiKey)

  const sendSessionChatMsg = (message: string) => {
    const chatMsg = {
      message,
      projectId: nexaiApiKey,
      sessionKey: clientSession.sessionId,
      fromName: clientSession.name,
      toName: 'support'
    }
    session.emit('chat', chatMsg)
  }

  const sendSupportChatMsg = (message: string) => {
    const chatMsg = {
      message,
      projectId: nexaiApiKey,
      sessionKey: clientSession.sessionId,
      fromName: 'support',
      toName: clientSession.name
    }
    project.emit('chat', chatMsg)
  }

  const onSendSessionChatMsg = (msg: string) => {
    sendSessionChatMsg(msg)
  }

  const onSendSupportChatMsg = (msg: string) => {
    sendSupportChatMsg(msg)
  }

  const onChat = (msg: ChatMsg, ...args: string[]) => {
    console.log('session chat msg', { msg, args })
    addMsg(msg)
  }

  const onProjectChat = (msg: ChatMsg, ...args: string[]) => {
    console.log('project chat msg', { msg, args })
    addProjectMsg(msg)
  } 

  useEffect(() => {
    if (loaded.current) return
    console.log('loaded session...')
    session.on('chat', onChat)
    project.on('chat', onProjectChat)
    loaded.current = true
    setTimeout(() => {
      sendSessionChatMsg('hello from client')
    }, 100)
  })

  return (
    <div className='flex-col align-middle items-center'>
    <ResizablePanelGroup direction="horizontal" className='gap-1'>
      <ResizablePanel>
        <h2 className="text-2xl font-bold">
          Chat
        </h2>
        <div className='flex-col space-y-2 my-2 items-start align-top h-[80vh] overflow-y-auto'>
          {
            msgs.map((msg, index) => (
              <p key={index} className='flex gap-1 p-2 border rounded-xl'>
                <span className='font-bold'>{msg.fromName}</span>
                <span>{msg.message}</span>
              </p>
            ))
          }
        </div>
        <ChatInput
          onSendChatMsg={onSendSessionChatMsg}
        />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>
        <h2 className="text-2xl font-bold">
          Dashboard
        </h2>
        <div className='flex-col space-y-2 my-2 items-start align-top h-[80vh] overflow-y-auto'>
          {
            projectMsgs.map((msg, index) => (
              <p key={index} className='flex gap-1 p-2 border rounded-xl'>
                <span className='font-bold'>{msg.fromName}</span>
                <span>{msg.message}</span>
              </p>
            ))
          }
        </div>
        <ChatInput
          onSendChatMsg={onSendSupportChatMsg}
        />
      </ResizablePanel>
    </ResizablePanelGroup>

      
      

      <div className="fixed bottom-50 right-10 z-50"
        style={{
          bottom: 140
        }}
      >
        <NexaiChatBubble
          width={400}
          nexaiApiKey={nexaiApiKey}
          nexaiApiUrl={nexaiApiUrl}
        />
      </div>
    </div>
  )
})
