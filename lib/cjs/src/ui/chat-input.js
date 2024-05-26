"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatInput = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ChatInput = ({ onSendChatMsg, focusOnInput = false }) => {
    const inputRef = (0, react_1.useRef)(null);
    const [input, setInput] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        var _a;
        if (focusOnInput) {
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        }
    });
    const onInputChange = (event) => {
        setInput(event.target.value);
    };
    const onClick = () => {
        onSendChatMsg(input);
        setInput('');
    };
    const onInputKey = (event) => {
        if (event.key === 'Enter') {
            onClick();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex space-x-2 w-full", children: [(0, jsx_runtime_1.jsx)("input", { ref: inputRef, value: input, onChange: onInputChange, onKeyDown: onInputKey, className: 'border p-2 rounded-lg flex-1' }), (0, jsx_runtime_1.jsx)("button", { className: 'px-4 py-2 border shadow rounded-lg', onClick: onClick, children: "Send" })] }));
};
exports.ChatInput = ChatInput;
