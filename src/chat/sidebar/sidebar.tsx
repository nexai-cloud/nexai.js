import { ChatHeader } from "./header";
import { ChatInput } from "./input";
import { Messages } from "./messages"
import { NexaiChatMessage } from "~/chat-types";
import { SearchSuggest } from "./suggest";
import { cn } from "~/lib/utils";
import { useState } from "react";
import { Command } from "~/components/ui/command";

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
      <div className="mt-auto p-2">
        <Command className={cn("h-full w-full overflow-visible")}>
          <div className="relative">
            {
              chatInput && (
                <div className={cn(
                  "absolute bottom-3 left-0 z-100",
                  "border rounded-lg shadow-lg mx-2 mb-0 shadow-slate-400 bg-slate-100"
                )}>
                  <SearchSuggest
                    className="bg-slate-100"
                    input={chatInput}
                    nexaiApiKey={nexaiApiKey}
                    onMenuItemReadMore={() => {}}
                  />
                </div>
              )
            }
          </div>
          <ChatInput
            chatInput={chatInput}
            nexaiApiKey={nexaiApiKey}
            onChatInput={onChatInput}
            onSendChatMsg={onSendChatMsg}
            onSpeechTranscript={onSpeechTranscript}
          />
        </Command>
      </div>
    </>
  )
}