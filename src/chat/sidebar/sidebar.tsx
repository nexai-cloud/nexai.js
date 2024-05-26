import { ChatInput } from "./input";
import { Messages } from "./messages"
import { SearchSuggest } from "./suggest";
import { cn } from "~/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { Command } from "~/components/ui/command";
import { NavItem } from "~/models/flexsearch-model";
import { IoChatMsg } from "../../../server";
import { getSessionSocket } from "~/lib/socket";
import { useChatSessionModel } from "~/models/chat-session";
import { observer } from "mobx-react-lite";
import { useChatMessagesModel } from "~/models/chat-messages";
import { ChatMessageModel } from "~/models/chat-message";
import { NexaiChatMessage } from "~/chat-types";
import { ChatHeader } from "./header";
import { mockChatMessages } from "./data/mockChatMessages";
import { mockMsgs } from "~/data/mock-msgs";
import { useTeamMembers } from "~/models/team-members";
import { type TeamMemberModel } from "~/models/team-member";

type Props = {
  nexaiApiKey: string;
  onClickBack: () => void;
  nexaiApiUrl?: string;
  nexaiAssetsUrl?: string;
  nexaiIoUrl?: string;
  teamMembers?: TeamMemberModel[]
}

export const ChatSidebar = observer(({
  nexaiApiKey,
  onClickBack,
  nexaiApiUrl = 'https://nexai.site/api',
  nexaiAssetsUrl = 'https://nexai.site/assets',
  nexaiIoUrl = 'https://io.nexai.site',
}: Props) => {

  const [chatInput, setChatInput] = useState('')
  const messagesModel = useChatMessagesModel()
  let suggest: NavItem|null
  const setSuggest = (value: NavItem|null) => suggest = value
  const messagesRef = useRef<HTMLDivElement>()
  const teamMembers = useTeamMembers({ projectId: nexaiApiKey, nexaiApiUrl })

  const onSpeechTranscript = (transcript: string) => {
    console.log('onSpeech', transcript)
    onSendChatMsg(transcript)
  }

  const chatSession = useChatSessionModel({ nexaiApiKey, nexaiAssetsUrl })

  const socket = getSessionSocket({
    sessionKey: chatSession.sessionId,
    ioUrl: nexaiIoUrl
  })

  const loaded = useRef(false)

  const onChatMessage = (message: NexaiChatMessage) => {
    messagesModel.addItem(message)
    setTimeout(() => scrollMessagesToBottom(), 50)
  }

  const scrollMessagesToBottom = useCallback(() => {
    messagesRef.current?.querySelector('.chat-message:last-child')
        ?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
  }, []);

  useEffect(() => {
    if (loaded.current) return
    loaded.current = true
    teamMembers.fetch()
    // @ts-expect-error window
    window.teamMembers = teamMembers
    socket.on('chat', onChatMessage)

    if (!messagesModel.items.length) {
      mockChatMessages.forEach((msg, i) => {
        setTimeout(() => onChatMessage(msg as NexaiChatMessage), i * 2000)
      })
    }
    
    // mockMsgs.forEach(msg => onChatMessage(msg as NexaiChatMessage))
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
  
  const chatAssistants = teamMembers.items as TeamMemberModel[]
  
  const onChatInput = (input: string) => setChatInput(input)
  
  return (
    <>
      <ChatHeader
        teamMembers={chatAssistants}
        onClickBack={onClickBack}
      />
      <Messages
        ref={messagesRef}
        msgs={[...messagesModel.items] as ChatMessageModel[]}
      />
      <div className="mt-auto p-2">
        <Command className={cn("h-full w-full overflow-visible")} shouldFilter={false}>
          <div className="relative">
            {
              chatInput && (
                <div className={cn(
                  "absolute bottom-3 left-0 z-50",
                  "border rounded-lg shadow-lg mx-2 mb-0 shadow-slate-400 bg-slate-100"
                )}>
                  <SearchSuggest
                    className="bg-slate-100"
                    input={chatInput}
                    nexaiApiUrl={nexaiApiUrl}
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
})