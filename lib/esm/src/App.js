import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { getProjectSocket, getSessionSocket } from './lib/socket';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { getClientSession } from './lib/session/chat-session';
import logger from 'debug';
import { mockMsgs } from './data/mock-msgs';
import { ChatDashboard } from './chat/dashboard/dashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { ScrollArea } from './components/ui/scroll-area';
import { ChatSidePanel } from './chat-side-panel';
const debug = logger('nexai:app');
const msgs = observable([]);
const projectMsgs = observable([]);
const addMsg = action((msg) => {
    msgs.push(msg);
});
const addProjectMsg = action((msg) => {
    projectMsgs.push(msg);
});
const nexaiApiKey = 'clu8hm40800004vzfocfds9xa';
// 'clttxpx0w000whlerwrt9toge' // Local - Nexai Development
// 'clu8h3eg60000haaadp65lyeb' // Nexai Team
// 'clu8hm40800004vzfocfds9xa' // Nexai Dev
const nexaiAssetsUrl = 'https://nexai.site/ai/assets';
const nexaiApiUrl = 'https://nexai.site/api';
//'https://nexai.site/api' // 'http://localhost:3001/api'
export const App = observer(() => {
    const loaded = useRef(false);
    const clientSession = getClientSession(nexaiApiKey, nexaiAssetsUrl);
    const sessionIo = getSessionSocket({
        sessionKey: clientSession.sessionId
    });
    const projectIo = getProjectSocket({
        projectId: nexaiApiKey
    });
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
        // load mocks
        msgs.push(...mockMsgs);
        projectMsgs.push(...mockMsgs);
        msgs.push(...mockMsgs);
        projectMsgs.push(...mockMsgs);
        loaded.current = true;
        // setTimeout(() => {
        //   sendSessionChatMsg('hello from client')
        // }, 100)
    });
    return (_jsxs("div", { className: 'flex-col align-middle items-center', children: [_jsxs(Tabs, { defaultValue: 'screenshot', className: 'relative gap-1', children: [_jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: 'screenshot', children: "Screenshot" }), _jsx(TabsTrigger, { value: 'dashboard', children: "Dashboard" })] }), _jsx(TabsContent, { value: "dashboard", children: _jsx(ChatDashboard, { projectMsgs: projectMsgs, onSendSupportChatMsg: onSendSupportChatMsg }) }), _jsx(TabsContent, { value: "screenshot", children: _jsxs(ScrollArea, { className: 'h-screen', children: [_jsx("img", { className: 'h-[90vh]', src: '/screenshots/hai-semantic-chat.png' }), _jsx("img", { className: 'h-screen', src: '/screenshots/hai-sidebar.jpeg' }), _jsx("img", { className: 'h-screen', src: '/screenshots/hai-prompts.jpeg' }), _jsx("img", { className: 'h-screen', src: '/screenshots/hai-create-bot.jpeg' }), _jsx("img", { className: 'h-screen', src: '/screenshots/hai-toolkit.jpeg' }), _jsx("img", { className: 'h-screen', src: '/screenshots/hai-sidebar2.jpeg' })] }) })] }), _jsx(ChatSidePanel, { nexaiApiKey: nexaiApiKey, nexaiApiUrl: nexaiApiUrl })] }));
});
