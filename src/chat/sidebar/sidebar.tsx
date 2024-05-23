import { ChatHeader } from "./header";
import { ChatInput } from "./input";
import { Messages } from "./messages"
import { NexaiChatMessage } from "~/chat-types";
import { SearchSuggest } from "./suggest";
import { cn } from "~/lib/utils";
import { useState } from "react";

type Props = {
  nexaiApiKey: string;
  msgs: NexaiChatMessage[];
}

export const ChatSidebar = ({
  nexaiApiKey,
  msgs
}: Props) => {

  const [chatInput, setChatInput] = useState('')

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

  const onClickBack = () => {}
  
  const onChatInput = (input: string) => setChatInput(input)
  
  return (
    <>
      <ChatHeader users={users} onClickBack={onClickBack} />
      <Messages msgs={msgs} />
      <div className="relative w-full">
        {
          chatInput && (
            <div className={cn(
              "absolute bottom-0 left-0 z-100",
              "border rounded-lg shadow-lg mx-2 mb-0"
            )}>
              <SearchSuggest
                open={true}
                input={chatInput}
                setOpen={() => {}}
                nexaiApiKey={nexaiApiKey}
                onMenuItemReadMore={() => {}}
              />
            </div>
          )
        }
      </div>
      <div className='relative mt-auto p-2'>
        <ChatInput
          chatInput={chatInput}
          nexaiApiKey={nexaiApiKey}
          onChatInput={onChatInput}
          onSendChatMsg={onSendChatMsg}
          onSpeechTranscript={onSpeechTranscript}
        />
      </div>
    </>
  )
}