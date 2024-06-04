"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatInput = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
const mobx_react_lite_1 = require("mobx-react-lite");
const react_1 = require("react");
const recognition_1 = require("../../lib/speech/recognition");
const utils_1 = require("../../lib/utils");
const speech_recognition_1 = require("../../models/speech-recognition");
const wave_form_1 = require("../../ui/wave-form/wave-form");
exports.ChatInput = (0, mobx_react_lite_1.observer)((0, react_1.forwardRef)(({ onSpeechTranscript, inputPlaceholder, onSendChatMsg, onChatInput, chatInput, }, chatInputRef) => {
    const speech = (0, react_1.useRef)(speech_recognition_1.SpeechRecognitionModel.create()).current;
    const setChatInput = (input) => {
        onChatInput(input);
    };
    const onInputChange = (event) => {
        setChatInput(event.target.value);
    };
    const onInputKeyDown = (event) => {
        if (event.key === 'Enter' && chatInput) {
            setChatInput('');
            onSendChatMsg(chatInput);
        }
    };
    const startSpeechRecognition = () => {
        speech.startSpeechRecognition(onSpeechTranscript);
    };
    const handleSendClick = (msg) => {
        setChatInput('');
        onSendChatMsg(msg);
    };
    const stopSpeech = () => {
        speech.stopSpeechRecognition();
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "focus-within:border-blue-500 flex align-middle border rounded-lg shadow-lg p-1 bg-white", children: !speech.isSpeechInput ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("input", { ref: chatInputRef, className: (0, utils_1.cn)("chat-input flex-grow bg-white border-0 p-3 font-medium size-12", "focus:border-none focus:outline-none"), placeholder: inputPlaceholder || 'Ask a question...', onChange: onInputChange, onKeyDown: onInputKeyDown, value: chatInput }), (0, jsx_runtime_1.jsxs)("div", { className: "flex", children: [(0, recognition_1.hasSpeechRecognition)() && ((0, jsx_runtime_1.jsx)("button", { className: "flex hover:animate-pulse text-slate-300 my-auto p-2", onClick: startSpeechRecognition, children: (0, jsx_runtime_1.jsx)(lucide_react_1.MicIcon, {}) })), chatInput ? ((0, jsx_runtime_1.jsx)("button", { className: "flex text-slate-300 my-auto p-2", onClick: () => handleSendClick(chatInput), children: (0, jsx_runtime_1.jsx)(lucide_react_1.SendIcon, {}) })) : null] })] })) : ((0, jsx_runtime_1.jsxs)("div", { className: "flex relative w-full align-middle items-center size-12", children: [speech.talking ? ((0, jsx_runtime_1.jsx)(wave_form_1.NexaiWaveForm, { active: true, className: "h-16 mx-auto" })) : ((0, jsx_runtime_1.jsx)("div", { className: 'animate-pulse mx-auto font-semibold text-blue-500', children: `I'm listening` })), (0, jsx_runtime_1.jsx)("button", { onClick: stopSpeech, className: "absolute right-2", children: (0, jsx_runtime_1.jsx)(lucide_react_1.XCircleIcon, { className: "text-muted-foreground" }) })] })) }));
}));
