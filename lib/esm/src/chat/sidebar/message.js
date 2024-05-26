import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { cn } from "../../lib/utils";
import { MessageMarkdown } from "./markdown";
export const ChatMessage = ({ msg }) => {
    var _a;
    const isAi = ((_a = msg.fromName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'nexai'
        || msg.fromType === 'ai'
        || msg.userUid === 'nexai';
    return (_jsxs("div", { className: "chat-message flex gap-2 m-2", children: [isAi ? (_jsxs(Avatar, { className: "mt-auto", children: [_jsx(AvatarImage, { src: "/nexai-logo/nexai-logo-circle-dark.svg" }), _jsx(AvatarFallback, { children: "AI" })] })) : null, _jsx("span", { className: cn("p-2 border border-slate-300 text-slate-900 bg-slate-100 rounded-lg", !isAi && "ml-auto bg-slate-900 text-slate-300 text-right max-w-[95%]"), children: _jsx(MessageMarkdown, { chatMessage: msg }) })] }));
};
