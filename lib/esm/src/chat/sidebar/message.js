import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { cn } from "../../lib/utils";
import { MessageMarkdown } from "./markdown";
import { observer } from "mobx-react-lite";
import { MessageLike } from "./message-like";
import { MessageCopy } from "./message-copy";
export const ChatMessage = observer(({ msg, isLatest }) => {
    var _a;
    const isAi = ((_a = msg.fromName) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === 'nexai'
        || msg.fromType === 'ai'
        || msg.userUid === 'nexai';
    return (_jsxs("div", { className: "chat-message group relative flex gap-2 m-2", children: [isAi ? (_jsxs(Avatar, { className: "mt-auto", children: [_jsx(AvatarImage, { src: "/nexai-logo/nexai-logo-circle-dark.svg" }), _jsx(AvatarFallback, { children: "AI" })] })) : null, _jsxs("span", { className: cn("p-2 border border-slate-300 text-slate-900 bg-slate-100 rounded-lg", !isAi && "ml-auto bg-slate-900 text-slate-300 text-right max-w-[95%]"), children: [_jsx(MessageMarkdown, { chatMessage: msg }), isAi && (_jsx("div", { className: cn("flex w-full"), children: _jsxs("div", { className: cn("flex", !isLatest && 'border shadow bg-slate-100 rounded-lg -mb-8 mr-2 z-20', !isLatest && 'absolute bottom-0 right-0 opacity-0 group-hover:opacity-100'), children: [_jsx(MessageLike, { chatMessage: msg }), _jsx(MessageCopy, { chatMessage: msg })] }) }))] })] }));
});
