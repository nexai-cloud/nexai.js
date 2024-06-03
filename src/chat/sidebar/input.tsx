import { MicIcon, SendIcon, XCircleIcon } from "lucide-react"
import { observer } from "mobx-react-lite";
import { forwardRef, useRef, type ChangeEvent, type KeyboardEvent } from 'react';
import { hasSpeechRecognition } from "~/lib/speech/recognition";
import { cn } from "~/lib/utils";
import { SpeechRecognitionModel } from "~/models/speech-recognition";
import { NexaiWaveForm } from "~/ui/wave-form/wave-form";

type Props = {
  nexaiApiKey: string;
  inputPlaceholder?: string;
  onSpeechTranscript: (transcript: string) => void;
  onSendChatMsg: (message: string) => void;
  onChatInput: (message: string) => void;
  chatInput: string;
};

export const ChatInput = observer(forwardRef<HTMLInputElement, Props>(({
  onSpeechTranscript,
  inputPlaceholder,
  onSendChatMsg,
  onChatInput,
  chatInput,
}, chatInputRef) => {

  const speech = useRef(SpeechRecognitionModel.create()).current

  const setChatInput = (input: string) => {
    onChatInput(input)
  }

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

  return (
    <div className="focus-within:border-blue-500 flex align-middle border rounded-lg shadow-lg p-1 bg-white">
      {
        !speech.isSpeechInput ? (
          <>
            <input
              ref={chatInputRef}
              className={cn(
                "chat-input flex-grow bg-white border-0 p-3 font-medium size-12", 
                "focus:border-none focus:outline-none"
              )}
              placeholder={inputPlaceholder || 'Ask a question...'}
              onChange={onInputChange}
              onKeyDown={onInputKeyDown}
              value={chatInput}
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
}))