"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeechRecognitionModel = void 0;
const recognition_1 = require("../lib/speech/recognition");
const model_1 = require("./model");
const mobx_1 = require("mobx");
class SpeechRecognitionModel extends model_1.Model {
    constructor() {
        super();
        Object.defineProperty(this, "recognition", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (0, recognition_1.getSpeechRecognition)()
        });
        Object.defineProperty(this, "talking", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "isSpeechInput", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "transcript", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ''
        });
        Object.defineProperty(this, "startSpeechRecognition", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (onTranscript) => {
                if ((0, recognition_1.hasSpeechRecognition)()) {
                    const recognition = this.recognition;
                    // recognition.continuous = true // @todo
                    recognition.addEventListener('speechstart', () => {
                        console.log('Speech started...:');
                        this.setTalking(true);
                    });
                    recognition.addEventListener('speechend', () => {
                        console.log('Speech end.');
                        this.setTalking(false);
                        this.setIsSpeechInput(false);
                    });
                    recognition.onresult = (event) => {
                        const result = event.results[event.results.length - 1];
                        const transcript = result[0].transcript;
                        console.log('Speech Recognition Result:', transcript);
                        onTranscript(transcript);
                        this.setTranscript(transcript);
                        this.setIsSpeechInput(false);
                        setTimeout(() => {
                            this.startSpeechRecognition(onTranscript);
                        }, 500);
                    };
                    recognition.onerror = (error) => {
                        console.error('speech error', error);
                        this.setIsSpeechInput(false);
                    };
                    this.setIsSpeechInput(true);
                    recognition.start();
                    console.log('listening...');
                }
            }
        });
        (0, mobx_1.makeObservable)(this, {
            talking: mobx_1.observable,
            isSpeechInput: mobx_1.observable,
            transcript: mobx_1.observable,
            setTalking: mobx_1.action,
            setIsSpeechInput: mobx_1.action,
            setTranscript: mobx_1.action,
        });
    }
    setTalking(talking) {
        this.talking = talking;
    }
    setIsSpeechInput(isSpeechInput) {
        this.isSpeechInput = isSpeechInput;
    }
    setTranscript(transcript) {
        this.transcript = transcript;
    }
    stopSpeechRecognition() {
        this.setTalking(false);
        this.setIsSpeechInput(false);
        this.recognition.stop();
    }
}
exports.SpeechRecognitionModel = SpeechRecognitionModel;
