import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import { ChatMessage } from "./message";
import { cn } from "../../lib/utils";
import { observer } from "mobx-react-lite";
import { forwardRef } from "react";
export const Messages = observer(forwardRef(({ msgs }, ref) => {
    return (_jsxs(ScrollArea, { ref: ref, className: cn('flex flex-col flex-1 m-2 items-start align-top', 'pr-2'), children: [msgs.map((msg, index) => (_jsx(ChatMessage, { msg: msg, isLatest: index === msgs.length - 1 }, index))), _jsx(ScrollBar, { className: "bg-muted text-black rounded-full" })] }));
}));
