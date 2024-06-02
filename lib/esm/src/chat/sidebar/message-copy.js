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
import { cn } from "../../lib/utils";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { TooltipWrap } from "./shared/tooltip";
const CopyFilled = ({ className }) => (_jsxs("svg", { className: className, "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", fill: "currentColor", viewBox: "0 0 24 24", children: [_jsx("path", { "fill-rule": "evenodd", d: "M18 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1V9a4 4 0 0 0-4-4h-3a1.99 1.99 0 0 0-1 .267V5a2 2 0 0 1 2-2h7Z", "clip-rule": "evenodd" }), _jsx("path", { "fill-rule": "evenodd", d: "M8 7.054V11H4.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 8 7.054ZM10 7v4a2 2 0 0 1-2 2H4v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z", "clip-rule": "evenodd" })] }));
const CopyOutline = ({ className }) => (_jsx("svg", { className: className, "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", fill: "none", viewBox: "0 0 24 24", children: _jsx("path", { stroke: "currentColor", strokeLinejoin: "round", strokeWidth: "2", d: "M9 8v3a1 1 0 0 1-1 1H5m11 4h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v1m4 3v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-7.13a1 1 0 0 1 .24-.65L7.7 8.35A1 1 0 0 1 8.46 8H13a1 1 0 0 1 1 1Z" }) }));
export const MessageCopy = observer(({ chatMessage, className }) => {
    const [isCopied, setIsCopied] = useState(false);
    const onCopy = () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('onCopy', { chatMessage });
        try {
            yield navigator.clipboard.writeText(chatMessage.message);
            console.log('Text copied to clipboard');
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 5000);
        }
        catch (err) {
            console.error('Failed to copy text: ', err);
            alert('Could not copy message');
        }
    });
    return (_jsx("div", { className: cn("chat-message-like flex gap-2 m-2", className), children: _jsx(TooltipWrap, { className: "bg-white", tooltip: isCopied ? 'Message Copied' : 'Copy Message', children: _jsx("button", { onClick: () => onCopy(), children: isCopied ? _jsx(CopyFilled, {}) : _jsx(CopyOutline, {}) }) }) }));
});
