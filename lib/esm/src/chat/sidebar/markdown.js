var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ExternalLinkIcon, Link2Icon, LucideChevronRight } from "lucide-react";
import { CodeBlock } from "../../components/shared/prism/code-block";
import { observer } from "mobx-react-lite";
import { useState } from 'react';
import { cn } from '../../lib/utils';
export const MessageMarkdown = observer(({ chatMessage }) => {
    if (!chatMessage)
        return null;
    const { message, sources } = chatMessage;
    // const isAi = thread.userUid === 'nexai'
    const [viewSources, setViewSources] = useState(false);
    const toggleViewSources = () => {
        setViewSources(!viewSources);
    };
    return (_jsx("div", { className: "message-markdown", children: typeof message === 'string' ? (_jsxs("div", { children: [_jsx("div", { children: _jsx(Markdown, { remarkPlugins: [remarkGfm], components: {
                            code(props) {
                                const { children, className, node } = props, rest = __rest(props, ["children", "className", "node"]);
                                node; // fix unused error
                                const match = /language-(\w+)/.exec(className || '');
                                return match ? (_jsx(CodeBlock, { code: String(children).replace(/\n$/, ''), language: match[1], showLines: false })) : (_jsx("code", Object.assign({}, rest, { className: className, children: children })));
                            }
                        }, children: message }) }), (sources === null || sources === void 0 ? void 0 : sources.length) ? (_jsxs("div", { className: 'mt-2', children: [_jsxs("h4", { onClick: toggleViewSources, className: 'flex items-center text-sm cursor-pointer font-semibold text-muted-foreground pb-1', children: [_jsxs("span", { children: [sources.length, " source", sources.length > 1 ? 's' : ''] }), _jsx(LucideChevronRight, { size: 16, className: cn('transition-all duration-300', viewSources && 'rotate-90') })] }), _jsx("div", { className: cn("hidden flex-col space-y-1", viewSources && 'flex'), children: sources.map((source) => (_jsxs("p", { className: 'group flex align-middle gap-1  text-sm', children: [_jsx(Link2Icon, { className: 'text-muted-foreground', size: 20 }), _jsxs("a", { className: 'flex items-center align-middle', href: source, target: '_blank', children: [source, _jsx(ExternalLinkIcon, { className: 'ml-1 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300', size: 12 })] })] }, source))) })] })) : null] })) : (message) }));
});
