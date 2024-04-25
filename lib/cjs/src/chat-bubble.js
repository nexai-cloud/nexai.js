"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NexaiChatBubble = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const mobx_react_lite_1 = require("mobx-react-lite");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const chat_thread_1 = require("./ui/chat-thread");
const chat_data_1 = require("./data/chat-data");
const chat_avatar_1 = require("./ui/chat-avatar");
const chat_threads_1 = require("./models/chat-threads");
const busy_indicator_1 = require("./ui/busy-indicator/busy-indicator");
const wave_form_1 = require("./ui/wave-form/wave-form");
const recognition_1 = require("./lib/speech/recognition");
const chat_suggests_1 = require("./models/chat-suggests");
const utils_1 = require("./lib/utils");
const socket_1 = require("./lib/socket");
const session_user_1 = require("./lib/session/session-user");
const chat_session_1 = require("./models/chat-session");
const show_chat_1 = require("./lib/session/show-chat");
exports.NexaiChatBubble = (0, mobx_react_lite_1.observer)(({ width = 400, nexaiApiKey, nexaiIoUrl = 'https://io.nexai.site', nexaiAssetsUrl = 'https://nexai.site/ai/assets', aiName = 'AI Assistant', aiAvatarUrl = '', chatSuggests = [], projectName = 'AI Support', inputPlaceholder = 'Ask a question...' }) => {
    const [isShowChat, setIsShowChat] = (0, react_1.useState)(Boolean((0, show_chat_1.hasIsShowChat)() ? (0, show_chat_1.getIsShowChat)() : true));
    const [isSpeechInput, setIsSpeechInput] = (0, react_1.useState)(false);
    const chatInputRef = (0, react_1.useRef)(null);
    const [chatInput, setChatInput] = (0, react_1.useState)('');
    const [talking, setTalking] = (0, react_1.useState)(false);
    const [hasRecognition, setHasRecognition] = (0, react_1.useState)(false);
    const suggests = (0, chat_suggests_1.getSuggests)();
    const isSuggestLoaded = (0, react_1.useRef)(false);
    const isChatListening = (0, react_1.useRef)(false);
    const threadsRef = (0, react_1.useRef)(null);
    const chatSession = (0, chat_session_1.useChatSessionModel)({ nexaiApiKey, nexaiAssetsUrl });
    const threads = chat_threads_1.ChatThreads;
    const socket = (0, socket_1.getSessionSocket)({
        sessionKey: chatSession.sessionId,
        ioUrl: nexaiIoUrl
    });
    const aiThreads = (0, react_1.useCallback)(() => (0, chat_data_1.getAiThreads)(chatSession, { aiName, aiAvatarUrl, nexaiAssetsUrl }), [chatSession, aiName, aiAvatarUrl, nexaiAssetsUrl]);
    const chatUser = (0, session_user_1.getChatUser)(chatSession);
    (0, react_1.useEffect)(() => {
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
    (0, react_1.useEffect)(() => {
        setHasRecognition((0, recognition_1.hasSpeechRecognition)());
    }, []);
    (0, react_1.useEffect)(() => {
        (0, chat_threads_1.setChatThreads)(aiThreads());
    }, [aiThreads]);
    (0, react_1.useEffect)(() => {
        const loadSuggests = () => __awaiter(void 0, void 0, void 0, function* () {
            isSuggestLoaded.current = true;
            (chatSuggests === null || chatSuggests === void 0 ? void 0 : chatSuggests.length) > 0 ? (0, chat_suggests_1.setSuggests)(chatSuggests) : yield (0, chat_suggests_1.fetchSuggests)(projectName);
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
            sendUserChat({ uid: (0, utils_1.randomUUID)(), message: chatInput });
        }
    };
    const scrollToBottom = (0, react_1.useCallback)(() => {
        var _a;
        if (threadsRef.current) {
            (_a = threadsRef.current.querySelector('.chat-thread:last-child')) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
    }, []);
    const sendChatViaIo = (0, react_1.useCallback)((chatMsg) => {
        console.log('sendChatViaIo', chatMsg);
        socket.emit('chat', chatMsg);
    }, [socket]);
    const addAITyping = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        const uid = String(Date.now());
        const thread = Object.assign(Object.assign({}, (0, chat_data_1.getAiUser)({ aiName, aiAvatarUrl })), { uid, hide: false, date: new Date(), isTyping: true, messages: [{
                    uid: (0, utils_1.randomUUID)(),
                    isTyping: true,
                    message: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(busy_indicator_1.ChatBusyIndicator, { text: '' }) }, Date.now())
                }] });
        threads.push(thread);
        scrollToBottom();
        return thread;
    }), [threads, scrollToBottom, aiName, aiAvatarUrl]);
    const addChat = (0, react_1.useCallback)((chatMessage, user) => {
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
                avatar: ((0, jsx_runtime_1.jsx)(chat_avatar_1.ChatAvatar, { src: user.avatarUrl, name: user.name })),
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
    const sendChat = (0, react_1.useCallback)((chatMessage, user) => {
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
    const sendUserChat = (0, react_1.useCallback)((chatMessage) => {
        sendChat(chatMessage, chatUser);
    }, [sendChat, chatUser]);
    const onClickSuggest = (0, react_1.useCallback)((message) => {
        sendUserChat({ uid: (0, utils_1.randomUUID)(), message });
        (0, chat_suggests_1.nextSuggests)();
    }, [sendUserChat]);
    const startSpeechRecognition = () => {
        if ((0, recognition_1.hasSpeechRecognition)()) {
            const recognition = (0, recognition_1.getSpeechRecognition)();
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
                sendUserChat({ uid: (0, utils_1.randomUUID)(), message: transcript });
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
    return ((0, jsx_runtime_1.jsxs)("div", { className: "max-w-[100wh] nexai-chat-bubble pt-0 flex flex-col gap-4 rounded-lg", style: {
            width
        }, children: [isShowChat && ((0, jsx_runtime_1.jsxs)("div", { className: "bubbble-chat flex flex-col gap-4 ", children: [(0, jsx_runtime_1.jsx)("div", { className: 'bubble-thread-box pl-20 -ml-20 overflow-y-auto', children: (0, jsx_runtime_1.jsx)("div", { ref: threadsRef, className: "bubble-thread text-slate-500", children: threads.map((thread) => ((0, jsx_runtime_1.jsx)(chat_thread_1.NexaiChatThread, { thread: thread }, thread.date.getTime()))) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "bubble-input relative text-slate-800", children: [(0, jsx_runtime_1.jsx)("div", { className: "top-1 absolute text-sm text-slate-500", style: { left: -75 }, children: (0, jsx_runtime_1.jsx)(chat_avatar_1.ChatAvatar, { src: chatUser.avatarUrl, name: chatUser.name }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex align-middle border rounded-lg shadow-lg p-1 bg-white", children: !isSpeechInput ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("input", { className: "w-full bg-white border-0 p-3 font-medium size-12", placeholder: inputPlaceholder || (projectName ? `Ask about ${projectName}...` : 'Ask a question...'), onChange: onInputChange, onKeyDown: onInputKeyDown, value: chatInput, ref: chatInputRef }), (0, jsx_runtime_1.jsxs)("div", { className: "flex", children: [hasRecognition && ((0, jsx_runtime_1.jsx)("button", { className: "flex hover:animate-pulse text-slate-300 my-auto p-2", onClick: () => handleSpeechRecognition(), children: (0, jsx_runtime_1.jsx)(lucide_react_1.MicIcon, {}) })), (0, jsx_runtime_1.jsx)("button", { className: "flex text-slate-300 my-auto p-2", onClick: () => sendUserChat({ uid: (0, utils_1.randomUUID)(), message: chatInput }), children: (0, jsx_runtime_1.jsx)(lucide_react_1.SendIcon, {}) })] })] })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex w-full align-middle items-center size-12", children: (0, jsx_runtime_1.jsx)("div", { className: 'mx-auto flex align-middle items-center gap-1', children: (0, jsx_runtime_1.jsx)("div", { className: 'mr-auto flex text-blue-500', children: talking ? ((0, jsx_runtime_1.jsx)(wave_form_1.NexaiWaveForm, { active: true })) : ((0, jsx_runtime_1.jsx)("div", { className: 'animate-pulse', children: `I'm listening` })) }) }) })) })] })] })), (0, jsx_runtime_1.jsxs)("div", { className: "bubble-icon flex items-end align-middle -ml-5", children: [isShowChat && ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: suggests.map(suggest => ((0, jsx_runtime_1.jsx)("button", { onClick: () => onClickSuggest(suggest), className: "my-auto p-2 px-3 mr-4 bg-cyan-100 shadow-sm rounded-lg text-slate-700 font-semibold", children: suggest }, suggest))) })), (0, jsx_runtime_1.jsx)("button", { onClick: toggleChat, className: (0, utils_1.cn)(`ml-auto flex align-middle items-center rounded-full`, isShowChat ? ` text-blue-600` : `bg-blue-600 text-white shadow`), style: {
                            width: '3.3rem',
                            height: '3.3rem'
                        }, children: (0, jsx_runtime_1.jsx)("div", { className: `m-auto`, children: isShowChat ? ((0, jsx_runtime_1.jsx)(lucide_react_1.MessageCircleHeartIcon, { size: 40 })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.MessageCircleHeartIcon, { size: 30 })) }) })] })] }));
});
