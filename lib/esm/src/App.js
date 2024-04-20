var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { getProjectSocket, getSessionSocket } from './lib/socket';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './components/ui/resizable';
import { getClientSession } from './lib/session/chat-session';
import { ChatInput } from './ui/chat-input';
import logger from 'debug';
import { NexaiChatBubble } from '../chat-bubble';
import { AISearchShadowDom } from './ai-search-shadow-dom';
import { fetchSearchDocs } from './lib/ai-search/fetch-search';
// import { docsConfig } from './components/ui/config/docs'
const debug = logger('nexai:app');
const msgs = observable([]);
const projectMsgs = observable([]);
const addMsg = action((msg) => {
    msgs.push(msg);
});
const addProjectMsg = action((msg) => {
    projectMsgs.push(msg);
});
const nexaiApiKey = 'clu8h3eg60000haaadp65lyeb'; // 'clu8hm40800004vzfocfds9xa'
const nexaiAssetsUrl = 'https://nexai.site/ai/assets';
const docsNav = [];
const fetchDocs = () => __awaiter(void 0, void 0, void 0, function* () {
    const docs = yield fetchSearchDocs(nexaiApiKey);
    docsNav.push(...docs);
});
fetchDocs();
export const App = observer(() => {
    const loaded = useRef(false);
    const clientSession = getClientSession(nexaiApiKey, nexaiAssetsUrl);
    const sessionIo = getSessionSocket({
        sessionKey: clientSession.sessionId
    });
    const projectIo = getProjectSocket({
        projectId: nexaiApiKey
    });
    const sendSessionChatMsg = (message) => {
        const chatMsg = {
            message,
            projectId: nexaiApiKey,
            sessionKey: clientSession.sessionId,
            fromName: clientSession.name,
            toName: 'support'
        };
        sessionIo.emit('chat', chatMsg);
    };
    const sendSupportChatMsg = (message) => {
        const chatMsg = {
            message,
            projectId: nexaiApiKey,
            sessionKey: clientSession.sessionId,
            fromName: 'support',
            toName: clientSession.name
        };
        projectIo.emit('chat', chatMsg);
    };
    const onSendSessionChatMsg = (msg) => {
        sendSessionChatMsg(msg);
    };
    const onSendSupportChatMsg = (msg) => {
        sendSupportChatMsg(msg);
    };
    const onChat = (msg, ...args) => {
        debug('session chat msg', { msg, args });
        addMsg(msg);
    };
    const onProjectChat = (msg, ...args) => {
        debug('project chat msg', { msg, args });
        addProjectMsg(msg);
    };
    useEffect(() => {
        if (loaded.current)
            return;
        debug('loaded session...');
        sessionIo.on('chat', onChat);
        projectIo.on('chat', onProjectChat);
        loaded.current = true;
        // setTimeout(() => {
        //   sendSessionChatMsg('hello from client')
        // }, 100)
    });
    const onMenuItemReadMore = (menuItem, group) => {
        console.log('onMenuItemReadMore', { menuItem, group });
        if (typeof window !== 'undefined') {
            window.location.href = String(group.href);
        }
    };
    return (_jsxs("div", { className: 'flex-col align-middle items-center bg-slate-50 p-5', children: [_jsxs(ResizablePanelGroup, { direction: "horizontal", className: 'relative gap-1', children: [_jsxs(ResizablePanel, { className: 'border rounded', children: [_jsx("h2", { className: "text-2xl font-bold border-b px-2 py-2", children: "Chat" }), _jsx("div", { className: 'flex p-2', children: _jsx(AISearchShadowDom, { docsNav: docsNav, onMenuItemReadMore: onMenuItemReadMore, className: 'h-10 bg-slate-50', placeholder: 'Search Nexai documents...' }) }), _jsx("div", { className: 'flex-col p-2 space-y-2 my-2 items-start align-top h-[80vh] overflow-y-auto', children: msgs.map((msg, index) => (_jsxs("p", { className: 'flex gap-1 p-2 border rounded-xl', children: [_jsx("span", { className: 'font-bold', children: msg.fromName }), _jsx("span", { children: msg.message })] }, index))) }), _jsx("div", { className: 'p-4', children: _jsx(ChatInput, { onSendChatMsg: onSendSessionChatMsg }) })] }), _jsx(ResizableHandle, {}), _jsxs(ResizablePanel, { className: 'border rounded', children: [_jsx("h2", { className: "text-2xl font-bold border-b px-2 py-2", children: "Dashboard" }), _jsx("div", { className: 'flex-col p-2 space-y-2 my-2 items-start align-top h-[80vh] overflow-y-auto', children: projectMsgs.map((msg, index) => (_jsxs("p", { className: 'flex gap-1 p-2 border rounded-xl', children: [_jsx("span", { className: 'font-bold', children: msg.fromName }), _jsx("span", { children: msg.message })] }, index))) }), _jsx("div", { className: 'p-4', children: _jsx(ChatInput, { onSendChatMsg: onSendSupportChatMsg }) })] })] }), _jsx("div", { className: "fixed bottom-50 right-10 z-50", style: {
                    bottom: 140
                }, children: _jsx(NexaiChatBubble, { width: 400, nexaiApiKey: nexaiApiKey, aiName: 'AI', aiAvatarUrl: 'https://nexai.site/ai/assets/avatars/alien-3-eyes.png', projectName: 'Nexai', chatSuggests: [
                        'Hi! I\'m fine.|What is this?',
                        'Cool!|How do I use it?',
                        'API?|Apps?',
                        'NodeJS|React|Typescript|JS',
                        'Pricing?|Free option?',
                        'I am satisfied.|I am not happy.',
                        'Thanks, bye.'
                    ] }) })] }));
});
