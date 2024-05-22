import { EyeClosedIcon } from "@radix-ui/react-icons";
import { MicIcon, PanelRightCloseIcon, SendIcon, ShieldCloseIcon, SidebarCloseIcon, XCircleIcon } from "lucide-react"
import { observer } from "mobx-react-lite";
import { useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { hasSpeechRecognition } from "~/lib/speech/recognition";
import { cn } from "~/lib/utils";
import { SpeechRecognitionModel } from "~/models/speech-recognition";
import { NexaiWaveForm } from "~/ui/wave-form/wave-form";

type Props = {
  inputPlaceholder?: string;
  onSpeechTranscript: (transcript: string) => void;
  onSendChatMsg: (message: string) => void;
};

export const ChatInput = observer(({
  onSpeechTranscript,
  inputPlaceholder,
  onSendChatMsg,
}: Props) => {

  const speech = useRef(SpeechRecognitionModel.create()).current
  const [chatInput, setChatInput] = useState('')
  const chatInputRef = useRef<HTMLInputElement>(null)

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChatInput(event.target.value)
  }
  const onInputKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && chatInput) {
      setChatInput('')
      onSendChatMsg(chatInput)
    }
  }

  const startSpeechRecognition = () => {
    speech.startSpeechRecognition(onSpeechTranscript)
  }

  const handleSendClick = (msg: string) => {
    setChatInput('')
    onSendChatMsg(msg)
  }

  const stopSpeech = () => {
    speech.stopSpeechRecognition()
  }

  console.log('render', { speech, chatInput })

  return (
    <div className="focus-within:border-blue-500 flex align-middle border rounded-lg shadow-lg p-1 bg-white">
      {
        !speech.isSpeechInput ? (
          <>
            <input
              className={cn(
                "flex-grow bg-white border-0 p-3 font-medium size-12", 
                "focus:border-none focus:outline-none"
              )}
              placeholder={inputPlaceholder || 'Ask a question...'}
              onChange={onInputChange}
              onKeyDown={onInputKeyDown}
              value={chatInput}
              ref={chatInputRef}
            />
            <div className="flex">
              {
                hasSpeechRecognition() && (
                  <button
                    className="flex hover:animate-pulse text-slate-300 my-auto p-2"
                    onClick={startSpeechRecognition}
                  >
                    <MicIcon />
                  </button>
                )
              }
              {
                chatInput ? (
                  <button
                    className="flex text-slate-300 my-auto p-2"
                    onClick={() => handleSendClick(chatInput)}  
                  >
                    <SendIcon />
                  </button>
                ) : null
              }
            </div>
          </>
        ) : (
          <div className="flex relative w-full align-middle items-center size-12">
            {
              speech.talking ? (
                <NexaiWaveForm active={true} className="h-16 mx-auto" />
              ) : (
                <div className='animate-pulse mx-auto font-semibold text-blue-500'>
                  {`I'm listening`}
                </div>
              )
            }
            <button onClick={stopSpeech} className="absolute right-2">
              <XCircleIcon className="text-muted-foreground" />
            </button>
          </div>
        )
      }
      
    </div>
  )
})