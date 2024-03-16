import { useEffect, useRef, useState } from 'react'
import './App.css'
import { getSocket } from './lib/socket'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react-lite'

const msgs = observable<string>([])

const addMsg = action((msg: string) => {
  msgs.push(msg)
})

export const App = observer(() => {
  const [input, setInput] = useState('')

  const loaded = useRef(false)
  const socket = getSocket()

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
    <>
      <h1>Chat</h1>
      <div className="card">
        <input
          value={input}
          onChange={onInputChange}
          onKeyDown={onInputKey}
        />
        <button onClick={onClick}>
          Send
        </button>
        {
          msgs.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))
        }
      </div>
    </>
  )
})
