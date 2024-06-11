"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpeechRecognition = exports.hasSpeechRecognition = void 0;
const hasSpeechRecognition = () => {
    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
};
exports.hasSpeechRecognition = hasSpeechRecognition;
const getSpeechRecognition = () => {
    if (!(0, exports.hasSpeechRecognition)())
        return;
    const recognition = 'SpeechRecognition' in window
        ? new SpeechRecognition() : new webkitSpeechRecognition();
    recognition.lang = 'en-US'; // Set language
    recognition.interimResults = false; // Set to true to get interim results
    return recognition;
};
exports.getSpeechRecognition = getSpeechRecognition;
