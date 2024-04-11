import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Highlight, themes } from "prism-react-renderer";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";
import { toast } from "~/components/ui/use-toast";
const copyCodeClipboard = (text) => {
    navigator.clipboard.writeText(text).then(function () {
        toast({
            title: "Copied code to clipboard",
            // description: text,
            className: 'bg-green-100'
        });
    }, function (err) {
        console.error('Failed to copy text: ', err);
    });
};
export const CodeBlock = ({ code = '', language = 'tsx', showLines = true, showCopy = true, copyLabel = 'copy code' }) => (_jsx(Highlight, { theme: themes.shadesOfPurple, code: code, language: language, children: ({ className, style, tokens, getLineProps, getTokenProps }) => (_jsxs("div", { className: cn('code-block', 'relative w-fullshadow rounded', ''), children: [_jsxs("div", { className: "w-full flex p-2 bg-purple-600", children: [_jsx("div", { className: "font-bold text-md text-muted", children: language || 'code' }), showCopy ? (_jsx(Badge, { className: cn("code-copy ml-auto", "shadow bg-purple-500 hover:bg-purple-400"), onClick: () => copyCodeClipboard(code), children: copyLabel })) : null] }), _jsx("pre", { style: Object.assign({}, style), className: cn(className, 'p-6'), children: tokens.map((line, i) => (_jsxs("div", Object.assign({}, getLineProps({ line }), { children: [showLines ? (_jsx("span", { children: i + 1 })) : null, line.map((token, key) => (_jsx("span", Object.assign({}, getTokenProps({ token })), key)))] }), i))) })] })) }));
