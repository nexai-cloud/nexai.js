"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatSidebar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const input_1 = require("./input");
const messages_1 = require("./messages");
const suggest_1 = require("./suggest");
const utils_1 = require("../../lib/utils");
const react_1 = require("react");
const command_1 = require("../../components/ui/command");
const socket_1 = require("../../lib/socket");
const chat_session_1 = require("../../models/chat-session");
const mobx_react_lite_1 = require("mobx-react-lite");
const chat_messages_1 = require("../../models/chat-messages");
const header_1 = require("./header");
const mockChatMessages_1 = require("./data/mockChatMessages");
// import { mockMsgs } from "../../data/mock-msgs";
const team_members_1 = require("../../models/team-members");
exports.ChatSidebar = (0, mobx_react_lite_1.observer)(({ nexaiApiKey, onClickBack, nexaiApiUrl = 'https://nexai.site/api', nexaiAssetsUrl = 'https://nexai.site/assets', nexaiIoUrl = 'https://io.nexai.site', onChatInput }) => {
    const [chatInput, setChatInput] = (0, react_1.useState)('');
    const chatInputRef = (0, react_1.useRef)(null);
    const messagesModel = (0, chat_messages_1.useChatMessagesModel)();
    let suggest;
    const setSuggest = (value) => suggest = value;
    const messagesRef = (0, react_1.useRef)(null);
    const teamMembers = (0, team_members_1.useTeamMembers)({ projectId: nexaiApiKey, nexaiApiUrl });
    const onSpeechTranscript = (transcript) => {
        console.log('onSpeech', transcript);
        onSendChatMsg(transcript);
    };
    const chatSession = (0, chat_session_1.useChatSessionModel)({ nexaiApiKey, nexaiAssetsUrl });
    const socket = (0, socket_1.getSessionSocket)({
        sessionKey: chatSession.sessionId,
        ioUrl: nexaiIoUrl
    });
    const loaded = (0, react_1.useRef)(false);
    const onChatMessage = (message) => {
        messagesModel.addItem(message);
        setTimeout(() => scrollMessagesToBottom(), 50);
    };
    const scrollMessagesToBottom = (0, react_1.useCallback)(() => {
        var _a, _b;
        (_b = (_a = messagesRef.current) === null || _a === void 0 ? void 0 : _a.querySelector('.chat-message:last-child')) === null || _b === void 0 ? void 0 : _b.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }, []);
    (0, react_1.useEffect)(() => {
        if (loaded.current)
            return;
        loaded.current = true;
        teamMembers.fetch();
        // @ts-expect-error window
        window.teamMembers = teamMembers;
        socket.on('chat', onChatMessage);
        if (!messagesModel.items.length) {
            mockChatMessages_1.mockChatMessages.forEach((msg, i) => {
                setTimeout(() => onChatMessage(msg), i * 2000);
            });
        }
        // mockMsgs.forEach(msg => onChatMessage(msg as NexaiChatMessage))
    });
    const sendChatViaSoketIo = (0, react_1.useCallback)((chatMsg) => {
        console.log('sendChatViaIo', chatMsg);
        socket.emit('chat', chatMsg);
    }, [socket]);
    const sendSessionChatMsg = (message) => {
        const chatMsg = {
            message,
            fromName: chatSession.name,
            userUid: chatSession.uid,
            projectId: nexaiApiKey,
            sessionKey: chatSession.uid,
            toName: 'nexai'
        };
        sendChatViaSoketIo(chatMsg);
    };
    const onSendChatMsg = (message) => {
        setTimeout(() => {
            console.log('onSend', message);
            if (suggest) {
                console.log('we sent a suggest', suggest);
            }
            else {
                sendSessionChatMsg(message);
            }
        }, 50);
    };
    const onSendSuggest = (navItem, group) => {
        console.log('onSuggest', { navItem, group });
        setTimeout(() => setSuggest(null), 200);
        sendSessionChatMsg(navItem.title);
        setSuggest(navItem);
        setChatInput('');
        chatInputRef.current && chatInputRef.current.focus();
    };
    const chatAssistants = teamMembers.items;
    const _onChatInput = (input) => {
        setChatInput(input);
        onChatInput && onChatInput(input);
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(header_1.ChatHeader, { teamMembers: chatAssistants, onClickBack: onClickBack }), (0, jsx_runtime_1.jsx)(messages_1.Messages, { ref: messagesRef, msgs: [...messagesModel.items] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-auto p-2", children: (0, jsx_runtime_1.jsxs)(command_1.Command, { className: (0, utils_1.cn)("h-full w-full overflow-visible"), shouldFilter: false, children: [(0, jsx_runtime_1.jsx)("div", { className: "relative", children: chatInput && ((0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)("absolute bottom-3 left-0 z-50", "border rounded-lg shadow-lg mx-2 mb-0 shadow-slate-400 bg-slate-100"), children: (0, jsx_runtime_1.jsx)(suggest_1.SearchSuggest, { className: "bg-slate-100", input: chatInput, nexaiApiUrl: nexaiApiUrl, nexaiApiKey: nexaiApiKey, onMenuItemSelect: onSendSuggest }) })) }), (0, jsx_runtime_1.jsx)(input_1.ChatInput, { ref: chatInputRef, chatInput: chatInput, nexaiApiKey: nexaiApiKey, onChatInput: _onChatInput, onSendChatMsg: onSendChatMsg, onSpeechTranscript: onSpeechTranscript })] }) })] }));
});
