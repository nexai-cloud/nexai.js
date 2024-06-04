import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ChatInput } from "./input";
import { Messages } from "./messages";
import { SearchSuggest } from "./suggest";
import { cn } from "../../lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { Command } from "../../components/ui/command";
import { getSessionSocket } from "../../lib/socket";
import { useChatSessionModel } from "../../models/chat-session";
import { observer } from "mobx-react-lite";
import { useChatMessagesModel } from "../../models/chat-messages";
import { ChatHeader } from "./header";
import { mockChatMessages } from "./data/mockChatMessages";
// import { mockMsgs } from "../../data/mock-msgs";
import { useTeamMembers } from "../../models/team-members";
export const ChatSidebar = observer(({ nexaiApiKey, onClickBack, nexaiApiUrl = 'https://nexai.site/api', nexaiAssetsUrl = 'https://nexai.site/assets', nexaiIoUrl = 'https://io.nexai.site', onChatInput }) => {
    const [chatInput, setChatInput] = useState('');
    const chatInputRef = useRef(null);
    const messagesModel = useChatMessagesModel();
    let suggest;
    const setSuggest = (value) => suggest = value;
    const messagesRef = useRef(null);
    const teamMembers = useTeamMembers({ projectId: nexaiApiKey, nexaiApiUrl });
    const [mountCmdk, setMountCmdk] = useState(true);
    const onSpeechTranscript = (transcript) => {
        console.log('onSpeech', transcript);
        onSendChatMsg(transcript);
    };
    const chatSession = useChatSessionModel({ nexaiApiKey, nexaiAssetsUrl });
    const socket = getSessionSocket({
        sessionKey: chatSession.sessionId,
        ioUrl: nexaiIoUrl
    });
    const loaded = useRef(false);
    const onChatMessage = (message) => {
        messagesModel.addItem(message);
        setTimeout(() => scrollMessagesToBottom(), 50);
    };
    const scrollMessagesToBottom = useCallback(() => {
        var _a, _b;
        (_b = (_a = messagesRef.current) === null || _a === void 0 ? void 0 : _a.querySelector('.chat-message:last-child')) === null || _b === void 0 ? void 0 : _b.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }, []);
    useEffect(() => {
        if (loaded.current)
            return;
        loaded.current = true;
        teamMembers.fetch();
        // @ts-expect-error window
        window.teamMembers = teamMembers;
        // ensure no dupes
        socket.off('chat', onChatMessage);
        socket.on('chat', onChatMessage);
        if (!messagesModel.items.length) {
            mockChatMessages.forEach((msg, i) => {
                setTimeout(() => onChatMessage(msg), i * 2000);
            });
        }
        // mockMsgs.forEach(msg => onChatMessage(msg as NexaiChatMessage))
    });
    const sendChatViaSoketIo = useCallback((chatMsg) => {
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
    // we need to unmount CMDK to remove prev selection
    // @todo fix within CMDK api?
    const resetCmdk = () => {
        setMountCmdk(false);
        setTimeout(() => {
            var _a;
            setMountCmdk(true);
            (_a = chatInputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
            setTimeout(() => { var _a; return (_a = chatInputRef.current) === null || _a === void 0 ? void 0 : _a.focus(); }, 50);
        }, 0);
    };
    const onSendSuggest = (navItem, group) => {
        var _a;
        console.log('onSuggest', { navItem, group });
        setTimeout(() => setSuggest(null), 200);
        sendSessionChatMsg(navItem.title);
        setSuggest(navItem);
        setChatInput('');
        resetCmdk();
        (_a = chatInputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    };
    const chatAssistants = teamMembers.items;
    const _onChatInput = useCallback((input) => {
        setChatInput(input);
        onChatInput && onChatInput(input);
    }, [onChatInput]);
    const DivCom = ({ children }) => (_jsx("div", { className: cn("h-full w-full overflow-visible"), children: children }));
    const CommandCom = mountCmdk ? Command : DivCom;
    return (_jsxs(_Fragment, { children: [_jsx(ChatHeader, { teamMembers: chatAssistants, onClickBack: onClickBack }), _jsx(Messages, { ref: messagesRef, msgs: [...messagesModel.items] }), _jsx("div", { className: "mt-auto p-2", children: _jsxs(CommandCom, { className: cn("h-full w-full overflow-visible"), shouldFilter: false, children: [_jsx("div", { className: "relative", children: chatInput && (_jsx("div", { className: cn("absolute bottom-3 left-0 z-50", "border rounded-lg mx-2 mb-0 ", "shadow-xl  shadow-slate-300 bg-slate-50 border-blue-500"), children: _jsx(SearchSuggest, { input: chatInput, nexaiApiUrl: nexaiApiUrl, nexaiApiKey: nexaiApiKey, onMenuItemSelect: onSendSuggest }) })) }), _jsx(ChatInput, { ref: chatInputRef, chatInput: chatInput, nexaiApiKey: nexaiApiKey, onChatInput: _onChatInput, onSendChatMsg: onSendChatMsg, onSpeechTranscript: onSpeechTranscript })] }) })] }));
});
