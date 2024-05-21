import { MicIcon, SendIcon } from "lucide-react"
import { useRef, type ChangeEvent, type KeyboardEvent, type RefObject } from 'react';
import { hasSpeechRecognition } from "~/lib/speech/recognition";
import { randomUUID } from "~/lib/utils";
import { SpeechRecognitionModel } from "~/models/speech-recognition";
import { NexaiWaveForm } from "~/ui/wave-form/wave-form";

type Props = {
  isSpeechInput: boolean;
  inputPlaceholder?: string;
  projectName?: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onInputKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  chatInput: string;
  chatInputRef: RefObject<HTMLInputElement>;
  handleSpeechRecognition: (transcript: string) => void;
  sendUserChat: (message: { uid: string; message: string }) => void;
  talking: boolean;
};

export const ChatInput = ({
  handleSpeechRecognition,
  inputPlaceholder,
  onInputChange,
  onInputKeyDown,
  chatInput,
  chatInputRef,
  sendUserChat,
  talking
}: Props) => {

  const speech = useRef(SpeechRecognitionModel.create()).current

  const startSpeechRecognition = () => {
    speech.startSpeechRecognition(handleSpeechRecognition)
  }

  return (
    <div className="flex align-middle border rounded-lg shadow-lg p-1 bg-white">
      {
        !speech.isSpeechInput ? (
          <>
            <input
              className="w-full bg-white border-0 p-3 font-medium size-12"
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
              <button
                className="flex text-slate-300 my-auto p-2"
                onClick={() => sendUserChat({ uid: randomUUID(), message: chatInput })}  
              >
              <SendIcon />
              </button>
            </div>
          </>
        ) : (
          <div className="flex w-full align-middle items-center size-12">
            <div className='mx-auto flex align-middle items-center gap-1'>
              <div className='mr-auto flex text-blue-500'>
                {
                  talking ? (
                    <NexaiWaveForm active={true} />
                  ) : (
                    <div className='animate-pulse'>
                      {`I'm listening`}
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        )
      }
      
    </div>
  )
}