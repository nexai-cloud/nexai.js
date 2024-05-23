import { ChatHeader } from "./header";
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

  const users = [{
    name: 'Alien Eye',
    avatarUrl: '/avatars/alien-1-eye.png'
  },
  {
    name: 'Alien Three',
    avatarUrl: '/avatars/alien-3-eyes.png'
  },
  {
    name: 'Ninja Girl',
    avatarUrl: '/avatars/ninja-girl.png'
  }]
  
  return (
    <>
      <ChatHeader users={users} />
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