import { ChatInput } from "./input";
import { Messages } from "./messages"
import { NexaiChatMessage } from "~/chat-types";

type Props = {
  msgs: NexaiChatMessage[];
}

export const ChatSidebar = ({ msgs }: Props) => {

  const onSpeechTranscript = (transcript: string) => {
    console.log('onSpeech', transcript)
  }

  const onSendChatMsg = (msg: string) => {
    console.log('onSend', msg)
  }
  
  
  return (
    <>
      <Messages msgs={msgs} />
      <div className='mt-auto p-2'>
        <ChatInput
            onSendChatMsg={onSendChatMsg}
            onSpeechTranscript={onSpeechTranscript}
        />
      </div>
    </>
  )
}