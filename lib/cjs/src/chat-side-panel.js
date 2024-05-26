"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatSidePanel = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const resizable_1 = require("./components/ui/resizable");
const sidebar_1 = require("./chat/sidebar/sidebar");
const avatar_1 = require("./components/ui/avatar");
const react_1 = require("react");
const utils_1 = require("./lib/utils");
// import "./chat/sidebar/style/sidebar.css"
const lucide_react_1 = require("lucide-react");
const ChatSidePanel = ({ nexaiApiKey, nexaiApiUrl = 'https://nexai.site/api', defaultSize = 25 }) => {
    const [open, _setOpen] = (0, react_1.useState)(localStorage.getItem('nexai:open') === null
        ? true
        : Boolean(localStorage.getItem('nexai:open')));
    const [isSidePanel, setIsSidePanel] = (0, react_1.useState)(Boolean(localStorage.getItem('nexai:panel')));
    const [chatInput, setChatInput] = (0, react_1.useState)('');
    const setOpen = (open) => {
        localStorage.setItem('nexai:open', open ? '1' : '');
        _setOpen(open);
    };
    const toggleSidePanel = () => {
        localStorage.setItem('nexai:panel', isSidePanel ? '' : '1');
        setIsSidePanel(!isSidePanel);
    };
    const onChatInput = (chatInput) => {
        setChatInput(chatInput);
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(resizable_1.ResizablePanelGroup, { direction: "horizontal", className: (0, utils_1.cn)('fixed bottom-0 left-0 pointer-events-none', !isSidePanel && 'md:p-10 md:pb-20'), children: [(0, jsx_runtime_1.jsx)(resizable_1.ResizablePanel, { className: (0, utils_1.cn)('flex flex-col space-y-2 space-x-2 p-3', 'hidden lg:flex'), defaultSize: 100 - defaultSize }), open && ((0, jsx_runtime_1.jsx)(resizable_1.ResizableHandle
                    // @ts-expect-error withhandle
                    , { 
                        // @ts-expect-error withhandle
                        withHandle: isSidePanel, className: "bg-transparent" })), (0, jsx_runtime_1.jsx)(resizable_1.ResizablePanel, { className: (0, utils_1.cn)('nexai-chat-sidebar relative', "max-h-screen md:max-h-[90%] md:min-w-[400px]", 'flex flex-col bg-white shadow-xl', 'border rounded-lg mt-auto', 'opacity-0', 'transition-opacity duration-300', open && 'opacity-100 pointer-events-auto', 'pt-4', isSidePanel && 'h-screen max-h-screen md:max-h-screen rounded-none', chatInput && 'min-h-[80vh] md:min-h-[550px]'), children: open && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", { className: 'absolute right-1 top-1', onClick: toggleSidePanel, children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronsLeftRight, { size: 18, className: 'text-slate-300 -rotate-45' }) }), (0, jsx_runtime_1.jsx)(sidebar_1.ChatSidebar, { nexaiApiKey: nexaiApiKey, nexaiApiUrl: nexaiApiUrl, onClickBack: () => setOpen(false), onChatInput: onChatInput })] })) })] }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setOpen(!open), className: (0, utils_1.cn)(
                // <md uses sidepanel so hide
                open && 'hidden md:flex', (isSidePanel && open) && 'md:hidden', "fixed z-20 bottom-0 right-0 pb-4 pr-10"), children: (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, { className: (0, utils_1.cn)("backdrop-blur-sm shadow-xl", open ? "h-12 w-12" : "h-16 w-16"), children: [(0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, { src: "/nexai-logo/nexai-logo-circle-color.svg" }), (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, { children: "AI" })] }) })] }));
};
exports.ChatSidePanel = ChatSidePanel;
