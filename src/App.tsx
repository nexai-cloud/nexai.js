import { useEffect, useRef, useState } from 'react'
import './App.css'
import { getSocket } from './lib/socket'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react-lite'
import { NexaiChatBubble } from './chat-bubble'

const msgs = observable<string>([])

const addMsg = action((msg: string) => {
  msgs.push(msg)
})

const nexaiApiUrl = 'http://localhost:3000/api/nexai'
const nexaiApiKey = 'clu8hm40800004vzfocfds9xa'

export const App = observer(() => {
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const loaded = useRef(false)
  const socket = getSocket()

  useEffect(() => inputRef.current?.focus())

  const onChat = (msg: string) => {
    console.log('msg', msg, msgs)
    addMsg(msg)
  }

  useEffect(() => {
    if (loaded.current) return
    console.log('loaded socket...')
    socket.on('chat', onChat)
    loaded.current = true
  })

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const onClick = () => {
    socket.emit('chat', input)
    setInput('')
  }

  const onInputKey = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onClick()
    }
  }

  return (
    <div className='flex-col align-middle items-center'>
      <h1 className="text-3xl font-bold">
        Chat
      </h1>
      <div className='flex-col space-y-2 my-2 items-start align-top h-[80vh] overflow-y-auto'>
          {
            msgs.map((msg, index) => (
              <p key={index} className='p-2 border rounded-xl'>{msg}</p>
            ))
          }
        </div>
      <div className="flex space-x-2 w-full">
        <input
          ref={inputRef}
          value={input}
          onChange={onInputChange}
          onKeyDown={onInputKey}
          className='border p-2 rounded-lg flex-1'
        />
        <button
          className='px-4 py-2 border shadow rounded-lg'
          onClick={onClick}
        >
          Send
        </button>
      </div>

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
