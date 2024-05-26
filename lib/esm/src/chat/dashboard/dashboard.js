import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChatInput } from "~/ui/chat-input";
export const ChatDashboard = ({ projectMsgs, onSendSupportChatMsg }) => {
    return (_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold border-b p-2", children: "Dashboard" }), _jsx("div", { className: 'flex flex-col flex-1 p-2 space-y-2 my-2 items-start align-top overflow-y-auto', children: projectMsgs.map((msg, index) => (_jsxs("p", { className: 'flex gap-1 p-2 border rounded-xl', children: [_jsx("span", { className: 'font-bold', children: msg.fromName }), _jsx("span", { children: msg.message })] }, index))) }), _jsx("div", { className: 'p-2 mt-auto', children: _jsx(ChatInput, { onSendChatMsg: onSendSupportChatMsg }) })] }));
};
