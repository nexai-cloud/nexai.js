"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotAvatar = exports.ChatAvatar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const avatar_1 = require("@/components/ui/avatar");
const tooltip_1 = require("~/components/ui/tooltip");
const utils_1 = require("~/lib/utils");
const getInitials = (name) => {
    return name.split(' ').map(c => c[0]).join('').substring(0, 2);
};
const ChatAvatar = ({ src = '', name = '', className = '' }) => ((0, jsx_runtime_1.jsx)(tooltip_1.TooltipProvider, { children: (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, { children: [(0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, { children: (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)("overflow-hidden rounded-full shadow  border", className), children: (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, { children: [(0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, { src: src, alt: name }), (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, { className: "bg-white", children: getInitials(name) })] }) }) }), (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, { className: "bg-white", children: name })] }) }));
exports.ChatAvatar = ChatAvatar;
const BotAvatar = ({ src = '/logo/nexai-logo-round.svg', name = 'Nexai' }) => ((0, jsx_runtime_1.jsx)(exports.ChatAvatar, { className: "border-none shadow-none", src: src, name: name }));
exports.BotAvatar = BotAvatar;
