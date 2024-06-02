"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageMarkdown = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_markdown_1 = __importDefault(require("react-markdown"));
const remark_gfm_1 = __importDefault(require("remark-gfm"));
const lucide_react_1 = require("lucide-react");
const code_block_1 = require("../../components/shared/prism/code-block");
const mobx_react_lite_1 = require("mobx-react-lite");
const react_1 = require("react");
const utils_1 = require("../../lib/utils");
exports.MessageMarkdown = (0, mobx_react_lite_1.observer)(({ chatMessage }) => {
    if (!chatMessage)
        return null;
    const { message, sources } = chatMessage;
    // const isAi = thread.userUid === 'nexai'
    const [viewSources, setViewSources] = (0, react_1.useState)(false);
    const toggleViewSources = () => {
        setViewSources(!viewSources);
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "message-markdown", children: typeof message === 'string' ? ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(react_markdown_1.default, { remarkPlugins: [remark_gfm_1.default], components: {
                            code(props) {
                                const { children, className, node } = props, rest = __rest(props, ["children", "className", "node"]);
                                node; // fix unused error
                                const match = /language-(\w+)/.exec(className || '');
                                return match ? ((0, jsx_runtime_1.jsx)(code_block_1.CodeBlock, { code: String(children).replace(/\n$/, ''), language: match[1], showLines: false })) : ((0, jsx_runtime_1.jsx)("code", Object.assign({}, rest, { className: className, children: children })));
                            }
                        }, children: message }) }), (sources === null || sources === void 0 ? void 0 : sources.length) ? ((0, jsx_runtime_1.jsxs)("div", { className: 'mt-2', children: [(0, jsx_runtime_1.jsxs)("h4", { onClick: toggleViewSources, className: 'flex items-center text-sm cursor-pointer font-semibold text-muted-foreground pb-1', children: [(0, jsx_runtime_1.jsxs)("span", { children: [sources.length, " source", sources.length > 1 ? 's' : ''] }), (0, jsx_runtime_1.jsx)(lucide_react_1.LucideChevronRight, { size: 16, className: (0, utils_1.cn)('transition-all duration-300', viewSources && 'rotate-90') })] }), (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)("hidden flex-col space-y-1", viewSources && 'flex'), children: sources.map((source) => ((0, jsx_runtime_1.jsxs)("p", { className: 'group flex align-middle gap-1  text-sm', children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Link2Icon, { className: 'text-muted-foreground', size: 20 }), (0, jsx_runtime_1.jsxs)("a", { className: 'flex items-center align-middle', href: source, target: '_blank', children: [source, (0, jsx_runtime_1.jsx)(lucide_react_1.ExternalLinkIcon, { className: 'ml-1 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300', size: 12 })] })] }, source))) })] })) : null] })) : (message) }));
});
