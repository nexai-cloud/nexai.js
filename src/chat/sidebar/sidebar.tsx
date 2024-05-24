import { ChatHeader } from "./header";
import { ChatInput } from "./input";
import { Messages } from "./messages"
import { NexaiChatMessage } from "~/chat-types";
import { SearchSuggest } from "./suggest";
import { cn } from "~/lib/utils";
import { useCallback, useState } from "react";
import { Command } from "~/components/ui/command";
import { NavItem } from "~/models/flexsearch-model";
import { IoChatMsg } from "../../../server";
import { getSessionSocket } from "~/lib/socket";
import { useChatSessionModel } from "~/models/chat-session";

type Props = {
  nexaiApiKey: string;
  msgs: NexaiChatMessage[];
  nexaiAssetsUrl?: string;
  nexaiIoUrl?: string;
}

export const ChatSidebar = ({
  nexaiApiKey,
  msgs,
  nexaiAssetsUrl = '',
  nexaiIoUrl = 'https://io.nexai.site'
}: Props) => {

  const [chatInput, setChatInput] = useState('')
  let suggest: NavItem|null
  const setSuggest = (value: NavItem|null) => suggest = value

  const onSpeechTranscript = (transcript: string) => {
    console.log('onSpeech', transcript)
  }

  const chatSession = useChatSessionModel({ nexaiApiKey, nexaiAssetsUrl })

  const socket = getSessionSocket({
    sessionKey: chatSession.sessionId,
    ioUrl: nexaiIoUrl
  })

  const sendChatViaSoketIo = useCallback((chatMsg: IoChatMsg) => {
    console.log('sendChatViaIo', chatMsg)
    socket.emit('chat', chatMsg)
  }, [socket])

  const sendSessionChatMsg = (message: string) => {
    const chatMsg = {
      message,
      fromName: chatSession.name,
      userUid: chatSession.uid,
      projectId: nexaiApiKey,
      sessionKey: chatSession.uid,
      toName: 'nexai'
    }
    sendChatViaSoketIo(chatMsg)
  }

  const onSendChatMsg = (message: string) => {
    setTimeout(() => {
      console.log('onSend', message)
      if (suggest) {
        console.log('we have a suggest', suggest)
        sendSessionChatMsg(suggest.title)
        setSuggest(null)
      } else {
        sendSessionChatMsg(message)
      }
    }, 50)
  }

  const onSendSuggest = (navItem: NavItem, group: NavItem) => {
    console.log('onSuggest', { navItem, group })
    setSuggest(navItem)
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
        <Command className={cn("h-full w-full overflow-visible")} shouldFilter={false}>
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
                    onMenuItemSelect={onSendSuggest}
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