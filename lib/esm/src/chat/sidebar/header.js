import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronLeftIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { cn } from "~/lib/utils";
const getInitials = (name) => (name.split(' ').map(w => w[0]).join('').toUpperCase());
export const ChatHeader = ({ teamMembers, onClickBack }) => {
    return (_jsxs("div", { className: "flex flex-col space-y-2 m-2 border-b pb-2", children: [_jsxs("div", { className: "flex items-center gap-2 w-full px-6", children: [_jsx("button", { onClick: onClickBack, children: _jsx(ChevronLeftIcon, { size: 30 }) }), _jsxs(Avatar, { className: "mr-auto h-16 w-16", children: [_jsx(AvatarImage, { src: "/nexai-logo/nexai-logo-circle-color.svg" }), _jsx(AvatarFallback, { children: "AI" })] }), _jsx("div", { className: "flex-grow" }), _jsx("div", { className: "ml-auto flex relative", children: teamMembers.map((user, i) => {
                            const initials = getInitials(user.name || user.email);
                            return (user.picture || initials) && (_jsxs(Avatar, { className: cn("mr-auto h-10 w-10 border border-white"), style: {
                                    zIndex: 10 - i * 2,
                                    marginLeft: -16,
                                    borderWidth: 3
                                }, children: [_jsx(AvatarImage, { src: user.picture }), _jsx(AvatarFallback, { children: initials })] }, i));
                        }) })] }), _jsx("div", { className: "flex", children: _jsx("span", { className: "px-2 text-slate-400 text-lg", children: `Talking to Nexai AI Assistant` }) })] }));
};
