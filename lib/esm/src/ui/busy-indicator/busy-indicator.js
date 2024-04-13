import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const ChatBusyIndicator = ({ text = 'Typing' }) => {
    return (_jsxs("div", { className: "typing-busy-indicator", children: [_jsx("span", { className: "typing-text", children: text }), _jsx("span", { className: "dot-1", children: "." }), _jsx("span", { className: "dot-2", children: "." }), _jsx("span", { className: "dot-3", children: "." })] }));
};
