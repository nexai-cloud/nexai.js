import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './components/ui/resizable';
import { ChatSidebar } from './chat/sidebar/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
import { useState } from 'react';
import { cn } from './lib/utils';
import "./chat/sidebar/style/sidebar.css";
import { ChevronsLeftRight } from 'lucide-react';
export const ChatSidePanel = ({ nexaiApiKey, nexaiApiUrl, }) => {
    const [open, _setOpen] = useState(localStorage.getItem('nexai:open') === null
        ? true
        : Boolean(localStorage.getItem('nexai:open')));
    const [isSidePanel, setIsSidePanel] = useState(localStorage.getItem('nexai:panel') === null
        ? true
        : Boolean(localStorage.getItem('nexai:panel')));
    const [chatInput, setChatInput] = useState('');
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
    return (_jsxs(_Fragment, { children: [_jsxs(ResizablePanelGroup, { direction: "horizontal", className: cn('fixed bottom-0 left-0 pointer-events-none', !isSidePanel && 'md:p-10 md:pb-20'), children: [_jsx(ResizablePanel, { className: cn('flex flex-col space-y-2 space-x-2 p-3', 'hidden lg:flex'), defaultSize: 70 }), open && (_jsx(ResizableHandle, { withHandle: isSidePanel, className: "bg-transparent" })), _jsx(ResizablePanel, { className: cn('nexai-chat-sidebar relative', "max-h-screen md:max-h-[90%] md:min-w-[400px]", 'flex flex-col bg-white shadow-xl', 'border rounded-lg mt-auto', 'opacity-0', 'transition-opacity duration-300', open && 'opacity-100 pointer-events-auto', 'pt-4', isSidePanel && 'h-screen max-h-screen md:max-h-screen rounded-none', chatInput && 'min-h-[80vh] md:min-h-[550px]'), children: open && (_jsxs(_Fragment, { children: [_jsx("button", { className: 'absolute right-1 top-1', onClick: toggleSidePanel, children: _jsx(ChevronsLeftRight, { size: 18, className: 'text-slate-300 -rotate-45' }) }), _jsx(ChatSidebar, { nexaiApiKey: nexaiApiKey, nexaiApiUrl: nexaiApiUrl, onClickBack: () => setOpen(false), onChatInput: onChatInput })] })) })] }), _jsx("button", { onClick: () => setOpen(!open), className: cn(open && 'hidden md:flex', isSidePanel && 'md:hidden', "fixed z-20 bottom-0 right-0 pb-4 pr-10"), children: _jsxs(Avatar, { className: cn("backdrop-blur-sm shadow-xl", open ? "h-12 w-12" : "h-16 w-16"), children: [_jsx(AvatarImage, { src: "/nexai-logo/nexai-logo-circle-color.svg" }), _jsx(AvatarFallback, { children: "AI" })] }) })] }));
};
