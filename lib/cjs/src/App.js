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
const chat_session_1 = require("./lib/session/chat-session");
const debug_1 = __importDefault(require("debug"));
const mock_msgs_1 = require("./data/mock-msgs");
const dashboard_1 = require("./chat/dashboard/dashboard");
const tabs_1 = require("./components/ui/tabs");
const scroll_area_1 = require("./components/ui/scroll-area");
const chat_side_panel_shadow_1 = require("./chat-side-panel-shadow");
const debug = (0, debug_1.default)('nexai:app');
const msgs = (0, mobx_1.observable)([]);
const projectMsgs = (0, mobx_1.observable)([]);
const addMsg = (0, mobx_1.action)((msg) => {
    msgs.push(msg);
});
const addProjectMsg = (0, mobx_1.action)((msg) => {
    projectMsgs.push(msg);
});
const nexaiApiKey = 'clttxpx0w000whlerwrt9toge';
// 'clttxpx0w000whlerwrt9toge' // Local - Nexai Development
// 'clu8h3eg60000haaadp65lyeb' // Nexai Team
// 'clu8hm40800004vzfocfds9xa' // Nexai Dev
const nexaiAssetsUrl = 'https://nexai.site/ai/assets';
// const nexaiApiUrl = 'https://nexai.site/api'
const nexaiApiUrl = 'http://localhost:3000/api';
// const nexaiIoUrl = 'https://io.nexai.site'
const nexaiIoUrl = 'http://localhost:8080';
exports.App = (0, mobx_react_lite_1.observer)(() => {
    const loaded = (0, react_1.useRef)(false);
    const clientSession = (0, chat_session_1.getClientSession)(nexaiApiKey, nexaiAssetsUrl);
    const sessionIo = (0, socket_1.getSessionSocket)({
        sessionKey: clientSession.sessionId,
        ioUrl: nexaiIoUrl
    });
    const projectIo = (0, socket_1.getProjectSocket)({
        projectId: nexaiApiKey,
        ioUrl: nexaiIoUrl
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
    (0, react_1.useEffect)(() => {
        if (loaded.current)
            return;
        debug('loaded session...');
        sessionIo.on('chat', onChat);
        projectIo.on('chat', onProjectChat);
        // load mocks
        msgs.push(...mock_msgs_1.mockMsgs);
        projectMsgs.push(...mock_msgs_1.mockMsgs);
        msgs.push(...mock_msgs_1.mockMsgs);
        projectMsgs.push(...mock_msgs_1.mockMsgs);
        loaded.current = true;
        // setTimeout(() => {
        //   sendSessionChatMsg('hello from client')
        // }, 100)
    });
    return ((0, jsx_runtime_1.jsxs)("div", { className: 'flex-col align-middle items-center', children: [(0, jsx_runtime_1.jsxs)(tabs_1.Tabs, { defaultValue: 'screenshot', className: 'relative gap-1', children: [(0, jsx_runtime_1.jsxs)(tabs_1.TabsList, { children: [(0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: 'screenshot', children: "Screenshot" }), (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { value: 'dashboard', children: "Dashboard" })] }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "dashboard", children: (0, jsx_runtime_1.jsx)(dashboard_1.ChatDashboard, { projectMsgs: projectMsgs, onSendSupportChatMsg: onSendSupportChatMsg }) }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "screenshot", children: (0, jsx_runtime_1.jsxs)(scroll_area_1.ScrollArea, { className: 'h-screen', children: [(0, jsx_runtime_1.jsx)("img", { className: 'h-[90vh]', src: '/screenshots/hai-semantic-chat.png' }), (0, jsx_runtime_1.jsx)("img", { className: 'h-screen', src: '/screenshots/hai-sidebar.jpeg' }), (0, jsx_runtime_1.jsx)("img", { className: 'h-screen', src: '/screenshots/hai-prompts.jpeg' }), (0, jsx_runtime_1.jsx)("img", { className: 'h-screen', src: '/screenshots/hai-create-bot.jpeg' }), (0, jsx_runtime_1.jsx)("img", { className: 'h-screen', src: '/screenshots/hai-toolkit.jpeg' }), (0, jsx_runtime_1.jsx)("img", { className: 'h-screen', src: '/screenshots/hai-sidebar2.jpeg' })] }) })] }), (0, jsx_runtime_1.jsx)(chat_side_panel_shadow_1.ChatSidePanelShadowDom, { nexaiApiKey: nexaiApiKey, nexaiApiUrl: nexaiApiUrl, nexaiIoUrl: nexaiIoUrl })] }));
});
