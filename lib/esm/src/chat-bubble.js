"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircleHeartIcon, MicIcon, SendIcon, } from "lucide-react";
import { NexaiChatThread } from "./ui/chat-thread";
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
import { getChatUser } from './lib/session/session-user';
import { useChatSessionModel } from './models/chat-session';
export const NexaiChatBubble = observer(({ width = 380, nexaiApiKey, nexaiIoUrl = 'https://ai-chat-server-production.up.railway.app', nexaiAssetsUrl = 'https://nexai.site/ai/assets', aiName = 'Nexai', aiAvatarUrl = 'https://nexai.site/ai/logo/nexai-logo-round.svg', chatSuggests = [
    `Hi! I'm fine!|How do I use this?`,
    `Free options?|What's the pricing?`,
    `I'm satisfied. Bye.|I need more help.`
], projectName = 'Nexai', inputPlaceholder = '' }) => {
    const [isShowChat, setIsShowChat] = useState(Boolean(typeof localStorage !== 'undefined' && localStorage.isShowChat));
    const [isSpeechInput, setIsSpeechInput] = useState(false);
    const chatInputRef = useRef(null);
    const [chatInput, setChatInput] = useState('');
    const [talking, setTalking] = useState(false);
    const [hasRecognition, setHasRecognition] = useState(false);
    const suggests = getSuggests();
    const isSuggestLoaded = useRef(false);
    const isChatListening = useRef(false);
    const threadsRef = useRef(null);
    const chatSession = useChatSessionModel({ nexaiApiKey, nexaiAssetsUrl });
    const threads = ChatThreads;
    const socket = getSessionSocket({
        sessionKey: chatSession.sessionId,
        ioUrl: nexaiIoUrl
    });
    const aiThreads = useCallback(() => getAiThreads(chatSession, { aiName, aiAvatarUrl, nexaiAssetsUrl }), [chatSession, aiName, aiAvatarUrl, nexaiAssetsUrl]);
    const chatUser = getChatUser(chatSession);
    useEffect(() => {
        if (isChatListening.current)
            return;
        isChatListening.current = true;
        const addChatMessageToThread = (data) => __awaiter(void 0, void 0, void 0, function* () {
            addChat({
                uid: data.uid,
                message: data.message,
                sources: data.sources || [],
                aiMuted: data.aiMuted
            }, {
                name: data.userUid === 'nexai' ? aiName : data.fromName,
                userUid: data.userUid,
                avatarUrl: data.userUid === 'nexai' ? (nexaiAssetsUrl + aiAvatarUrl) : (nexaiAssetsUrl + data.avatarUrl)
            });
        });
        const handleChatMessage = (chatMsg) => {
            console.log('handleChatMessage', chatMsg);
            addChatMessageToThread(chatMsg);
            setTimeout(() => scrollToBottom(), 50);
        };
        const listen = () => {
            console.log('listening socket', socket);
            socket.on('chat', handleChatMessage);
        };
        listen();
    });
    useEffect(() => {
        setHasRecognition(hasSpeechRecognition());
    }, []);
    useEffect(() => {
        setChatThreads(aiThreads());
    }, [aiThreads]);
    useEffect(() => {
        const loadSuggests = () => __awaiter(void 0, void 0, void 0, function* () {
            isSuggestLoaded.current = true;
            (chatSuggests === null || chatSuggests === void 0 ? void 0 : chatSuggests.length) > 0 ? setSuggests(chatSuggests) : yield fetchSuggests(projectName);
        });
        if (!isSuggestLoaded.current) {
            loadSuggests();
        }
    }, [isSuggestLoaded, projectName, chatSuggests]);
    const toggleChat = () => {
        setIsShowChat(!isShowChat);
        localStorage.setItem('isShowChat', !isShowChat ? '1' : '');
        if (!isShowChat) {
            setTimeout(() => {
                var _a;
                (_a = chatInputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
                scrollToBottom();
            }, 50);
        }
    };
    const onInputChange = (event) => {
        setChatInput(event.target.value);
    };
    const onInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendUserChat({ uid: randomUUID(), message: chatInput });
        }
    };
    const scrollToBottom = useCallback(() => {
        var _a;
        if (threadsRef.current) {
            (_a = threadsRef.current.querySelector('.chat-thread:last-child')) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
    }, []);
    const sendChatViaIo = useCallback((chatMsg) => {
        console.log('sendChatViaIo', chatMsg);
        socket.emit('chat', chatMsg);
    }, [socket]);
    const addAITyping = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        const uid = String(Date.now());
        const thread = Object.assign(Object.assign({}, getAiUser({ aiName, aiAvatarUrl })), { uid, hide: false, date: new Date(), isTyping: true, messages: [{
                    uid: randomUUID(),
                    isTyping: true,
                    message: _jsx("div", { children: _jsx(ChatBusyIndicator, { text: '' }) }, Date.now())
                }] });
        threads.push(thread);
        scrollToBottom();
        return thread;
    }), [threads, scrollToBottom, aiName, aiAvatarUrl, nexaiAssetsUrl]);
    const addChat = useCallback((chatMessage, user) => {
        console.log('adding chat msg', { chatMessage, user });
        const threadWithMsg = threads.find(thread => {
            return thread.messages
                .map(m => m.uid).includes(chatMessage.uid);
        });
        if (threadWithMsg) {
            const existingChat = threadWithMsg.messages.find(m => {
                return m.uid == chatMessage.uid;
            });
            existingChat.isReceived = true;
            return;
        }
        const existingThreads = [...threads];
        const prevThread = existingThreads[threads.length - 1];
        const typingThread = existingThreads.find(t => {
            return t.isTyping && t.userUid === user.userUid;
        });
        if (typingThread) {
            const nonTyping = typingThread.messages.filter(msg => !msg.isTyping);
            typingThread.messages.splice(0, typingThread.messages.length, ...nonTyping);
            if (!chatMessage.aiMuted) {
                typingThread.messages.push(chatMessage);
            }
            typingThread.isTyping = false;
            console.log('added to typing thread', typingThread);
            if (typingThread.messages.length === 0) {
                threads.splice(threads.indexOf(typingThread), 1);
                console.log('empty typing thread removed');
            }
        }
        else if ((prevThread === null || prevThread === void 0 ? void 0 : prevThread.userUid) === user.userUid) {
            prevThread.messages.push(chatMessage);
            console.log('added to prev thread', prevThread);
        }
        else {
            const thread = {
                userUid: user.userUid,
                name: user.name,
                avatar: (_jsx(ChatAvatar, { src: user.avatarUrl, name: user.name })),
                uid: String(Date.now()),
                hide: false,
                date: new Date(),
                messages: [
                    chatMessage
                ]
            };
            threads.push(thread);
            console.log('pushed new thread', thread);
        }
    }, [threads]);
    const sendChat = useCallback((chatMessage, user) => {
        try {
            console.log('sendChat', { chatMessage, user });
            if (user.userUid !== 'nexai') {
                const { message } = chatMessage;
                setTimeout(() => {
                    addAITyping();
                    sendChatViaIo(Object.assign(Object.assign({}, user), { message: message, sessionKey: chatSession.sessionId, projectId: nexaiApiKey, fromName: chatSession.name, toName: 'nexai' }));
                    if (isSpeechInput) {
                        // synthVoice(resp.response)
                    }
                }, 50);
            }
            addChat(chatMessage, user);
            if (user.userUid !== 'nexai') {
                setChatInput('');
            }
            setTimeout(() => scrollToBottom(), 100);
        }
        catch (e) {
            alert('Failed to send your chat');
        }
    }, [scrollToBottom, sendChatViaIo, nexaiApiKey, addAITyping, isSpeechInput, addChat, chatSession]);
    const sendUserChat = useCallback((chatMessage) => {
        sendChat(chatMessage, chatUser);
    }, [sendChat, chatUser]);
    const onClickSuggest = useCallback((message) => {
        sendUserChat({ uid: randomUUID(), message });
        nextSuggests();
    }, [sendUserChat]);
    const startSpeechRecognition = () => {
        if (hasSpeechRecognition()) {
            const recognition = getSpeechRecognition();
            // recognition.continuous = true // @todo
            recognition.addEventListener('speechstart', () => {
                console.log('Speech started...:');
                setTalking(true);
            });
            recognition.addEventListener('speechend', () => {
                console.log('Speech end.');
                setTalking(false);
                setIsSpeechInput(false);
            });
            recognition.onresult = function (event) {
                const result = event.results[event.results.length - 1];
                const transcript = result[0].transcript;
                console.log('Speech Recognition Result:', transcript);
                sendUserChat({ uid: randomUUID(), message: transcript });
                setIsSpeechInput(false);
                setTimeout(() => {
                    startSpeechRecognition();
                }, 500);
            };
            recognition.onerror = (error) => {
                console.error('speech error', error);
                setIsSpeechInput(false);
            };
            setIsSpeechInput(true);
            recognition.start();
            console.log('listening...');
        }
    };
    const handleSpeechRecognition = () => {
        startSpeechRecognition();
    };
    return (_jsxs("div", { className: "max-w-[100wh] nexai-chat-bubble pt-0 flex flex-col gap-4 rounded-lg", style: {
            width
        }, children: [isShowChat && (_jsxs("div", { className: "bubbble-chat flex flex-col gap-4 ", children: [_jsx("div", { className: 'bubble-thread-box pl-20 -ml-20 overflow-y-auto', children: _jsx("div", { ref: threadsRef, className: "bubble-thread text-slate-500", children: threads.map((thread) => (_jsx(NexaiChatThread, { thread: thread }, thread.date.getTime()))) }) }), _jsxs("div", { className: "bubble-input relative text-slate-800", children: [_jsx("div", { className: "top-1 absolute text-sm text-slate-500", style: { left: -75 }, children: _jsx(ChatAvatar, { src: chatUser.avatarUrl, name: chatUser.name }) }), _jsx("div", { className: "flex align-middle border rounded-lg shadow-lg p-1 bg-white", children: !isSpeechInput ? (_jsxs(_Fragment, { children: [_jsx("input", { className: "w-full bg-white border-0 p-3 font-medium size-12", placeholder: inputPlaceholder || (projectName ? `Ask about ${projectName}...` : 'Ask a question...'), onChange: onInputChange, onKeyDown: onInputKeyDown, value: chatInput, ref: chatInputRef }), _jsxs("div", { className: "flex", children: [hasRecognition && (_jsx("button", { className: "flex hover:animate-pulse text-slate-300 my-auto p-2", onClick: () => handleSpeechRecognition(), children: _jsx(MicIcon, {}) })), _jsx("button", { className: "flex text-slate-300 my-auto p-2", onClick: () => sendUserChat({ uid: randomUUID(), message: chatInput }), children: _jsx(SendIcon, {}) })] })] })) : (_jsx("div", { className: "flex w-full align-middle items-center size-12", children: _jsx("div", { className: 'mx-auto flex align-middle items-center gap-1', children: _jsx("div", { className: 'mr-auto flex text-blue-500', children: talking ? (_jsx(NexaiWaveForm, { active: true })) : (_jsx("div", { className: 'animate-pulse', children: `I'm listening` })) }) }) })) })] })] })), _jsxs("div", { className: "bubble-icon flex items-end align-middle -ml-5", children: [isShowChat && (_jsx(_Fragment, { children: suggests.map(suggest => (_jsx("button", { onClick: () => onClickSuggest(suggest), className: "my-auto p-2 px-3 mr-4 bg-cyan-100 shadow-sm rounded-lg text-slate-700 font-semibold", children: suggest }, suggest))) })), _jsx("button", { onClick: toggleChat, className: cn(`ml-auto flex align-middle items-center rounded-full`, isShowChat ? ` text-blue-600` : `bg-blue-600 text-white shadow`), style: {
                            width: '3.3rem',
                            height: '3.3rem'
                        }, children: _jsx("div", { className: `m-auto`, children: isShowChat ? (_jsx(MessageCircleHeartIcon, { size: 40 })) : (_jsx(MessageCircleHeartIcon, { size: 30 })) }) })] })] }));
});
// @ts-expect-error no render prop
NexaiChatBubble.render = (props) => __awaiter(void 0, void 0, void 0, function* () {
    const el = document.createElement('div');
    el.setAttribute('id', '#nexai-chat-bubble');
    el.style.position = 'absolute';
    el.style.bottom = (props.bottom || 30) + 'px';
    el.style.right = (props.right || 30) + 'px';
    document.body.appendChild(el);
    document.addEventListener('DOMContentLoaded', () => {
        render(React.createElement(NexaiChatBubble, props), el);
    });
});
// @ts-expect-error global
globalThis.NexaiChatBubble = NexaiChatBubble;
