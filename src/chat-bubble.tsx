"use client"
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircleHeartIcon, MicIcon, SendIcon, } from "lucide-react";
import { NexaiChatThread } from "./ui/chat-thread";
import { NexaiChatMessage, type ChatMessage, type ChatUser } from "./chat-types";
import { getAiThreads, getAiUser } from "./data/chat-data";
import { ChatAvatar } from "./ui/chat-avatar";
import { ChatThreads, setChatThreads } from "./models/chat-threads";
import { ChatBusyIndicator } from './ui/busy-indicator/busy-indicator';
import { NexaiWaveForm } from './ui/wave-form/wave-form';
import { getSpeechRecognition, hasSpeechRecognition } from './lib/speech/recognition';
import { fetchSuggests, getSuggests, setSuggests, nextSuggests } from './models/chat-suggests';
import { render } from 'react-dom';
import { cn, randomUUID } from './lib/utils';
import { getSessionSocket } from './lib/socket';
import { IoChatMsg } from '../server';
import { getChatUser } from './lib/session/session-user';
import { useChatSessionModel } from './models/chat-session';
import { getIsShowChat, hasIsShowChat } from './lib/session/show-chat';
// css
// import './ui/wave-form/wave-form.css'
// import "./chat-bubble.css"
// import "./index.css"
// import "./ui/busy-indicator/busy-indicator.css"
// import "./components/shared/prism/code-block.css"

export type NexaiChatBubbleProps = {
  width?: number;
  nexaiApiKey: string;
  nexaiIoUrl?: string;
  nexaiAssetsUrl?: string;
  aiName?: string;
  aiAvatarUrl?: string;
  chatSuggests?: string[];
  projectName?: string;
  inputPlaceholder?: string;
}

export const NexaiChatBubble = observer(({
  width = 380,
  nexaiApiKey,
  nexaiIoUrl = 'https://ai-chat-server-production.up.railway.app',
  nexaiAssetsUrl = 'https://nexai.site/ai/assets',
  aiName = 'Nexai',
  aiAvatarUrl = '',
  chatSuggests = [],
  projectName = 'Nexai',
  inputPlaceholder = ''
}: NexaiChatBubbleProps) => {
  const [isShowChat, setIsShowChat] = useState(
    Boolean(hasIsShowChat() ? getIsShowChat() : true)
  )
  const [isSpeechInput, setIsSpeechInput] = useState(false)
  const chatInputRef = useRef<HTMLInputElement>(null)
  const [chatInput, setChatInput] = useState('')
  const [talking, setTalking] = useState(false)
  const [hasRecognition, setHasRecognition] = useState(false)
  
  const suggests = getSuggests()
  const isSuggestLoaded = useRef(false)
  const isChatListening = useRef(false)

  const threadsRef = useRef<HTMLDivElement>(null)
  const chatSession = useChatSessionModel({ nexaiApiKey, nexaiAssetsUrl })

  const threads = ChatThreads

  const socket = getSessionSocket({
    sessionKey: chatSession.sessionId,
    ioUrl: nexaiIoUrl
  })

  const aiThreads = useCallback(() => getAiThreads(chatSession, { aiName, aiAvatarUrl, nexaiAssetsUrl }), [chatSession, aiName, aiAvatarUrl, nexaiAssetsUrl])

  const chatUser = getChatUser(chatSession)

  useEffect(() => {
    if (isChatListening.current) return
    isChatListening.current = true

    const addChatMessageToThread = async (data: NexaiChatMessage) => {
      addChat({
        uid: data.uid,
        message: data.message,
        sources: data.sources || [],
        aiMuted: data.aiMuted
      }, {
        name: data.userUid === 'nexai' ? aiName : data.fromName,
        userUid: data.userUid,
        avatarUrl: data.userUid === 'nexai' ? (
          nexaiAssetsUrl + aiAvatarUrl
        ) : (
          nexaiAssetsUrl + data.avatarUrl
        )
      })
    }

    const handleChatMessage = (chatMsg: NexaiChatMessage) => {
      console.log('handleChatMessage', chatMsg)
      addChatMessageToThread(chatMsg)
      setTimeout(() => scrollToBottom(), 50)
    }

    const listen = () => {
      console.log('listening socket', socket)
      socket.on('chat', handleChatMessage)
    }
    
    listen() 
    
  })

  useEffect(() => {
    setHasRecognition(hasSpeechRecognition())
  }, [])

  useEffect(() => {
    setChatThreads(aiThreads())
  }, [aiThreads])

  useEffect(() => {
    const loadSuggests = async () => {
      isSuggestLoaded.current = true
      chatSuggests?.length > 0 ? setSuggests(chatSuggests) : await fetchSuggests(projectName)
    }
    if (!isSuggestLoaded.current) {
      loadSuggests()
    }
  }, [isSuggestLoaded, projectName, chatSuggests])

  const toggleChat = () => {
    setIsShowChat(!isShowChat)
    localStorage.setItem('isShowChat', !isShowChat ? '1' : '')
    if (!isShowChat) {
      setTimeout(() => {
        chatInputRef.current?.focus()
        scrollToBottom()
      }, 50)
    }
  }
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(event.target.value)
  }
  const onInputKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      sendUserChat({ uid: randomUUID(), message: chatInput })
    }
  }

  const scrollToBottom = useCallback(() => {
    if (threadsRef.current) {
      threadsRef.current.querySelector('.chat-thread:last-child')
        ?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    }
  }, []);

  const sendChatViaIo = useCallback((chatMsg: IoChatMsg) => {
    console.log('sendChatViaIo', chatMsg)
    socket.emit('chat', chatMsg)
  }, [socket])

  const addAITyping = useCallback(async () => {
    const uid = String(Date.now())
    const thread = {
      ...getAiUser({ aiName, aiAvatarUrl }),
      uid,
      hide: false,
      date: new Date(),
      isTyping: true,
      messages: [{
        uid: randomUUID(),
        isTyping: true,
        message: <div key={Date.now()}><ChatBusyIndicator text={''} /></div>
      }]
    }
    threads.push(thread)
    scrollToBottom()
    return thread
  }, [threads, scrollToBottom, aiName, aiAvatarUrl])

  const addChat = useCallback((chatMessage: ChatMessage, user: ChatUser) => {
    console.log('adding chat msg', { chatMessage, user })

    const threadWithMsg = threads.find(thread => {
      return thread.messages
        .map(m => m.uid).includes(chatMessage.uid)
    })

    if (threadWithMsg) {
      const existingChat = threadWithMsg.messages.find(m => {
        return m.uid == chatMessage.uid
      })
      existingChat!.isReceived = true
      return
    }

    const existingThreads = [ ...threads ]
      const prevThread = existingThreads[threads.length-1]
      const typingThread = existingThreads.find(t => {
        return t.isTyping && t.userUid === user.userUid
      })
      if (typingThread) {
        const nonTyping = typingThread.messages.filter(msg => !msg.isTyping)
        typingThread.messages.splice(0, typingThread.messages.length, ...nonTyping)
        if (!chatMessage.aiMuted) {
          typingThread.messages.push(chatMessage)
        }
        typingThread.isTyping = false
        console.log('added to typing thread', typingThread)
        if (typingThread.messages.length === 0) {
          threads.splice(threads.indexOf(typingThread), 1)
          console.log('empty typing thread removed')
        }
      } else if (prevThread?.userUid === user.userUid) {
        prevThread.messages.push(chatMessage)
        console.log('added to prev thread', prevThread)
      } else {
        const thread = {
          userUid: user.userUid,
          name: user.name,
          avatar: (
            <ChatAvatar
              src={user.avatarUrl}
              name={user.name}
            />
          ),
          uid: String(Date.now()),
          hide: false,
          date: new Date(),
          messages: [
            chatMessage
          ]
        }
        threads.push(thread)
        console.log('pushed new thread', thread)
      }
  }, [threads])
  
  const sendChat = useCallback((chatMessage: ChatMessage, user: ChatUser) => {
    try {
      console.log('sendChat', { chatMessage, user })
      if (user.userUid !== 'nexai') {
        const { message } = chatMessage
        setTimeout(() => {
          addAITyping()

          sendChatViaIo({
            ...user,
            message: message as string,
            sessionKey: chatSession.sessionId,
            projectId: nexaiApiKey!,
            fromName: chatSession.name,
            toName: 'nexai'
          })
          if (isSpeechInput) {
            // synthVoice(resp.response)
          }
        }, 50)
      }
      addChat(chatMessage, user)
      if (user.userUid !== 'nexai') {
        setChatInput('')
      }
      setTimeout(() => scrollToBottom(), 100)
    } catch(e) {
      alert('Failed to send your chat')
    }
  }, [scrollToBottom, sendChatViaIo, nexaiApiKey, addAITyping, isSpeechInput, addChat, chatSession])

  const sendUserChat = useCallback((chatMessage: ChatMessage) => {
    sendChat(chatMessage, chatUser)
  }, [sendChat, chatUser])

  const onClickSuggest = useCallback((message: string) => {
    sendUserChat({ uid: randomUUID(), message })
    nextSuggests()
  }, [sendUserChat])

  const startSpeechRecognition = () => {
    if (hasSpeechRecognition()) {
      const recognition = getSpeechRecognition()

      // recognition.continuous = true // @todo

      recognition.addEventListener('speechstart', () => {
        console.log('Speech started...:');
        setTalking(true)
      });
    
      recognition.addEventListener('speechend', () => {
        console.log('Speech end.');
        setTalking(false)
        setIsSpeechInput(false)
      });

      recognition.onresult = function(event: SpeechRecognitionEvent) {
        const result = event.results[event.results.length - 1]
        const transcript: string = result[0].transcript;
        console.log('Speech Recognition Result:', transcript);
        sendUserChat({ uid: randomUUID(), message: transcript })
        setIsSpeechInput(false)
        setTimeout(() => {
          startSpeechRecognition()
        }, 500)
      };

      recognition.onerror = (error) => {
        console.error('speech error', error)
        setIsSpeechInput(false)
      }

      setIsSpeechInput(true)
      recognition.start()
      console.log('listening...')
    }
  }

  const handleSpeechRecognition = () => {
    startSpeechRecognition()
  }

  return (
    <div
      className="max-w-[100wh] nexai-chat-bubble pt-0 flex flex-col gap-4 rounded-lg"
      style={{
        width
      }}
    >
      {
        isShowChat && (
          <div className="bubbble-chat flex flex-col gap-4 ">
            <div className='bubble-thread-box pl-20 -ml-20 overflow-y-auto'>
              <div ref={threadsRef} className="bubble-thread text-slate-500">
                {
                  threads.map((thread) => (
                    <NexaiChatThread
                      key={thread.date.getTime()}
                      thread={thread}
                    />
                  ))
                }
              </div>
            </div>
            <div className="bubble-input relative text-slate-800">
            <div className="top-1 absolute text-sm text-slate-500"
              style={{ left: -75 }}
            >
              {
                <ChatAvatar
                  src={chatUser.avatarUrl}
                  name={chatUser.name}
                />
              }
            </div>
              <div className="flex align-middle border rounded-lg shadow-lg p-1 bg-white">
                {
                  !isSpeechInput ? (
                    <>
                      <input
                        className="w-full bg-white border-0 p-3 font-medium size-12"
                        placeholder={inputPlaceholder || (projectName ? `Ask about ${projectName}...` : 'Ask a question...')}
                        onChange={onInputChange}
                        onKeyDown={onInputKeyDown}
                        value={chatInput}
                        ref={chatInputRef}
                      />
                      <div className="flex">
                        {
                          hasRecognition && (
                            <button
                              className="flex hover:animate-pulse text-slate-300 my-auto p-2"
                              onClick={() => handleSpeechRecognition()}
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
            </div>
          </div>
        )
      }
      <div className="bubble-icon flex items-end align-middle -ml-5">
        {
          isShowChat && (
            <>
              {
                suggests.map(suggest => (
                  <button
                    key={suggest}
                    onClick={() => onClickSuggest(suggest)}
                    className="my-auto p-2 px-3 mr-4 bg-cyan-100 shadow-sm rounded-lg text-slate-700 font-semibold"
                  >
                    {suggest}
                  </button>
                ))
              }
            </>
          )
        }
        
        <button
          onClick={toggleChat}
          className={
            cn(
              `ml-auto flex align-middle items-center rounded-full`,
              isShowChat ? ` text-blue-600` : `bg-blue-600 text-white shadow`
            )
          }
          style={{
            width: '3.3rem',
            height: '3.3rem'
          }}
        >
          <div 
            className={`m-auto`}
          >
            {
              isShowChat ? (
                <MessageCircleHeartIcon size={40} />
              ) : (
                <MessageCircleHeartIcon size={30} />
              )
            }
          </div>
        </button>
      </div>
    </div>
  )
});

export type ChatRenderProps = NexaiChatBubbleProps & {
  bottom?: number;
  right?: number;
}

// @ts-expect-error no render prop
NexaiChatBubble.render = async (props: ChatRenderProps) => {
  const el = document.createElement('div')
  el.setAttribute('id', '#nexai-chat-bubble')
  el.style.position = 'absolute'
  el.style.bottom = (props.bottom || 30) + 'px'
  el.style.right = (props.right || 30) + 'px'
  document.body.appendChild(el)
  document.addEventListener('DOMContentLoaded', () => {
    render(
      React.createElement(NexaiChatBubble, props), 
      el
    )
  })
}

// @ts-expect-error global
globalThis.NexaiChatBubble = NexaiChatBubble