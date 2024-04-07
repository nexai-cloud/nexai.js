import { observer } from 'mobx-react-lite'
import "./chat-bubble.css"
import "./index.css"
import "./ui/busy-indicator/busy-indicator.css"
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircleHeartIcon, MicIcon, SendIcon, } from "lucide-react";
import { NexaiChatThread } from "./ui/chat-thread";
import { NexaiChatMessage, type ChatMessage, type ChatUser } from "./chat-types";
import { aiThreads, aiUser } from "./chat-data";
import { BotAvatar, ChatAvatar } from "./ui/chat-avatar";
import { sendAiChat } from "./server/query";
import { ChatThreads } from "./models/chat-threads";
import { ChatBusyIndicator } from './ui/busy-indicator/busy-indicator';
import { NexaiWaveForm } from './ui/wave-form/wave-form';
import './ui/wave-form/wave-form.css'
import { getSpeechRecognition, hasSpeechRecognition } from './lib/speech/recognition';
import { fetchSuggests, getSuggests, nextSuggests } from './models/chat-suggests';
import { getClientSession } from './lib/session/chat-session';
import { listenSSE } from './lib/sse/listen-sse';
import { render } from 'react-dom';
import { cn } from './lib/utils';
import { config } from './lib/config';

export type NexaiChatBubbleProps = {
  width?: number;
  nexaiApiKey: string;
  nexaiApiUrl?: string;
}

export const NexaiChatBubble = observer(({
  width = 380,
  nexaiApiKey,
  nexaiApiUrl = config.nexaiApiUrl,
}: NexaiChatBubbleProps) => {
  const [isShowChat, setIsShowChat] = useState(
    Boolean(typeof localStorage !== 'undefined' && localStorage.isShowChat)
  )
  const [isSpeechInput, setIsSpeechInut] = useState(false)
  const chatInputRef = useRef<HTMLInputElement>(null)
  const [chatInput, setChatInput] = useState('')
  const [talking, setTalking] = useState(false)
  const [hasRecognition, setHasRecognition] = useState(false)
  const [suggests, setSuggests] = useState<string[]>([])
  
  const isSuggestLoaded = useRef(false)
  const isSSELoaded = useRef(false)

  const threadsRef = useRef<HTMLDivElement>(null)
  const sessionRef = useRef(getClientSession(nexaiApiKey))

  const threads = ChatThreads

  useEffect(() => {
    if (isSSELoaded.current) return
    isSSELoaded.current = true

    const addChatMessageToThread = async (data: NexaiChatMessage) => {
      if (data.fromType === 'support') {
        addChat({
          message: data.message,
          sources: [] // @todo
        }, {
          name: data.fromName,
          userUid: data.sessionId,
          avatar: data.fromName === 'nexai' ? (
            <BotAvatar />
          ) : (
            <ChatAvatar
              src={data.avatarUrl}
              name={data.fromName}
            />
          )
        })
      }
    }

    const listen = async () => {
      console.log('listening sse')
      listenSSE(
        `${nexaiApiUrl}/sse/?projectId=${nexaiApiKey}&sessionKey=${sessionRef.current.sessionId}`, 
        (event) => {
          const data = event.data
          console.log('sse data', data)
          addChatMessageToThread(data as NexaiChatMessage)
          setTimeout(() => scrollToBottom(), 50)
        }
      )
    }
    listen()
    
  })

  useEffect(() => {
    setHasRecognition(hasSpeechRecognition())
  }, [])

  useEffect(() => {
    threads.splice(0, threads.length)
    threads.push(...aiThreads)
  }, [threads])

  useEffect(() => {
    const loadSuggests = async () => {
      isSuggestLoaded.current = true
      await fetchSuggests()
      setSuggests(getSuggests())
    }
    if (!isSuggestLoaded.current) {
      loadSuggests()
    }
  }, [isSuggestLoaded])

  const getChatUser = useCallback(() => {
    const { name, sessionId } = sessionRef.current
    return {
      name,
      userUid: sessionId,
      avatar: <ChatAvatar name={name} />,
    }
  }, [sessionRef])

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
      sendChat({ message: chatInput }, getChatUser())
    }
  }

  const scrollToBottom = useCallback(() => {
    if (threadsRef.current) {
      threadsRef.current.querySelector('.chat-thread:last-child')
        ?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    }
  }, []);

  const addAIChat = useCallback(async (text: string) => {
    const uid = String(Date.now())
    const thread = {
      ...aiUser,
      uid,
      hide: false,
      date: new Date(),
      messages: [{
        message: <div key={Date.now()}><ChatBusyIndicator text={''} /></div>
      }]
    }
    threads.push(thread)
    scrollToBottom()
    const apiResp = await sendAiChat({
      nexaiApiUrl,
      message: text,
      sessionId: sessionRef.current.sessionId,
      projectId: nexaiApiKey!,
      name: sessionRef.current.name,
    })
    console.log('apiResp', apiResp)
    const prevThread = threads.find(thread => thread.uid === uid)
    if (prevThread) {
      threads.splice(threads.indexOf(prevThread), 1)
    }
    const sources = apiResp.response[1]
      .map((source: {url:string}[]) => source[1].url)
    const resp = {
      response: apiResp.response[0],
      sources: sources.filter((source: string, i: number) => sources.indexOf(source) === i) 
    }
    console.log('resp', resp)
    return resp
  }, [threads, scrollToBottom, nexaiApiKey, nexaiApiUrl])

  const addChat = useCallback((chatMessage: ChatMessage, user: ChatUser) => {
    const existingThreads = [ ...threads ]
      const prevThread = existingThreads[threads.length-1]
      if (prevThread?.userUid !== user.userUid || prevThread?.messages.length > 3) {
        const thread = {
          ...user,
          uid: String(Date.now()),
          hide: false,
          date: new Date(),
          messages: [
            chatMessage
          ]
        }
        threads.push(thread)
      } else {
        prevThread.messages.push(chatMessage)
      }
  }, [threads])
  
  const sendChat = useCallback((chatMessage: ChatMessage, user: ChatUser) => {
    try {
      console.log('sendChat', { chatMessage, user })
      if (user.userUid !== 'bot') {
        const { message } = chatMessage
        setTimeout(async () => {
          const resp = await addAIChat(message as string)
          if (isSpeechInput) {
            // synthVoice(resp.response)
          }
          sendChat(({
            message: resp.response,
            sources: resp.sources
          }), aiUser)
        }, 500)
      }
      addChat(chatMessage, user)
      if (user.userUid !== 'bot') {
        setChatInput('')
      }
      setTimeout(() => scrollToBottom(), 100)
    } catch(e) {
      alert('Failed to send your chat')
    }
  }, [scrollToBottom, addAIChat, isSpeechInput, addChat])

  const onClickSuggest = useCallback((message: string) => {
    sendChat({ message }, getChatUser())
    setSuggests(nextSuggests())
  }, [sendChat, getChatUser])

  const synthVoice = (text: string) => {
    console.log('syncVoice', text)
    const voices = speechSynthesis.getVoices()
      .filter(voice => voice.lang === 'en-US')

    console.log('voices', voices)
    const voice = voices.find(voice => {
        return voice.voiceURI.match('Google')
    }) || voices[0]

    const utter = new SpeechSynthesisUtterance(text)
    if (voice) {
      utter.voice = voice
      console.log('voice', voice.voiceURI)
    }
    speechSynthesis.speak(utter)
    console.log('utter', text)
  }
  synthVoice; // @todo

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
        setIsSpeechInut(false)
      });

      recognition.onresult = function(event: SpeechRecognitionEvent) {
        const result = event.results[event.results.length - 1]
        const transcript: string = result[0].transcript;
        console.log('Speech Recognition Result:', transcript);
        sendChat({ message: transcript }, getChatUser())
        setIsSpeechInut(false)
        setTimeout(() => {
          startSpeechRecognition()
        }, 500)
      };

      recognition.onerror = (error) => {
        console.error('speech error', error)
        setIsSpeechInut(false)
      }

      setIsSpeechInut(true)
      recognition.start()
      console.log('listening...')
    }
  }

  const handleSpeechRecognition = () => {
    startSpeechRecognition()
  }

  const visibleThreads = threads.slice()

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
                  visibleThreads.map((thread) => (
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
                getChatUser().avatar
              }
            </div>
              <div className="flex align-middle border rounded-lg shadow-lg p-1 bg-white">
                {
                  !isSpeechInput ? (
                    <>
                      <input
                        className="w-full bg-white border-0 p-3 font-medium size-12"
                        placeholder={'Ask a question...'}
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
                          onClick={() => sendChat({ message: chatInput }, getChatUser())}  
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
window.NexaiChatBubble = NexaiChatBubble