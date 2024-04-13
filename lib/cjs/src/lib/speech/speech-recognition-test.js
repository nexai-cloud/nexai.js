"use strict";
// Check if browser supports SpeechRecognition
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    // Create new SpeechRecognition object
    const recognition = 'SpeechRecognition' in window ? new SpeechRecognition() : new webkitSpeechRecognition();
    // Set recognition parameters
    recognition.lang = 'en-US'; // Set language
    recognition.interimResults = false; // Set to true to get interim results
    // Add event listener for speech recognition result
    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript;
        console.log('Speech Recognition Result:', transcript);
    };
    recognition.addEventListener('speechstart', () => {
        console.log('Speech started...:');
    });
    recognition.addEventListener('speechend', () => {
        console.log('Speech end.');
    });
    // Start speech recognition
    recognition.start();
}
else {
    console.error('Speech Recognition is not supported in this browser.');
}
