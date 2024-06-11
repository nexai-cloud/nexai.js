export const hasSpeechRecognition = () => {
    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
};
export const getSpeechRecognition = () => {
    if (!hasSpeechRecognition())
        return;
    const recognition = 'SpeechRecognition' in window
        ? new SpeechRecognition() : new webkitSpeechRecognition();
    recognition.lang = 'en-US'; // Set language
    recognition.interimResults = false; // Set to true to get interim results
    return recognition;
};
