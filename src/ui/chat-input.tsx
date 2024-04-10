import { useEffect, useRef, useState } from "react"

export const ChatInput = ({
  onSendChatMsg,
  focusOnInput = false
}: {
  onSendChatMsg: (msg: string) => void;
  focusOnInput?: boolean
}) => {


  const inputRef = useRef<HTMLInputElement>(null)
  const [input, setInput] = useState('')

  useEffect(() => {
    if (focusOnInput) {
      inputRef.current?.focus()
    }
  })

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const onClick = () => {
    onSendChatMsg(input)
    setInput('')
  }

  const onInputKey = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onClick()
    }
  }

  return (
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
  )
}