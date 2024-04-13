import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
export const ChatInput = ({ onSendChatMsg, focusOnInput = false }) => {
    const inputRef = useRef(null);
    const [input, setInput] = useState('');
    useEffect(() => {
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
    return (_jsxs("div", { className: "flex space-x-2 w-full", children: [_jsx("input", { ref: inputRef, value: input, onChange: onInputChange, onKeyDown: onInputKey, className: 'border p-2 rounded-lg flex-1' }), _jsx("button", { className: 'px-4 py-2 border shadow rounded-lg', onClick: onClick, children: "Send" })] }));
};
