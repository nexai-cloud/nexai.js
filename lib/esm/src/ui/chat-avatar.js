import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";
const getInitials = (name) => {
    return name.split(' ').map(c => c[0]).join('').substring(0, 2);
};
export const ChatAvatar = ({ src = '', name = '', className = '' }) => (_jsx(TooltipProvider, { children: _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { children: _jsx("div", { className: cn("overflow-hidden rounded-full shadow  border", className), children: _jsxs(Avatar, { children: [_jsx(AvatarImage, { src: src, alt: name }), _jsx(AvatarFallback, { className: "bg-white", children: getInitials(name) })] }) }) }), _jsx(TooltipContent, { className: "bg-white", children: name })] }) }));
export const BotAvatar = ({ src = '/logo/nexai-logo-round.svg', name = 'Nexai' }) => (_jsx(ChatAvatar, { className: "border-none shadow-none", src: src, name: name }));
