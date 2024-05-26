import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { MicIcon, SendIcon, XCircleIcon } from "lucide-react";
import { observer } from "mobx-react-lite";
import { forwardRef, useRef } from 'react';
import { hasSpeechRecognition } from "~/lib/speech/recognition";
import { cn } from "~/lib/utils";
import { SpeechRecognitionModel } from "~/models/speech-recognition";
import { NexaiWaveForm } from "~/ui/wave-form/wave-form";
export const ChatInput = observer(forwardRef(({ onSpeechTranscript, inputPlaceholder, onSendChatMsg, onChatInput, chatInput, }, chatInputRef) => {
    const speech = useRef(SpeechRecognitionModel.create()).current;
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
    return (_jsx("div", { className: "focus-within:border-blue-500 flex align-middle border rounded-lg shadow-lg p-1 bg-white", children: !speech.isSpeechInput ? (_jsxs(_Fragment, { children: [_jsx("input", { ref: chatInputRef, className: cn("flex-grow bg-white border-0 p-3 font-medium size-12", "focus:border-none focus:outline-none"), placeholder: inputPlaceholder || 'Ask a question...', onChange: onInputChange, onKeyDown: onInputKeyDown, value: chatInput }), _jsxs("div", { className: "flex", children: [hasSpeechRecognition() && (_jsx("button", { className: "flex hover:animate-pulse text-slate-300 my-auto p-2", onClick: startSpeechRecognition, children: _jsx(MicIcon, {}) })), chatInput ? (_jsx("button", { className: "flex text-slate-300 my-auto p-2", onClick: () => handleSendClick(chatInput), children: _jsx(SendIcon, {}) })) : null] })] })) : (_jsxs("div", { className: "flex relative w-full align-middle items-center size-12", children: [speech.talking ? (_jsx(NexaiWaveForm, { active: true, className: "h-16 mx-auto" })) : (_jsx("div", { className: 'animate-pulse mx-auto font-semibold text-blue-500', children: `I'm listening` })), _jsx("button", { onClick: stopSpeech, className: "absolute right-2", children: _jsx(XCircleIcon, { className: "text-muted-foreground" }) })] })) }));
}));
