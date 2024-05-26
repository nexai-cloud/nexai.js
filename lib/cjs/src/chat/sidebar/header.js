"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const avatar_1 = require("../../components/ui/avatar");
const utils_1 = require("../../lib/utils");
const getInitials = (name) => (name.split(' ').map(w => w[0]).join('').toUpperCase());
const ChatHeader = ({ teamMembers, onClickBack }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col space-y-2 m-2 border-b pb-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2 w-full px-6", children: [(0, jsx_runtime_1.jsx)("button", { onClick: onClickBack, children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronLeftIcon, { size: 30 }) }), (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, { className: "mr-auto h-16 w-16", children: [(0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, { src: "/nexai-logo/nexai-logo-circle-color.svg" }), (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, { children: "AI" })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex-grow" }), (0, jsx_runtime_1.jsx)("div", { className: "ml-auto flex relative", children: teamMembers.map((user, i) => {
                            const initials = getInitials(user.name || user.email);
                            return (user.picture || initials) && ((0, jsx_runtime_1.jsxs)(avatar_1.Avatar, { className: (0, utils_1.cn)("mr-auto h-10 w-10 border border-white"), style: {
                                    zIndex: 10 - i * 2,
                                    marginLeft: -16,
                                    borderWidth: 3
                                }, children: [(0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, { src: user.picture }), (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, { children: initials })] }, i));
                        }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex", children: (0, jsx_runtime_1.jsx)("span", { className: "px-2 text-slate-400 text-lg", children: `Talking to Nexai AI Assistant` }) })] }));
};
exports.ChatHeader = ChatHeader;
