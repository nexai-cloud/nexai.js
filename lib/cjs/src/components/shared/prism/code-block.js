"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeBlock = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const prism_react_renderer_1 = require("prism-react-renderer");
const badge_1 = require("../../../components/ui/badge");
const utils_1 = require("../../../lib/utils");
const use_toast_1 = require("../../../components/ui/use-toast");
const copyCodeClipboard = (text) => {
    navigator.clipboard.writeText(text).then(function () {
        (0, use_toast_1.toast)({
            title: "Copied code to clipboard",
            // description: text,
            className: 'bg-green-100'
        });
    }, function (err) {
        console.error('Failed to copy text: ', err);
    });
};
const CodeBlock = ({ code = '', language = 'tsx', showLines = true, showCopy = true, copyLabel = 'copy code' }) => ((0, jsx_runtime_1.jsx)(prism_react_renderer_1.Highlight, { theme: prism_react_renderer_1.themes.shadesOfPurple, code: code, language: language, children: ({ className, style, tokens, getLineProps, getTokenProps }) => ((0, jsx_runtime_1.jsxs)("div", { className: (0, utils_1.cn)('code-block', 'relative w-fullshadow rounded', ''), children: [(0, jsx_runtime_1.jsxs)("div", { className: "w-full flex p-2 bg-purple-600", children: [(0, jsx_runtime_1.jsx)("div", { className: "font-bold text-md text-muted", children: language || 'code' }), showCopy ? ((0, jsx_runtime_1.jsx)(badge_1.Badge, { className: (0, utils_1.cn)("code-copy ml-auto", "shadow bg-purple-500 hover:bg-purple-400"), onClick: () => copyCodeClipboard(code), children: copyLabel })) : null] }), (0, jsx_runtime_1.jsx)("pre", { style: Object.assign({}, style), className: (0, utils_1.cn)(className, 'p-6'), children: tokens.map((line, i) => ((0, jsx_runtime_1.jsxs)("div", Object.assign({}, getLineProps({ line }), { children: [showLines ? ((0, jsx_runtime_1.jsx)("span", { children: i + 1 })) : null, line.map((token, key) => ((0, jsx_runtime_1.jsx)("span", Object.assign({}, getTokenProps({ token })), key)))] }), i))) })] })) }));
exports.CodeBlock = CodeBlock;
