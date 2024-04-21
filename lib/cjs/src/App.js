"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const socket_1 = require("./lib/socket");
const mobx_1 = require("mobx");
const mobx_react_lite_1 = require("mobx-react-lite");
const resizable_1 = require("./components/ui/resizable");
const chat_session_1 = require("./lib/session/chat-session");
const chat_input_1 = require("./ui/chat-input");
const debug_1 = __importDefault(require("debug"));
const chat_bubble_1 = require("../chat-bubble");
const ai_search_shadow_dom_1 = require("./ai-search-shadow-dom");
const debug = (0, debug_1.default)('nexai:app');
const msgs = (0, mobx_1.observable)([]);
const projectMsgs = (0, mobx_1.observable)([]);
const addMsg = (0, mobx_1.action)((msg) => {
    msgs.push(msg);
});
const addProjectMsg = (0, mobx_1.action)((msg) => {
    projectMsgs.push(msg);
});
const nexaiApiKey = 'clu8h3eg60000haaadp65lyeb'; // 'clu8hm40800004vzfocfds9xa'
const nexaiAssetsUrl = 'https://nexai.site/ai/assets';
exports.App = (0, mobx_react_lite_1.observer)(() => {
    const loaded = (0, react_1.useRef)(false);
    const clientSession = (0, chat_session_1.getClientSession)(nexaiApiKey, nexaiAssetsUrl);
    const sessionIo = (0, socket_1.getSessionSocket)({
        sessionKey: clientSession.sessionId
    });
    const projectIo = (0, socket_1.getProjectSocket)({
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
    (0, react_1.useEffect)(() => {
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
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'flex-col align-middle items-center bg-slate-50 p-5', children: [(0, jsx_runtime_1.jsxs)(resizable_1.ResizablePanelGroup, { direction: "horizontal", className: 'relative gap-1', children: [(0, jsx_runtime_1.jsxs)(resizable_1.ResizablePanel, { className: 'border rounded', children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold border-b px-2 py-2", children: "Chat" }), (0, jsx_runtime_1.jsx)("div", { className: 'flex p-2', children: (0, jsx_runtime_1.jsx)(ai_search_shadow_dom_1.AISearchShadowDom, { nexaiApiKey: nexaiApiKey, onMenuItemReadMore: onMenuItemReadMore, className: 'h-10 bg-slate-50 text-slate-400 hover:text-slate-800', placeholder: 'Search Nexai documents...' }) }), (0, jsx_runtime_1.jsx)("div", { className: 'flex-col p-2 space-y-2 my-2 items-start align-top h-[80vh] overflow-y-auto', children: msgs.map((msg, index) => ((0, jsx_runtime_1.jsxs)("p", { className: 'flex gap-1 p-2 border rounded-xl', children: [(0, jsx_runtime_1.jsx)("span", { className: 'font-bold', children: msg.fromName }), (0, jsx_runtime_1.jsx)("span", { children: msg.message })] }, index))) }), (0, jsx_runtime_1.jsx)("div", { className: 'p-4', children: (0, jsx_runtime_1.jsx)(chat_input_1.ChatInput, { onSendChatMsg: onSendSessionChatMsg }) })] }), (0, jsx_runtime_1.jsx)(resizable_1.ResizableHandle, {}), (0, jsx_runtime_1.jsxs)(resizable_1.ResizablePanel, { className: 'border rounded', children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold border-b px-2 py-2", children: "Dashboard" }), (0, jsx_runtime_1.jsx)("div", { className: 'flex-col p-2 space-y-2 my-2 items-start align-top h-[80vh] overflow-y-auto', children: projectMsgs.map((msg, index) => ((0, jsx_runtime_1.jsxs)("p", { className: 'flex gap-1 p-2 border rounded-xl', children: [(0, jsx_runtime_1.jsx)("span", { className: 'font-bold', children: msg.fromName }), (0, jsx_runtime_1.jsx)("span", { children: msg.message })] }, index))) }), (0, jsx_runtime_1.jsx)("div", { className: 'p-4', children: (0, jsx_runtime_1.jsx)(chat_input_1.ChatInput, { onSendChatMsg: onSendSupportChatMsg }) })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "fixed bottom-50 right-10 z-50", style: {
                    bottom: 140
                }, children: (0, jsx_runtime_1.jsx)(chat_bubble_1.NexaiChatBubble, { width: 400, nexaiApiKey: nexaiApiKey, aiName: 'AI', aiAvatarUrl: 'https://nexai.site/ai/assets/avatars/alien-3-eyes.png', projectName: 'Nexai', chatSuggests: [
                        'Hi! I\'m fine.|What is this?',
                        'Cool!|How do I use it?',
                        'API?|Apps?',
                        'NodeJS|React|Typescript|JS',
                        'Pricing?|Free option?',
                        'I am satisfied.|I am not happy.',
                        'Thanks, bye.'
                    ] }) })] }));
});
